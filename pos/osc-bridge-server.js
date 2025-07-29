/**
 * OSC Bridge Server for Poetics of Sensors
 * 
 * Receives WebSocket data from mobile app and converts to true OSC protocol
 * Forwards to any OSC-compatible application (Max/MSP, Pure Data, TouchDesigner, etc.)
 */

const WebSocket = require('ws');
const osc = require('osc');
const dgram = require('dgram');

// Configuration
const WEBSOCKET_PORT = 8080;
const OSC_OUT_PORT = 5005;
const OSC_OUT_HOST = '127.0.0.1'; // localhost
const OSC_IN_PORT = 5006; // For receiving OSC back from applications

console.log('🎭 Poetics of Sensors OSC Bridge Server');

// Create OSC UDP port for sending
const oscUDPPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: OSC_IN_PORT,
    remoteAddress: OSC_OUT_HOST,
    remotePort: OSC_OUT_PORT,
    metadata: true
});

// Open OSC port
oscUDPPort.open();
console.log(`🎵 OSC UDP port opened: sending to ${OSC_OUT_HOST}:${OSC_OUT_PORT}`);

// Create WebSocket server
const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });
console.log(`🌐 WebSocket server running on port ${WEBSOCKET_PORT}`);

let connectedClients = 0;
let messageCount = 0;

wss.on('connection', (ws, req) => {
    connectedClients++;
    const clientIP = req.socket.remoteAddress;
    console.log(`📱 Mobile device connected from ${clientIP} (${connectedClients} total)`);
    
    // Send welcome with OSC info
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to OSC Bridge Server',
        oscOutput: `${OSC_OUT_HOST}:${OSC_OUT_PORT}`,
        timestamp: Date.now()
    }));
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'handshake':
                    console.log(`📱 Client: ${message.client} v${message.version}`);
                    break;
                    
                case 'osc':
                    // Convert WebSocket message to true OSC
                    convertToOSC(message);
                    messageCount++;
                    break;
                    
                default:
                    console.log('📨 Unknown message:', message.type);
            }
            
        } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
        }
    });
    
    ws.on('close', () => {
        connectedClients--;
        console.log(`📱 Mobile device disconnected from ${clientIP} (${connectedClients} remaining)`);
    });
    
    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
    });
});

function convertToOSC(message) {
    if (message.address === '/sensors' && message.data) {
        const sensors = message.data;
        const timestamp = message.timestamp;
        
        // Convert each sensor to individual OSC messages
        Object.keys(sensors).forEach(sensorName => {
            const sensorData = sensors[sensorName];
            
            switch (sensorName) {
                case 'accelerometer':
                    sendOSCMessage('/sensors/accel', [
                        sensorData.x, 
                        sensorData.y, 
                        sensorData.z
                    ]);
                    break;
                    
                case 'gyroscope':
                    sendOSCMessage('/sensors/gyro', [
                        sensorData.x,
                        sensorData.y, 
                        sensorData.z
                    ]);
                    break;
                    
                case 'orientation':
                    sendOSCMessage('/sensors/orient', [
                        sensorData.alpha,
                        sensorData.beta,
                        sensorData.gamma
                    ]);
                    break;
                    
                case 'touch':
                    sendOSCMessage('/sensors/touch', [
                        sensorData.x,
                        sensorData.y,
                        sensorData.pressure,
                        sensorData.touches
                    ]);
                    break;
                    
                case 'location':
                    sendOSCMessage('/sensors/gps', [
                        sensorData.lat,
                        sensorData.lng,
                        sensorData.accuracy
                    ]);
                    break;
            }
        });
        
        // Send bundled message with all sensor data
        sendOSCBundle('/sensors/all', sensors, timestamp);
        
        // Log every 100 messages
        if (messageCount % 100 === 0) {
            console.log(`🎵 Sent ${messageCount} OSC messages`);
        }
    }
}

function sendOSCMessage(address, args) {
    try {
        const oscMessage = {
            address: address,
            args: args.map(arg => ({
                type: typeof arg === 'number' ? 'f' : 's', // float or string
                value: arg
            }))
        };
        
        oscUDPPort.send(oscMessage);
        
    } catch (error) {
        console.error('❌ OSC send error:', error);
    }
}

function sendOSCBundle(address, sensors, timestamp) {
    try {
        // Create OSC bundle with timestamp
        const bundle = {
            timeTag: osc.timeTag(timestamp / 1000), // Convert to OSC time
            packets: []
        };
        
        // Add each sensor as a packet
        Object.keys(sensors).forEach(sensorName => {
            const sensorData = sensors[sensorName];
            
            if (sensorData.x !== undefined) {
                // XYZ data
                bundle.packets.push({
                    address: `/sensors/${sensorName}`,
                    args: [
                        { type: 'f', value: sensorData.x },
                        { type: 'f', value: sensorData.y },
                        { type: 'f', value: sensorData.z }
                    ]
                });
            } else if (sensorName === 'touch') {
                // Touch data
                bundle.packets.push({
                    address: `/sensors/touch`,
                    args: [
                        { type: 'f', value: sensorData.x },
                        { type: 'f', value: sensorData.y },
                        { type: 'f', value: sensorData.pressure },
                        { type: 'i', value: sensorData.touches }
                    ]
                });
            }
        });
        
        oscUDPPort.send(bundle);
        
    } catch (error) {
        console.error('❌ OSC bundle error:', error);
    }
}

// Handle incoming OSC messages (from applications back to mobile)
oscUDPPort.on('message', (oscMessage) => {
    console.log('🎵 Received OSC:', oscMessage.address, oscMessage.args);
    
    // Forward to mobile clients
    const message = {
        type: 'osc_response',
        address: oscMessage.address,
        args: oscMessage.args.map(arg => arg.value),
        timestamp: Date.now()
    };
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
});

// Error handling
oscUDPPort.on('error', (error) => {
    console.error('❌ OSC UDP error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down OSC Bridge...');
    oscUDPPort.close();
    wss.close(() => {
        console.log('👋 OSC Bridge stopped');
        process.exit(0);
    });
});

// Stats every 10 seconds
setInterval(() => {
    if (connectedClients > 0) {
        console.log(`📊 Stats: ${connectedClients} clients, ${messageCount} OSC messages sent`);
    }
}, 10000);