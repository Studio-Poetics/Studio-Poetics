/**
 * POETICS OF SENSORS - P5.JS 3D CUBE TEST TEMPLATE
 * 
 * This sketch demonstrates how to use sensor data from your phone to control
 * 3D graphics in P5.js. The cube rotates based on device orientation,
 * touch creates sparkle particles, and GPS shows location.
 * 
 * HOW TO CUSTOMIZE:
 * 
 * 1. CUBE ROTATION:
 *    - Change ROTATION_SCALE to make rotation more/less sensitive
 *    - Modify which sensors control which axes in updateCubeRotation()
 *    - Add acceleration-based rotation for more dynamic movement
 * 
 * 2. CUBE APPEARANCE:
 *    - Change CUBE_SIZE for different cube dimensions
 *    - Modify colors in drawCube() function
 *    - Add textures or materials using P5.js materials
 * 
 * 3. SPARKLE EFFECTS:
 *    - Adjust sparkle colors, sizes, and behavior in drawSparkles()
 *    - Change sparkle lifetime in sensor-receiver.js
 *    - Add different particle types based on pressure
 * 
 * 4. BACKGROUND & LIGHTING:
 *    - Modify background colors and lighting in draw() function
 *    - Add ambient, directional, or spotlight effects
 *    - Create animated backgrounds based on sensor data
 * 
 * 5. ADD NEW EFFECTS:
 *    - Use accelerometer for camera shake
 *    - Use gyroscope for environment rotation
 *    - Use GPS for location-based effects
 */

// ============================================================================
// VISUAL CONFIGURATION - CHANGE THESE TO CUSTOMIZE APPEARANCE
// ============================================================================

const CUBE_SIZE = 100;               // Size of the rotating cube
const ROTATION_SCALE = 0.02;         // Sensitivity of rotation (higher = more sensitive)
const BACKGROUND_ALPHA = 30;         // Background fade speed (lower = longer trails)
const SPARKLE_GLOW = true;           // Enable/disable sparkle glow effect

// Camera and 3D settings
let cameraDistance = 400;            // Distance of camera from cube
let targetRotationX = 0;             // Target rotation for smooth movement
let targetRotationY = 0;
let targetRotationZ = 0;
let currentRotationX = 0;            // Current rotation for smooth interpolation
let currentRotationY = 0;
let currentRotationZ = 0;

// Visual effects
let time = 0;                        // Global time counter for animations
let backgroundHue = 220;             // Background color hue

// ============================================================================
// P5.JS SETUP - INITIALIZE CANVAS AND 3D SETTINGS
// ============================================================================

function setup() {
    // Create full-screen canvas with 3D rendering
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    // Set color mode to HSB for easier color manipulation
    colorMode(HSB, 360, 100, 100, 100);
    
    console.log('🎨 P5.js 3D sketch initialized');
    console.log('📱 Waiting for sensor data from phone...');
    
    // Set initial 3D settings
    perspective(PI/3.0, width/height, 0.1, 1000);
}

// ============================================================================
// P5.JS MAIN DRAW LOOP - RUNS 60 FPS
// ============================================================================

function draw() {
    // Update time for animations
    time += 0.016; // Approximate time step for 60 FPS
    
    // ========================================================================
    // BACKGROUND & LIGHTING SETUP
    // ========================================================================
    
    // Create fading background for motion trails
    background(backgroundHue, 20, 8, BACKGROUND_ALPHA);
    
    // Set up lighting
    ambientLight(0, 0, 30);           // Soft ambient light
    directionalLight(0, 0, 80, -1, 0.5, -1); // Main directional light
    pointLight(180, 80, 60, 0, -200, 200);   // Colored accent light
    
    // ========================================================================
    // CAMERA POSITIONING
    // ========================================================================
    
    // Position camera based on sensor data (optional)
    if (window.sensorData && window.sensorData.connected) {
        // Subtle camera movement based on accelerometer
        const accel = window.sensorData.accelerometer;
        const cameraOffset = {
            x: accel.x * 10,
            y: accel.y * 10,
            z: 0
        };
        camera(cameraOffset.x, cameraOffset.y, cameraDistance, 0, 0, 0, 0, 1, 0);
    } else {
        // Default camera position when not connected
        camera(0, 0, cameraDistance, 0, 0, 0, 0, 1, 0);
    }
    
    // ========================================================================
    // UPDATE CUBE ROTATION FROM SENSOR DATA
    // ========================================================================
    
    updateCubeRotation();
    
    // ========================================================================
    // DRAW 3D CUBE
    // ========================================================================
    
    push();
    
    // Apply rotations smoothly
    rotateX(currentRotationX);
    rotateY(currentRotationY);
    rotateZ(currentRotationZ);
    
    // Draw the main cube
    drawCube();
    
    pop();
    
    // ========================================================================
    // DRAW SPARKLE PARTICLES (2D OVERLAY)
    // ========================================================================
    
    // Switch to 2D mode for sparkles
    camera();
    ortho();
    resetMatrix();
    
    drawSparkles();
    
    // ========================================================================
    // CONNECTION STATUS INDICATOR
    // ========================================================================
    
    drawConnectionIndicator();
}

