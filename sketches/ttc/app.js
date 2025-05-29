"use client"

// Circle Spotlight App - Production Ready

// Enhanced mobile detection
function detectMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const isSmallScreen = window.innerWidth <= 768

  return isMobileUA || (hasTouchScreen && isSmallScreen)
}

// Enhanced error handling
function showError(message, duration = 5000) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
  errorDiv.textContent = message
  errorDiv.style.transform = "translateX(-50%)"
  errorDiv.style.left = "50%"

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv)
    }
  }, duration)
}

function showSuccess(message, duration = 3000) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
  successDiv.textContent = message
  successDiv.style.transform = "translateX(-50%)"
  successDiv.style.left = "50%"

  document.body.appendChild(successDiv)

  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv)
    }
  }, duration)
}

// Image loading with proper error handling and loading states
function loadImageWithFeedback(src, onLoad, onError, onLoadStart) {
  if (onLoadStart) onLoadStart()

  const img = new Image()
  img.crossOrigin = "anonymous"

  img.onload = () => {
    if (onLoad) onLoad(img)
  }

  img.onerror = () => {
    const errorMsg = "Failed to load image. Please check your internet connection and try again."
    showError(errorMsg)
    if (onError) onError(errorMsg)
  }

  img.src = src
  return img
}

// Touch indicator cleanup manager
class TouchIndicatorManager {
  constructor() {
    this.indicators = []
  }

  create(x, y) {
    const indicator = document.createElement("div")
    indicator.className = "touch-point"
    indicator.style.left = x + "px"
    indicator.style.top = y + "px"
    indicator.setAttribute("aria-hidden", "true")
    document.body.appendChild(indicator)
    this.indicators.push(indicator)
    return indicator
  }

  clear() {
    this.indicators.forEach((indicator) => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator)
      }
    })
    this.indicators = []
  }

  update(index, x, y) {
    if (this.indicators[index]) {
      this.indicators[index].style.left = x + "px"
      this.indicators[index].style.top = y + "px"
    }
  }

  destroy() {
    this.clear()
  }
}

