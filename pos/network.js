/**
 * POETICS OF SENSORS - Network Communication
 * 
 * Handles WebSocket communication and OSC-like message formatting
 * Sends sensor data to remote servers via WebSocket/UDP simulation
 */

class NetworkManager {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.serverIP = '192.168.1.100';
        this.serverPort = 8080;
        this.sendRate = 30; // Hz
        this.sendInterval = null;
        
        this.stats = {
            messagesSent: 0,
            connectionTime: 0,
            lastMessageTime: 0,
            dataRate: 0
        };
        
        this.messageQueue = [];
        this.init();
    }
    
    init() {
        console.log('Initializing network manager...');
        this.setupUI();
    }
    
    setupUI() {
        // Server IP input
        const ipInput = document.getElementById('server-ip');
        if (ipInput) {
            ipInput.value = this.serverIP;
            ipInput.addEventListener('change', (e) => {
                this.serverIP = e.target.value;
                this.saveSettings();
            });
        }
        
        // Server port input
        const portInput = document.getElementById('server-port');
        if (portInput) {
            portInput.value = this.serverPort;
            portInput.addEventListener('change', (e) => {
                this.serverPort = parseInt(e.target.value);
                this.saveSettings();
            });
        }
        
        // Send rate slider
        const rateSlider = document.getElementById('send-rate');
        const rateValue = document.getElementById('rate-value');
        if (rateSlider && rateValue) {
            rateSlider.value = this.sendRate;
            rateValue.textContent = this.sendRate;
            
            rateSlider.addEventListener('input', (e) => {
                this.sendRate = parseInt(e.target.value);
                rateValue.textContent = this.sendRate;
                
                // Restart sending with new rate if connected
                if (this.isConnected) {
                    this.stopSending();
                    this.startSending();
                }
                
                this.saveSettings();
            });
        }
        
        // Connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                if (this.isConnected) {
                    this.disconnect();
                } else {
                    this.connect();
                }
            });
        }
        
        // Load saved settings
        this.loadSettings();
    }
    
    connect() {
        const wsUrl = `ws://${this.serverIP}:${this.serverPort}`;
        console.log(`Connecting to ${wsUrl}...`);
        
        try {
            this.socket = new WebSocket(wsUrl);
            
            this.socket.onopen = () => {
                console.log('WebSocket connected');
                this.isConnected = true;
                this.stats.connectionTime = Date.now();
                this.updateConnectionStatus(true);
                this.startSending();
                
                // Send initial handshake
                this.sendMessage({
                    type: 'handshake',
                    client: 'Poetics of Sensors',
                    version: '1.0.0',
                    capabilities: ['accelerometer', 'gyroscope', 'orientation', 'touch', 'gps']
                });
            };
            
            this.socket.onclose = (event) => {
                console.log('WebSocket disconnected:', event.code, event.reason);
                this.isConnected = false;
                this.updateConnectionStatus(false);
                this.stopSending();
                
                // Auto-reconnect after 3 seconds if not manually disconnected
                if (event.code !== 1000) {
                    setTimeout(() => {
                        if (!this.isConnected) {
                            this.connect();
                        }
                    }, 3000);
                }
            };
            
            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.showConnectionError('Connection failed');
            };
            
            this.socket.onmessage = (event) => {
                this.handleIncomingMessage(event.data);
            };
            
        } catch (error) {
            console.error('Connection error:', error);
            this.showConnectionError('Invalid server address');
        }
    }
    
    disconnect() {
        console.log('Disconnecting...');
        
        if (this.socket) {
            this.socket.close(1000, 'Manual disconnect');
            this.socket = null;
        }
        
        this.isConnected = false;
        this.stopSending();
        this.updateConnectionStatus(false);
    }
    
    startSending() {
        if (this.sendInterval) {
            clearInterval(this.sendInterval);
        }
        
        const interval = 1000 / this.sendRate; // Convert Hz to milliseconds
        
        this.sendInterval = setInterval(() => {
            this.sendSensorData();
        }, interval);
        
        console.log(`Started sending data at ${this.sendRate}Hz (${interval}ms interval)`);
    }
    
    stopSending() {
        if (this.sendInterval) {
            clearInterval(this.sendInterval);
            this.sendInterval = null;
        }
        console.log('Stopped sending data');
    }
    
    sendSensorData() {
        if (!this.isConnected || !window.sensorManager) return;
        
        const sensorData = window.sensorManager.getAllActiveSensors();
        
        if (Object.keys(sensorData).length === 0) return;
        
        // Create OSC-like message format
        const oscMessage = this.createOSCMessage('/sensors', sensorData);
        
        this.sendMessage(oscMessage);
        this.updateDataRate();
    }
    
    createOSCMessage(address, data) {
        return {
            type: 'osc',
            address: address,
            timestamp: Date.now(),
            data: data,
            client: 'poetics-of-sensors'
        };
    }
    
    sendMessage(message) {
        if (!this.isConnected || !this.socket) return;
        
        try {
            const jsonMessage = JSON.stringify(message);
            this.socket.send(jsonMessage);
            
            this.stats.messagesSent++;
            this.stats.lastMessageTime = Date.now();
            
            // Update UI stats
            this.updateStats();
            
        } catch (error) {
            console.error('Send error:', error);
            this.showConnectionError('Send failed');
        }
    }
    
    handleIncomingMessage(data) {
        try {
            const message = JSON.parse(data);
            console.log('Received message:', message);
            
            // Handle different message types
            switch (message.type) {
                case 'config':
                    this.handleConfigMessage(message);
                    break;
                case 'command':
                    this.handleCommandMessage(message);
                    break;
                case 'ping':
                    this.sendMessage({ type: 'pong', timestamp: Date.now() });
                    break;
                default:
                    console.log('Unknown message type:', message.type);
            }
            
        } catch (error) {
            console.error('Message parsing error:', error);
        }
    }
    
    handleConfigMessage(message) {
        console.log('Received config:', message);
        
        // Apply remote configuration
        if (message.sendRate && message.sendRate !== this.sendRate) {
            this.sendRate = message.sendRate;
            document.getElementById('send-rate').value = this.sendRate;
            document.getElementById('rate-value').textContent = this.sendRate;
            
            this.stopSending();
            this.startSending();
        }
    }
    
    handleCommandMessage(message) {
        console.log('Received command:', message);
        
        switch (message.command) {
            case 'calibrate':
                if (window.sensorManager) {
                    window.sensorManager.calibrate();
                }
                break;
            case 'reset':
                this.stats.messagesSent = 0;
                this.updateStats();
                break;
            default:
                console.log('Unknown command:', message.command);
        }
    }
    
    updateConnectionStatus(connected) {
        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');
        const connectBtn = document.getElementById('connect-btn');
        
        if (connected) {
            statusDot.classList.add('connected');
            statusText.textContent = `Connected to ${this.serverIP}:${this.serverPort}`;
            statusText.style.color = 'var(--success)';
            connectBtn.textContent = 'Disconnect';
            connectBtn.classList.remove('primary');
            connectBtn.classList.add('secondary');
        } else {
            statusDot.classList.remove('connected');
            statusText.textContent = 'Disconnected';
            statusText.style.color = 'var(--error)';
            connectBtn.textContent = 'Connect';
            connectBtn.classList.remove('secondary');
            connectBtn.classList.add('primary');
        }
    }
    
    showConnectionError(message) {
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = message;
            statusText.style.color = 'var(--error)';
        }
        
        // Shake connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.classList.add('shake');
            setTimeout(() => connectBtn.classList.remove('shake'), 500);
        }
    }
    
    updateDataRate() {
        const now = Date.now();
        const timeDiff = (now - (this.lastDataRateUpdate || now)) / 1000;
        
        if (timeDiff >= 1) { // Update every second
            this.stats.dataRate = Math.round(
                (this.stats.messagesSent - (this.lastMessageCount || 0)) / timeDiff
            );
            this.lastMessageCount = this.stats.messagesSent;
            this.lastDataRateUpdate = now;
        }
    }
    
    updateStats() {
        // Messages sent
        const messageCount = document.getElementById('message-count');
        if (messageCount) {
            messageCount.textContent = this.stats.messagesSent.toLocaleString();
        }
        
        // Data rate
        const dataRate = document.getElementById('data-rate');
        if (dataRate) {
            dataRate.textContent = this.stats.dataRate;
        }
        
        // Connection time
        const connectionTime = document.getElementById('connection-time');
        if (connectionTime && this.isConnected) {
            const elapsed = Math.floor((Date.now() - this.stats.connectionTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            connectionTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    saveSettings() {
        const settings = {
            serverIP: this.serverIP,
            serverPort: this.serverPort,
            sendRate: this.sendRate
        };
        
        try {
            localStorage.setItem('poetics-sensors-settings', JSON.stringify(settings));
        } catch (error) {
            console.warn('Could not save settings:', error);
        }
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('poetics-sensors-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                
                this.serverIP = settings.serverIP || this.serverIP;
                this.serverPort = settings.serverPort || this.serverPort;
                this.sendRate = settings.sendRate || this.sendRate;
                
                // Update UI
                const ipInput = document.getElementById('server-ip');
                const portInput = document.getElementById('server-port');
                const rateSlider = document.getElementById('send-rate');
                const rateValue = document.getElementById('rate-value');
                
                if (ipInput) ipInput.value = this.serverIP;
                if (portInput) portInput.value = this.serverPort;
                if (rateSlider) rateSlider.value = this.sendRate;
                if (rateValue) rateValue.textContent = this.sendRate;
            }
        } catch (error) {
            console.warn('Could not load settings:', error);
        }
    }
    
    // Debug methods
    getStats() {
        return { ...this.stats };
    }
    
    testMessage() {
        this.sendMessage({
            type: 'test',
            message: 'Hello from Poetics of Sensors!',
            timestamp: Date.now()
        });
    }
}

// Global network manager instance
window.networkManager = new NetworkManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NetworkManager;
}