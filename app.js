"use client"

import React from "react"

// Circle Spotlight App - Fully Fixed for CDN React

// Main App Component
function App() {
  const canvasRef = React.useRef(null)
  const fileInputRef = React.useRef(null)
  const [showInstructions, setShowInstructions] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)
  const [isCircleActive, setIsCircleActive] = React.useState(false)
  const [currentImageUrl, setCurrentImageUrl] = React.useState(
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  )
  const [savedImages, setSavedImages] = React.useState([])
  const [showImageGallery, setShowImageGallery] = React.useState(false)
  const [showUI, setShowUI] = React.useState(true)

  // Inactivity timer ref
  const inactivityTimerRef = React.useRef(null)

  // Load saved images from localStorage on mount
  React.useEffect(() => {
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
  React.useEffect(() => {
    localStorage.setItem("circle-spotlight-images", JSON.stringify(savedImages))
  }, [savedImages])

  const createThumbnail = (file) => {
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
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    try {
      const url = URL.createObjectURL(file)
      const thumbnail = await createThumbnail(file)

      const newImage = {
        id: Date.now().toString(),
        name: file.name,
        url,
        thumbnail,
      }

      setSavedImages((prev) => [newImage, ...prev])
      setCurrentImageUrl(url)
      alert(`${file.name} has been added to your gallery.`)
    } catch (error) {
      alert("There was an error uploading your image.")
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const deleteImage = (id) => {
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
    alert("Image has been removed from your gallery.")
  }

  // Canvas and circle spotlight logic
  React.useEffect(() => {
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
    let touches = []
    let mouseClicks = []
    let circle = null
    let isDragging = false
    const dragOffset = { x: 0, y: 0 }
    let imageLoaded = false
    let clickTimeout = null

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
    const particles = []

    // Load images
    const backgroundImg = new Image()
    backgroundImg.crossOrigin = "anonymous"
    backgroundImg.src = currentImageUrl

    const colorImage = new Image()
    colorImage.crossOrigin = "anonymous"
    colorImage.src = currentImageUrl

    // Visual touch indicators
    const touchIndicators = []

    function createTouchIndicator(x, y) {
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
    const handleTouchStart = (e) => {
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

    const handleTouchEnd = (e) => {
      e.preventDefault()
      if (e.touches.length < 3) {
        isDragging = false
        clearTouchIndicators()
      }

      resetInactivityTimer()
    }

    // Mouse events for desktop
    const handleMouseDown = (e) => {
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
    let animationId
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

  // Gallery component
  const ImageGallery = () => {
    if (!showImageGallery) return null

    return React.createElement(
      "div",
      { className: "dialog-overlay", onClick: () => setShowImageGallery(false) },
      React.createElement(
        "div",
        { className: "dialog-content", onClick: (e) => e.stopPropagation() },
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" } },
          React.createElement("h2", null, "Image Gallery"),
          React.createElement(
            "button",
            {
              onClick: () => setShowImageGallery(false),
              style: { background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#999" },
            },
            "×",
          ),
        ),
        React.createElement(
          "p",
          { style: { color: "#999", marginBottom: "1rem" } },
          "Select an image to use or manage your saved images",
        ),
        React.createElement(
          "div",
          { style: { height: "400px", overflowY: "auto", padding: "1rem" } },
          React.createElement(
            "div",
            { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" } },
            // Default image
            React.createElement(
              "div",
              {
                style: {
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: currentImageUrl.includes("unsplash") ? "2px solid rgb(20, 184, 166)" : "2px solid #333",
                },
                onClick: () => {
                  setCurrentImageUrl(
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  )
                  setShowImageGallery(false)
                },
              },
              React.createElement("img", {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
                alt: "Default mountain",
                style: { width: "100%", height: "100px", objectFit: "cover" },
              }),
              React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "0.25rem",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
                "Default Mountain",
              ),
            ),
            // Saved images
            ...savedImages.map((image) =>
              React.createElement(
                "div",
                {
                  key: image.id,
                  style: {
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    border: currentImageUrl === image.url ? "2px solid rgb(20, 184, 166)" : "2px solid #333",
                  },
                  onClick: () => {
                    setCurrentImageUrl(image.url)
                    setShowImageGallery(false)
                  },
                },
                React.createElement("img", {
                  src: image.thumbnail || "/placeholder.svg",
                  alt: image.name,
                  style: { width: "100%", height: "100px", objectFit: "cover" },
                }),
                React.createElement(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                      padding: "0.25rem",
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                  image.name,
                ),
                React.createElement(
                  "button",
                  {
                    style: {
                      position: "absolute",
                      top: "0.25rem",
                      right: "0.25rem",
                      background: "rgba(220, 38, 38, 0.8)",
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                    },
                    onClick: (e) => {
                      e.stopPropagation()
                      deleteImage(image.id)
                    },
                  },
                  "×",
                ),
              ),
            ),
          ),
          savedImages.length === 0 &&
            React.createElement(
              "div",
              { style: { textAlign: "center", color: "#666", padding: "2rem 0" } },
              "No saved images. Upload some images to get started!",
            ),
        ),
      ),
    )
  }

  // Instructions component
  const Instructions = () => {
    if (!showInstructions || !showUI) return null

    return React.createElement(
      "div",
      { className: "absolute top-4 left-4 z-20 max-w-sm transition-opacity duration-500" },
      React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" } },
          React.createElement(
            "h2",
            { style: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.25rem" } },
            React.createElement("span", { style: { color: "rgb(20, 184, 166)" } }, "ℹ️"),
            "Circle Spotlight",
          ),
          React.createElement(
            "button",
            {
              onClick: () => setShowInstructions(false),
              style: {
                background: "none",
                border: "none",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                cursor: "pointer",
              },
            },
            "×",
          ),
        ),
        React.createElement(
          "p",
          { style: { color: "#999", marginBottom: "0.75rem" } },
          "Create animated color spotlights in grayscale images",
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" } },
          React.createElement(
            "div",
            {
              style: {
                padding: "0.5rem",
                background: "rgba(50, 50, 50, 0.5)",
                borderRadius: "0.375rem",
                border: "1px solid #444",
              },
            },
            React.createElement(
              "h4",
              { style: { color: "rgb(20, 184, 166)", marginBottom: "0.25rem", fontWeight: 500 } },
              isMobile ? "Mobile Instructions:" : "Desktop Instructions:",
            ),
            React.createElement(
              "p",
              null,
              isMobile
                ? "Touch with 3 fingers to create an animated spotlight circle"
                : "Click 3 different points quickly to create an animated spotlight circle",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                padding: "0.5rem",
                background: "rgba(30, 58, 138, 0.3)",
                borderRadius: "0.375rem",
                border: "1px solid #2563eb",
              },
            },
            React.createElement(
              "h4",
              { style: { color: "rgb(96, 165, 250)", marginBottom: "0.25rem", fontWeight: 500 } },
              "Image Management:",
            ),
            React.createElement("p", null, "Upload your own images and save them locally for future use"),
          ),
          React.createElement(
            "p",
            { style: { color: "#ccc" } },
            "Once created, drag to smoothly move the spotlight around the image",
          ),
          React.createElement(
            "p",
            { style: { color: "rgb(251, 191, 36)" } },
            "Circle will disappear after 10 seconds of inactivity",
          ),
          isCircleActive &&
            React.createElement(
              "div",
              { style: { color: "rgb(20, 184, 166)", fontWeight: 500, animation: "pulse 1.5s infinite" } },
              "✓ Circle active! Try moving it around.",
            ),
        ),
      ),
    )
  }

  return React.createElement(
    "div",
    { className: "relative w-full h-screen bg-black overflow-hidden" },
    // Background container
    React.createElement(
      "div",
      { className: "absolute inset-0 z-0" },
      React.createElement("img", {
        src: currentImageUrl || "/placeholder.svg",
        alt: "Background",
        className: "w-full h-full object-cover filter grayscale opacity-50",
      }),
    ),
    // Canvas for interactive elements
    React.createElement("canvas", { ref: canvasRef, className: "absolute inset-0 z-10 cursor-crosshair" }),
    // Control buttons - only show when UI is visible
    React.createElement(
      "div",
      {
        className: `absolute top-4 right-4 z-20 flex gap-2 transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`,
      },
      React.createElement("input", {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        onChange: handleImageUpload,
        className: "hidden",
      }),
      React.createElement(
        "button",
        { onClick: () => fileInputRef.current?.click(), className: "bg-teal-600" },
        React.createElement("span", { style: { marginRight: "0.5rem" } }, "📤"),
        "Upload Image",
      ),
      React.createElement(
        "button",
        { onClick: () => setShowImageGallery(true), className: "bg-blue-600" },
        React.createElement("span", { style: { marginRight: "0.5rem" } }, "🖼️"),
        `Gallery (${savedImages.length})`,
      ),
    ),
    // Instructions
    React.createElement(Instructions),
    // Image Gallery Dialog
    React.createElement(ImageGallery),
    // Toggle instructions button when hidden - only show when UI is visible and instructions are disabled
    !showInstructions &&
      showUI &&
      React.createElement(
        "button",
        {
          className:
            "absolute top-4 left-4 z-20 bg-black/70 hover:bg-black/90 text-white transition-opacity duration-500",
          onClick: () => setShowInstructions(true),
        },
        React.createElement("span", { style: { marginRight: "0.5rem" } }, "ℹ️"),
        "Show Instructions",
      ),
    // Show a small hint button when UI is hidden
    !showUI &&
      React.createElement(
        "button",
        {
          className:
            "absolute bottom-4 right-4 z-20 bg-black/30 hover:bg-black/60 text-white h-10 w-10 rounded-full p-0 transition-opacity duration-300 opacity-30 hover:opacity-100",
          onClick: () => setShowUI(true),
          style: {
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.3,
            transition: "opacity 0.3s",
          },
          onMouseOver: (e) => (e.currentTarget.style.opacity = "1"),
          onMouseOut: (e) => (e.currentTarget.style.opacity = "0.3"),
        },
        "ℹ️",
        React.createElement("span", { className: "sr-only" }, "Show UI"),
      ),
  )
}

// Mount the app using the correct ReactDOM method for CDN version
window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  if (root && window.ReactDOM) {
    // Use ReactDOM.render for React 17 compatibility (CDN version)
    window.ReactDOM.render(React.createElement(App), root)
  }
})