// Main App Component
function App() {
  const canvasRef = window.React.useRef(null)
  const fileInputRef = window.React.useRef(null)
  const [showInstructions, setShowInstructions] = window.React.useState(true)
  const [isMobile, setIsMobile] = window.React.useState(false)
  const [isCircleActive, setIsCircleActive] = window.React.useState(false)
  const [currentImageUrl, setCurrentImageUrl] = window.React.useState(
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  )
  const [savedImages, setSavedImages] = window.React.useState([])
  const [showImageGallery, setShowImageGallery] = window.React.useState(false)
  const [showUI, setShowUI] = window.React.useState(true)
  const [isImageLoading, setIsImageLoading] = window.React.useState(false)
  const [imageLoadError, setImageLoadError] = window.React.useState(null)

  // Refs for cleanup
  const inactivityTimerRef = window.React.useRef(null)
  const touchManagerRef = window.React.useRef(null)
  const animationFrameRef = window.React.useRef(null)

  // Initialize touch manager
  window.React.useEffect(() => {
    touchManagerRef.current = new TouchIndicatorManager()
    return () => {
      if (touchManagerRef.current) {
        touchManagerRef.current.destroy()
      }
    }
  }, [])

  // Enhanced mobile detection
  window.React.useEffect(() => {
    setIsMobile(detectMobile())

    // Listen for orientation changes
    const handleOrientationChange = () => {
      setTimeout(() => setIsMobile(detectMobile()), 100)
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleOrientationChange)

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleOrientationChange)
    }
  }, [])

  // Load saved images from localStorage on mount
  window.React.useEffect(() => {
    try {
      const saved = localStorage.getItem("circle-spotlight-images")
      if (saved) {
        const parsedImages = JSON.parse(saved)
        setSavedImages(Array.isArray(parsedImages) ? parsedImages : [])
      }
    } catch (error) {
      console.error("Error loading saved images:", error)
      showError("Failed to load saved images from storage")
    }
  }, [])

  // Save images to localStorage whenever savedImages changes
  window.React.useEffect(() => {
    try {
      localStorage.setItem("circle-spotlight-images", JSON.stringify(savedImages))
    } catch (error) {
      console.error("Error saving images:", error)
      showError("Failed to save images to storage")
    }
  }, [savedImages])

  const createThumbnail = window.React.useCallback((file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        try {
          canvas.width = 100
          canvas.height = 100

          if (ctx) {
            const size = Math.min(img.width, img.height)
            const x = (img.width - size) / 2
            const y = (img.height - size) / 2

            ctx.drawImage(img, x, y, size, size, 0, 0, 100, 100)
            resolve(canvas.toDataURL("image/jpeg", 0.7))
          } else {
            reject(new Error("Failed to get canvas context"))
          }
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error("Failed to load image for thumbnail"))
      }

      img.src = URL.createObjectURL(file)
    })
  }, [])

  const handleImageUpload = window.React.useCallback(
    async (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file (JPEG, PNG, GIF, etc.)")
        return
      }

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        showError("Image file is too large. Please select an image smaller than 10MB.")
        return
      }

      try {
        setIsImageLoading(true)
        const url = URL.createObjectURL(file)
        const thumbnail = await createThumbnail(file)

        const newImage = {
          id: Date.now().toString(),
          name: file.name,
          url,
          thumbnail,
          size: file.size,
          type: file.type,
        }

        setSavedImages((prev) => [newImage, ...prev])
        setCurrentImageUrl(url)
        showSuccess(`${file.name} has been added to your gallery.`)
      } catch (error) {
        console.error("Upload error:", error)
        showError("There was an error uploading your image. Please try again.")
      } finally {
        setIsImageLoading(false)
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    },
    [createThumbnail],
  )

  const deleteImage = window.React.useCallback(
    (id) => {
      setSavedImages((prev) => {
        const updated = prev.filter((img) => img.id !== id)
        const deletedImage = prev.find((img) => img.id === id)

        // Clean up object URL to prevent memory leaks
        if (deletedImage && deletedImage.url.startsWith("blob:")) {
          URL.revokeObjectURL(deletedImage.url)
        }

        // If we're deleting the current image, switch to default
        if (deletedImage && currentImageUrl === deletedImage.url) {
          setCurrentImageUrl(
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          )
        }

        return updated
      })
      showSuccess("Image has been removed from your gallery.")
    },
    [currentImageUrl],
  )

  // Canvas and circle spotlight logic with enhanced error handling
  window.React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      showError("Failed to initialize canvas. Your browser may not support this feature.")
      return
    }

    // Animation state
    let animationStartTime = 0
    let isAnimating = false
    const animationDuration = 800 // ms

    // Touch/click tracking
    let touches = []
    let mouseClicks = []
    let circle = null
    let isDragging = false
    const dragOffset = { x: 0, y: 0 }
    let imageLoaded = false
    let clickTimeout = null

    // Inactivity tracking
    let isDisappearing = false
    let disappearStartTime = 0
    const disappearDuration = 1000 // ms for fade out animation

    // Reset inactivity timer function
    function resetInactivityTimer() {
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
    const particles = []

    // Load images with proper error handling
    let backgroundImg = null
    let colorImage = null

    const loadImages = () => {
      setIsImageLoading(true)
      setImageLoadError(null)

      // Load background image
      backgroundImg = loadImageWithFeedback(
        currentImageUrl,
        () => {
          // Background loaded successfully
          drawScene()
        },
        (error) => {
          setImageLoadError(error)
          setIsImageLoading(false)
        },
      )

      // Load color image
      colorImage = loadImageWithFeedback(
        currentImageUrl,
        () => {
          imageLoaded = true
          setIsImageLoading(false)
          drawScene()
        },
        (error) => {
          setImageLoadError(error)
          setIsImageLoading(false)
        },
        () => {
          setIsImageLoading(true)
        },
      )
    }

    // Easing functions for smooth animations
    function easeOutElastic(t) {
      const c4 = (2 * Math.PI) / 3
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    // Create particles for formation effect
    function createFormationParticles(centerX, centerY, radius) {
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
    function calculateCircle(p1, p2, p3) {
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

    function getCentroid(points) {
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

    function startCircleAnimation(newCircle) {
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

      if (circle && colorImage && colorImage.complete && imageLoaded) {
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
    const handleTouchStart = (e) => {
      e.preventDefault()
      touches = Array.from(e.touches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }))

      touchManagerRef.current?.clear()
      touches.forEach((touch) => {
        touchManagerRef.current?.create(touch.x, touch.y)
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

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (isDragging && touches.length === 3 && circle) {
        const newTouches = Array.from(e.touches).map((touch) => ({
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
        }))

        // Update touch indicators
        newTouches.forEach((touch, i) => {
          touchManagerRef.current?.update(i, touch.x, touch.y)
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

    const handleTouchEnd = (e) => {
      e.preventDefault()
      if (e.touches.length < 3) {
        isDragging = false
        touchManagerRef.current?.clear()
      }

      resetInactivityTimer()
    }

    // Mouse events for desktop
    const handleMouseDown = (e) => {
      const point = { x: e.clientX, y: e.clientY }
      mouseClicks.push(point)

      touchManagerRef.current?.create(point.x, point.y)

      // Clear old clicks after 2 seconds
      if (clickTimeout) clearTimeout(clickTimeout)
      clickTimeout = setTimeout(() => {
        mouseClicks = []
        touchManagerRef.current?.clear()
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
          touchManagerRef.current?.clear()
        }, 500)
      }

      resetInactivityTimer()
    }

    const handleMouseMove = (e) => {
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
    function animate() {
      drawScene()
      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    // Setup event listeners
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false })
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resizeCanvas)

    // Initial setup
    loadImages()
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

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
      if (clickTimeout) clearTimeout(clickTimeout)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)

      touchManagerRef.current?.clear()
    }
  }, [currentImageUrl])

  // Gallery component with loading states
  const ImageGallery = () => {
    if (!showImageGallery) return null

    return window.React.createElement(
      "div",
      {
        className: "dialog-overlay",
        onClick: () => setShowImageGallery(false),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gallery-title",
      },
      window.React.createElement(
        "div",
        { className: "dialog-content", onClick: (e) => e.stopPropagation() },
        window.React.createElement(
          "div",
          { className: "flex justify-between items-center mb-4" },
          window.React.createElement(
            "h2",
            { id: "gallery-title", className: "text-xl font-semibold" },
            "Image Gallery",
          ),
          window.React.createElement(
            "button",
            {
              onClick: () => setShowImageGallery(false),
              className: "text-white hover:text-gray-300 text-2xl",
              "aria-label": "Close gallery",
            },
            "×",
          ),
        ),
        window.React.createElement(
          "p",
          { className: "text-gray-400 mb-4" },
          "Select an image to use or manage your saved images",
        ),
        window.React.createElement(
          "div",
          { className: "h-96 overflow-y-auto p-4" },
          window.React.createElement(
            "div",
            { className: "grid grid-cols-3 gap-4" },
            // Default image
            window.React.createElement(
              "div",
              {
                className: `relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageUrl.includes("unsplash")
                    ? "border-teal-500 ring-2 ring-teal-500/20"
                    : "border-gray-300 hover:border-gray-400"
                }`,
                onClick: () => {
                  setCurrentImageUrl(
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  )
                  setShowImageGallery(false)
                },
                role: "button",
                tabIndex: 0,
                "aria-label": "Select default mountain image",
              },
              window.React.createElement("img", {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
                alt: "Default mountain landscape",
                className: "w-full h-24 object-cover",
                loading: "lazy",
              }),
              window.React.createElement(
                "div",
                {
                  className: "absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2",
                },
                "Default Mountain",
              ),
            ),
            // Saved images
            ...savedImages.map((image) =>
              window.React.createElement(
                "div",
                {
                  key: image.id,
                  className: `relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageUrl === image.url
                      ? "border-teal-500 ring-2 ring-teal-500/20"
                      : "border-gray-300 hover:border-gray-400"
                  }`,
                  onClick: () => {
                    setCurrentImageUrl(image.url)
                    setShowImageGallery(false)
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-label": `Select ${image.name}`,
                },
                window.React.createElement("img", {
                  src: image.thumbnail,
                  alt: image.name,
                  className: "w-full h-24 object-cover",
                  loading: "lazy",
                }),
                window.React.createElement(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2",
                  },
                  image.name,
                ),
                window.React.createElement(
                  "button",
                  {
                    className:
                      "absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors",
                    onClick: (e) => {
                      e.stopPropagation()
                      deleteImage(image.id)
                    },
                    "aria-label": `Delete ${image.name}`,
                  },
                  "×",
                ),
              ),
            ),
          ),
          savedImages.length === 0 &&
            window.React.createElement(
              "div",
              { className: "text-center text-gray-500 py-8" },
              "No saved images. Upload some images to get started!",
            ),
        ),
      ),
    )
  }

  // Instructions component with accessibility
  const Instructions = () => {
    if (!showInstructions || !showUI) return null

    return window.React.createElement(
      "div",
      { className: "absolute top-4 left-4 z-20 max-w-sm transition-opacity duration-500" },
      window.React.createElement(
        "div",
        { className: "card", role: "region", "aria-labelledby": "instructions-title" },
        window.React.createElement(
          "div",
          { className: "flex justify-between items-center mb-2" },
          window.React.createElement(
            "h2",
            {
              id: "instructions-title",
              className: "text-xl flex items-center gap-2",
            },
            window.React.createElement("span", { "aria-hidden": "true" }, "ℹ️"),
            "Circle Spotlight",
          ),
          window.React.createElement(
            "button",
            {
              onClick: () => setShowInstructions(false),
              className: "text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center",
              "aria-label": "Close instructions",
            },
            "×",
          ),
        ),
        window.React.createElement(
          "p",
          { className: "text-gray-400 mb-4" },
          "Create animated color spotlights in grayscale images",
        ),
        window.React.createElement(
          "div",
          { className: "flex flex-col gap-4 text-sm" },
          window.React.createElement(
            "div",
            {
              className: "p-2 rounded bg-gray-800/50 border border-gray-700",
            },
            window.React.createElement(
              "h4",
              { className: "font-medium text-teal-400 mb-2" },
              isMobile ? "Mobile Instructions:" : "Desktop Instructions:",
            ),
            window.React.createElement(
              "p",
              null,
              isMobile
                ? "Touch with 3 fingers to create an animated spotlight circle"
                : "Click 3 different points quickly to create an animated spotlight circle",
            ),
          ),
          window.React.createElement(
            "div",
            {
              className: "p-2 rounded bg-blue-800/30 border border-blue-700",
            },
            window.React.createElement("h4", { className: "font-medium text-blue-400 mb-2" }, "Image Management:"),
            window.React.createElement("p", null, "Upload your own images and save them locally for future use"),
          ),
          window.React.createElement(
            "p",
            { className: "text-gray-300" },
            "Once created, drag to smoothly move the spotlight around the image",
          ),
          window.React.createElement(
            "p",
            { className: "text-yellow-300" },
            "Circle will disappear after 10 seconds of inactivity",
          ),
          isCircleActive &&
            window.React.createElement(
              "div",
              { className: "text-teal-400 font-medium", "aria-live": "polite" },
              "✓ Circle active! Try moving it around.",
            ),
        ),
      ),
    )
  }

  // Loading overlay
  const LoadingOverlay = () => {
    if (!isImageLoading) return null

    return window.React.createElement(
      "div",
      {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        role: "status",
        "aria-label": "Loading image",
      },
      window.React.createElement(
        "div",
        { className: "bg-black/80 p-6 rounded-lg flex items-center gap-4" },
        window.React.createElement("div", { className: "image-loading" }),
        window.React.createElement("span", { className: "text-white" }, "Loading image..."),
      ),
    )
  }

  return window.React.createElement(
    "div",
    { className: "relative w-full h-screen bg-black overflow-hidden" },
    // Background container
    window.React.createElement(
      "div",
      { className: "absolute inset-0 z-0" },
      window.React.createElement("img", {
        src: currentImageUrl,
        alt: "Background image for spotlight effect",
        className: "w-full h-full object-cover filter grayscale opacity-50",
        onError: () => setImageLoadError("Failed to load background image"),
      }),
    ),
    // Canvas for interactive elements
    window.React.createElement("canvas", {
      ref: canvasRef,
      className: "absolute inset-0 z-10 cursor-crosshair",
      role: "application",
      "aria-label": "Interactive spotlight canvas",
    }),
    // Control buttons - only show when UI is visible
    window.React.createElement(
      "div",
      {
        className: `absolute top-4 right-4 z-20 flex gap-2 transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`,
      },
      window.React.createElement("input", {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        onChange: handleImageUpload,
        className: "hidden",
        "aria-label": "Upload image file",
      }),
      window.React.createElement(
        "button",
        {
          onClick: () => fileInputRef.current?.click(),
          className: "bg-teal-600 hover:bg-teal-700 text-white transition-colors",
          disabled: isImageLoading,
          "aria-label": "Upload new image",
        },
        window.React.createElement("span", { "aria-hidden": "true", className: "mr-2" }, "📤"),
        "Upload Image",
      ),
      window.React.createElement(
        "button",
        {
          onClick: () => setShowImageGallery(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white transition-colors",
          "aria-label": `Open image gallery with ${savedImages.length} saved images`,
        },
        window.React.createElement("span", { "aria-hidden": "true", className: "mr-2" }, "🖼️"),
        `Gallery (${savedImages.length})`,
      ),
    ),
    // Instructions
    window.React.createElement(Instructions),
    // Image Gallery Dialog
    window.React.createElement(ImageGallery),
    // Loading overlay
    window.React.createElement(LoadingOverlay),
    // Toggle instructions button when hidden
    !showInstructions &&
      showUI &&
      window.React.createElement(
        "button",
        {
          className:
            "absolute top-4 left-4 z-20 bg-black/70 hover:bg-black/90 text-white transition-opacity duration-500",
          onClick: () => setShowInstructions(true),
          "aria-label": "Show instructions",
        },
        window.React.createElement("span", { "aria-hidden": "true", className: "mr-2" }, "ℹ️"),
        "Show Instructions",
      ),
    // Show a small hint button when UI is hidden
    !showUI &&
      window.React.createElement(
        "button",
        {
          className:
            "absolute bottom-4 right-4 z-20 bg-black/30 hover:bg-black/60 text-white h-10 w-10 rounded-full transition-opacity duration-300 opacity-30 hover:opacity-100",
          onClick: () => setShowUI(true),
          "aria-label": "Show user interface",
        },
        window.React.createElement("span", { "aria-hidden": "true" }, "ℹ️"),
      ),
    // Error display
    imageLoadError &&
      window.React.createElement(
        "div",
        { className: "error-message absolute top-20 left-4 right-4 z-50" },
        imageLoadError,
      ),
  )
}

// Mount the app using React 18 createRoot or fallback to React 17 render
window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  if (root && window.ReactDOM && window.ReactDOM.createRoot) {
    // Use React 18 createRoot
    const reactRoot = window.ReactDOM.createRoot(root)
    reactRoot.render(window.React.createElement(App))
  } else if (root && window.ReactDOM) {
    // Fallback to React 17 render
    window.ReactDOM.render(window.React.createElement(App), root)
  } else {
    console.error("Failed to mount React app: ReactDOM not available")
  }
})