// ============================================================================
// CUBE ROTATION LOGIC - CUSTOMIZE THIS FOR DIFFERENT EFFECTS
// ============================================================================

function updateCubeRotation() {
    if (!window.sensorData || !window.sensorData.connected) {
        // Auto-rotate when not connected for demo purposes
        targetRotationX = sin(time * 0.3) * 0.5;
        targetRotationY = time * 0.2;
        targetRotationZ = cos(time * 0.4) * 0.3;
        return;
    }
    
    const orientation = window.sensorData.orientation;
    const gyro = window.sensorData.gyroscope;
    
    // ========================================================================
    // METHOD 1: DIRECT ORIENTATION MAPPING (RECOMMENDED)
    // ========================================================================
    
    // Map device orientation to cube rotation
    // NOTE: You may need to adjust these mappings based on your phone's orientation
    
    targetRotationX = orientation.beta * ROTATION_SCALE;   // Forward/backward tilt
    targetRotationY = orientation.gamma * ROTATION_SCALE;  // Left/right tilt  
    targetRotationZ = orientation.alpha * ROTATION_SCALE;  // Compass rotation
    
    // ========================================================================
    // METHOD 2: GYROSCOPE-BASED ROTATION (ALTERNATIVE)
    // Uncomment this section to use gyroscope instead of orientation
    // ========================================================================
    
    /*
    // Integrate gyroscope data for rotation (more dynamic but can drift)
    targetRotationX += gyro.x * ROTATION_SCALE * 0.1;
    targetRotationY += gyro.y * ROTATION_SCALE * 0.1;
    targetRotationZ += gyro.z * ROTATION_SCALE * 0.1;
    */
    
    // ========================================================================
    // METHOD 3: COMBINED APPROACH (ADVANCED)
    // Uncomment for combination of orientation and gyroscope
    // ========================================================================
    
    /*
    // Base rotation from orientation
    let baseRotX = orientation.beta * ROTATION_SCALE;
    let baseRotY = orientation.gamma * ROTATION_SCALE;
    let baseRotZ = orientation.alpha * ROTATION_SCALE;
    
    // Add gyroscope for dynamic movement
    let gyroInfluence = 0.1;
    targetRotationX = baseRotX + gyro.x * gyroInfluence;
    targetRotationY = baseRotY + gyro.y * gyroInfluence;
    targetRotationZ = baseRotZ + gyro.z * gyroInfluence;
    */
    
    // ========================================================================
    // SMOOTH INTERPOLATION - MAKES MOVEMENT LESS JITTERY
    // ========================================================================
    
    let smoothing = 0.1; // Higher values = faster response, lower = smoother
    
    currentRotationX = lerp(currentRotationX, targetRotationX, smoothing);
    currentRotationY = lerp(currentRotationY, targetRotationY, smoothing);
    currentRotationZ = lerp(currentRotationZ, targetRotationZ, smoothing);
}

// ============================================================================
// CUBE DRAWING - CUSTOMIZE APPEARANCE HERE
// ============================================================================

function drawCube() {
    // ========================================================================
    // CUBE COLORS - CHANGE THESE FOR DIFFERENT APPEARANCES
    // ========================================================================
    
    // Base color changes based on rotation speed
    let rotationSpeed = 0;
    if (window.sensorData && window.sensorData.connected) {
        const gyro = window.sensorData.gyroscope;
        rotationSpeed = gyro.magnitude;
    }
    
    // Color shifts based on movement
    let hue = (200 + rotationSpeed * 50) % 360;
    let saturation = 60 + rotationSpeed * 30;
    let brightness = 70 + sin(time * 2) * 20;
    
    // ========================================================================
    // DRAW CUBE FACES WITH DIFFERENT COLORS
    // ========================================================================
    
    // Enable stroke for wireframe effect (comment out for solid cube)
    stroke(hue, saturation + 20, brightness + 20);
    strokeWeight(1);
    
    // Set fill color
    fill(hue, saturation, brightness, 80);
    
    // Draw the cube
    box(CUBE_SIZE);
    
    // ========================================================================
    // OPTIONAL: DRAW WIREFRAME OVERLAY
    // Uncomment this section for additional wireframe effect
    // ========================================================================
    
    /*
    noFill();
    stroke(hue + 180, 100, 100);
    strokeWeight(2);
    box(CUBE_SIZE + 2);
    */
    
    // ========================================================================
    // OPTIONAL: ADD MULTIPLE CUBES
    // Uncomment this section to draw additional cubes
    // ========================================================================
    
    /*
    push();
    translate(CUBE_SIZE * 1.5, 0, 0);
    fill(hue + 120, saturation, brightness, 60);
    box(CUBE_SIZE * 0.5);
    pop();
    
    push();
    translate(-CUBE_SIZE * 1.5, 0, 0);
    fill(hue + 240, saturation, brightness, 60);
    box(CUBE_SIZE * 0.5);
    pop();
    */
}

