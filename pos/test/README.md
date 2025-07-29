# Poetics of Sensors - P5.js Test Template

**3D Cube Demo with Real-time Sensor Data**

This template demonstrates how to receive sensor data from the Poetics of Sensors mobile app and use it to control 3D graphics in P5.js.

## 🎯 **What It Does**

### 📱 **Phone Sensor Input:**
- **Device Orientation** → Rotates 3D cube in real-time
- **Touch Screen** → Creates sparkle particles at touch points
- **GPS Location** → Displays latitude/longitude in corner
- **Accelerometer** → Subtle camera movement
- **Connection Status** → Visual indicator

### 🎨 **Visual Effects:**
- **3D Rotating Cube** - Follows phone orientation
- **Sparkle Particles** - Touch creates 5-second glowing circles
- **Dynamic Colors** - Change based on movement speed
- **Smooth Animation** - Interpolated rotation for fluid motion
- **Real-time Data Display** - Live sensor values

## 🚀 **Quick Setup**

### **1. Start the WebSocket Server**
```bash
# From the main Poetics-of-sensors directory
cd "/Users/pranshu/Downloads/2025/Poetics-of-sensors"
node server-example.js
# Server runs on port 8080
```

### **2. Open the P5.js Demo**
```bash
# Open the test template in browser
open test/index.html
# Or serve it locally:
cd test
python3 -m http.server 3000
# Then visit: http://localhost:3000
```

### **3. Connect Your Phone**
1. Open Poetics of Sensors app on your phone
2. Enter your computer's IP address and port 8080
3. Tap **Connect**
4. Move your phone and touch the screen!

## 🎛️ **Customization Guide**

### **📐 Cube Rotation (sketch.js lines 85-140)**

**Change rotation sensitivity:**
```javascript
const ROTATION_SCALE = 0.02;  // Higher = more sensitive
```

**Use different sensors for rotation:**
```javascript
// Current: Orientation-based
targetRotationX = orientation.beta * ROTATION_SCALE;

// Alternative: Gyroscope-based  
targetRotationX += gyro.x * ROTATION_SCALE * 0.1;

// Combined approach
targetRotationX = orientation.beta * ROTATION_SCALE + gyro.x * 0.1;
```

**Control which axis does what:**
```javascript
// Swap axes for different rotation behavior
targetRotationX = orientation.gamma * ROTATION_SCALE;  // Left/right tilt → X rotation
targetRotationY = orientation.beta * ROTATION_SCALE;   // Forward/back tilt → Y rotation
targetRotationZ = orientation.alpha * ROTATION_SCALE;  // Compass → Z rotation
```

### **🎨 Cube Appearance (sketch.js lines 170-220)**

**Change cube size:**
```javascript
const CUBE_SIZE = 100;  // Make bigger or smaller
```

**Modify colors:**
```javascript
// Static color
fill(200, 80, 90);  // Hue, Saturation, Brightness

// Dynamic color based on movement
let hue = (200 + rotationSpeed * 50) % 360;
fill(hue, 80, 90);
```

**Add wireframe effect:**
```javascript
stroke(255);
strokeWeight(2);
noFill();
box(CUBE_SIZE);
```

**Multiple cubes:**
```javascript
// Add this in drawCube() function
push();
translate(CUBE_SIZE * 1.5, 0, 0);
fill(120, 80, 90);
box(CUBE_SIZE * 0.5);
pop();
```

### **✨ Sparkle Effects (sketch.js lines 240-300)**

**Change sparkle behavior:**
```javascript
// In sensor-receiver.js, createSparkles() function
const sparkleCount = Math.floor(pressure * 8) + 2;  // More/fewer sparkles
const offsetX = (Math.random() - 0.5) * 60;         // Spread area
sparkle.life = 5000;  // Lifetime in milliseconds
```

