/**
 * SENSOR RECEIVER - WebSocket Client for P5.js
 * 
 * Connects to Poetics of Sensors WebSocket server and receives real-time sensor data
 * Provides clean interface for P5.js sketch to access sensor values
 * 
 * CONFIGURATION:
 * - Change WEBSOCKET_URL to match your server
 * - Modify sensor data processing in handleSensorData()
 * - Adjust reconnection settings if needed
 */

// ============================================================================
// CONFIGURATION - CHANGE THESE SETTINGS
// ============================================================================

const WEBSOCKET_URL = 'ws://localhost:8080'; // Change to your server IP if different
const RECONNECT_INTERVAL = 3000; // Milliseconds to wait before reconnecting
const UI_UPDATE_RATE = 60; // FPS for UI updates (don't change unless needed)

// ============================================================================
// SENSOR DATA STORAGE - ACCESS THESE FROM YOUR P5.JS SKETCH
// ============================================================================

// Current sensor values - use these in your P5.js sketch
window.sensorData = {
    // Accelerometer (m/s²) - device acceleration including gravity
    accelerometer: { x: 0, y: 0, z: 0, magnitude: 0 },
    
    // Gyroscope (rad/s) - rotation rate around each axis
    gyroscope: { x: 0, y: 0, z: 0, magnitude: 0 },
    
    // Orientation (degrees) - device rotation in 3D space
    orientation: { alpha: 0, beta: 0, gamma: 0 },
    
    // Touch (normalized 0-1) - screen touch position and pressure
    touch: { x: 0, y: 0, pressure: 0, touches: 0, isActive: false },
    
    // GPS (decimal degrees) - geographic location
    gps: { lat: 0, lng: 0, accuracy: 0, hasSignal: false },
    
    // Connection status
    connected: false,
    lastUpdate: 0
};

// Sparkle particles for touch visualization
window.sparkles = [];

// ============================================================================
// WEBSOCKET CONNECTION MANAGEMENT
// ============================================================================

let socket = null;
let reconnectTimer = null;
let isConnecting = false;

function connectToSensorApp() {
    if (isConnecting || (socket && socket.readyState === WebSocket.OPEN)) {
        return;
    }
    
    isConnecting = true;
    console.log('🔌 Connecting to Poetics of Sensors app...');
    updateConnectionStatus('Connecting...', false);
    
    try {
        socket = new WebSocket(WEBSOCKET_URL);
        
        socket.onopen = () => {
            console.log('✅ Connected to Poetics of Sensors app');
            updateConnectionStatus('Connected to sensor app', true);
            window.sensorData.connected = true;
            isConnecting = false;
            
            // Clear any reconnect timer
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
        };
        
        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                handleIncomingMessage(message);
            } catch (error) {
                console.error('❌ Error parsing sensor message:', error);
            }
        };
        
        socket.onclose = (event) => {
            console.log('🔌 Disconnected from sensor app');
            updateConnectionStatus('Disconnected from sensor app', false);
            window.sensorData.connected = false;
            isConnecting = false;
            
            // Auto-reconnect unless manually closed
            if (event.code !== 1000) {
                scheduleReconnect();
            }
        };
        
        socket.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
            updateConnectionStatus('Connection error', false);
            isConnecting = false;
        };
        
    } catch (error) {
        console.error('❌ Failed to create WebSocket:', error);
        updateConnectionStatus('Connection failed', false);
        isConnecting = false;
        scheduleReconnect();
    }
}

function scheduleReconnect() {
    if (reconnectTimer) return;
    
    console.log(`🔄 Reconnecting in ${RECONNECT_INTERVAL / 1000} seconds...`);
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectToSensorApp();
    }, RECONNECT_INTERVAL);
}

// ============================================================================
// MESSAGE HANDLING
// ============================================================================

function handleIncomingMessage(message) {
    switch (message.type) {
        case 'welcome':
            console.log('👋 Welcome message:', message.message);
            break;
            
        case 'osc':
            if (message.address === '/sensors') {
                handleSensorData(message.data, message.timestamp);
            }
            break;
            
        default:
            console.log('📨 Unknown message type:', message.type);
    }
}

function handleSensorData(sensors, timestamp) {
    window.sensorData.lastUpdate = timestamp;
    
    // ========================================================================
    // ACCELEROMETER DATA PROCESSING
    // ========================================================================
    if (sensors.accelerometer) {
        const accel = sensors.accelerometer;
        window.sensorData.accelerometer = {
            x: accel.x,
            y: accel.y,
            z: accel.z,
            magnitude: Math.sqrt(accel.x * accel.x + accel.y * accel.y + accel.z * accel.z)
        };
    }
    
    // ========================================================================
    // GYROSCOPE DATA PROCESSING
    // ========================================================================
    if (sensors.gyroscope) {
        const gyro = sensors.gyroscope;
        window.sensorData.gyroscope = {
            x: gyro.x,
            y: gyro.y,
            z: gyro.z,
            magnitude: Math.sqrt(gyro.x * gyro.x + gyro.y * gyro.y + gyro.z * gyro.z)
        };
    }
    
    // ========================================================================
    // ORIENTATION DATA PROCESSING
    // ========================================================================
    if (sensors.orientation) {
        const orient = sensors.orientation;
        window.sensorData.orientation = {
            alpha: orient.alpha || 0,  // Z-axis rotation (compass)
            beta: orient.beta || 0,    // X-axis rotation (front-back tilt)
            gamma: orient.gamma || 0   // Y-axis rotation (left-right tilt)
        };
    }
    
    // ========================================================================
    // TOUCH DATA PROCESSING & SPARKLE GENERATION
    // ========================================================================
    if (sensors.touch) {
        const touch = sensors.touch;
        const wasActive = window.sensorData.touch.isActive;
        const isActive = touch.touches > 0;
        
        window.sensorData.touch = {
            x: touch.x,
            y: touch.y,
            pressure: touch.pressure,
            touches: touch.touches,
            isActive: isActive
        };
        
        // Create sparkles when touch starts or moves (if active)
        if (isActive && (touch.x !== 0 || touch.y !== 0)) {
            createSparkles(touch.x, touch.y, touch.pressure);
        }
    }
    
    // ========================================================================
    // GPS DATA PROCESSING
    // ========================================================================
    if (sensors.location) {
        const gps = sensors.location;
        window.sensorData.gps = {
            lat: gps.lat,
            lng: gps.lng,
            accuracy: gps.accuracy,
            hasSignal: gps.lat !== 0 || gps.lng !== 0
        };
    }
    
    // Update UI displays
    updateSensorDisplays();
}

