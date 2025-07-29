# Poetics of Sensors

**A Mobile Sensor PWA for Creative Applications**

Transform your mobile device into a powerful sensor streaming platform. Capture accelerometer, gyroscope, orientation, touch, and GPS data, then send it to your creative applications via WebSocket/OSC-like protocols.

## 🌟 Features

### 📱 **Universal Mobile Support**
- **Progressive Web App (PWA)** - Works on iOS and Android
- **Installable** - Add to home screen like a native app
- **Offline Ready** - Core functionality works without internet
- **No App Store** - Install directly from browser

### 🎛️ **Comprehensive Sensor Support**
- **Accelerometer** - 3-axis motion detection (m/s²)
- **Gyroscope** - 3-axis rotation rate (rad/s)
- **Device Orientation** - Alpha, Beta, Gamma angles (°)
- **Touch/Multi-touch** - Position, pressure, touch count
- **GPS Location** - Latitude, longitude, accuracy (optional)

### 🌐 **Real-time Data Streaming**
- **WebSocket Communication** - Low-latency real-time streaming
- **OSC-like Protocol** - Structured message format
- **Configurable Send Rate** - 1-60 Hz adjustable
- **Auto-reconnection** - Robust connection handling
- **Message Queue** - Handles network interruptions

### 🎨 **Creative-Focused Design**
- **Clean, Dark Interface** - Optimized for live performance
- **Real-time Visualization** - Live sensor data display
- **Calibration System** - Zero-point sensor adjustment
- **Connection Status** - Clear visual feedback
- **Performance Stats** - Message rate and connection monitoring

## 🚀 Quick Start

### 1. **Access the App**
Open your mobile browser and navigate to the Poetics of Sensors URL, or:
```bash
# Serve locally for development
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. **Install as PWA**
- **iOS Safari**: Tap Share → Add to Home Screen
- **Android Chrome**: Tap menu → Install App

### 3. **Connect to Your Server**
1. Enter your server IP address (e.g., `192.168.1.100`)
2. Set the WebSocket port (default: `8080`)
3. Adjust send rate (1-60 Hz)
4. Tap **Connect**

### 4. **Configure Sensors**
- Toggle sensors on/off as needed
- Tap **Calibrate** to zero sensors
- Enable GPS if location data is needed

### 5. **Start Creating!**
Data streams in real-time to your applications via WebSocket.

## 📡 Data Format

### WebSocket Message Structure
```json
{
  \"type\": \"osc\",
  \"address\": \"/sensors\",
  \"timestamp\": 1641234567890,
  \"client\": \"poetics-of-sensors\",
  \"data\": {
    \"accelerometer\": {
      \"x\": -0.12,
      \"y\": 9.81,
      \"z\": 0.05,
      \"timestamp\": 1641234567890
    },
    \"gyroscope\": {
      \"x\": 0.01,
      \"y\": -0.02,
      \"z\": 0.00,
      \"timestamp\": 1641234567890
    },
    \"orientation\": {
      \"alpha\": 45.2,
      \"beta\": -12.8,
      \"gamma\": 3.1,
      \"timestamp\": 1641234567890
    },
    \"touch\": {
      \"x\": 0.65,
      \"y\": 0.32,
      \"pressure\": 0.8,
      \"touches\": 1,
      \"timestamp\": 1641234567890
    }
  }
}
```

### Sensor Data Ranges
- **Accelerometer**: ±20 m/s² (including gravity)
- **Gyroscope**: ±2000°/s (±35 rad/s)
- **Orientation**: Alpha (0-360°), Beta (±180°), Gamma (±90°)
- **Touch**: X,Y (0.0-1.0), Pressure (0.0-1.0), Touches (0-10)
- **GPS**: Decimal degrees, accuracy in meters

## 🛠️ Server Implementation Examples

### Node.js WebSocket Server
```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Poetics of Sensors connected');
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    if (message.type === 'osc' && message.address === '/sensors') {
      // Process sensor data
      console.log('Sensor data:', message.data);
      
      // Forward to OSC, MIDI, or other systems
      processSensorData(message.data);
    }
  });
});
```

### Python OSC Bridge
```python
import websocket
import json
from pythonosc import udp_client

