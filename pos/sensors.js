/**
 * POETICS OF SENSORS - Sensor Data Handler
 * 
 * Captures and processes mobile device sensor data
 * Supports: Accelerometer, Gyroscope, Orientation, Touch, GPS
 */

class SensorManager {
    constructor() {
        this.sensors = {
            accelerometer: { active: false, data: { x: 0, y: 0, z: 0 } },
            gyroscope: { active: false, data: { x: 0, y: 0, z: 0 } },
            orientation: { active: false, data: { alpha: 0, beta: 0, gamma: 0 } },
            touch: { active: false, data: { x: 0, y: 0, pressure: 0, touches: 0 } },
            location: { active: false, data: { lat: 0, lng: 0, accuracy: 0 } }
        };
        
        this.calibration = {
            accelerometer: { x: 0, y: 0, z: 0 },
            gyroscope: { x: 0, y: 0, z: 0 },
            orientation: { alpha: 0, beta: 0, gamma: 0 }
        };
        
        this.permissionsGranted = false;
        this.watchId = null;
        
        this.init();
    }
    
    async init() {
        console.log('Initializing sensor manager...');
        await this.requestPermissions();
        this.setupEventListeners();
        this.updateUI();
    }
    
    async requestPermissions() {
        try {
            // Request device motion permissions (iOS 13+)
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    console.log('Device motion permission granted');
                    this.permissionsGranted = true;
                } else {
                    console.warn('Device motion permission denied');
                    this.showPermissionError('Motion sensors require permission');
                }
            } else {
                // Android or older iOS
                this.permissionsGranted = true;
            }
            
