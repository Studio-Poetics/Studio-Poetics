# ChipTracker 🎵

A demoscene-inspired chiptune generator and tracker that runs entirely in your web browser. Create authentic 8-bit music with a classic tracker interface reminiscent of the demoscene era.

## ✨ Features

- **Classic Tracker Interface**: Authentic pattern-based music sequencing
- **4 Channel Audio**: Four independent audio channels for complex compositions
- **Multiple Waveforms**: Square, pulse, triangle, and noise waveforms
- **Real-time Synthesis**: Web Audio API powered chiptune synthesis
- **ADSR Envelopes**: Attack, Decay, Sustain, Release controls for each instrument
- **Pattern Sequencer**: Organize patterns into complete songs
- **Export Options**: Export as WAV or MIDI files
- **Project Save/Load**: Save and share your compositions
- **Demoscene Aesthetics**: Authentic retro visual design with green terminal styling

## 🎮 Controls

### Keyboard Shortcuts

#### Notes
- **Z-M**: Notes (C4-E5) - Bottom row of keyboard
- **Q-P**: Notes (C5-E6) - Top row of keyboard  
- **Shift + Note**: Play one octave higher
- **Ctrl + Note**: Play one octave lower

#### Navigation
- **Arrow Keys**: Navigate the pattern editor
- **Page Up/Down**: Jump 16 rows
- **Home/End**: Go to first/last row
- **Tab/Shift+Tab**: Switch between channels

#### Playback
- **Space**: Play/Pause
- **Enter**: Stop
- **F1-F4**: Select instruments

#### Pattern Editing
- **Delete**: Clear current cell
- **Ctrl+C**: Copy current cell
- **Ctrl+V**: Paste to current cell
- **Ctrl+R**: Generate random pattern
- **Ctrl+L**: Clear pattern

#### Project Management
- **Ctrl+N**: New project
- **Ctrl+S**: Save project
- **Ctrl+O**: Load project

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. Click "Click to Start Audio Engine" to initialize Web Audio
3. Use the keyboard to play notes in real-time
4. Navigate with arrow keys and enter notes into the pattern
5. Use the transport controls to play your creation
6. Adjust instruments using the parameter sliders
7. Export your finished track as WAV or MIDI

## 🎛️ Interface Guide

### Pattern Editor
- **Rows**: 64 rows per pattern (00-3F in hex)
- **Channels**: 4 channels (CH1-CH4) 
- **Note Column**: Musical note (C4, D#5, etc.)
- **Instrument**: Instrument number (00-03)
- **Volume**: Note volume in hex (00-FF)
- **Effect**: Effect command (future feature)

### Instruments
- **LEAD**: Square wave lead sound
- **BASS**: Triangle wave bass sound  
- **DRUM**: Noise-based percussion
- **ARPEG**: Pulse wave for arpeggios

### Channel Controls
- **Volume Sliders**: Adjust channel levels
- **Mute Buttons**: Solo/mute channels
- **Real-time Parameter Editing**: Modify ADSR envelopes

## 🔧 Technical Details

- **Pure JavaScript**: No external dependencies
- **Web Audio API**: Real-time audio synthesis
- **Responsive Design**: Works on desktop and mobile
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **GitHub Pages Ready**: Static hosting compatible

## 🎨 Demoscene Heritage

This tracker pays homage to the demoscene trackers that defined chiptune music:
- **FastTracker 2** inspired interface
- **ProTracker** style pattern editing
- **Authentic 8-bit** sound synthesis
- **Terminal-style** green-on-black aesthetics
- **Minimalist** yet powerful workflow

## 📁 File Structure

```
chiptune/
├── index.html          # Main HTML interface
├── style.css           # Demoscene-inspired styling  
├── audio-engine.js     # Web Audio synthesis engine
├── pattern-editor.js   # Tracker pattern editor
├── main.js            # Application coordinator
└── README.md          # This file
```

## 🌐 GitHub Pages Deployment

To deploy on GitHub Pages:

1. Push code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your tracker will be available at `https://username.github.io/repository-name`

## 🎵 Demo Patterns

The tracker includes a demo pattern to get you started. Press Space to hear an example of what's possible!

## 🔮 Roadmap

- [ ] Effect commands (vibrato, arpeggio, etc.)
- [ ] More waveforms and synthesis options
- [ ] Pattern effects and automation
- [ ] Sample-based instruments
- [ ] MIDI input support
- [ ] Song arrangement view
- [ ] Additional export formats

## 🤝 Contributing

This is a pure client-side web application. Contributions welcome!

## 📄 License

MIT License - Feel free to use and modify for your own projects.

---

*Made with ❤️ for the demoscene community*