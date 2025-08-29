class ChiptuneEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.channels = [];
        this.instruments = [];
        this.isInitialized = false;
        this.tempo = 120;
        this.isPlaying = false;
        this.currentRow = 0;
        this.patterns = {};
        this.sequence = [];
        this.currentPattern = 0;
        this.intervalId = null;
        
        this.initInstruments();
        this.initPatterns();
    }

    async initialize() {
        if (this.isInitialized) return;
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        
        // Create analyzer for spectrum visualization
        this.analyzer = this.audioContext.createAnalyser();
        this.analyzer.fftSize = 256;
        this.analyzer.smoothingTimeConstant = 0.8;
        this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
        
        // Connect audio chain: masterGain -> analyzer -> destination
        this.masterGain.connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);
        
        this.initChannels();
        this.isInitialized = true;
        console.log('ChiptuneEngine initialized');
    }

    initChannels() {
        this.channels = [];
        for (let i = 0; i < 4; i++) {
            this.channels.push({
                id: i,
                gain: this.audioContext.createGain(),
                volume: 0.8,
                muted: false,
                currentNote: null,
                oscillator: null,
                envelope: null
            });
            this.channels[i].gain.connect(this.masterGain);
            this.channels[i].gain.gain.setValueAtTime(this.channels[i].volume, this.audioContext.currentTime);
        }
    }

    initInstruments() {
        this.instruments = [
            {
                name: 'LEAD',
                waveform: 'square',
                attack: 0.1,
                decay: 0.3,
                sustain: 0.7,
                release: 0.5,
                pulseWidth: 0.5
            },
            {
                name: 'BASS',
                waveform: 'triangle',
                attack: 0.05,
                decay: 0.2,
                sustain: 0.8,
                release: 0.3,
                pulseWidth: 0.5
            },
            {
                name: 'DRUM',
                waveform: 'noise',
                attack: 0.01,
                decay: 0.1,
                sustain: 0.0,
                release: 0.1,
                pulseWidth: 0.5
            },
            {
                name: 'ARPEG',
                waveform: 'pulse',
                attack: 0.05,
                decay: 0.4,
                sustain: 0.6,
                release: 0.8,
                pulseWidth: 0.25
            }
        ];
    }

    initPatterns() {
        this.patterns = {};
        this.sequence = [0]; // Start with just one pattern for demo
        
        for (let p = 0; p < 4; p++) {
            this.patterns[p] = {
                channels: [[], [], [], []],
                length: 64
            };
            
            for (let ch = 0; ch < 4; ch++) {
                for (let row = 0; row < 64; row++) {
                    this.patterns[p].channels[ch][row] = {
                        note: null,
                        instrument: ch,
                        volume: null,
                        effect: null
                    };
                }
            }
        }

        this.generateDemoPattern();
        this.initSampleMusic();
    }

    generateDemoPattern() {
        const scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
        const bassNotes = ['C2', 'F2', 'G2', 'C3'];
        
        // Fill a full 64-row pattern for better looping
        for (let row = 0; row < 64; row++) {
            // Lead melody every 4 rows
            if (row % 4 === 0) {
                this.patterns[0].channels[0][row] = {
                    note: scale[Math.floor(row / 4) % scale.length],
                    instrument: 0,
                    volume: 80,
                    effect: null
                };
            }
            
            // Bass every 8 rows
            if (row % 8 === 0) {
                this.patterns[0].channels[1][row] = {
                    note: bassNotes[Math.floor(row / 16) % bassNotes.length],
                    instrument: 1,
                    volume: 90,
                    effect: null
                };
            }
            
            // Kick drum every 16 rows
            if (row % 16 === 0) {
                this.patterns[0].channels[2][row] = {
                    note: 'C4',
                    instrument: 2,
                    volume: 100,
                    effect: null
                };
            }
            
            // Hi-hat on off-beats
            if (row % 4 === 2) {
                this.patterns[0].channels[2][row] = {
                    note: 'C5',
                    instrument: 2,
                    volume: 60,
                    effect: null
                };
            }
            
            // Arpeggios on specific beats
            if (row % 2 === 1 && row % 8 !== 3 && row % 8 !== 7) {
                this.patterns[0].channels[3][row] = {
                    note: scale[(row + 2) % scale.length],
                    instrument: 3,
                    volume: 60,
                    effect: null
                };
            }
        }
    }

    noteToFrequency(note) {
        if (!note) return 0;
        
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const match = note.match(/([A-G]#?)(\d+)/);
        
        if (!match) return 440;
        
        const noteName = match[1];
        const octave = parseInt(match[2]);
        const noteIndex = noteNames.indexOf(noteName);
        const midiNote = (octave + 1) * 12 + noteIndex;
        
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    }

    createOscillator(instrument, frequency) {
        const osc = this.audioContext.createOscillator();
        
        switch (instrument.waveform) {
            case 'square':
                osc.type = 'square';
                break;
            case 'pulse':
                const real = new Float32Array(2048);
                const imag = new Float32Array(2048);
                const pulseWidth = instrument.pulseWidth || 0.5;
                
                for (let i = 1; i < 2048; i++) {
                    if (i % 2 === 1) {
                        real[i] = (4 / (Math.PI * i)) * Math.sin(Math.PI * i * pulseWidth);
                    }
                }
                
                const wave = this.audioContext.createPeriodicWave(real, imag);
                osc.setPeriodicWave(wave);
                break;
            case 'triangle':
                osc.type = 'triangle';
                break;
            case 'noise':
                return this.createNoiseGenerator();
            default:
                osc.type = 'square';
        }
        
        osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        return osc;
    }

    createNoiseGenerator() {
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        return noise;
    }

    createEnvelope(instrument) {
        const envelope = this.audioContext.createGain();
        envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
        
        const now = this.audioContext.currentTime;
        const attack = instrument.attack || 0.1;
        const decay = instrument.decay || 0.3;
        const sustain = instrument.sustain || 0.7;
        
        envelope.gain.linearRampToValueAtTime(1.0, now + attack);
        envelope.gain.exponentialRampToValueAtTime(sustain, now + attack + decay);
        
        return envelope;
    }

    playNote(channelId, note, instrumentId, volume = 80) {
        if (!this.isInitialized || channelId >= this.channels.length) return;
        
        const channel = this.channels[channelId];
        const instrument = this.instruments[instrumentId] || this.instruments[0];
        
        this.stopNote(channelId);
        
        if (!note) return;
        
        const frequency = this.noteToFrequency(note);
        const osc = this.createOscillator(instrument, frequency);
        const envelope = this.createEnvelope(instrument);
        
        osc.connect(envelope);
        envelope.connect(channel.gain);
        
        const volumeScale = (volume / 100) * (channel.muted ? 0 : 1);
        envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
        
        const now = this.audioContext.currentTime;
        const attack = instrument.attack || 0.1;
        const decay = instrument.decay || 0.3;
        const sustain = (instrument.sustain || 0.7) * volumeScale;
        
        envelope.gain.linearRampToValueAtTime(volumeScale, now + attack);
        envelope.gain.exponentialRampToValueAtTime(Math.max(sustain, 0.001), now + attack + decay);
        
        osc.start(now);
        
        channel.oscillator = osc;
        channel.envelope = envelope;
        channel.currentNote = note;
    }

    stopNote(channelId) {
        if (!this.isInitialized || channelId >= this.channels.length) return;
        
        const channel = this.channels[channelId];
        
        if (channel.oscillator && channel.envelope) {
            const instrument = this.instruments[0];
            const release = instrument.release || 0.5;
            const now = this.audioContext.currentTime;
            
            channel.envelope.gain.cancelScheduledValues(now);
            channel.envelope.gain.setValueAtTime(channel.envelope.gain.value, now);
            channel.envelope.gain.exponentialRampToValueAtTime(0.001, now + release);
            
            channel.oscillator.stop(now + release);
            
            setTimeout(() => {
                if (channel.oscillator) {
                    try {
                        channel.oscillator.disconnect();
                        channel.envelope.disconnect();
                    } catch (e) {}
                }
            }, (release * 1000) + 100);
        }
        
        channel.oscillator = null;
        channel.envelope = null;
        channel.currentNote = null;
    }

    setChannelVolume(channelId, volume) {
        if (channelId < this.channels.length) {
            this.channels[channelId].volume = volume / 100;
            this.channels[channelId].gain.gain.setValueAtTime(
                this.channels[channelId].volume,
                this.audioContext.currentTime
            );
        }
    }

    muteChannel(channelId, muted) {
        if (channelId < this.channels.length) {
            this.channels[channelId].muted = muted;
            const volume = muted ? 0 : this.channels[channelId].volume;
            this.channels[channelId].gain.gain.setValueAtTime(
                volume,
                this.audioContext.currentTime
            );
        }
    }

    play() {
        if (!this.isInitialized || this.isPlaying) return;
        
        this.isPlaying = true;
        // Don't reset if we're resuming from pause
        if (this.currentRow === 0 && this.currentPattern === 0) {
            this.currentRow = 0;
            this.currentPattern = 0;
        }
        
        const rowDuration = (60 / this.tempo / 4) * 1000;
        
        this.intervalId = setInterval(() => {
            this.playRow();
            this.currentRow++;
            
            if (this.currentRow >= 64) {
                this.currentRow = 0;
                this.currentPattern = (this.currentPattern + 1) % this.sequence.length;
                
                // Log pattern transitions for debugging
                console.log(`Switching to pattern ${this.currentPattern} of sequence [${this.sequence.join(',')}]`);
            }
            
            this.updateUI();
        }, rowDuration);
    }

    playRow() {
        const pattern = this.patterns[this.sequence[this.currentPattern]];
        if (!pattern) return;
        
        for (let ch = 0; ch < 4; ch++) {
            const cell = pattern.channels[ch][this.currentRow];
            if (cell && cell.note) {
                this.playNote(ch, cell.note, cell.instrument, cell.volume);
            }
        }
    }

    stop() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        this.currentRow = 0;
        this.currentPattern = 0;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        for (let i = 0; i < this.channels.length; i++) {
            this.stopNote(i);
        }
        
        this.updateUI();
    }

    pause() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        for (let i = 0; i < this.channels.length; i++) {
            this.stopNote(i);
        }
    }

    setTempo(newTempo) {
        this.tempo = newTempo;
        if (this.isPlaying) {
            this.stop();
            this.play();
        }
    }

    updateInstrument(instrumentId, params) {
        if (instrumentId < this.instruments.length) {
            Object.assign(this.instruments[instrumentId], params);
        }
    }

    updateUI() {
        const rowElement = document.getElementById('currentRow');
        if (rowElement) {
            rowElement.textContent = this.currentRow.toString().padStart(2, '0');
        }
        
        this.updateTrackerGrid();
    }

    updateTrackerGrid() {
        const grid = document.getElementById('trackerGrid');
        if (!grid) return;
        
        const pattern = this.patterns[this.sequence[this.currentPattern]];
        if (!pattern) return;
        
        let html = '';
        
        for (let row = 0; row < 32; row++) {
            const isCurrentRow = this.isPlaying && row === this.currentRow;
            html += `<div class="tracker-row ${isCurrentRow ? 'current' : ''}">`;
            html += `<div class="row-number">${row.toString().padStart(2, '0')}</div>`;
            
            for (let ch = 0; ch < 4; ch++) {
                const cell = pattern.channels[ch][row];
                const note = cell.note || '---';
                const inst = cell.instrument !== null ? cell.instrument.toString().padStart(2, '0') : '--';
                const vol = cell.volume !== null ? cell.volume.toString(16).toUpperCase().padStart(2, '0') : '--';
                const fx = cell.effect || '---';
                
                html += `<div class="channel-cell">`;
                html += `<span class="note">${note}</span> `;
                html += `<span class="instrument-num">${inst}</span> `;
                html += `<span class="volume-val">${vol}</span> `;
                html += `<span class="effect">${fx}</span>`;
                html += `</div>`;
            }
            
            html += '</div>';
        }
        
        grid.innerHTML = html;
    }

    exportWav() {
        if (!this.isInitialized) return;
        
        const duration = this.calculateTotalDuration();
        const sampleRate = this.audioContext.sampleRate;
        const numSamples = Math.floor(duration * sampleRate);
        const buffer = this.audioContext.createBuffer(2, numSamples, sampleRate);
        
        this.renderToBuffer(buffer).then(() => {
            const wavBlob = this.bufferToWav(buffer);
            const url = URL.createObjectURL(wavBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `chiptune-${Date.now()}.wav`;
            link.click();
            
            URL.revokeObjectURL(url);
        });
    }

    calculateTotalDuration() {
        const patternDuration = (60 / this.tempo / 4) * 64;
        return patternDuration * this.sequence.length;
    }

    async renderToBuffer(buffer) {
        const leftChannel = buffer.getChannelData(0);
        const rightChannel = buffer.getChannelData(1);
        const sampleRate = buffer.sampleRate;
        const rowDuration = (60 / this.tempo / 4);
        const samplesPerRow = Math.floor(rowDuration * sampleRate);
        
        let sampleOffset = 0;
        
        for (let seqIndex = 0; seqIndex < this.sequence.length; seqIndex++) {
            const pattern = this.patterns[this.sequence[seqIndex]];
            if (!pattern) continue;
            
            for (let row = 0; row < 64; row++) {
                const rowSamples = new Float32Array(samplesPerRow);
                
                for (let ch = 0; ch < 4; ch++) {
                    const cell = pattern.channels[ch][row];
                    if (cell && cell.note) {
                        const noteSamples = this.synthesizeNote(
                            cell.note, 
                            cell.instrument, 
                            cell.volume,
                            rowDuration,
                            sampleRate
                        );
                        
                        for (let i = 0; i < Math.min(rowSamples.length, noteSamples.length); i++) {
                            rowSamples[i] += noteSamples[i] * 0.25;
                        }
                    }
                }
                
                for (let i = 0; i < rowSamples.length && sampleOffset + i < leftChannel.length; i++) {
                    const sample = Math.max(-1, Math.min(1, rowSamples[i]));
                    leftChannel[sampleOffset + i] = sample;
                    rightChannel[sampleOffset + i] = sample;
                }
                
                sampleOffset += samplesPerRow;
            }
        }
    }

    synthesizeNote(note, instrumentId, volume, duration, sampleRate) {
        const frequency = this.noteToFrequency(note);
        const instrument = this.instruments[instrumentId] || this.instruments[0];
        const numSamples = Math.floor(duration * sampleRate);
        const samples = new Float32Array(numSamples);
        const volumeScale = (volume || 80) / 100;
        
        const attack = instrument.attack || 0.1;
        const decay = instrument.decay || 0.3;
        const sustain = instrument.sustain || 0.7;
        const release = instrument.release || 0.5;
        
        const attackSamples = Math.floor(attack * sampleRate);
        const decaySamples = Math.floor(decay * sampleRate);
        const releaseSamples = Math.floor(release * sampleRate);
        const sustainSamples = numSamples - attackSamples - decaySamples - releaseSamples;
        
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            let amplitude = 1;
            
            if (i < attackSamples) {
                amplitude = i / attackSamples;
            } else if (i < attackSamples + decaySamples) {
                const decayProgress = (i - attackSamples) / decaySamples;
                amplitude = 1 - decayProgress * (1 - sustain);
            } else if (i < attackSamples + decaySamples + sustainSamples) {
                amplitude = sustain;
            } else {
                const releaseProgress = (i - attackSamples - decaySamples - sustainSamples) / releaseSamples;
                amplitude = sustain * (1 - releaseProgress);
            }
            
            let sample = 0;
            const phase = (2 * Math.PI * frequency * t) % (2 * Math.PI);
            
            switch (instrument.waveform) {
                case 'square':
                    sample = phase < Math.PI ? 1 : -1;
                    break;
                case 'triangle':
                    sample = phase < Math.PI ? 
                        (2 * phase / Math.PI - 1) : 
                        (3 - 2 * phase / Math.PI);
                    break;
                case 'pulse':
                    const pulseWidth = instrument.pulseWidth || 0.5;
                    sample = phase < (2 * Math.PI * pulseWidth) ? 1 : -1;
                    break;
                case 'noise':
                    sample = Math.random() * 2 - 1;
                    break;
                default:
                    sample = phase < Math.PI ? 1 : -1;
            }
            
            samples[i] = sample * amplitude * volumeScale;
        }
        
        return samples;
    }

    bufferToWav(buffer) {
        const length = buffer.length;
        const numberOfChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
        const view = new DataView(arrayBuffer);
        
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * numberOfChannels * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numberOfChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numberOfChannels * 2, true);
        view.setUint16(32, numberOfChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * numberOfChannels * 2, true);
        
        let offset = 44;
        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                view.setInt16(offset, sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return new Blob([arrayBuffer], { type: 'audio/wav' });
    }

    exportMidi() {
        const midiData = this.generateMidiData();
        const midiBlob = new Blob([midiData], { type: 'audio/midi' });
        const url = URL.createObjectURL(midiBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `chiptune-${Date.now()}.mid`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    generateMidiData() {
        const tracks = [];
        const ticksPerQuarter = 480;
        const microsecondsPerQuarter = Math.floor(60000000 / this.tempo);
        
        for (let ch = 0; ch < 4; ch++) {
            const track = [];
            let currentTick = 0;
            
            for (let seqIndex = 0; seqIndex < this.sequence.length; seqIndex++) {
                const pattern = this.patterns[this.sequence[seqIndex]];
                if (!pattern) continue;
                
                for (let row = 0; row < 64; row++) {
                    const cell = pattern.channels[ch][row];
                    if (cell && cell.note) {
                        const midiNote = this.noteToMidi(cell.note);
                        const velocity = Math.floor((cell.volume || 80) * 127 / 100);
                        
                        track.push({
                            tick: currentTick,
                            type: 'noteOn',
                            channel: ch,
                            note: midiNote,
                            velocity: velocity
                        });
                        
                        track.push({
                            tick: currentTick + ticksPerQuarter / 4,
                            type: 'noteOff',
                            channel: ch,
                            note: midiNote,
                            velocity: 0
                        });
                    }
                    currentTick += ticksPerQuarter / 4;
                }
            }
            
            tracks.push(track);
        }
        
        return this.encodeMidi(tracks, ticksPerQuarter, microsecondsPerQuarter);
    }

    noteToMidi(note) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const match = note.match(/([A-G]#?)(\d+)/);
        
        if (!match) return 60;
        
        const noteName = match[1];
        const octave = parseInt(match[2]);
        const noteIndex = noteNames.indexOf(noteName);
        
        return (octave + 1) * 12 + noteIndex;
    }

    encodeMidi(tracks, ticksPerQuarter, microsecondsPerQuarter) {
        const header = new Uint8Array([
            0x4D, 0x54, 0x68, 0x64,
            0x00, 0x00, 0x00, 0x06,
            0x00, 0x01,
            0x00, tracks.length,
            (ticksPerQuarter >> 8) & 0xFF, ticksPerQuarter & 0xFF
        ]);
        
        const trackData = [];
        
        tracks.forEach(track => {
            const events = [];
            let lastTick = 0;
            
            track.sort((a, b) => a.tick - b.tick);
            
            track.forEach(event => {
                const deltaTime = event.tick - lastTick;
                const deltaTimeBytes = this.encodeVariableLength(deltaTime);
                
                if (event.type === 'noteOn') {
                    events.push(...deltaTimeBytes, 0x90 | event.channel, event.note, event.velocity);
                } else if (event.type === 'noteOff') {
                    events.push(...deltaTimeBytes, 0x80 | event.channel, event.note, event.velocity);
                }
                
                lastTick = event.tick;
            });
            
            events.push(0x00, 0xFF, 0x2F, 0x00);
            
            const trackHeader = new Uint8Array([
                0x4D, 0x54, 0x72, 0x6B,
                (events.length >> 24) & 0xFF,
                (events.length >> 16) & 0xFF,
                (events.length >> 8) & 0xFF,
                events.length & 0xFF
            ]);
            
            trackData.push(new Uint8Array([...trackHeader, ...events]));
        });
        
        const totalLength = header.length + trackData.reduce((sum, track) => sum + track.length, 0);
        const midiFile = new Uint8Array(totalLength);
        let offset = 0;
        
        midiFile.set(header, offset);
        offset += header.length;
        
        trackData.forEach(track => {
            midiFile.set(track, offset);
            offset += track.length;
        });
        
        return midiFile;
    }

    encodeVariableLength(value) {
        const bytes = [];
        bytes.push(value & 0x7F);
        
        value >>= 7;
        while (value > 0) {
            bytes.unshift((value & 0x7F) | 0x80);
            value >>= 7;
        }
        
        return bytes;
    }

    initSampleMusic() {
        this.sampleSongs = {
            'megaman_stage': {
                name: 'Mega Man - Stage Theme',
                tempo: 140,
                patterns: {
                    0: this.createMegaManPattern()
                },
                sequence: [0]
            },
            'zelda_overworld': {
                name: 'Zelda - Overworld Theme',
                tempo: 120,
                patterns: {
                    0: this.createZeldaPattern()
                },
                sequence: [0]
            },
            'c64_classic': {
                name: 'C64 - Synth Melody',
                tempo: 130,
                patterns: {
                    0: this.createC64Pattern()
                },
                sequence: [0]
            },
            'tetris_theme': {
                name: 'Tetris - Theme A',
                tempo: 144,
                patterns: {
                    0: this.createTetrisPattern()
                },
                sequence: [0]
            }
        };
    }

    createMegaManPattern() {
        const pattern = {
            channels: [[], [], [], []],
            length: 64
        };
        
        // Initialize empty pattern
        for (let ch = 0; ch < 4; ch++) {
            for (let row = 0; row < 64; row++) {
                pattern.channels[ch][row] = { note: null, instrument: ch, volume: null, effect: null };
            }
        }
        
        // Mega Man inspired melody - energetic and driving
        const melody = [
            'E5', 'E5', null, 'E5', null, 'C5', 'E5', null,
            'G5', null, null, null, 'G4', null, null, null,
            'C5', null, null, 'G4', null, null, 'E4', null,
            null, 'A4', null, 'B4', null, 'A#4', 'A4', null,
            'G4', 'E5', 'G5', 'A5', null, 'F5', 'G5', null,
            'E5', null, 'C5', 'D5', 'B4', null, null, null,
            'C5', null, null, 'G4', null, null, 'E4', null,
            null, 'A4', null, 'B4', null, 'A#4', 'A4', null
        ];
        
        // Bass line - strong foundation
        const bass = [
            'C3', null, null, null, 'C3', null, null, null,
            'G2', null, null, null, 'G2', null, null, null,
            'C3', null, null, null, 'C3', null, null, null,
            'F2', null, null, null, 'G2', null, null, null,
            'C3', null, null, null, 'C3', null, null, null,
            'G2', null, null, null, 'G2', null, null, null,
            'C3', null, null, null, 'C3', null, null, null,
            'F2', null, null, null, 'G2', null, null, null
        ];
        
        // Drums - driving beat
        const drums = [
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C5', null
        ];
        
        // Harmony/arpeggio
        const harmony = [
            null, 'E4', null, 'G4', null, 'E4', null, 'C4',
            null, 'G4', null, 'B4', null, 'G4', null, null,
            null, 'E4', null, 'G4', null, 'E4', null, 'C4',
            null, 'F4', null, 'A4', null, 'G4', null, 'F4',
            null, 'E4', null, 'G4', null, 'E4', null, 'C4',
            null, 'G4', null, 'B4', null, 'G4', null, null,
            null, 'E4', null, 'G4', null, 'E4', null, 'C4',
            null, 'F4', null, 'A4', null, 'G4', null, 'F4'
        ];
        
        // Fill pattern
        this.fillPatternChannel(pattern, 0, melody, 0, 80);
        this.fillPatternChannel(pattern, 1, bass, 1, 90);
        this.fillPatternChannel(pattern, 2, drums, 2, 85);
        this.fillPatternChannel(pattern, 3, harmony, 3, 60);
        
        return pattern;
    }

    createZeldaPattern() {
        const pattern = {
            channels: [[], [], [], []],
            length: 64
        };
        
        // Initialize empty pattern
        for (let ch = 0; ch < 4; ch++) {
            for (let row = 0; row < 64; row++) {
                pattern.channels[ch][row] = { note: null, instrument: ch, volume: null, effect: null };
            }
        }
        
        // Zelda overworld theme inspired - adventurous and uplifting
        const melody = [
            'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5',
            null, null, 'G5', null, null, null, null, null,
            'E5', 'F#5', 'G5', 'A5', null, 'A5', null, 'G5',
            'E5', null, null, null, null, null, null, null,
            'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5',
            null, null, 'A5', null, 'B5', null, 'C6', null,
            'B5', 'A5', 'G5', 'F#5', 'E5', 'D5', 'C5', 'B4',
            'A4', 'G4', null, null, null, null, null, null
        ];
        
        const bass = [
            'G2', null, null, null, 'G2', null, 'D3', null,
            'G2', null, null, null, 'G2', null, null, null,
            'C3', null, null, null, 'C3', null, 'G2', null,
            'C3', null, null, null, 'D3', null, null, null,
            'G2', null, null, null, 'G2', null, 'D3', null,
            'G2', null, null, null, 'A2', null, null, null,
            'D3', null, 'C3', null, 'B2', null, 'A2', null,
            'G2', null, null, null, 'G2', null, null, null
        ];
        
        const drums = [
            'C4', null, null, 'C5', null, null, 'C4', 'C5',
            null, null, 'C4', null, 'C5', null, null, null,
            'C4', null, null, 'C5', null, null, 'C4', 'C5',
            null, null, 'C4', null, 'C5', null, null, null,
            'C4', null, null, 'C5', null, null, 'C4', 'C5',
            null, null, 'C4', null, 'C5', null, null, null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, null, null, 'C5', null, null, null
        ];
        
        const harmony = [
            null, 'D4', null, 'E4', null, 'G4', null, 'B4',
            null, 'D5', null, null, null, null, null, null,
            null, 'C4', null, 'E4', null, 'G4', null, 'C5',
            null, null, null, null, null, null, null, null,
            null, 'D4', null, 'E4', null, 'G4', null, 'B4',
            null, 'D5', null, 'F#5', null, 'A5', null, null,
            null, 'D5', null, 'C5', null, 'B4', null, 'A4',
            null, 'G4', null, null, null, null, null, null
        ];
        
        this.fillPatternChannel(pattern, 0, melody, 0, 85);
        this.fillPatternChannel(pattern, 1, bass, 1, 90);
        this.fillPatternChannel(pattern, 2, drums, 2, 80);
        this.fillPatternChannel(pattern, 3, harmony, 3, 55);
        
        return pattern;
    }

    createC64Pattern() {
        const pattern = {
            channels: [[], [], [], []],
            length: 64
        };
        
        // Initialize empty pattern
        for (let ch = 0; ch < 4; ch++) {
            for (let row = 0; row < 64; row++) {
                pattern.channels[ch][row] = { note: null, instrument: ch, volume: null, effect: null };
            }
        }
        
        // C64 inspired - characteristic arpeggios and sid-style melodies
        const melody = [
            'C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'C5', null,
            'D5', 'F#5', 'A5', 'D6', 'A5', 'F#5', 'D5', null,
            'E5', 'G5', 'B5', 'E6', 'B5', 'G5', 'E5', null,
            'F5', 'A5', 'C6', 'F6', 'C6', 'A5', 'F5', null,
            'G5', 'B5', 'D6', 'G6', 'D6', 'B5', 'G5', null,
            'A5', 'C6', 'E6', 'A6', 'E6', 'C6', 'A5', null,
            'B5', 'D6', 'F#6', 'B6', 'F#6', 'D6', 'B5', null,
            'C6', 'G5', 'E5', 'C5', null, null, null, null
        ];
        
        const bass = [
            'C2', null, null, null, 'G2', null, null, null,
            'D2', null, null, null, 'A2', null, null, null,
            'E2', null, null, null, 'B2', null, null, null,
            'F2', null, null, null, 'C3', null, null, null,
            'G2', null, null, null, 'D3', null, null, null,
            'A2', null, null, null, 'E3', null, null, null,
            'B2', null, null, null, 'F#3', null, null, null,
            'C3', null, null, null, 'G2', null, null, null
        ];
        
        const drums = [
            'C4', null, 'C5', null, 'C4', null, 'C5', 'C4',
            null, 'C5', null, 'C4', null, 'C5', null, null,
            'C4', null, 'C5', null, 'C4', null, 'C5', 'C4',
            null, 'C5', null, 'C4', null, 'C5', null, null,
            'C4', null, 'C5', null, 'C4', null, 'C5', 'C4',
            null, 'C5', null, 'C4', null, 'C5', null, null,
            'C4', 'C5', 'C4', 'C5', 'C4', 'C5', 'C4', 'C5',
            'C4', null, null, null, null, null, null, null
        ];
        
        const arpeggio = [
            'C4', 'E4', 'G4', 'C5', 'G4', 'E4', null, null,
            'D4', 'F#4', 'A4', 'D5', 'A4', 'F#4', null, null,
            'E4', 'G4', 'B4', 'E5', 'B4', 'G4', null, null,
            'F4', 'A4', 'C5', 'F5', 'C5', 'A4', null, null,
            'G4', 'B4', 'D5', 'G5', 'D5', 'B4', null, null,
            'A4', 'C5', 'E5', 'A5', 'E5', 'C5', null, null,
            'B4', 'D5', 'F#5', 'B5', 'F#5', 'D5', null, null,
            'C5', 'G4', 'E4', 'C4', null, null, null, null
        ];
        
        this.fillPatternChannel(pattern, 0, melody, 0, 80);
        this.fillPatternChannel(pattern, 1, bass, 1, 95);
        this.fillPatternChannel(pattern, 2, drums, 2, 75);
        this.fillPatternChannel(pattern, 3, arpeggio, 3, 65);
        
        return pattern;
    }

    createTetrisPattern() {
        const pattern = {
            channels: [[], [], [], []],
            length: 64
        };
        
        // Initialize empty pattern
        for (let ch = 0; ch < 4; ch++) {
            for (let row = 0; row < 64; row++) {
                pattern.channels[ch][row] = { note: null, instrument: ch, volume: null, effect: null };
            }
        }
        
        // Tetris Theme A (Korobeiniki) - Russian folk melody
        const melody = [
            'E5', 'B4', 'C5', 'D5', 'C5', 'B4', 'A4', null,
            'A4', 'C5', 'E5', null, 'D5', 'C5', 'B4', null,
            null, 'C5', 'D5', null, 'E5', null, 'C5', null,
            'A4', null, 'A4', null, null, null, null, null,
            null, 'D5', null, 'F5', 'A5', null, 'G5', 'F5',
            'E5', null, null, 'C5', 'E5', null, 'D5', 'C5',
            'B4', null, null, 'C5', 'D5', null, 'E5', null,
            'C5', null, 'A4', null, 'A4', null, null, null
        ];
        
        const bass = [
            'A2', null, null, null, 'A2', null, null, null,
            'E2', null, null, null, 'E2', null, null, null,
            'F2', null, null, null, 'C3', null, null, null,
            'G2', null, null, null, 'G2', null, null, null,
            'D3', null, null, null, 'D3', null, null, null,
            'A2', null, null, null, 'C3', null, null, null,
            'E2', null, null, null, 'F2', null, null, null,
            'A2', null, null, null, 'A2', null, null, null
        ];
        
        const drums = [
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C4', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', null, 'C5', null,
            'C4', null, 'C5', null, 'C4', 'C5', 'C4', null
        ];
        
        const harmony = [
            null, 'E4', null, 'G4', null, 'E4', null, 'C4',
            null, 'C4', null, 'E4', null, 'G4', null, 'E4',
            null, 'F4', null, 'A4', null, 'C5', null, 'A4',
            null, 'G4', null, 'B4', null, 'G4', null, null,
            null, 'D4', null, 'F4', null, 'A4', null, 'F4',
            null, 'E4', null, 'G4', null, 'C5', null, 'G4',
            null, 'E4', null, 'G4', null, 'B4', null, 'G4',
            null, 'A4', null, 'C5', null, 'A4', null, null
        ];
        
        this.fillPatternChannel(pattern, 0, melody, 0, 85);
        this.fillPatternChannel(pattern, 1, bass, 1, 90);
        this.fillPatternChannel(pattern, 2, drums, 2, 80);
        this.fillPatternChannel(pattern, 3, harmony, 3, 60);
        
        return pattern;
    }

    fillPatternChannel(pattern, channel, notes, instrument, volume) {
        for (let i = 0; i < notes.length && i < 64; i++) {
            if (notes[i]) {
                pattern.channels[channel][i] = {
                    note: notes[i],
                    instrument: instrument,
                    volume: volume,
                    effect: null
                };
            }
        }
    }

    loadSampleSong(songKey) {
        if (this.sampleSongs[songKey]) {
            const song = this.sampleSongs[songKey];
            this.patterns = song.patterns;
            this.sequence = song.sequence;
            this.tempo = song.tempo;
            this.currentPattern = 0;
            this.currentRow = 0;
            
            console.log(`Loaded: ${song.name}`);
            this.updateUI();
            
            return true;
        }
        return false;
    }

    getSampleSongList() {
        return Object.keys(this.sampleSongs).map(key => ({
            key: key,
            name: this.sampleSongs[key].name
        }));
    }

    getFrequencyData() {
        if (this.analyzer) {
            this.analyzer.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        }
        return null;
    }

    saveProject() {
        const projectData = {
            instruments: this.instruments,
            patterns: this.patterns,
            sequence: this.sequence,
            tempo: this.tempo
        };
        
        const dataStr = JSON.stringify(projectData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chiptune-project.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    loadProject(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const projectData = JSON.parse(e.target.result);
                this.instruments = projectData.instruments || this.instruments;
                this.patterns = projectData.patterns || this.patterns;
                this.sequence = projectData.sequence || this.sequence;
                this.tempo = projectData.tempo || this.tempo;
                
                this.updateUI();
                console.log('Project loaded successfully');
            } catch (error) {
                console.error('Error loading project:', error);
            }
        };
        reader.readAsText(file);
    }
}