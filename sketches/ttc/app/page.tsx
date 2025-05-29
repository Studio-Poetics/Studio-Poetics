"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Info, X, Upload, ImageIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface SavedImage {
  id: string
  name: string
  url: string
  thumbnail: string
}

interface Circle {
  x: number
  y: number
  radius: number
  targetX?: number
  targetY?: number
  targetRadius?: number
  scale?: number
  opacity?: number
}

export default function CircleSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isCircleActive, setIsCircleActive] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState(
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  )
  const [savedImages, setSavedImages] = useState<SavedImage[]>([])
  const [showImageGallery, setShowImageGallery] = useState(false)
  const { toast } = useToast()

  // Add a new state for tracking UI visibility
  const [showUI, setShowUI] = useState(true)

  // Add a ref for the inactivity timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load saved images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("circle-spotlight-images")
    if (saved) {
      try {
        setSavedImages(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading saved images:", error)
      }
    }
  }, [])

  // Save images to localStorage whenever savedImages changes
  useEffect(() => {
    localStorage.setItem("circle-spotlight-images", JSON.stringify(savedImages))
  }, [savedImages])

  const createThumbnail = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = 100
        canvas.height = 100

        if (ctx) {
          const size = Math.min(img.width, img.height)
          const x = (img.width - size) / 2
          const y = (img.height - size) / 2

          ctx.drawImage(img, x, y, size, size, 0, 0, 100, 100)
          resolve(canvas.toDataURL("image/jpeg", 0.7))
        }
      }

      img.src = URL.createObjectURL(file)
    })
  }, [])

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        })
        return
      }

      try {
        const url = URL.createObjectURL(file)
        const thumbnail = await createThumbnail(file)

        const newImage: SavedImage = {
          id: Date.now().toString(),
          name: file.name,
          url,
          thumbnail,
        }

        setSavedImages((prev) => [newImage, ...prev])
        setCurrentImageUrl(url)

        toast({
          title: "Image uploaded",
          description: `${file.name} has been added to your gallery.`,
        })
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your image.",
          variant: "destructive",
        })
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [createThumbnail, toast],
  )

  const deleteImage = useCallback(
    (id: string) => {
      setSavedImages((prev) => {
        const updated = prev.filter((img) => img.id !== id)
        const deletedImage = prev.find((img) => img.id === id)

        // If we're deleting the current image, switch to default
        if (deletedImage && currentImageUrl === deletedImage.url) {
          setCurrentImageUrl(
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          )
        }

        return updated
      })

      toast({
        title: "Image deleted",
        description: "Image has been removed from your gallery.",
      })
    },
    [currentImageUrl, toast],
  )

  // Modify the useEffect that handles canvas interactions to include inactivity timer
  useEffect(() => {
    setIsMobile("ontouchstart" in window)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation state
    let animationStartTime = 0
    let isAnimating = false
    const animationDuration = 800 // ms

    // Touch/click tracking
    let touches: { id: number; x: number; y: number }[] = []
    let mouseClicks: { x: number; y: number }[] = []
    let circle: Circle | null = null
    let isDragging = false
    const dragOffset = { x: 0, y: 0 }
    let imageLoaded = false
    let clickTimeout: NodeJS.Timeout | null = null

    // Inactivity tracking
    let lastInteractionTime = Date.now()
    let isDisappearing = false
    let disappearStartTime = 0
    const disappearDuration = 1000 // ms for fade out animation

    // Reset inactivity timer function
    function resetInactivityTimer() {
      lastInteractionTime = Date.now()
      isDisappearing = false

      // Hide UI when circle is active
      if (circle) {
        setShowUI(false)
      }

      // Clear any existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }

      // Set new timer
      inactivityTimerRef.current = setTimeout(() => {
        if (circle) {
          isDisappearing = true
          disappearStartTime = Date.now()
        }
      }, 10000) // 10 seconds
    }

    // Particle system for formation effect
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
    }> = []

    // Load images
    const backgroundImg = new Image()
    backgroundImg.crossOrigin = "anonymous"
    backgroundImg.src = currentImageUrl

    const colorImage = new Image()
    colorImage.crossOrigin = "anonymous"
    colorImage.src = currentImageUrl

    // Visual touch indicators
    const touchIndicators: HTMLDivElement[] = []

    function createTouchIndicator(x: number, y: number) {
      const indicator = document.createElement("div")
      indicator.className = "touch-point"
      indicator.style.left = x + "px"
      indicator.style.top = y + "px"
      document.body.appendChild(indicator)
      return indicator
    }

    function clearTouchIndicators() {
      touchIndicators.forEach((indicator) => indicator.remove())
      touchIndicators.length = 0
    }

    // Easing function for smooth animations
    function easeOutElastic(t: number): number {
      const c4 = (2 * Math.PI) / 3
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    }

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    // Create particles for formation effect
    function createFormationParticles(centerX: number, centerY: number, radius: number) {
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30
        const distance = radius + Math.random() * 50
        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60,
          maxLife: 60,
          size: Math.random() * 3 + 1,
        })
      }
    }

    // Update particles
    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98
        particle.vy *= 0.98
        particle.life--

        if (particle.life <= 0) {
          particles.splice(i, 1)
        }
      }
    }

    // Draw particles
    function drawParticles() {
      particles.forEach((particle) => {
        const alpha = particle.life / particle.maxLife
        ctx.save()
        ctx.globalAlpha = alpha * 0.8
        ctx.fillStyle = `rgba(20, 184, 166, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    // Calculate circle from three points
    function calculateCircle(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) {
      const ax = p1.x,
        ay = p1.y
      const bx = p2.x,
        by = p2.y
      const cx = p3.x,
        cy = p3.y

      const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
      if (Math.abs(d) < 0.001) return null // Points are collinear

      const ux =
        ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
      const uy =
        ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d

      const radius = Math.sqrt((ax - ux) * (ax - ux) + (ay - uy) * (ay - uy))

      return { x: ux, y: uy, radius: radius }
    }

    function getCentroid(points: { x: number; y: number }[]) {
      const x = points.reduce((sum, p) => sum + p.x, 0) / points.length
      const y = points.reduce((sum, p) => sum + p.y, 0) / points.length
      return { x, y }
    }

    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawScene()
      }
    }

    function startCircleAnimation(newCircle: Circle) {
      isAnimating = true
      animationStartTime = Date.now()

      // Set initial animation properties
      newCircle.scale = 0
      newCircle.opacity = 0

      // Create formation particles
      createFormationParticles(newCircle.x, newCircle.y, newCircle.radius)

      // Reset inactivity timer when circle is created
      resetInactivityTimer()
    }

    function updateCircleAnimation() {
      if (!circle) return

      if (isAnimating) {
        const elapsed = Date.now() - animationStartTime
        const progress = Math.min(elapsed / animationDuration, 1)

        if (progress < 1) {
          // Formation animation
          circle.scale = easeOutElastic(progress)
          circle.opacity = easeOutCubic(progress)
        } else {
          // Animation complete
          isAnimating = false
          circle.scale = 1
          circle.opacity = 1
        }
      } else if (isDisappearing) {
        // Handle disappearing animation
        const elapsed = Date.now() - disappearStartTime
        const progress = Math.min(elapsed / disappearDuration, 1)

        if (progress < 1) {
          // Fade out animation
          circle.opacity = 1 - easeOutCubic(progress)
        } else {
          // Animation complete, remove circle
          circle = null
          isDisappearing = false
          setIsCircleActive(false)
          setShowUI(true) // Show UI again when circle is gone
        }
      }
    }

    function drawScene() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update animations
      updateCircleAnimation()
      updateParticles()

      if (circle && colorImage.complete && imageLoaded) {
        setIsCircleActive(true)

        const currentScale = circle.scale || 1
        const currentOpacity = circle.opacity || 1
        const currentRadius = circle.radius * currentScale

        // Create a circular mask for the color image
        ctx.save()
        ctx.globalAlpha = currentOpacity

        // Draw color image clipped to circle
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, currentRadius, 0, 2 * Math.PI)
        ctx.clip()

        // Calculate image scaling to cover canvas
        const imgAspect = colorImage.naturalWidth / colorImage.naturalHeight
        const canvasAspect = canvas.width / canvas.height

        let drawWidth, drawHeight, drawX, drawY

        if (imgAspect > canvasAspect) {
          drawHeight = canvas.height
          drawWidth = drawHeight * imgAspect
          drawX = (canvas.width - drawWidth) / 2
          drawY = 0
        } else {
          drawWidth = canvas.width
          drawHeight = drawWidth / imgAspect
          drawX = 0
          drawY = (canvas.height - drawHeight) / 2
        }

        ctx.drawImage(colorImage, drawX, drawY, drawWidth, drawHeight)
        ctx.restore()

        // Draw circle border with gradient
        const gradient = ctx.createLinearGradient(
          circle.x - currentRadius,
          circle.y - currentRadius,
          circle.x + currentRadius,
          circle.y + currentRadius,
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * currentOpacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${0.5 * currentOpacity})`)

        ctx.beginPath()
        ctx.arc(circle.x, circle.y, currentRadius, 0, 2 * Math.PI)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.stroke()

        // Add subtle outer glow
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, currentRadius + 5, 0, 2 * Math.PI)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * currentOpacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw center point with pulsing effect
        const pulseSize = (3 + Math.sin(Date.now() / 200) * 1) * currentScale
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, pulseSize, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * currentOpacity})`
        ctx.fill()

        // Draw ripple effect during animation
        if (isAnimating) {
          const rippleProgress = ((Date.now() - animationStartTime) % 1000) / 1000
          const rippleRadius = currentRadius + rippleProgress * 100
          const rippleOpacity = (1 - rippleProgress) * 0.3 * currentOpacity

          ctx.beginPath()
          ctx.arc(circle.x, circle.y, rippleRadius, 0, 2 * Math.PI)
          ctx.strokeStyle = `rgba(20, 184, 166, ${rippleOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      } else if (!isDisappearing) {
        setIsCircleActive(false)
      }

      // Draw particles
      drawParticles()
    }

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      touches = Array.from(e.touches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }))

      clearTouchIndicators()
      touches.forEach((touch) => {
        const indicator = createTouchIndicator(touch.x, touch.y)
        touchIndicators.push(indicator)
      })

      if (touches.length === 3) {
        const newCircle = calculateCircle(touches[0], touches[1], touches[2])
        if (newCircle) {
          circle = newCircle
          const centroid = getCentroid(touches)
          dragOffset.x = centroid.x - circle.x
          dragOffset.y = centroid.y - circle.y
          isDragging = true
          startCircleAnimation(circle)
        }
      }

      resetInactivityTimer()
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (isDragging && touches.length === 3 && circle) {
        const newTouches = Array.from(e.touches).map((touch) => ({
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
        }))

        // Update touch indicators
        newTouches.forEach((touch, i) => {
          if (touchIndicators[i]) {
            touchIndicators[i].style.left = touch.x + "px"
            touchIndicators[i].style.top = touch.y + "px"
          }
        })

        const centroid = getCentroid(newTouches)

        // Smooth movement animation
        if (!circle.targetX) circle.targetX = circle.x
        if (!circle.targetY) circle.targetY = circle.y

        circle.targetX = centroid.x - dragOffset.x
        circle.targetY = centroid.y - dragOffset.y

        // Lerp to target position for smooth movement
        circle.x += (circle.targetX - circle.x) * 0.15
        circle.y += (circle.targetY - circle.y) * 0.15

        resetInactivityTimer()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length < 3) {
        isDragging = false
        clearTouchIndicators()
      }

      resetInactivityTimer()
    }

    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      const point = { x: e.clientX, y: e.clientY }
      mouseClicks.push(point)

      const indicator = createTouchIndicator(point.x, point.y)
      touchIndicators.push(indicator)

      // Clear old clicks after 2 seconds
      if (clickTimeout) clearTimeout(clickTimeout)
      clickTimeout = setTimeout(() => {
        mouseClicks = []
        clearTouchIndicators()
      }, 2000)

      if (mouseClicks.length === 3) {
        const newCircle = calculateCircle(mouseClicks[0], mouseClicks[1], mouseClicks[2])
        if (newCircle) {
          circle = newCircle
          const centroid = getCentroid(mouseClicks)
          dragOffset.x = centroid.x - circle.x
          dragOffset.y = centroid.y - circle.y
          startCircleAnimation(circle)
        }

        // Reset for next set of clicks
        setTimeout(() => {
          mouseClicks = []
          clearTouchIndicators()
        }, 500)
      }

      resetInactivityTimer()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (circle && mouseClicks.length === 3) {
        const mousePos = { x: e.clientX, y: e.clientY }

        // Smooth movement animation
        if (!circle.targetX) circle.targetX = circle.x
        if (!circle.targetY) circle.targetY = circle.y

        circle.targetX = mousePos.x - dragOffset.x
        circle.targetY = mousePos.y - dragOffset.y

        // Lerp to target position for smooth movement
        circle.x += (circle.targetX - circle.x) * 0.15
        circle.y += (circle.targetY - circle.y) * 0.15

        resetInactivityTimer()
      }
    }

    // Animation loop for smooth rendering
    let animationId: number
    function animate() {
      drawScene()
      animationId = requestAnimationFrame(animate)
    }

    // Setup event listeners
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resizeCanvas)

    // Redraw when image loads
    colorImage.onload = () => {
      imageLoaded = true
      drawScene()
    }

    backgroundImg.onload = () => {
      drawScene()
    }

    // Initial setup
    if (colorImage.complete) {
      imageLoaded = true
    }

    resizeCanvas()
    animate()

    // Cleanup
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
      clearTouchIndicators()
      if (clickTimeout) clearTimeout(clickTimeout)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }
  }, [currentImageUrl])

  // Modify the return JSX to conditionally show UI elements based on showUI state
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImageUrl || "/placeholder.svg"}
          alt="Background"
          className="w-full h-full object-cover filter grayscale opacity-50"
        />
      </div>

      {/* Canvas for interactive elements */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 cursor-crosshair" />

      {/* Control buttons - only show when UI is visible */}
      <div
        className={`absolute top-4 right-4 z-20 flex gap-2 transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

        <Button onClick={() => fileInputRef.current?.click()} className="bg-teal-600 hover:bg-teal-700 text-white">
          <Upload size={16} className="mr-2" />
          Upload Image
        </Button>

        <Dialog open={showImageGallery && showUI} onOpenChange={(open) => showUI && setShowImageGallery(open)}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ImageIcon size={16} className="mr-2" />
              Gallery ({savedImages.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Image Gallery</DialogTitle>
              <DialogDescription>Select an image to use or manage your saved images</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-96">
              <div className="grid grid-cols-3 gap-4 p-4">
                {/* Default image */}
                <div
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageUrl.includes("unsplash")
                      ? "border-teal-500 ring-2 ring-teal-500/20"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentImageUrl(
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    )
                    setShowImageGallery(false)
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                    alt="Default mountain"
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                    Default Mountain
                  </div>
                </div>

                {/* Saved images */}
                {savedImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageUrl === image.url
                        ? "border-teal-500 ring-2 ring-teal-500/20"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => {
                      setCurrentImageUrl(image.url)
                      setShowImageGallery(false)
                    }}
                  >
                    <img
                      src={image.thumbnail || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                      {image.name}
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteImage(image.id)
                      }}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              {savedImages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No saved images. Upload some images to get started!
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Instructions card - only show when UI is visible and instructions are enabled */}
      {showInstructions && showUI && (
        <div className="absolute top-4 left-4 z-20 max-w-sm transition-opacity duration-500">
          <Card className="bg-black/80 border border-gray-700 text-white shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Info size={18} className="text-teal-400" />
                  Circle Spotlight
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInstructions(false)}
                  className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X size={16} />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <CardDescription className="text-gray-400">
                Create animated color spotlights in grayscale images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-2 rounded bg-gray-800/50 border border-gray-700">
                  <h4 className="font-medium text-teal-400 mb-1">
                    {isMobile ? "Mobile Instructions:" : "Desktop Instructions:"}
                  </h4>
                  {isMobile ? (
                    <p>Touch with 3 fingers to create an animated spotlight circle</p>
                  ) : (
                    <p>Click 3 different points quickly to create an animated spotlight circle</p>
                  )}
                </div>
                <div className="p-2 rounded bg-blue-800/30 border border-blue-700">
                  <h4 className="font-medium text-blue-400 mb-1">Image Management:</h4>
                  <p>Upload your own images and save them locally for future use</p>
                </div>
                <p className="text-gray-300">Once created, drag to smoothly move the spotlight around the image</p>
                <p className="text-amber-300">Circle will disappear after 10 seconds of inactivity</p>
                {isCircleActive && (
                  <div className="animate-pulse text-teal-400 font-medium">✓ Circle active! Try moving it around.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Toggle instructions button when hidden - only show when UI is visible and instructions are disabled */}
      {!showInstructions && showUI && (
        <Button
          className="absolute top-4 left-4 z-20 bg-black/70 hover:bg-black/90 text-white transition-opacity duration-500"
          onClick={() => setShowInstructions(true)}
        >
          <Info size={16} className="mr-2" />
          Show Instructions
        </Button>
      )}

      {/* Show a small hint button when UI is hidden */}
      {!showUI && (
        <Button
          className="absolute bottom-4 right-4 z-20 bg-black/30 hover:bg-black/60 text-white h-10 w-10 rounded-full p-0 transition-opacity duration-300 opacity-30 hover:opacity-100"
          onClick={() => setShowUI(true)}
        >
          <Info size={16} />
          <span className="sr-only">Show UI</span>
        </Button>
      )}

      {/* Touch point indicators styling */}
      <style jsx global>{`
        .touch-point {
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(20, 184, 166, 0.3);
          border: 2px solid rgb(20, 184, 166);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 50;
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.7);
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
