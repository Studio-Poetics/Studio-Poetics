# 🕉️ Rishi Rhythm - Vedic Lifestyle PWA

A Progressive Web App for traditional Vedic daily rhythms, mantras, and hora calculations.

## ✨ Features

- **📿 50 Authentic Vedic Mantras** - Complete Sanskrit texts with English translations
- **⏰ Vedic Time Calculation** - Accurate Brahma Muhurta and sunrise-based scheduling
- **🌅 Hora Tracking** - Traditional planetary hour calculations
- **📱 Progressive Web App** - Install on mobile devices for offline use
- **🎵 Audio Visualization** - Beautiful visual effects during mantra playback
- **🌍 Location-Aware** - Automatic sunrise/sunset times based on your location
- **📅 Dual Schedule Modes** - Authentic Vedic vs Modern Adapted
- **🌙 Dark/Light Themes** - Rishimode for enhanced experience
- **🔄 Real-time Updates** - Live time tracking and schedule highlighting

## 🚀 Live Demo

Visit: [https://poetics.studio/rishi](https://poetics.studio/rishi)

## 📱 Install as PWA

1. Open the app in your mobile browser
2. Tap the "Install App" button when prompted
3. Add to home screen for native app experience

## 🔧 GitHub Pages Deployment

This repository is ready for GitHub Pages:

1. **Push to GitHub**: Upload all files to your repository
2. **Enable Pages**: Go to Settings > Pages > Deploy from branch `main`
3. **Custom Domain** (optional): Edit `CNAME` file
4. **Icons**: Add PWA icons to `/icons/` folder

### Required Files for PWA:
- ✅ `manifest.json` - PWA configuration
- ✅ `sw.js` - Service worker for offline functionality
- ✅ `index.html` - Updated with CDN React (GitHub Pages compatible)
- ✅ `app.js` - Standalone JavaScript (no modules)
- ✅ `.nojekyll` - Disable Jekyll processing

## 📋 Schedule Modes

### Authentic Vedic
Based on original texts (Charaka Samhita, Sushruta Samhita):
- Brahma Muhurta: 48 minutes, 96 minutes before sunrise
- Complete traditional daily rhythm
- Original Sanskrit terminologies

### Modern Adapted
Adjusted for contemporary lifestyle:
- Simplified schedule structure
- Work-life balance integration
- Maintained spiritual essence

## 🎯 Usage

1. Allow location access for accurate times
2. Choose between Authentic or Adapted schedule
3. Follow the daily rhythm cards
4. Listen to daily mantras with visual effects
5. Check current hora for optimal activity timing

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Network access (mobile testing)
npm run serve

# Build for production
npm run build
```

## File Structure

```
Rishi/
├── src/
│   └── app.jsx          # Main application component
├── audio/
│   ├── shuddh/          # Mantra pronunciation files
│   ├── ambience/        # Ambient sounds
│   └── brahma_chime.mp3 # Notification sound
├── index.html           # Entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Build configuration
└── README.md           # This file
```

## Key Improvements Made

1. **Enhanced Hora Calculation**: Fixed night-time calculations and error handling
2. **Visual Audio Effects**: Added real-time audio visualization with ripples and frequency bars
3. **Whiter Background**: Changed from greyish to clean white background
4. **Complete Project Structure**: Ready for mobile deployment
5. **Network-Accessible Server**: Can be tested on mobile devices

## Audio Files

The app expects audio files in the `/audio/` directory. Currently using placeholder paths. For a complete implementation:
- Add 50 mantra files: `/audio/shuddh/mantra01.mp3` through `/audio/shuddh/mantra50.mp3`
- Add ambient drone: `/audio/ambience/tanpura_drone.mp3`
- Add chime sound: `/audio/brahma_chime.mp3`

## License

MIT License - Feel free to modify and distribute.