class ChiptuneTracker {
    constructor() {
        this.engine = new ChiptuneEngine();
        this.patternEditor = null;
        this.visualizer = null;
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        try {
            await this.engine.initialize();
            this.patternEditor = new PatternEditor(this.engine);
            this.visualizer = new Visualizer(this.engine);
            this.miniDancer = new MiniDancer(this.engine);
            this.setupEventListeners();
            this.isInitialized = true;
            
            console.log('ChiptuneTracker initialized successfully');
            
            this.engine.updateUI();
            this.setupSampleMusic(); // Move this here after initialization
            this.showWelcomeMessage();
        } catch (error) {
            console.error('Failed to initialize ChiptuneTracker:', error);
            this.showErrorMessage('Failed to initialize audio. Please check your browser compatibility.');
        }
    }

    setupEventListeners() {
        const playBtn = document.getElementById('playBtn');
        const stopBtn = document.getElementById('stopBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const tempoSlider = document.getElementById('tempoSlider');
        const tempoValue = document.getElementById('tempoValue');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.play();
                this.updatePlaybackButtons();
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.stop();
                this.updatePlaybackButtons();
            });
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.pause();
                this.updatePlaybackButtons();
            });
        }

        if (tempoSlider && tempoValue) {
            tempoSlider.addEventListener('input', (e) => {
                const tempo = parseInt(e.target.value);
                tempoValue.textContent = tempo;
                if (this.isInitialized) {
                    this.engine.setTempo(tempo);
                }
            });
        }

        this.setupChannelControls();
        this.setupInstrumentEditor();
        this.setupExportControls();
        this.setupSequenceEditor();
        this.setupKeyboardShortcuts();
    }

    setupChannelControls() {
        const channels = document.querySelectorAll('.channel');
        channels.forEach((channel, index) => {
            const volumeSlider = channel.querySelector('.volume');
            const muteButton = channel.querySelector('.mute');

            if (volumeSlider) {
                volumeSlider.addEventListener('input', (e) => {
                    if (!this.isInitialized) return;
                    const volume = parseInt(e.target.value);
                    this.engine.setChannelVolume(index, volume);
                });
            }

            if (muteButton) {
                muteButton.addEventListener('click', () => {
                    if (!this.isInitialized) return;
                    const isMuted = muteButton.classList.toggle('active');
                    this.engine.muteChannel(index, isMuted);
                    muteButton.style.background = isMuted ? 'rgba(255, 107, 53, 0.5)' : '';
                });
            }
        });
    }

    setupInstrumentEditor() {
        const waveformSelect = document.getElementById('waveform');
        const attackSlider = document.getElementById('attack');
        const decaySlider = document.getElementById('decay');
        const sustainSlider = document.getElementById('sustain');
        const releaseSlider = document.getElementById('release');

        const updateInstrument = () => {
            if (!this.isInitialized || !this.patternEditor) return;
            
            const instrumentId = this.patternEditor.currentInstrument;
            const params = {};

            if (waveformSelect) params.waveform = waveformSelect.value;
            if (attackSlider) params.attack = parseFloat(attackSlider.value);
            if (decaySlider) params.decay = parseFloat(decaySlider.value);
            if (sustainSlider) params.sustain = parseFloat(sustainSlider.value);
            if (releaseSlider) params.release = parseFloat(releaseSlider.value);

            this.engine.updateInstrument(instrumentId, params);
        };

        [waveformSelect, attackSlider, decaySlider, sustainSlider, releaseSlider].forEach(control => {
            if (control) {
                control.addEventListener('input', updateInstrument);
            }
        });

        this.loadInstrumentParams();
    }

    loadInstrumentParams() {
        if (!this.isInitialized || !this.patternEditor) return;

        const instrument = this.engine.instruments[this.patternEditor.currentInstrument];
        if (!instrument) return;

        const waveformSelect = document.getElementById('waveform');
        const attackSlider = document.getElementById('attack');
        const decaySlider = document.getElementById('decay');
        const sustainSlider = document.getElementById('sustain');
        const releaseSlider = document.getElementById('release');

        if (waveformSelect) waveformSelect.value = instrument.waveform;
        if (attackSlider) attackSlider.value = instrument.attack;
        if (decaySlider) decaySlider.value = instrument.decay;
        if (sustainSlider) sustainSlider.value = instrument.sustain;
        if (releaseSlider) releaseSlider.value = instrument.release;
    }

    setupExportControls() {
        const exportWavBtn = document.getElementById('exportWav');
        const exportMidiBtn = document.getElementById('exportMidi');
        const saveProjectBtn = document.getElementById('saveProject');
        const loadProjectBtn = document.getElementById('loadProject');

        if (exportWavBtn) {
            exportWavBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.exportWav();
            });
        }

        if (exportMidiBtn) {
            exportMidiBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.exportMidi();
            });
        }

        if (saveProjectBtn) {
            saveProjectBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                this.engine.saveProject();
            });
        }

        if (loadProjectBtn) {
            loadProjectBtn.addEventListener('click', () => {
                if (!this.isInitialized) return;
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        this.engine.loadProject(file);
                    }
                };
                input.click();
            });
        }

        const learnBtn = document.getElementById('learnBtn');
        if (learnBtn) {
            learnBtn.addEventListener('click', () => {
                window.open('learn.html', '_blank');
            });
        }

        const learnNavBtn = document.getElementById('learnNavBtn');
        if (learnNavBtn) {
            learnNavBtn.addEventListener('click', () => {
                window.open('learn.html', '_blank');
            });
        }

        const aboutNavBtn = document.getElementById('aboutNavBtn');
        if (aboutNavBtn) {
            aboutNavBtn.addEventListener('click', () => {
                window.open('copy.html', '_blank');
            });
        }
    }

    setupSequenceEditor() {
        const sequenceList = document.getElementById('sequenceList');
        if (!sequenceList) return;

        sequenceList.addEventListener('click', (e) => {
            if (e.target.classList.contains('sequence-item')) {
                const items = sequenceList.querySelectorAll('.sequence-item');
                items.forEach(item => item.classList.remove('active'));
                e.target.classList.add('active');

                const patternIndex = parseInt(e.target.textContent);
                if (this.patternEditor) {
                    this.patternEditor.currentPattern = patternIndex;
                    this.patternEditor.updateDisplay();
                }
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
                return;
            }

            if (e.ctrlKey || e.metaKey) {
                switch (e.code) {
                    case 'KeyN':
                        e.preventDefault();
                        this.newProject();
                        break;
                    case 'KeyO':
                        e.preventDefault();
                        document.getElementById('loadProject')?.click();
                        break;
                    case 'KeyS':
                        e.preventDefault();
                        document.getElementById('saveProject')?.click();
                        break;
                    case 'KeyR':
                        e.preventDefault();
                        if (this.patternEditor) {
                            this.patternEditor.generateRandomPattern();
                        }
                        break;
                    case 'KeyL':
                        e.preventDefault();
                        if (this.patternEditor) {
                            this.patternEditor.clearPattern();
                        }
                        break;
                }
            }
        });
    }

    updatePlaybackButtons() {
        const playBtn = document.getElementById('playBtn');
        const stopBtn = document.getElementById('stopBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (playBtn && stopBtn && pauseBtn) {
            if (this.engine.isPlaying) {
                playBtn.style.background = 'rgba(0, 255, 65, 0.3)';
                stopBtn.style.background = '';
                pauseBtn.style.background = '';
            } else {
                playBtn.style.background = '';
                stopBtn.style.background = '';
                pauseBtn.style.background = '';
            }
        }
    }

    newProject() {
        if (!this.isInitialized) return;
        
        if (confirm('Create new project? This will clear all current data.')) {
            this.engine.initPatterns();
            this.engine.currentRow = 0;
            this.engine.currentPattern = 0;
            
            if (this.patternEditor) {
                this.patternEditor.currentPattern = 0;
                this.patternEditor.currentRow = 0;
                this.patternEditor.currentChannel = 0;
                this.patternEditor.updateDisplay();
            }
            
            this.engine.updateUI();
        }
    }

    showWelcomeMessage() {
        console.log(`
╔═══════════════════════════════════╗
║          CHIPTRACKER v1.0         ║
║    Demoscene Style Chiptunes      ║
╠═══════════════════════════════════╣
║ KEYBOARD SHORTCUTS:               ║
║ Z-M: Notes (octave 4)             ║
║ Q-P: Notes (octave 5)             ║
║ Arrow Keys: Navigate              ║
║ Space: Play/Pause                 ║
║ Enter: Stop                       ║
║ Ctrl+S: Save Project              ║
║ Ctrl+O: Load Project              ║
║ Ctrl+R: Random Pattern            ║
║ Ctrl+L: Clear Pattern             ║
║ F1-F4: Select Instrument          ║
╚═══════════════════════════════════╝
        `);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border: 2px solid #ff0000;
            border-radius: 5px;
            z-index: 9999;
            font-family: 'Courier New', monospace;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="this.parentNode.remove()" style="margin-top: 10px; padding: 5px 10px;">OK</button>
        `;
        document.body.appendChild(errorDiv);
    }

    setupSampleMusic() {
        const sampleSelect = document.getElementById('sampleSelect');
        const loadSampleBtn = document.getElementById('loadSampleBtn');

        if (sampleSelect && this.isInitialized) {
            const samples = this.engine.getSampleSongList();
            samples.forEach(sample => {
                const option = document.createElement('option');
                option.value = sample.key;
                option.textContent = sample.name;
                sampleSelect.appendChild(option);
            });
        }

        if (loadSampleBtn) {
            loadSampleBtn.addEventListener('click', () => {
                if (!this.isInitialized || !sampleSelect) return;
                
                const selectedSample = sampleSelect.value;
                if (selectedSample) {
                    this.engine.stop();
                    if (this.engine.loadSampleSong(selectedSample)) {
                        // Update tempo slider
                        const tempoSlider = document.getElementById('tempoSlider');
                        const tempoValue = document.getElementById('tempoValue');
                        if (tempoSlider && tempoValue) {
                            tempoSlider.value = this.engine.tempo;
                            tempoValue.textContent = this.engine.tempo;
                        }

                        // Update pattern editor
                        if (this.patternEditor) {
                            this.patternEditor.currentPattern = 0;
                            this.patternEditor.currentRow = 0;
                            this.patternEditor.updateDisplay();
                        }

                        console.log(`🎵 Loaded classic chiptune: ${sampleSelect.options[sampleSelect.selectedIndex].text}`);
                    }
                }
            });
        }
    }
}

class Visualizer {
    constructor(engine) {
        this.engine = engine;
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.animationId = null;
        this.bars = 32; // Number of frequency bars
        
        if (this.canvas && this.ctx) {
            this.setupCanvas();
            this.animate();
        }
    }

    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    animate() {
        if (!this.ctx || !this.canvas) return;
        
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, width, height);
        
        // Get frequency data from audio engine
        const frequencyData = this.engine.getFrequencyData();
        
        if (frequencyData) {
            this.drawSpectrum(frequencyData, width, height);
        } else {
            this.drawIdle(width, height);
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawSpectrum(frequencyData, width, height) {
        const barWidth = width / this.bars;
        const heightScale = height / 255;
        
        for (let i = 0; i < this.bars; i++) {
            // Average multiple frequency bins for each bar
            const binSize = Math.floor(frequencyData.length / this.bars);
            let sum = 0;
            for (let j = 0; j < binSize; j++) {
                sum += frequencyData[i * binSize + j];
            }
            const average = sum / binSize;
            
            const barHeight = average * heightScale;
            const x = i * barWidth;
            const y = height - barHeight;
            
            // Color based on frequency and amplitude
            const hue = (i / this.bars) * 120; // 0 to 120 (red to green)
            const intensity = Math.min(255, average + 50);
            
            this.ctx.fillStyle = `hsl(${hue}, 100%, ${intensity / 2.55}%)`;
            this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
            
            // Add glow effect for high frequencies
            if (average > 100) {
                this.ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
                this.ctx.shadowBlur = 5;
                this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
                this.ctx.shadowBlur = 0;
            }
        }
        
        // Draw waveform overlay
        this.drawWaveform(frequencyData, width, height);
    }

    drawWaveform(frequencyData, width, height) {
        this.ctx.strokeStyle = '#00ff41';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.7;
        this.ctx.beginPath();
        
        const points = Math.min(frequencyData.length, 100);
        
        for (let i = 0; i < points; i++) {
            const x = (i / points) * width;
            const amplitude = frequencyData[i] / 255;
            const y = height / 2 + (amplitude - 0.5) * height * 0.5;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0;
    }

    drawIdle(width, height) {
        // Draw idle animation when no audio
        this.ctx.strokeStyle = '#00ff41';
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.3;
        this.ctx.beginPath();
        
        const time = Date.now() * 0.001;
        const points = 50;
        
        for (let i = 0; i < points; i++) {
            const x = (i / points) * width;
            const y = height / 2 + Math.sin(time * 2 + i * 0.1) * height * 0.2 * Math.sin(time * 0.5);
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0;
        
        // Draw frequency bars with minimal activity
        const barWidth = width / this.bars;
        for (let i = 0; i < this.bars; i++) {
            const x = i * barWidth;
            const barHeight = 2 + Math.sin(time * 3 + i * 0.5) * 3;
            const y = height - barHeight;
            
            this.ctx.fillStyle = `rgba(0, 255, 65, 0.1)`;
            this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

class MiniDancer {
    constructor(engine) {
        this.engine = engine;
        this.dancer = document.getElementById('miniDancer');
        this.beatIndicator = document.getElementById('beatIndicator');
        this.currentPose = 0;
        this.lastRow = -1;
        
        this.poses = [
            `    O
   /|\\
   / \\`,
            `  \\O/
    |
   / \\`,
            ` O
/|\\
/  \\`,
            `   O
  /|\\
 /  \\`,
            `  \\O
    |\\
   / \\`,
            `\\O O/
  |
 / \\`
        ];

        this.messages = [
            "♪ Vibing ♪",
            "🎵 Grooving 🎵", 
            "✨ Jamming ✨",
            "🎶 Rocking 🎶",
            "💫 Dancing 💫",
            "🎸 Shredding 🎸"
        ];

        this.startDancing();
    }

    startDancing() {
        // Check for beat changes
        setInterval(() => {
            if (this.engine.isPlaying) {
                const currentRow = this.engine.currentRow;
                
                // Dance on every 4th row (beat)
                if (currentRow !== this.lastRow && currentRow % 4 === 0) {
                    this.dance();
                    this.lastRow = currentRow;
                }
                
                // Update pose occasionally
                if (currentRow % 8 === 0) {
                    this.changePose();
                }
            }
        }, 50);

        // Update beat indicator
        setInterval(() => {
            this.updateBeatIndicator();
        }, 1500);

        // Idle animation when not playing
        setInterval(() => {
            if (!this.engine.isPlaying) {
                this.idleMove();
            }
        }, 2000);
    }

    dance() {
        if (this.dancer) {
            this.dancer.classList.add('dancing');
            setTimeout(() => {
                if (this.dancer) {
                    this.dancer.classList.remove('dancing');
                }
            }, 300);
        }
    }

    changePose() {
        if (this.dancer) {
            this.currentPose = (this.currentPose + 1) % this.poses.length;
            this.dancer.textContent = this.poses[this.currentPose];
        }
    }

    idleMove() {
        if (this.dancer && !this.engine.isPlaying) {
            const randomPose = Math.floor(Math.random() * 3); // Use calmer poses for idle
            this.dancer.textContent = this.poses[randomPose];
        }
    }

    updateBeatIndicator() {
        if (this.beatIndicator) {
            const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
            this.beatIndicator.textContent = randomMessage;
        }
    }
}

let tracker;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.createElement('div');
    startButton.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #1a1a1a, #333);
        border: 2px solid #00ff41;
        color: #00ff41;
        padding: 20px 40px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
        font-size: 18px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        transition: all 0.3s;
    `;
    startButton.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">🎵 CHIPTRACKER</div>
        <div style="font-size: 14px; margin-bottom: 20px;">Click to Start Audio Engine</div>
        <div style="font-size: 12px; color: #666;">Web Audio API requires user interaction</div>
    `;
    
    startButton.addEventListener('mouseenter', () => {
        startButton.style.transform = 'translate(-50%, -50%) scale(1.05)';
        startButton.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.8)';
    });
    
    startButton.addEventListener('mouseleave', () => {
        startButton.style.transform = 'translate(-50%, -50%) scale(1)';
        startButton.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
    });
    
    startButton.addEventListener('click', async () => {
        startButton.remove();
        tracker = new ChiptuneTracker();
    });
    
    document.body.appendChild(startButton);
});

window.addEventListener('beforeunload', () => {
    if (tracker && tracker.visualizer) {
        tracker.visualizer.destroy();
    }
});