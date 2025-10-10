(() => {
  const canvas = document.getElementById('formCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let DPR, WIDTH, HEIGHT;
  let particles = [];
  let state = 0; // 0=triangles, 1=disperse, 2=spheres, 3=cubes
  let transitionTimer = 0;
  const numDots = 2200;
  let frameCount = 0;

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

  function setup() {
    setCanvasDimensions();
    particles = [];

    for (let i = 0; i < numDots; i++) {
      let p = {
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT
      };
      particles.push({
        pos: { ...p },
        target: { ...p }
      });
    }
    setTriangleTargets();
  }

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let p of particles) {
      p.pos.x = lerp(p.pos.x, p.target.x, 0.08);
      p.pos.y = lerp(p.pos.y, p.target.y, 0.08);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Automatic transitions
    if (frameCount - transitionTimer > 100 && state === 0) {
      disperse();
      state = 1;
      transitionTimer = frameCount;
    } else if (state === 1 && frameCount - transitionTimer > 100) {
      setSphereTargets();
      state = 2;
      transitionTimer = frameCount;
    } else if (state === 2 && frameCount - transitionTimer > 200) {
      setCubeTargets();
      state = 3;
      transitionTimer = frameCount;
    } else if (state === 3 && frameCount - transitionTimer > 300) {
      setTriangleTargets();
      state = 0;
      transitionTimer = frameCount;
    }

    frameCount++;
    requestAnimationFrame(draw);
  }

  function disperse() {
    for (let p of particles) {
      let angle = Math.random() * Math.PI * 2;
      let radius = Math.random() * 350 + 50;
      p.target = {
        x: WIDTH/2 + Math.cos(angle) * radius,
        y: HEIGHT/2 + Math.sin(angle) * radius
      };
    }
  }

  function setTriangleTargets() {
    let tSize = 120;
    let spacing = 220;
    let centers = [
      { x: WIDTH/2 - spacing, y: HEIGHT/2 },
      { x: WIDTH/2, y: HEIGHT/2 },
      { x: WIDTH/2 + spacing, y: HEIGHT/2 }
    ];

    for (let i = 0; i < particles.length; i++) {
      let c = centers[i % 3];

      // Equilateral triangle vertices
      let p1 = { x: c.x, y: c.y - tSize / 2 };
      let p2 = { x: c.x - tSize / 2, y: c.y + tSize / 2 };
      let p3 = { x: c.x + tSize / 2, y: c.y + tSize / 2 };

      // Random point inside triangle using barycentric coordinates
      let r1 = Math.random();
      let r2 = Math.random();
      if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
      let x = p1.x + r1 * (p2.x - p1.x) + r2 * (p3.x - p1.x);
      let y = p1.y + r1 * (p2.y - p1.y) + r2 * (p3.y - p1.y);

      particles[i].target = { x, y };
    }
  }

  function setSphereTargets() {
    for (let p of particles) {
      let angle = Math.random() * Math.PI * 2;
      let r = Math.random() * 50 + 100;
      let cx = WIDTH / 2;
      let cy = HEIGHT / 2;
      p.target = {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      };
    }
  }

  function setCubeTargets() {
    let gridSize = 40;
    let cols = 10;
    let rows = 5;
    let startX = WIDTH/2 - (cols * gridSize)/2;
    let startY = HEIGHT/2 - (rows * gridSize)/2;

    for (let i = 0; i < particles.length; i++) {
      let c = i % cols;
      let r = Math.floor(i / cols) % rows;
      let x = startX + c * gridSize + (Math.random() - 0.5) * 10;
      let y = startY + r * gridSize + (Math.random() - 0.5) * 10;
      particles[i].target = { x, y };
    }
  }

  function handleResize() {
    setCanvasDimensions();
    setup();
  }

  window.addEventListener('resize', handleResize);

  // Initial setup
  setup();
  draw();

  // Add title
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FORM PARTICLE MORPH — Automatic shape transitions', WIDTH/2, 30);
})();