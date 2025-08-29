class PatternEditor {
    constructor(engine) {
        this.engine = engine;
        this.currentPattern = 0;
        this.currentRow = 0;
        this.currentChannel = 0;
        this.currentInstrument = 0;
        this.isEditing = false;
        this.clipboard = null;
        
        this.initEventListeners();
        this.updateDisplay();
    }

    initEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        const grid = document.getElementById('trackerGrid');
        if (grid) {
            grid.addEventListener('click', (e) => this.handleGridClick(e));
        }

        const patternSelect = document.getElementById('patternSelect');
        if (patternSelect) {
            patternSelect.addEventListener('change', (e) => {
                this.currentPattern = parseInt(e.target.value);
                this.updateDisplay();
            });
        }

        const instrumentList = document.getElementById('instrumentList');
        if (instrumentList) {
            instrumentList.addEventListener('click', (e) => {
                if (e.target.classList.contains('instrument')) {
                    const instruments = instrumentList.querySelectorAll('.instrument');
                    instruments.forEach(inst => inst.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentInstrument = parseInt(e.target.dataset.instrument);
                }
            });
        }
    }

    handleKeyDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
            return;
        }

        e.preventDefault();
        
        const noteKeys = {
            'KeyZ': 'C',
            'KeyS': 'C#',
            'KeyX': 'D',
            'KeyD': 'D#',
            'KeyC': 'E',
            'KeyV': 'F',
            'KeyG': 'F#',
            'KeyB': 'G',
            'KeyH': 'G#',
            'KeyN': 'A',
            'KeyJ': 'A#',
            'KeyM': 'B',
            'Comma': 'C',
            'KeyL': 'C#',
            'Period': 'D',
            'Semicolon': 'D#',
            'Slash': 'E',
            'KeyQ': 'C',
            'Digit2': 'C#',
            'KeyW': 'D',
            'Digit3': 'D#',
            'KeyE': 'E',
            'KeyR': 'F',
            'Digit5': 'F#',
            'KeyT': 'G',
            'Digit6': 'G#',
            'KeyY': 'A',
            'Digit7': 'A#',
            'KeyU': 'B',
            'KeyI': 'C',
            'Digit9': 'C#',
            'KeyO': 'D',
            'Digit0': 'D#',
            'KeyP': 'E'
        };

        if (noteKeys[e.code]) {
            let octave = 4;
            if (e.shiftKey) octave = 5;
            if (e.ctrlKey) octave = 3;
            if (e.altKey) octave = 6;
            
            const note = noteKeys[e.code] + octave;
            this.enterNote(note);
            this.engine.playNote(this.currentChannel, note, this.currentInstrument, 80);
            return;
        }

        switch (e.code) {
            case 'ArrowUp':
                this.currentRow = Math.max(0, this.currentRow - 1);
                break;
            case 'ArrowDown':
                this.currentRow = Math.min(63, this.currentRow + 1);
                break;
            case 'ArrowLeft':
                this.currentChannel = Math.max(0, this.currentChannel - 1);
                break;
            case 'ArrowRight':
                this.currentChannel = Math.min(3, this.currentChannel + 1);
                break;
            case 'PageUp':
                this.currentRow = Math.max(0, this.currentRow - 16);
                break;
            case 'PageDown':
                this.currentRow = Math.min(63, this.currentRow + 16);
                break;
            case 'Home':
                this.currentRow = 0;
                break;
            case 'End':
                this.currentRow = 63;
                break;
            case 'Delete':
            case 'Period':
                if (e.code === 'Period' && !e.shiftKey) break;
                this.deleteNote();
                break;
            case 'Space':
                if (this.engine.isPlaying) {
                    this.engine.pause();
                } else {
                    this.engine.play();
                }
                break;
            case 'Enter':
                this.engine.stop();
                break;
            case 'KeyF':
                if (e.ctrlKey) {
                    this.showFindDialog();
                }
                break;
            case 'KeyC':
                if (e.ctrlKey) {
                    this.copySelection();
                }
                break;
            case 'KeyV':
                if (e.ctrlKey) {
                    this.pasteSelection();
                }
                break;
            case 'KeyA':
                if (e.ctrlKey) {
                    this.selectAll();
                }
                break;
            case 'F1':
            case 'F2':
            case 'F3':
            case 'F4':
                this.currentInstrument = parseInt(e.code.slice(-1)) - 1;
                this.updateInstrumentSelection();
                break;
            case 'Tab':
                if (e.shiftKey) {
                    this.currentChannel = Math.max(0, this.currentChannel - 1);
                } else {
                    this.currentChannel = Math.min(3, this.currentChannel + 1);
                }
                break;
        }

        this.updateDisplay();
    }

    handleKeyUp(e) {
        const noteKeys = {
            'KeyZ': 'C4', 'KeyS': 'C#4', 'KeyX': 'D4', 'KeyD': 'D#4', 'KeyC': 'E4',
            'KeyV': 'F4', 'KeyG': 'F#4', 'KeyB': 'G4', 'KeyH': 'G#4', 'KeyN': 'A4',
            'KeyJ': 'A#4', 'KeyM': 'B4'
        };

        if (noteKeys[e.code]) {
            this.engine.stopNote(this.currentChannel);
        }
    }

    handleGridClick(e) {
        const row = e.target.closest('.tracker-row');
        if (row) {
            const rows = Array.from(row.parentNode.children);
            this.currentRow = rows.indexOf(row);
            
            const cell = e.target.closest('.channel-cell');
            if (cell) {
                const cells = Array.from(row.querySelectorAll('.channel-cell'));
                this.currentChannel = cells.indexOf(cell);
            }
            
            this.updateDisplay();
        }
    }

    enterNote(note) {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        pattern.channels[this.currentChannel][this.currentRow] = {
            note: note,
            instrument: this.currentInstrument,
            volume: 80,
            effect: null
        };

        this.currentRow = Math.min(63, this.currentRow + 1);
    }

    deleteNote() {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        pattern.channels[this.currentChannel][this.currentRow] = {
            note: null,
            instrument: null,
            volume: null,
            effect: null
        };
    }

    copySelection() {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        this.clipboard = {
            data: JSON.parse(JSON.stringify(pattern.channels[this.currentChannel][this.currentRow])),
            type: 'single'
        };
    }

    pasteSelection() {
        if (!this.clipboard) return;

        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        if (this.clipboard.type === 'single') {
            pattern.channels[this.currentChannel][this.currentRow] = 
                JSON.parse(JSON.stringify(this.clipboard.data));
        }
    }

    selectAll() {
        console.log('Select all not implemented yet');
    }

    showFindDialog() {
        const searchTerm = prompt('Find note (e.g., C4, D#5):');
        if (searchTerm) {
            this.findNote(searchTerm);
        }
    }

    findNote(searchTerm) {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        for (let row = this.currentRow + 1; row < 64; row++) {
            for (let ch = 0; ch < 4; ch++) {
                const cell = pattern.channels[ch][row];
                if (cell && cell.note === searchTerm) {
                    this.currentRow = row;
                    this.currentChannel = ch;
                    this.updateDisplay();
                    return;
                }
            }
        }

        for (let row = 0; row <= this.currentRow; row++) {
            for (let ch = 0; ch < 4; ch++) {
                const cell = pattern.channels[ch][row];
                if (cell && cell.note === searchTerm) {
                    this.currentRow = row;
                    this.currentChannel = ch;
                    this.updateDisplay();
                    return;
                }
            }
        }

        alert('Note not found');
    }

    updateInstrumentSelection() {
        const instruments = document.querySelectorAll('.instrument');
        instruments.forEach((inst, index) => {
            inst.classList.toggle('active', index === this.currentInstrument);
        });
    }

    updateDisplay() {
        this.updateTrackerGrid();
        this.updatePatternInfo();
        this.updateInstrumentSelection();
    }

    updateTrackerGrid() {
        const grid = document.getElementById('trackerGrid');
        if (!grid) return;

        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        let html = '';
        
        const startRow = Math.max(0, this.currentRow - 10);
        const endRow = Math.min(64, startRow + 21);

        for (let row = startRow; row < endRow; row++) {
            const isCurrentRow = row === this.currentRow;
            const isPlayingRow = this.engine.isPlaying && row === this.engine.currentRow;
            
            html += `<div class="tracker-row ${isCurrentRow ? 'selected' : ''} ${isPlayingRow ? 'current' : ''}">`;
            html += `<div class="row-number">${row.toString().padStart(2, '0')}</div>`;
            
            for (let ch = 0; ch < 4; ch++) {
                const cell = pattern.channels[ch][row];
                const isCurrentCell = isCurrentRow && ch === this.currentChannel;
                const note = cell.note || '---';
                const inst = cell.instrument !== null ? cell.instrument.toString().padStart(2, '0') : '--';
                const vol = cell.volume !== null ? Math.floor(cell.volume / 6.25).toString(16).toUpperCase().padStart(2, '0') : '--';
                const fx = cell.effect || '---';
                
                html += `<div class="channel-cell ${isCurrentCell ? 'current-cell' : ''}" data-channel="${ch}" data-row="${row}">`;
                html += `<span class="note">${note}</span> `;
                html += `<span class="instrument-num">${inst}</span> `;
                html += `<span class="volume-val">${vol}</span> `;
                html += `<span class="effect">${fx}</span>`;
                html += `</div>`;
            }
            
            html += '</div>';
        }
        
        grid.innerHTML = html;

        const currentCell = grid.querySelector('.current-cell');
        if (currentCell) {
            currentCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    updatePatternInfo() {
        const currentRowElement = document.getElementById('currentRow');
        if (currentRowElement) {
            currentRowElement.textContent = this.currentRow.toString().padStart(2, '0');
        }

        const currentChannelElement = document.getElementById('currentChannel');
        if (currentChannelElement) {
            currentChannelElement.textContent = (this.currentChannel + 1).toString();
        }

        const currentInstrumentElement = document.getElementById('currentInstrument');
        if (currentInstrumentElement) {
            currentInstrumentElement.textContent = (this.currentInstrument + 1).toString().padStart(2, '0');
        }

        const patternSelect = document.getElementById('patternSelect');
        if (patternSelect) {
            patternSelect.value = this.currentPattern.toString();
        }
    }

    generateRandomPattern() {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        const scales = {
            major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            minor: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
            pentatonic: ['C', 'D', 'F', 'G', 'A']
        };

        const scale = scales.major;
        const octaves = [3, 4, 5];

        for (let row = 0; row < 64; row++) {
            for (let ch = 0; ch < 4; ch++) {
                if (Math.random() < 0.3) {
                    const note = scale[Math.floor(Math.random() * scale.length)];
                    const octave = octaves[Math.floor(Math.random() * octaves.length)];
                    
                    pattern.channels[ch][row] = {
                        note: note + octave,
                        instrument: ch,
                        volume: 60 + Math.floor(Math.random() * 40),
                        effect: null
                    };
                } else {
                    pattern.channels[ch][row] = {
                        note: null,
                        instrument: null,
                        volume: null,
                        effect: null
                    };
                }
            }
        }

        this.updateDisplay();
    }

    clearPattern() {
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        for (let ch = 0; ch < 4; ch++) {
            for (let row = 0; row < 64; row++) {
                pattern.channels[ch][row] = {
                    note: null,
                    instrument: null,
                    volume: null,
                    effect: null
                };
            }
        }

        this.updateDisplay();
    }

    transposeSelection(semitones) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const pattern = this.engine.patterns[this.currentPattern];
        if (!pattern) return;

        const cell = pattern.channels[this.currentChannel][this.currentRow];
        if (!cell || !cell.note) return;

        const match = cell.note.match(/([A-G]#?)(\d+)/);
        if (!match) return;

        const noteName = match[1];
        const octave = parseInt(match[2]);
        
        let noteIndex = noteNames.indexOf(noteName);
        let newOctave = octave;
        
        noteIndex += semitones;
        
        while (noteIndex < 0) {
            noteIndex += 12;
            newOctave--;
        }
        while (noteIndex >= 12) {
            noteIndex -= 12;
            newOctave++;
        }
        
        if (newOctave >= 0 && newOctave <= 8) {
            cell.note = noteNames[noteIndex] + newOctave;
        }

        this.updateDisplay();
    }

    interpolate() {
        console.log('Interpolate not implemented yet');
    }

    quantize() {
        console.log('Quantize not implemented yet');
    }
}

const CSS_ADDITIONS = `
.selected {
    background: rgba(255, 107, 53, 0.2) !important;
    border-color: #ff6b35 !important;
}

.current-cell {
    background: rgba(0, 255, 65, 0.4) !important;
    outline: 2px solid #00ff41;
    outline-offset: -1px;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
    position: relative;
}

.current-cell::before {
    content: "▶";
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    color: #00ff41;
    font-size: 8px;
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.tracker-row.current {
    background: rgba(255, 107, 53, 0.15);
}

.edit-cursor {
    border-left: 2px solid #ffff00;
    animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
    0%, 50% { border-left-color: #ffff00; }
    51%, 100% { border-left-color: transparent; }
}
`;

const style = document.createElement('style');
style.textContent = CSS_ADDITIONS;
document.head.appendChild(style);