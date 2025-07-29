/**
 * POETICS OF SENSORS - Main Application
 * 
 * Coordinates sensor data capture, UI updates, and network communication
 * Main application controller and data visualization
 */

class PoeticsSensorsApp {
    constructor() {
        this.isInitialized = false;
        this.visualizationActive = false;
        this.lastUIUpdate = 0;
        this.uiUpdateRate = 10; // 10 FPS for UI updates
        
        this.dataCards = new Map();
        
        this.init();
    }
    
    async init() {
        console.log('Initializing Poetics of Sensors app...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    async setup() {
        try {
            // Setup UI event listeners
            this.setupUI();
            
            // Setup data display
            this.setupDataDisplay();
            
            // Start UI update loop
            this.startUIUpdateLoop();
            
            // Setup periodic stats update
            setInterval(() => this.updateNetworkStats(), 1000);
            
            // Setup data visualization
            this.setupVisualization();
            
            this.isInitialized = true;
            console.log('App initialized successfully');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('App initialization failed:', error);
            this.showErrorMessage('App initialization failed');
        }
    }
    
    setupUI() {
        console.log('Setting up UI event listeners...');
        
        // Calibration button
        const calibrateBtn = document.getElementById('calibrate-btn');
        if (calibrateBtn) {
            calibrateBtn.addEventListener('click', () => {
                if (window.sensorManager) {
                    window.sensorManager.calibrate();
                }
            });
        }
        
        // Sensor toggles
        const sensorCheckboxes = document.querySelectorAll('.sensor-toggle input[type="checkbox"]');
        sensorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleSensorToggle(e.target.id, e.target.checked);
            });
        });
        
        // Handle device orientation for landscape/portrait
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });
        
        // Handle app visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Prevent screen sleep (for mobile devices)
        this.preventScreenSleep();
    }
    
    setupDataDisplay() {
        console.log('Setting up data display...');
        
        const dataGrid = document.getElementById('data-grid');
        if (!dataGrid) return;
        
        // Create data cards for each sensor type
        const sensorTypes = [
            { id: 'accelerometer', name: 'Accelerometer', unit: 'm/s²', hasXYZ: true },
            { id: 'gyroscope', name: 'Gyroscope', unit: 'rad/s', hasXYZ: true },
            { id: 'orientation', name: 'Orientation', unit: '°', hasXYZ: true, labels: ['α', 'β', 'γ'] },
            { id: 'touch', name: 'Touch', unit: '', hasXYZ: false },
            { id: 'location', name: 'GPS', unit: '', hasXYZ: false }
        ];
        
        sensorTypes.forEach(sensor => {
            const card = this.createDataCard(sensor);
            dataGrid.appendChild(card);
            this.dataCards.set(sensor.id, card);
        });
    }
    
    createDataCard(sensor) {
        const card = document.createElement('div');
        card.className = 'data-card';
        card.id = `card-${sensor.id}`;
        
        if (sensor.hasXYZ) {
            const labels = sensor.labels || ['X', 'Y', 'Z'];
            card.innerHTML = `
                <h3>${sensor.name}</h3>
                <div class="data-xyz">
                    <span>${labels[0]}: <span id="${sensor.id}-x">0.00</span></span>
                    <span>${labels[1]}: <span id="${sensor.id}-y">0.00</span></span>
                    <span>${labels[2]}: <span id="${sensor.id}-z">0.00</span></span>
                </div>
                <div class="sensor-unit">${sensor.unit}</div>
            `;
        } else {
            // Custom layout for touch and GPS
            if (sensor.id === 'touch') {
                card.innerHTML = `
                    <h3>${sensor.name}</h3>
                    <div class="data-value" id="touch-position">0.00, 0.00</div>
                    <div class="data-xyz">
                        <span>P: <span id="touch-pressure">0.00</span></span>
                        <span>T: <span id="touch-count">0</span></span>
                    </div>
                `;
            } else if (sensor.id === 'location') {
                card.innerHTML = `
                    <h3>${sensor.name}</h3>
                    <div class="data-value" id="gps-coords">0.000, 0.000</div>
                    <div class="data-xyz">
                        <span>Accuracy: <span id="gps-accuracy">0</span>m</span>
                    </div>
                `;
            }
        }
        
        return card;
    }
    
    startUIUpdateLoop() {
        const updateUI = () => {
            const now = Date.now();
            
            if (now - this.lastUIUpdate >= (1000 / this.uiUpdateRate)) {
                this.updateDataDisplay();
                this.lastUIUpdate = now;
            }
            
            requestAnimationFrame(updateUI);
        };
        
        updateUI();
    }
    
    updateDataDisplay() {
        if (!window.sensorManager) return;
        
        const sensors = window.sensorManager.sensors;
        
        // Update accelerometer
        if (sensors.accelerometer.active) {
            const data = sensors.accelerometer.data;
            this.updateXYZDisplay('accelerometer', data);
        }
        
        // Update gyroscope
        if (sensors.gyroscope.active) {
            const data = sensors.gyroscope.data;
            this.updateXYZDisplay('gyroscope', data);
        }
        
        // Update orientation
        if (sensors.orientation.active) {
            const data = sensors.orientation.data;
            this.updateXYZDisplay('orientation', { x: data.alpha, y: data.beta, z: data.gamma });
        }
        
        // Update touch
        if (sensors.touch.active) {
            const data = sensors.touch.data;
            const positionEl = document.getElementById('touch-position');
            const pressureEl = document.getElementById('touch-pressure');
            const countEl = document.getElementById('touch-count');
            
            if (positionEl) positionEl.textContent = `${data.x.toFixed(2)}, ${data.y.toFixed(2)}`;
            if (pressureEl) pressureEl.textContent = data.pressure.toFixed(2);
            if (countEl) countEl.textContent = data.touches;
        }
        
        // Update GPS
        if (sensors.location.active) {
            const data = sensors.location.data;
            const coordsEl = document.getElementById('gps-coords');
            const accuracyEl = document.getElementById('gps-accuracy');
            
            if (coordsEl) coordsEl.textContent = `${data.lat.toFixed(6)}, ${data.lng.toFixed(6)}`;
            if (accuracyEl) accuracyEl.textContent = Math.round(data.accuracy);
        }
    }
    
    updateXYZDisplay(sensorId, data) {
        const xEl = document.getElementById(`${sensorId}-x`);
        const yEl = document.getElementById(`${sensorId}-y`);
        const zEl = document.getElementById(`${sensorId}-z`);
        
        if (xEl) xEl.textContent = data.x.toFixed(2);
        if (yEl) yEl.textContent = data.y.toFixed(2);
        if (zEl) zEl.textContent = data.z.toFixed(2);
    }
    
    handleSensorToggle(sensorId, enabled) {
        console.log(`Sensor ${sensorId} ${enabled ? 'enabled' : 'disabled'}`);
        
        // Special handling for GPS
        if (sensorId === 'location') {
            if (enabled) {
                window.sensorManager.startLocationTracking();
            } else {
                window.sensorManager.stopLocationTracking();
            }
        }
        
        // Update data card visibility
        const card = this.dataCards.get(sensorId);
        if (card) {
            card.style.opacity = enabled ? '1' : '0.5';
        }
    }
    
    setupVisualization() {
        const canvas = document.getElementById('visualizer');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Simple particle visualization based on sensor data
        const particles = [];
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (window.sensorManager && window.sensorManager.sensors.accelerometer.active) {
                const accel = window.sensorManager.sensors.accelerometer.data;
                
                // Create particles based on acceleration
                if (Math.abs(accel.x) > 2 || Math.abs(accel.y) > 2) {
                    particles.push({
                        x: canvas.width / 2,
                        y: canvas.height / 2,
                        vx: accel.x * 2,
                        vy: accel.y * 2,
                        life: 1.0,
                        size: Math.random() * 5 + 2
                    });
                }
                
                // Update and draw particles
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.02;
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                    
                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }
                    
                    ctx.save();
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = '#00ff88';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    updateNetworkStats() {
        if (window.networkManager) {
            window.networkManager.updateStats();
        }
    }
    
    handleOrientationChange() {
        console.log('Orientation changed');
        // Trigger recalibration or adjustment if needed
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('App became hidden');
            // Reduce update frequency when app is not visible
            this.uiUpdateRate = 2;
        } else {
            console.log('App became visible');
            // Restore normal update frequency
            this.uiUpdateRate = 10;
        }
    }
    
    preventScreenSleep() {
        // Request wake lock to prevent screen from sleeping
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then(wakeLock => {
                console.log('Screen wake lock acquired');
                
                wakeLock.addEventListener('release', () => {
                    console.log('Screen wake lock released');
                });
            }).catch(error => {
                console.warn('Wake lock request failed:', error);
            });
        }
    }
    
    showWelcomeMessage() {
        // Temporary welcome animation
        const appTitle = document.querySelector('.app-title');
        if (appTitle) {
            appTitle.classList.add('pulsing');
            setTimeout(() => appTitle.classList.remove('pulsing'), 3000);
        }
    }
    
    showErrorMessage(message) {
        console.error(message);
        
        // Show error in status
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = message;
            statusText.style.color = 'var(--error)';
        }
    }
    
    // Debug methods
    debugSensors() {
        if (window.sensorManager) {
            return window.sensorManager.logSensorData();
        }
    }
    
    debugNetwork() {
        if (window.networkManager) {
            return window.networkManager.getStats();
        }
    }
    
    testConnection() {
        if (window.networkManager) {
            window.networkManager.testMessage();
        }
    }
}

// Initialize the app when DOM is ready
const app = new PoeticsSensorsApp();

// Make app globally available for debugging
window.poeticsApp = app;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PoeticsSensorsApp;
}