**Modify sparkle appearance:**
```javascript
// In sketch.js, drawSparkles() function
let hue = sparkle.hue + (1 - life) * 60;  // Color shift over time
let size = sparkle.size * (0.5 + life * 0.5);  // Size change
```

**Enable glow effect:**
```javascript
const SPARKLE_GLOW = true;  // Turn on/off glow
```

### **🌍 GPS Display (sensor-receiver.js lines 200-230)**

**Change GPS display format:**
```javascript
if (gpsCoords) gpsCoords.textContent = `${gps.lat.toFixed(3)}° N`;
if (gpsLng) gpsLng.textContent = `${gps.lng.toFixed(3)}° W`;
```

**Use GPS for visual effects:**
```javascript
// In sketch.js, add to draw() function
if (window.sensorData.gps.hasSignal) {
    let distance = dist(gps.lat, gps.lng, referenceLatitude, referenceLongitude);
    // Use distance to change colors, sizes, etc.
}
```

### **🎥 Camera Effects (sketch.js lines 60-75)**

**Add camera shake based on accelerometer:**
```javascript
const accel = window.sensorData.accelerometer;
const shakeIntensity = accel.magnitude * 5;
const cameraOffset = {
    x: (Math.random() - 0.5) * shakeIntensity,
    y: (Math.random() - 0.5) * shakeIntensity,
    z: 0
};
```

**Orbit camera around cube:**
```javascript
let angle = time * 0.5;
let radius = 400;
camera(
    cos(angle) * radius, 
    sin(time * 0.3) * 100, 
    sin(angle) * radius,
    0, 0, 0, 
    0, 1, 0
);
```

## 🎮 **Controls & Testing**

### **Keyboard Shortcuts:**
- **R** - Reset cube rotation
- **D** - Debug sensor data to console
- **C** - Change background color
- **Space** - Create test sparkles
- **Mouse Click** - Create sparkles at cursor

### **Browser Console Commands:**
```javascript
// Debug current sensor data
debugSensors()

// Check connection status
isConnectedToSensors()

// Get raw sensor data
getSensorData()
```

## 🔧 **Configuration**

### **WebSocket Connection (sensor-receiver.js line 13)**
```javascript
const WEBSOCKET_URL = 'ws://localhost:8080';
// Change to your server IP:
const WEBSOCKET_URL = 'ws://192.168.1.100:8080';
```

### **Visual Settings (sketch.js lines 20-30)**
```javascript
const CUBE_SIZE = 100;           // Cube dimensions
const ROTATION_SCALE = 0.02;     // Rotation sensitivity
const BACKGROUND_ALPHA = 30;     // Trail fade speed
const SPARKLE_GLOW = true;       // Sparkle effects
```

## 🚨 **Troubleshooting**

### **"Disconnected from sensor app"**
- Make sure WebSocket server is running (`node server-example.js`)
- Check IP address matches in phone app
- Ensure phone and computer are on same WiFi network

### **"Cube not rotating"**
- Check browser console for sensor data
- Try different orientation mappings
- Increase `ROTATION_SCALE` value

### **"No sparkles appearing"**
- Make sure touch sensor is enabled in phone app
- Check `window.sparkles` array in browser console
- Try clicking mouse for test sparkles

### **"GPS not showing"**
- Enable GPS/Location in phone app settings
- Give location permission to browser on phone
- GPS works best outdoors with clear sky view

## 🎨 **Creative Ideas**

### **Visual Variations:**
- **Multiple cubes** in formation
- **Particle systems** responding to accelerometer
- **3D terrain** generated from GPS data
- **Music visualization** synced to sensor movement
- **Kaleidoscope effects** based on orientation

### **Interactive Concepts:**
- **Drawing in 3D space** with device movement
- **Gesture recognition** from sensor patterns
- **Virtual reality** controller simulation
- **Dance performance** visualization
- **Environmental data** art installations

---

**Ready to create sensor-driven art!** 🎭✨

*Customize any part of this template to build your own unique sensor-controlled experiences.*