// ============================================================================
// SPARKLE PARTICLE SYSTEM
// ============================================================================

function createSparkles(touchX, touchY, pressure) {
    // Convert normalized touch coordinates to screen coordinates
    const screenX = touchX * window.innerWidth;
    const screenY = touchY * window.innerHeight;
    
    // Create more sparkles based on pressure
    const sparkleCount = Math.floor(pressure * 8) + 2;
    
    for (let i = 0; i < sparkleCount; i++) {
        // Add some randomness around touch point
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        
        window.sparkles.push({
            x: screenX + offsetX,
            y: screenY + offsetY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 5000, // 5 seconds in milliseconds
            maxLife: 5000,
            size: Math.random() * 8 + 4,
            hue: Math.random() * 360,
            createdAt: Date.now()
        });
    }
}

function updateSparkles() {
    const now = Date.now();
    
    // Update and remove expired sparkles
    for (let i = window.sparkles.length - 1; i >= 0; i--) {
        const sparkle = window.sparkles[i];
        
        // Update position
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        
        // Apply some drift and fade
        sparkle.vx *= 0.98;
        sparkle.vy *= 0.98;
        sparkle.vy += 0.1; // slight gravity
        
        // Update life
        sparkle.life = sparkle.maxLife - (now - sparkle.createdAt);
        
        // Remove if expired
        if (sparkle.life <= 0) {
            window.sparkles.splice(i, 1);
        }
    }
}

// ============================================================================
// UI UPDATE FUNCTIONS
// ============================================================================

function updateConnectionStatus(message, isConnected) {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = isConnected ? 
            'connection-status status-connected' : 
            'connection-status status-disconnected';
    }
}

function updateSensorDisplays() {
    // Update sensor data display
    const sensorDataElement = document.getElementById('sensorData');
    if (sensorDataElement) {
        const accel = window.sensorData.accelerometer;
        const gyro = window.sensorData.gyroscope;
        const orient = window.sensorData.orientation;
        const touch = window.sensorData.touch;
        
        sensorDataElement.innerHTML = `
            <div>Accel: ${accel.x.toFixed(2)}, ${accel.y.toFixed(2)}, ${accel.z.toFixed(2)}</div>
            <div>Gyro: ${gyro.x.toFixed(2)}, ${gyro.y.toFixed(2)}, ${gyro.z.toFixed(2)}</div>
            <div>Orient: ${orient.alpha.toFixed(0)}°, ${orient.beta.toFixed(0)}°, ${orient.gamma.toFixed(0)}°</div>
            <div>Touch: ${touch.x.toFixed(2)}, ${touch.y.toFixed(2)} (${touch.touches})</div>
        `;
    }
    
    // Update GPS display
    const gps = window.sensorData.gps;
    const gpsCoords = document.getElementById('gpsCoords');
    const gpsLng = document.getElementById('gpsLng');
    const gpsAccuracy = document.getElementById('gpsAccuracy');
    
    if (gpsCoords) gpsCoords.textContent = `Lat: ${gps.lat.toFixed(6)}`;
    if (gpsLng) gpsLng.textContent = `Lng: ${gps.lng.toFixed(6)}`;
    if (gpsAccuracy) gpsAccuracy.textContent = `Accuracy: ${Math.round(gps.accuracy)}m`;
    
    // Change GPS display color based on signal
    const gpsDisplay = document.getElementById('gpsDisplay');
    if (gpsDisplay) {
        gpsDisplay.style.borderColor = gps.hasSignal ? '#00ff88' : '#ff4757';
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Start connection when page loads
window.addEventListener('load', () => {
    console.log('🎭 Poetics of Sensors - P5.js Test Template');
    console.log('🔌 Attempting to connect to sensor app...');
    
    // Start WebSocket connection
    connectToSensorApp();
    
    // Update sparkles regularly
    setInterval(updateSparkles, 16); // ~60 FPS
});

// Expose useful functions globally for P5.js sketch
window.getSensorData = () => window.sensorData;
window.isConnectedToSensors = () => window.sensorData.connected;

// Debug functions
window.debugSensors = () => {
    console.log('Current sensor data:', window.sensorData);
    console.log('Active sparkles:', window.sparkles.length);
};

console.log('📡 Sensor receiver loaded - waiting for connection...');