            // Request device orientation permissions (iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission !== 'granted') {
                    console.warn('Device orientation permission denied');
                }
            }
        } catch (error) {
            console.error('Permission request failed:', error);
            this.showPermissionError('Sensor permissions unavailable');
        }
    }
    
    setupEventListeners() {
        // Accelerometer & Gyroscope (DeviceMotionEvent)
        window.addEventListener('devicemotion', (event) => {
            if (!this.permissionsGranted) return;
            
            const acceleration = event.accelerationIncludingGravity;
            const rotationRate = event.rotationRate;
            
            if (acceleration) {
                this.sensors.accelerometer.data = {
                    x: (acceleration.x || 0) - this.calibration.accelerometer.x,
                    y: (acceleration.y || 0) - this.calibration.accelerometer.y,
                    z: (acceleration.z || 0) - this.calibration.accelerometer.z
                };
                this.sensors.accelerometer.active = true;
            }
            
            if (rotationRate) {
                this.sensors.gyroscope.data = {
                    x: (rotationRate.alpha || 0) - this.calibration.gyroscope.x,
                    y: (rotationRate.beta || 0) - this.calibration.gyroscope.y,
                    z: (rotationRate.gamma || 0) - this.calibration.gyroscope.z
                };
                this.sensors.gyroscope.active = true;
            }
        });
        
        // Device Orientation
        window.addEventListener('deviceorientation', (event) => {
            this.sensors.orientation.data = {
                alpha: (event.alpha || 0) - this.calibration.orientation.alpha,
                beta: (event.beta || 0) - this.calibration.orientation.beta,
                gamma: (event.gamma || 0) - this.calibration.orientation.gamma
            };
            this.sensors.orientation.active = true;
        });
        
        // Touch Events
        document.addEventListener('touchstart', (event) => this.handleTouch(event));
        document.addEventListener('touchmove', (event) => this.handleTouch(event));
        document.addEventListener('touchend', (event) => this.handleTouch(event));
        
        // Mouse events for desktop testing
        document.addEventListener('mousedown', (event) => this.handleMouse(event));
        document.addEventListener('mousemove', (event) => this.handleMouse(event));
        document.addEventListener('mouseup', (event) => this.handleMouse(event));
    }
    
    handleTouch(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        
        if (touch) {
            this.sensors.touch.data = {
                x: touch.clientX / window.innerWidth,
                y: touch.clientY / window.innerHeight,
                pressure: touch.force || 0.5,
                touches: event.touches.length
            };
        } else {
            this.sensors.touch.data.touches = 0;
        }
        
        this.sensors.touch.active = true;
    }
    
    handleMouse(event) {
        // Fallback for desktop testing
        this.sensors.touch.data = {
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight,
            pressure: event.buttons > 0 ? 1.0 : 0.0,
            touches: event.buttons > 0 ? 1 : 0
        };
        this.sensors.touch.active = true;
    }
    
    startLocationTracking() {
        if (!navigator.geolocation) {
            console.error('Geolocation not supported');
            return;
        }
        
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000
        };
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.sensors.location.data = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                this.sensors.location.active = true;
                this.updateSensorStatus('gps', 'active');
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.updateSensorStatus('gps', 'error');
            },
            options
        );
    }
    
    stopLocationTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            this.sensors.location.active = false;
            this.updateSensorStatus('gps', 'off');
        }
    }
    
    calibrate() {
        console.log('Calibrating sensors...');
        
        // Store current values as calibration offsets
        this.calibration.accelerometer = { ...this.sensors.accelerometer.data };
        this.calibration.gyroscope = { ...this.sensors.gyroscope.data };
        this.calibration.orientation = { ...this.sensors.orientation.data };
        
        // Show feedback
        const btn = document.getElementById('calibrate-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Calibrated!';
        btn.classList.add('pulsing');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('pulsing');
        }, 2000);
        
        console.log('Calibration complete:', this.calibration);
    }
    
    getSensorData(sensorName) {
        return this.sensors[sensorName] || null;
    }
    
    getAllActiveSensors() {
        const activeSensors = {};
        
        Object.keys(this.sensors).forEach(name => {
            const sensor = this.sensors[name];
            const checkbox = document.getElementById(name);
            
            if (sensor.active && checkbox && checkbox.checked) {
                activeSensors[name] = {
                    ...sensor.data,
                    timestamp: Date.now()
                };
            }
        });
        
        return activeSensors;
    }
    
    updateUI() {
        // Update sensor status indicators
        Object.keys(this.sensors).forEach(name => {
            const sensor = this.sensors[name];
            const statusElement = document.getElementById(name.replace('accelerometer', 'accel')
                                                              .replace('gyroscope', 'gyro')
                                                              .replace('orientation', 'orient')
                                                              .replace('location', 'gps') + '-status');
            
            if (statusElement) {
                if (sensor.active) {
                    statusElement.textContent = 'Active';
                    statusElement.className = 'sensor-status active';
                } else {
                    statusElement.textContent = 'Ready';
                    statusElement.className = 'sensor-status';
                }
            }
        });
    }
    
    updateSensorStatus(sensorId, status) {
        const statusElement = document.getElementById(sensorId + '-status');
        if (statusElement) {
            switch (status) {
                case 'active':
                    statusElement.textContent = 'Active';
                    statusElement.className = 'sensor-status active';
                    break;
                case 'error':
                    statusElement.textContent = 'Error';
                    statusElement.className = 'sensor-status error';
                    break;
                case 'off':
                    statusElement.textContent = 'Off';
                    statusElement.className = 'sensor-status';
                    break;
                default:
                    statusElement.textContent = 'Ready';
                    statusElement.className = 'sensor-status';
            }
        }
    }
    
    showPermissionError(message) {
        // Show permission error in UI
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = message;
            statusText.style.color = 'var(--error)';
        }
        
        // Shake the app container
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.classList.add('shake');
            setTimeout(() => appContainer.classList.remove('shake'), 500);
        }
    }
    
    // Debug method
    logSensorData() {
        const data = this.getAllActiveSensors();
        console.log('Current sensor data:', data);
        return data;
    }
}

// Global sensor manager instance
window.sensorManager = new SensorManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SensorManager;
}