// ============================================================================
// SPARKLE PARTICLE SYSTEM - CUSTOMIZE TOUCH EFFECTS HERE
// ============================================================================

function drawSparkles() {
    if (!window.sparkles || window.sparkles.length === 0) return;
    
    // ========================================================================
    // SPARKLE RENDERING SETTINGS
    // ========================================================================
    
    noStroke();
    
    for (let sparkle of window.sparkles) {
        let life = sparkle.life / sparkle.maxLife; // 0 to 1
        let alpha = life * 100; // Fade out over time
        
        // ====================================================================
        // SPARKLE APPEARANCE - CUSTOMIZE COLORS AND EFFECTS
        // ====================================================================
        
        // Color shifts over lifetime
        let hue = (sparkle.hue + (1 - life) * 60) % 360;
        let saturation = 80 + life * 20;
        let brightness = 90;
        
        // Size changes over lifetime
        let size = sparkle.size * (0.5 + life * 0.5);
        
        // ====================================================================
        // GLOW EFFECT (OPTIONAL)
        // ====================================================================
        
        if (SPARKLE_GLOW) {
            // Draw glow layers
            for (let i = 3; i >= 1; i--) {
                fill(hue, saturation * 0.7, brightness, alpha * 0.3 / i);
                ellipse(sparkle.x, sparkle.y, size * i * 2);
            }
        }
        
        // ====================================================================
        // MAIN SPARKLE
        // ====================================================================
        
        fill(hue, saturation, brightness, alpha);
        ellipse(sparkle.x, sparkle.y, size);
        
        // ====================================================================
        // OPTIONAL: SPARKLE TRAILS
        // Uncomment this section to add trailing effects
        // ====================================================================
        
        /*
        stroke(hue, saturation, brightness, alpha * 0.5);
        strokeWeight(1);
        line(sparkle.x, sparkle.y, 
             sparkle.x - sparkle.vx * 5, sparkle.y - sparkle.vy * 5);
        noStroke();
        */
    }
}

// ============================================================================
// CONNECTION STATUS INDICATOR
// ============================================================================

function drawConnectionIndicator() {
    // Small indicator in bottom right corner
    let indicatorSize = 20;
    let x = width - 30;
    let y = height - 30;
    
    if (window.sensorData && window.sensorData.connected) {
        // Connected - green pulsing circle
        let pulse = sin(time * 4) * 0.3 + 0.7;
        fill(120, 80, 90, 80); // Green
        ellipse(x, y, indicatorSize * pulse);
    } else {
        // Disconnected - red circle
        fill(0, 80, 90, 80); // Red
        ellipse(x, y, indicatorSize);
    }
}

// ============================================================================
// RESPONSIVE DESIGN - HANDLE WINDOW RESIZE
// ============================================================================

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Update perspective for new aspect ratio
    perspective(PI/3.0, width/height, 0.1, 1000);
}

// ============================================================================
// KEYBOARD CONTROLS FOR TESTING - OPTIONAL
// ============================================================================

function keyPressed() {
    switch (key.toLowerCase()) {
        case 'r':
            // Reset rotation
            currentRotationX = currentRotationY = currentRotationZ = 0;
            targetRotationX = targetRotationY = targetRotationZ = 0;
            console.log('🔄 Rotation reset');
            break;
            
        case 'd':
            // Debug sensor data
            if (window.debugSensors) {
                window.debugSensors();
            }
            break;
            
        case 'c':
            // Change background color
            backgroundHue = (backgroundHue + 60) % 360;
            console.log('🎨 Background hue:', backgroundHue);
            break;
            
        case ' ':
            // Create test sparkles
            for (let i = 0; i < 10; i++) {
                if (window.sparkles) {
                    window.sparkles.push({
                        x: mouseX + (Math.random() - 0.5) * 100,
                        y: mouseY + (Math.random() - 0.5) * 100,
                        vx: (Math.random() - 0.5) * 6,
                        vy: (Math.random() - 0.5) * 6,
                        life: 5000,
                        maxLife: 5000,
                        size: Math.random() * 10 + 5,
                        hue: Math.random() * 360,
                        createdAt: Date.now()
                    });
                }
            }
            break;
    }
}

// ============================================================================
// MOUSE INTERACTION FOR TESTING - OPTIONAL
// ============================================================================

function mousePressed() {
    // Create sparkles at mouse position for testing
    if (window.sparkles) {
        for (let i = 0; i < 5; i++) {
            window.sparkles.push({
                x: mouseX + (Math.random() - 0.5) * 50,
                y: mouseY + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 5000,
                maxLife: 5000,
                size: Math.random() * 8 + 4,
                hue: Math.random() * 360,
                createdAt: Date.now()
            });
        }
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// ============================================================================
// CONSOLE WELCOME MESSAGE
// ============================================================================

console.log('🎭 Poetics of Sensors - 3D Cube Demo');
console.log('📱 Connect your phone app to see the cube rotate!');
console.log('🎮 Controls: R=reset, D=debug, C=color, Space=sparkles');
console.log('🖱️  Click to test sparkles');