/**
 * Simple WebSocket Server for Poetics of Sensors
 * Run this to receive sensor data from the mobile app
 */

const WebSocket = require('ws');
const http = require('http');

const PORT = 8080;

// Create HTTP server for basic info page
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>Poetics of Sensors Server</h1>
        <p>WebSocket server running on port ${PORT}</p>
        <p>Connect your mobile app to: <strong>ws://[this-ip]:${PORT}</strong></p>
        <p>Status: <span id="status">Waiting for connections...</span></p>
        <script>
            const ws = new WebSocket('ws://localhost:${PORT}');
            ws.onopen = () => document.getElementById('status').textContent = 'Connected!';
            ws.onclose = () => document.getElementById('status').textContent = 'Disconnected';
        </script>
    `);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

console.log(`🎭 Poetics of Sensors Server starting on port ${PORT}...`);

wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    console.log(`📱 Mobile device connected from ${clientIP}`);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to Poetics of Sensors Server',
        timestamp: Date.now()
    }));
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'handshake':
                    console.log(`📱 Client: ${message.client} v${message.version}`);
                    console.log(`🎛️  Capabilities: ${message.capabilities.join(', ')}`);
                    break;
                    
                case 'osc':
                    // This is the main sensor data
                    if (message.address === '/sensors') {
                        processSensorData(message.data, message.timestamp);
                    }
                    break;
                    
                default:
                    console.log('📨 Unknown message type:', message.type);
            }
            
        } catch (error) {
            console.error('❌ Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log(`📱 Mobile device disconnected from ${clientIP}`);
    });
    
    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
    });
});

function processSensorData(sensors, timestamp) {
    // Process incoming sensor data
    console.log(`🎛️  [${new Date(timestamp).toLocaleTimeString()}] Sensors:`, 
        Object.keys(sensors).join(', '));
    
    // Example: Log accelerometer data
    if (sensors.accelerometer) {
        const { x, y, z } = sensors.accelerometer;
        console.log(`   📐 Accel: X=${x.toFixed(2)} Y=${y.toFixed(2)} Z=${z.toFixed(2)}`);
    }
    
    // Example: Log orientation data  
    if (sensors.orientation) {
        const { alpha, beta, gamma } = sensors.orientation;
        console.log(`   🧭 Orient: α=${alpha.toFixed(1)}° β=${beta.toFixed(1)}° γ=${gamma.toFixed(1)}°`);
    }
    
    // Example: Log touch data
    if (sensors.touch && sensors.touch.touches > 0) {
        const { x, y, pressure, touches } = sensors.touch;
        console.log(`   👆 Touch: (${x.toFixed(2)}, ${y.toFixed(2)}) P=${pressure.toFixed(2)} T=${touches}`);
    }
    
    // TODO: Forward to your creative applications
    // - Send to OSC (Open Sound Control)
    // - Trigger MIDI events
    // - Control visuals
    // - Drive generative art
    // - Etc.
}

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Server running at http://0.0.0.0:${PORT}`);
    console.log(`📱 Mobile apps can connect to: ws://[your-ip]:${PORT}`);
    console.log(`💡 Find your IP with: ifconfig (Mac/Linux) or ipconfig (Windows)`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('👋 Server stopped');
        process.exit(0);
    });
});