# OSC client
osc_client = udp_client.SimpleUDPClient(\"127.0.0.1\", 5005)

def on_message(ws, message):
    data = json.loads(message)
    
    if data['type'] == 'osc':
        sensors = data['data']
        
        # Send each sensor as OSC message
        for sensor_name, sensor_data in sensors.items():
            osc_client.send_message(f\"/sensors/{sensor_name}\", 
                                  [sensor_data['x'], sensor_data['y'], sensor_data['z']])

ws = websocket.WebSocketApp(\"ws://192.168.1.100:8080\")
ws.on_message = on_message
ws.run_forever()
```

## 🎵 Creative Applications

### Music & Audio
- **Gestural Control** - Control synthesizers with device movement
- **Spatial Audio** - Orientation-based 3D audio positioning
- **Live Performance** - Touch and motion-triggered samples
- **Ambient Generation** - GPS-based generative music

### Visual Arts
- **Interactive Installations** - Motion-responsive visuals
- **Generative Art** - Sensor data as creative input
- **VR/AR Experiences** - Device as additional controller
- **Live Coding** - Real-time data for algorithmic composition

### Dance & Movement
- **Choreography Analysis** - Movement pattern recording
- **Interactive Dance** - Real-time visual/audio feedback
- **Motion Studies** - Gesture and movement research
- **Performance Art** - Technology-augmented expression

## 🔧 Advanced Configuration

### Calibration
- **Zero-point Setting** - Eliminates gravity and drift
- **Per-sensor Calibration** - Individual sensor adjustment
- **Orientation Compensation** - Device rotation handling

### Network Settings
- **Custom Protocols** - Extend message format
- **Multiple Endpoints** - Send to multiple servers
- **Data Filtering** - Reduce noise and smooth data
- **Compression** - Optimize for low-bandwidth networks

### Performance Optimization
- **Variable Send Rates** - Balance latency vs. bandwidth
- **Selective Sensors** - Stream only needed data
- **Background Operation** - Continue when app is minimized
- **Battery Management** - Optimize for extended use

## 📱 Device Compatibility

### iOS (13+)
- ✅ Safari (recommended)
- ✅ Chrome, Firefox, Edge
- ✅ PWA installation
- ⚠️ Permission prompts required for motion sensors

### Android (8+)
- ✅ Chrome (recommended)
- ✅ Firefox, Samsung Internet
- ✅ PWA installation
- ✅ Full sensor access

### Desktop (for development)
- ✅ Chrome, Firefox, Safari, Edge
- ⚠️ Limited sensor data (mouse/keyboard only)
- ✅ Full network functionality

## 🛡️ Privacy & Security

- **Local Processing** - All sensor processing happens on-device
- **No Data Storage** - No persistent data collection
- **Direct Communication** - Point-to-point WebSocket connection
- **Permission Based** - User controls sensor access
- **Network Isolation** - Typically used on local networks

## 🤝 Contributing

Built with love by **Studio Poetics** for the creative technology community.

### Development Setup
```bash
git clone [repository]
cd Poetics-of-sensors
python3 -m http.server 8000
```

### File Structure
```
Poetics-of-sensors/
├── index.html          # Main app interface
├── style.css           # UI styling
├── app.js              # Main application logic
├── sensors.js          # Sensor data capture
├── network.js          # WebSocket communication
├── manifest.json       # PWA configuration
├── sw.js               # Service worker
├── icons/              # App icons
└── README.md           # This file
```

## 📄 License

Open source - Feel free to use, modify, and share for creative projects.

---

**Transform Motion into Poetry** 🎭✨

*Studio Poetics - Where Technology Meets Creative Expression*