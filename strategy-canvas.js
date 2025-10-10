(() => {
  const canvas = document.getElementById('strategyCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  let DPR, WIDTH, HEIGHT;

  function setCanvasDimensions() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    WIDTH = rect.width;
    HEIGHT = 450; // Keep height fixed
    canvas.width = WIDTH * DPR;
    canvas.height = HEIGHT * DPR;
    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // Game state
  const player = {
    x: 100,
    y: 0, // Initial y position will be set after terrain generation
    vx: 0,
    vy: 0,
    radius: 6,
    grounded: false
  };

  const keys = {};
  const stipples = [];
  const trail = [];
  const flowers = [];
  const ambientParticles = [];
  let time = 0;

  // Initialize stippled terrain
  function generateStippledTerrain() {
    stipples.length = 0;

    // Create distinct platform areas
    const platforms = [
      { x: 0, y: HEIGHT - 50, width: 300, height: 50 },        // Starting platform
      { x: 400, y: HEIGHT - 80, width: 200, height: 30 },      // First jump
      { x: 700, y: HEIGHT - 150, width: 180, height: 25 },     // Higher platform
      { x: 1000, y: HEIGHT - 200, width: 150, height: 35 },    // Even higher
      { x: 200, y: HEIGHT - 180, width: 120, height: 20 },     // Back platform
      { x: 500, y: HEIGHT - 250, width: 100, height: 15 },     // Top platform
    ];

    // Generate stipples for platforms (dense areas)
    platforms.forEach(platform => {
      const stippleDensity = 0.8; // High density for solid platforms

      for (let x = platform.x; x < platform.x + platform.width; x += 3) {
        for (let y = platform.y; y < platform.y + platform.height; y += 3) {
          if (Math.random() < stippleDensity) {
            stipples.push({
              x: x + (Math.random() - 0.5) * 4,
              y: y + (Math.random() - 0.5) * 4,
              size: 1.2 + Math.random() * 0.8,
              isPlatform: true
            });
          }
        }
      }
    });

    // Add sparse background stipples (air/void areas)
    for (let i = 0; i < (WIDTH * HEIGHT) / 1000; i++) {
      const x = Math.random() * WIDTH;
      const y = Math.random() * HEIGHT;

      // Check if this point is not on a platform
      let onPlatform = false;
      for (const platform of platforms) {
        if (x >= platform.x && x <= platform.x + platform.width &&
            y >= platform.y && y <= platform.y + platform.height) {
          onPlatform = true;
          break;
        }
      }

      if (!onPlatform) {
        stipples.push({
          x: x,
          y: y,
          size: 0.5 + Math.random() * 0.5,
          isPlatform: false
        });
      }
    }
    player.y = HEIGHT - 100;
  }

  // Initialize ambient particles
  function generateAmbientParticles() {
    ambientParticles.length = 0;
    for (let i = 0; i < (WIDTH * HEIGHT) / 2000; i++) {
      ambientParticles.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        size: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.3
      });
    }
  }

  // Add flower at position
  function addFlower(x, y) {
    flowers.push({
      x: x,
      y: y,
      petals: [],
      stem: { height: 0, maxHeight: 8 + Math.random() * 6 },
      growth: 0,
      life: 300 + Math.random() * 200,
      maxLife: 300 + Math.random() * 200,
      hue: 30 + Math.random() * 60, // Yellow to orange range
      petalCount: 5 + Math.floor(Math.random() * 3)
    });

    // Initialize petals
    const flower = flowers[flowers.length - 1];
    for (let i = 0; i < flower.petalCount; i++) {
      const angle = (i / flower.petalCount) * Math.PI * 2;
      flower.petals.push({
        angle: angle,
        length: 0,
        maxLength: 3 + Math.random() * 2,
        width: 1.5 + Math.random() * 1
      });
    }
  }

  // Check if point is on solid platform
  function isSolid(x, y) {
    let platformStipples = 0;
    const checkRadius = 12;

    for (const stipple of stipples) {
      if (!stipple.isPlatform) continue;

      const dx = stipple.x - x;
      const dy = stipple.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < checkRadius) {
        platformStipples++;
      }
    }

    return platformStipples > 3; // Need several platform stipples for solid ground
  }

  // Player physics and movement
  function updatePlayer() {
    const gravity = 0.25; // Gentler gravity for floating feel
    const friction = 0.92; // Smoother deceleration
    const jumpPower = -9; // More controlled jump height
    const moveSpeed = 0.4; // Slower, more deliberate movement

    // Handle input with graceful acceleration
    const maxSpeed = 3;
    const acceleration = 0.15;

    if (keys['ArrowLeft'] || keys['KeyA']) {
      player.vx = Math.max(player.vx - acceleration, -maxSpeed);
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
      player.vx = Math.min(player.vx + acceleration, maxSpeed);
    }

    // Elegant jump with slight charge-up feel
    if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && player.grounded) {
      player.vy = jumpPower;
      player.grounded = false;

      // Add jump burst trail (more particles)
      for (let i = 0; i < 15; i++) {
        trail.push({
          x: player.x + (Math.random() - 0.5) * 12,
          y: player.y + player.radius + Math.random() * 6,
          life: 80,
          maxLife: 80,
          size: 1.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 0.8 + 0.3,
          type: 'burst'
        });
      }
    }

    // Apply gravity with slight floating feel when airborne
    if (!player.grounded) {
      player.vy += gravity * 0.8; // Slightly reduced gravity when airborne
      // Add subtle air resistance
      player.vx *= 0.995;
    } else {
      player.vy += gravity;
    }

    // Apply friction
    player.vx *= friction;

    // Add elegant trail when airborne or moving (more particles)
    if (!player.grounded || Math.abs(player.vx) > 0.5 || Math.abs(player.vy) > 0.5) {
      // Add multiple trail particles for richer effect
      if (time % 2 === 0) {
        for (let i = 0; i < 3; i++) {
          trail.push({
            x: player.x + (Math.random() - 0.5) * 4,
            y: player.y + (Math.random() - 0.5) * 4,
            life: 120, // Longer life for graceful decay
            maxLife: 120,
            size: 1 + Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            type: 'movement'
          });
        }
      }
    }

    // Update trail with elegant movement
    for (let i = trail.length - 1; i >= 0; i--) {
      const dot = trail[i];
      dot.life--;

      // Gentle floating movement
      dot.x += dot.vx;
      dot.y += dot.vy;
      dot.vy += 0.01; // Very slight downward drift

      // Gentle fade and shrink
      dot.size *= 0.995;

      if (dot.life <= 0 || dot.size < 0.1) {
        trail.splice(i, 1);
      }
    }

    // Try to move horizontally
    const newX = player.x + player.vx;
    if (!isSolid(newX - player.radius, player.y) && !isSolid(newX + player.radius, player.y)) {
      player.x = newX;
    } else {
      player.vx = 0;
    }

    // Try to move vertically
    const newY = player.y + player.vy;

    // Check for ground collision (landing)
    if (player.vy > 0 && isSolid(player.x, newY + player.radius)) {
      // Add flower where player lands (bounce effect)
      if (Math.abs(player.vy) > 2) { // Only add flower for significant impacts
        addFlower(player.x + (Math.random() - 0.5) * 8, newY + player.radius);
      }

      player.vy = 0;
      player.grounded = true;
      // Snap to ground
      for (let checkY = player.y; checkY < HEIGHT; checkY += 2) {
        if (isSolid(player.x, checkY + player.radius)) {
          player.y = checkY;
          break;
        }
      }
    }
    // Check for ceiling collision
    else if (player.vy < 0 && isSolid(player.x, newY - player.radius)) {
      player.vy = 0;
    }
    // Move freely
    else {
      player.y = newY;
      if (!isSolid(player.x, player.y + player.radius + 2)) {
        player.grounded = false;
      }
    }

    // Boundary constraints
    if (player.x < player.radius) {
      player.x = player.radius;
      player.vx = 0;
    }
    if (player.x > WIDTH - player.radius) {
      player.x = WIDTH - player.radius;
      player.vx = 0;
    }
    if (player.y > HEIGHT + 50) {
      // Reset position if falling off
      player.x = 150;
      player.y = HEIGHT - 100;
      player.vx = 0;
      player.vy = 0;
      player.grounded = false;
    }

    // Update ambient particles
    for (const particle of ambientParticles) {
      particle.x += particle.vx + Math.sin(time * 0.01 + particle.phase) * 0.02;
      particle.y += particle.vy + Math.cos(time * 0.015 + particle.phase) * 0.015;

      // Wrap around screen
      if (particle.x < 0) particle.x = WIDTH;
      if (particle.x > WIDTH) particle.x = 0;
      if (particle.y < 0) particle.y = HEIGHT;
      if (particle.y > HEIGHT) particle.y = 0;

      // Gentle size pulsing
      particle.opacity = 0.2 + Math.sin(time * 0.02 + particle.phase) * 0.1;
    }

    // Update flowers
    for (let i = flowers.length - 1; i >= 0; i--) {
      const flower = flowers[i];
      flower.life--;

      if (flower.growth < 1) {
        flower.growth += 0.02; // Slow growth
        flower.stem.height = flower.stem.maxHeight * flower.growth;

        // Grow petals
        for (const petal of flower.petals) {
          petal.length = petal.maxLength * flower.growth;
        }
      }

      if (flower.life <= 0) {
        flowers.splice(i, 1);
      }
    }
  }

  // Rendering
  function render() {
    // Clear canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw stipples (white dots)
    ctx.fillStyle = '#ffffff';
    for (const stipple of stipples) {
      ctx.globalAlpha = stipple.isPlatform ? 0.9 : 0.3;
      ctx.beginPath();
      ctx.arc(stipple.x, stipple.y, stipple.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw ambient particles
    for (const particle of ambientParticles) {
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw elegant trail
    for (const dot of trail) {
      const alpha = (dot.life / dot.maxLife);
      const fadeAlpha = Math.pow(alpha, 1.5); // Elegant exponential fade

      // Soft gradient colors
      const hue = 200 + Math.sin(time * 0.02) * 20; // Gentle color shift
      ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${fadeAlpha * 0.8})`;

      // Add soft glow
      ctx.shadowColor = `hsla(${hue}, 70%, 70%, ${fadeAlpha * 0.4})`;
      ctx.shadowBlur = dot.size * 2;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    // Draw player
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle glow around player
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius - 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw flowers
    for (const flower of flowers) {
      const alpha = Math.min(1, flower.life / flower.maxLife);

      // Draw stem
      ctx.strokeStyle = `hsla(120, 60%, 40%, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(flower.x, flower.y);
      ctx.lineTo(flower.x, flower.y - flower.stem.height);
      ctx.stroke();

      // Draw petals
      for (const petal of flower.petals) {
        ctx.fillStyle = `hsla(${flower.hue}, 80%, 70%, ${alpha})`;
        ctx.beginPath();

        const petalX = flower.x + Math.cos(petal.angle) * petal.length;
        const petalY = flower.y - flower.stem.height + Math.sin(petal.angle) * petal.length;

        ctx.arc(petalX, petalY, petal.width, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw flower center
      ctx.fillStyle = `hsla(45, 90%, 50%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(flower.x, flower.y - flower.stem.height, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Instructions
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('STIPPLED PLATFORMS — Jump across dense dot formations', WIDTH/2, 30);

    ctx.font = '12px monospace';
    ctx.fillText('WASD/Arrows: Move • Jump on dense white stipples • Flowers bloom where you land', WIDTH/2, HEIGHT - 20);
  }

  // Input handling
  window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    e.preventDefault();
  });

  window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    e.preventDefault();
  });

  // Animation loop
  function animate() {
    time += 1; // Frame counter for trail timing

    updatePlayer();
    render();

    requestAnimationFrame(animate);
  }

  function handleResize() {
    setCanvasDimensions();
    generateStippledTerrain();
    generateAmbientParticles();
  }

  window.addEventListener('resize', handleResize);

  // Initial setup
  setCanvasDimensions();
  generateStippledTerrain();
  generateAmbientParticles();
  animate();
})();