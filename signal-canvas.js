(() => {
  const canvas = document.getElementById('signalCanvas');
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

  // State
  const pointer = { x: 0, y: 0 };
  const cubes = [];
  let floating = false;
  let time = 0;
  let viewRotationX = 0;
  let viewRotationY = 0;

  // Initialize cubes in concave hemisphere arrangement
  function initializeCubes() {
    cubes.length = 0;
    const centerX = 0;
    const centerY = 0;
    const centerZ = -300;
    const radius = 200;

    // Create cubes in layers forming a concave hemisphere (bowl shape)
    for(let layer = 0; layer < 12; layer++) {
      const phi = (layer / 11) * Math.PI * 0.5; // 0 to π/2 for hemisphere
      const layerRadius = radius * Math.sin(phi);
      const layerZ = radius * Math.cos(phi) + centerZ; // This creates the concave effect

      const cubesInLayer = Math.max(6, Math.floor(layerRadius / 12));

      for(let i = 0; i < cubesInLayer; i++) {
        const theta = (i / cubesInLayer) * Math.PI * 2;
        const x = Math.cos(theta) * layerRadius;
        const y = Math.sin(theta) * layerRadius;

        cubes.push({
          x: x,
          y: y,
          z: layerZ,
          originalX: x,
          originalY: y,
          originalZ: layerZ,
          size: 6 + Math.random() * 4,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          velocity: {
            x: 0,
            y: 0,
            z: 0,
            rotX: 0,
            rotY: 0,
            rotZ: 0
          }
        });
      }
    }

    // Add some cubes at the center of the hemisphere
    for(let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const smallRadius = 30;
      cubes.push({
        x: Math.cos(angle) * smallRadius,
        y: Math.sin(angle) * smallRadius,
        z: centerZ + radius,
        originalX: Math.cos(angle) * smallRadius,
        originalY: Math.sin(angle) * smallRadius,
        originalZ: centerZ + radius,
        size: 4 + Math.random() * 3,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        velocity: {
          x: 0,
          y: 0,
          z: 0,
          rotX: 0,
          rotY: 0,
          rotZ: 0
        }
      });
    }
  }

  // Event handlers
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;

    // Calculate view rotation based on mouse position (only when not floating)
    if (!floating) {
      // Normalize mouse position to -1 to 1
      const normalizedX = (pointer.x / WIDTH) * 2 - 1;
      const normalizedY = (pointer.y / HEIGHT) * 2 - 1;

      // Convert to rotation angles
      viewRotationY = normalizedX * 0.3; // Left/Right rotation (around Y axis)
      viewRotationX = -normalizedY * 0.2; // Up/Down rotation (around X axis)
    }
  });

  canvas.addEventListener('click', e => {
    floating = !floating;

    if (floating) {
      // Give each cube random floating velocity
      cubes.forEach(cube => {
        cube.velocity.x = (Math.random() - 0.5) * 0.8;
        cube.velocity.y = (Math.random() - 0.5) * 0.8;
        cube.velocity.z = (Math.random() - 0.5) * 0.8;
        cube.velocity.rotX = (Math.random() - 0.5) * 0.02;
        cube.velocity.rotY = (Math.random() - 0.5) * 0.02;
        cube.velocity.rotZ = (Math.random() - 0.5) * 0.02;
      });
      // Reset view rotation when floating
      viewRotationX = 0;
      viewRotationY = 0;
    } else {
      // Reset cubes to original positions
      cubes.forEach(cube => {
        cube.velocity.x = 0;
        cube.velocity.y = 0;
        cube.velocity.z = 0;
        cube.velocity.rotX = 0;
        cube.velocity.rotY = 0;
        cube.velocity.rotZ = 0;
      });
    }
  });

  // 3D projection and cube drawing
  function project3D(x, y, z) {
    const perspective = 600;
    const centerX = WIDTH * 0.5;
    const centerY = HEIGHT * 0.5;

    const scale = perspective / (perspective + z);
    return {
      x: centerX + x * scale,
      y: centerY + y * scale,
      scale: scale
    };
  }

  function rotatePoint(x, y, z, rotX, rotY, rotZ) {
    // Rotate around X axis
    let newY = y * Math.cos(rotX) - z * Math.sin(rotX);
    let newZ = y * Math.sin(rotX) + z * Math.cos(rotX);
    y = newY;
    z = newZ;

    // Rotate around Y axis
    let newX = x * Math.cos(rotY) + z * Math.sin(rotY);
    newZ = -x * Math.sin(rotY) + z * Math.cos(rotY);
    x = newX;
    z = newZ;

    // Rotate around Z axis
    newX = x * Math.cos(rotZ) - y * Math.sin(rotZ);
    newY = x * Math.sin(rotZ) + y * Math.cos(rotZ);
    x = newX;
    y = newY;

    return { x, y, z };
  }

  function drawWireframeCube(cube) {
    const s = cube.size;
    const vertices = [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
    ];

    // Apply rotation and position
    const projectedVertices = vertices.map(vertex => {
      // First apply cube's own rotation
      let rotated = rotatePoint(
        vertex[0], vertex[1], vertex[2],
        cube.rotationX, cube.rotationY, cube.rotationZ
      );

      // Add cube position
      let positioned = {
        x: cube.x + rotated.x,
        y: cube.y + rotated.y,
        z: cube.z + rotated.z
      };

      // Apply view rotation (when not floating)
      if (!floating) {
        positioned = rotatePoint(
          positioned.x, positioned.y, positioned.z,
          viewRotationX, viewRotationY, 0
        );
      }

      return project3D(positioned.x, positioned.y, positioned.z);
    });

    // Draw edges
    const edges = [
      [0,1],[1,2],[2,3],[3,0], // front face
      [4,5],[5,6],[6,7],[7,4], // back face
      [0,4],[1,5],[2,6],[3,7]  // connecting edges
    ];

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();

    edges.forEach(edge => {
      const start = projectedVertices[edge[0]];
      const end = projectedVertices[edge[1]];
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
    });

    ctx.stroke();
  }

  // Animation and render loop
  function animate() {
    time += 0.016; // 60fps

    // Update cube physics
    cubes.forEach(cube => {
      if (floating) {
        // Apply floating movement
        cube.x += cube.velocity.x;
        cube.y += cube.velocity.y;
        cube.z += cube.velocity.z;

        // Apply rotation
        cube.rotationX += cube.velocity.rotX;
        cube.rotationY += cube.velocity.rotY;
        cube.rotationZ += cube.velocity.rotZ;

        // Add slight damping for elegance
        cube.velocity.x *= 0.998;
        cube.velocity.y *= 0.998;
        cube.velocity.z *= 0.998;

        // Keep cubes within bounds with gentle bounce (wider bounds for wider canvas)
        if (Math.abs(cube.x) > WIDTH / 2.5) cube.velocity.x *= -0.8;
        if (Math.abs(cube.y) > HEIGHT / 2.5) cube.velocity.y *= -0.8;
        if (Math.abs(cube.z + 300) > 400) cube.velocity.z *= -0.8;
      } else {
        // Slowly return to original positions
        const returnSpeed = 0.02;
        cube.x += (cube.originalX - cube.x) * returnSpeed;
        cube.y += (cube.originalY - cube.y) * returnSpeed;
        cube.z += (cube.originalZ - cube.z) * returnSpeed;

        // Slow rotation when returning
        cube.rotationX *= 0.95;
        cube.rotationY *= 0.95;
        cube.rotationZ *= 0.95;
      }

      // Add subtle idle rotation when not floating
      if (!floating) {
        cube.rotationY += 0.005;
        cube.rotationX += 0.003;
      }
    });

    // Render
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Sort cubes by depth for proper rendering
    const sortedCubes = [...cubes].sort((a, b) => b.z - a.z);

    // Draw all cubes
    sortedCubes.forEach(cube => {
      drawWireframeCube(cube);
    });

    // Add title
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SPATIAL CUBE ARRAY — Click to toggle floating', WIDTH/2, 30);

    // Add interaction hint
    ctx.font = '12px monospace';
    if (floating) {
      ctx.fillText('Click: Return to structure • Cubes floating freely', WIDTH/2, HEIGHT - 20);
    } else {
      ctx.fillText('Click: Toggle floating • Mouse: Rotate view (Left/Right/Up/Down)', WIDTH/2, HEIGHT - 20);
    }

    requestAnimationFrame(animate);
  }

  function handleResize() {
    setCanvasDimensions();
    initializeCubes();
  }

  window.addEventListener('resize', handleResize);

  // Initial setup
  setCanvasDimensions();
  initializeCubes();
  animate();
})();
