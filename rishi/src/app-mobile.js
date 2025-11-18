// Mobile version - uses global React, ReactDOM, and SunCalc
const { useState, useEffect, useRef } = React;

// Audio Visualizer Component
function AudioVisualizer({ isPlaying, audioRef }) {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById('audioCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (isPlaying && audioRef.current) {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContextRef.current.createMediaElementSource(audioRef.current);
          const analyser = audioContextRef.current.createAnalyser();

          analyser.fftSize = 256;
          source.connect(analyser);
          analyser.connect(audioContextRef.current.destination);
          analyserRef.current = analyser;
        } catch (e) {
          console.warn('Audio context failed:', e);
        }
      }

      if (analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const animate = () => {
          if (!isPlaying) return;

          analyserRef.current.getByteFrequencyData(dataArray);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height * 0.4;

            const intensity = dataArray[i] / 255;
            ctx.fillStyle = `rgba(196, 122, 84, ${intensity * 0.6})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
          }

          const avgFreq = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
          if (avgFreq > 50) {
            const rippleSize = (avgFreq / 255) * 300;
            const opacity = Math.min(0.8, avgFreq / 255);

            ctx.strokeStyle = `rgba(196, 122, 84, ${opacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, rippleSize, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.strokeStyle = `rgba(196, 122, 84, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, rippleSize * 0.6, 0, 2 * Math.PI);
            ctx.stroke();
          }

          animationRef.current = requestAnimationFrame(animate);
        };

        animate();
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return null;
}

// Enhanced Rishi Rhythm App Component
function RishiRhythmApp() {
  const ACCENT = "#C47A54";

  // state
  const [coords, setCoords] = useState(null);
  const [manualCoords, setManualCoords] = useState({ lat: "", lon: "" });
  const [sunTimes, setSunTimes] = useState(null);
  const [now, setNow] = useState(new Date());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [rishiMode, setRishiMode] = useState(false);
  const [muteChime, setMuteChime] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scheduleMode, setScheduleMode] = useState("authentic");

  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  // clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Enhanced geolocation with better error handling
  useEffect(() => {
    const savedCoords = localStorage.getItem('rishiRhythmCoords');
    if (savedCoords) {
      try {
        const parsed = JSON.parse(savedCoords);
        if (parsed.lat && parsed.lon) {
          setCoords(parsed);
          setManualCoords({ lat: parsed.lat.toString(), lon: parsed.lon.toString() });
          setLocationStatus('granted');
          return;
        }
      } catch (e) {
        console.warn('Failed to parse saved coordinates:', e);
      }
    }

    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        setCoords(newCoords);
        setManualCoords({ lat: newCoords.lat.toString(), lon: newCoords.lon.toString() });
        setLocationStatus('granted');
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        setLocationStatus('denied');
      },
      options
    );
  }, []);

  // sun times update
  useEffect(() => {
    const used = coords || (manualCoords.lat && manualCoords.lon ? { lat: Number(manualCoords.lat), lon: Number(manualCoords.lon) } : null);
    if (!used) return;
    try {
      setSunTimes(SunCalc.getTimes(now, used.lat, used.lon));
    } catch (e) {
      console.error(e);
    }
  }, [coords, manualCoords, now]);

  // utilities
  function toTime(t) {
    if (!t) return "—";
    return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  function addMinutes(d, mins) {
    return new Date(d.getTime() + mins * 60000);
  }

  // MANTRAS (50)
  const MANTRAS = [
    {
      en: "Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat — The sacred Gayatri Mantra for illumination and guidance.",
      hi: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
      bija: "ॐ",
      audio: "/audio/shuddh/mantra01.mp3"
    },
    {
      en: "Om Namah Shivaya — I bow to Lord Shiva, the auspicious one.",
      hi: "ॐ नमः शिवाय",
      bija: "ॐ नमः",
      audio: "/audio/shuddh/mantra02.mp3"
    },
    {
      en: "Lokah Samastah Sukhino Bhavantu — May all beings everywhere be happy and free.",
      hi: "लोकाः समस्ताः सुखिनो भवन्तु",
      bija: "ॐ शान्तिः",
      audio: "/audio/shuddh/mantra03.mp3"
    }
    // ... truncated for brevity, but would include all 50 mantras
  ];

  // select today's mantra by date
  const dayIndex = new Date().getDate() % MANTRAS.length;
  const todaysMantra = MANTRAS[dayIndex] || MANTRAS[0];

  const mantraText = lang === "hi" ? todaysMantra.hi : todaysMantra.en;
  const mantraBija = todaysMantra.bija || "";

  // State for hora info modal
  const [showHoraInfo, setShowHoraInfo] = useState(false);
  const [locationStatus, setLocationStatus] = useState('requesting');

  // Simple schedule function for mobile
  function buildAuthenticSchedule() {
    const sr = sunTimes?.sunrise ? new Date(sunTimes.sunrise) : new Date(new Date().setHours(6,30,0,0));
    const ss = sunTimes?.sunset ? new Date(sunTimes.sunset) : new Date(new Date().setHours(18,0,0,0));
    const brahmaStart = addMinutes(sr, -96);

    return [
      {
        id: "brahma_muhurta",
        title: lang === "hi" ? "ब्रह्म मुहूर्त साधना" : "Brahma Muhurta Sadhana",
        start: brahmaStart,
        duration: 48,
        desc: lang === "hi" ? "ध्यान, प्राणायाम, वेद स्तुति" : "Meditation, pranayama, Vedic chanting"
      },
      {
        id: "sunrise",
        title: lang === "hi" ? "सूर्योदय दर्शन" : "Sunrise Observation",
        start: sr,
        duration: 30,
        desc: lang === "hi" ? "सूर्य नमस्कार" : "Sun salutation"
      }
      // Simplified for mobile demo
    ];
  }

  function buildAdjustedSchedule() {
    return buildAuthenticSchedule(); // Simplified for demo
  }

  function buildFullSchedule() {
    return scheduleMode === "authentic" ? buildAuthenticSchedule() : buildAdjustedSchedule();
  }

  const fullSchedule = buildFullSchedule();

  // translations
  const T = {
    en: {
      settings: "Settings",
      scheduleMode: "Schedule Type",
      authentic: "Authentic Vedic",
      adjusted: "Modern Adapted",
      mantraTitle: "Mantra of the Day"
    },
    hi: {
      settings: "सेटिंग्स",
      scheduleMode: "दिनचर्या प्रकार",
      authentic: "शुद्ध वैदिक",
      adjusted: "आधुनिक समायोजित",
      mantraTitle: "दिन का मंत्र"
    }
  };

  // Enhanced neumorphic design
  const themeBg = rishiMode ? "#1a120b" : "#f0f4f8";
  const themeText = rishiMode ? "#C47A54" : "#1e293b";
  const cardBg = rishiMode ? "#1a120b" : "#f0f4f8";
  const themeShadow = rishiMode
    ? "12px 12px 24px #0d0805, -12px -12px 24px #2e1d13"
    : "12px 12px 24px #d1d9e0, -12px -12px 24px #ffffff";

  function isNowInBlock(item) {
    const s = new Date(item.start);
    const e = addMinutes(s, item.duration);
    return now >= s && now < e;
  }

  return React.createElement('div', {
    className: "min-h-screen p-6 neumorphic-bg",
    style: { background: themeBg, color: themeText }
  }, [
    React.createElement(AudioVisualizer, {
      key: "visualizer",
      isPlaying: isPlaying,
      audioRef: audioRef
    }),

    React.createElement('div', {
      key: "main",
      className: "max-w-4xl mx-auto space-y-8"
    }, [
      // Header
      React.createElement('div', {
        key: "header",
        className: "text-center"
      }, [
        React.createElement('h1', {
          key: "title",
          className: "text-3xl font-bold mb-4",
          style: { color: ACCENT }
        }, "🕉️ Rishi Rhythm"),

        // Schedule Mode Toggle
        React.createElement('div', {
          key: "mode-toggle",
          className: "flex gap-3 justify-center mb-6"
        }, [
          React.createElement('button', {
            key: "authentic-btn",
            onClick: () => setScheduleMode("authentic"),
            className: "px-4 py-2 rounded-xl font-medium",
            style: {
              background: scheduleMode === "authentic" ? ACCENT : (rishiMode ? '#2a1d14' : '#e2e8f0'),
              color: scheduleMode === "authentic" ? "white" : themeText
            }
          }, T[lang].authentic),

          React.createElement('button', {
            key: "adjusted-btn",
            onClick: () => setScheduleMode("adjusted"),
            className: "px-4 py-2 rounded-xl font-medium",
            style: {
              background: scheduleMode === "adjusted" ? ACCENT : (rishiMode ? '#2a1d14' : '#e2e8f0'),
              color: scheduleMode === "adjusted" ? "white" : themeText
            }
          }, T[lang].adjusted)
        ])
      ]),

      // Mantra Card
      React.createElement('div', {
        key: "mantra",
        className: "p-6 rounded-3xl",
        style: {
          boxShadow: themeShadow,
          backgroundColor: cardBg,
          border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
        }
      }, [
        React.createElement('h3', {
          key: "mantra-title",
          className: "text-lg font-semibold mb-4",
          style: { color: ACCENT }
        }, T[lang].mantraTitle),

        React.createElement('div', {
          key: "mantra-text",
          className: "p-4 rounded-2xl mb-4",
          style: {
            backgroundColor: rishiMode ? '#2a1d14' : '#f8fafc',
            fontFamily: "Hind, sans-serif",
            color: ACCENT,
            fontWeight: "500"
          }
        }, todaysMantra.hi),

        React.createElement('p', {
          key: "mantra-en",
          className: "text-sm opacity-85"
        }, todaysMantra.en)
      ]),

      // Schedule
      React.createElement('div', {
        key: "schedule",
        className: "space-y-4"
      }, fullSchedule.map((item, index) => {
        const isCurrentBlock = isNowInBlock(item);
        return React.createElement('div', {
          key: item.id,
          className: "p-5 rounded-3xl relative",
          style: {
            boxShadow: isCurrentBlock ? "inset 8px 8px 16px #d1d9e0, inset -8px -8px 16px #ffffff" : themeShadow,
            backgroundColor: isCurrentBlock ? '#f0f9ff' : cardBg,
            border: `2px solid ${isCurrentBlock ? ACCENT : '#e2e8f0'}`
          }
        }, [
          React.createElement('div', {
            key: "time",
            className: "text-xs opacity-60 mb-1"
          }, `${toTime(item.start)} • ${item.duration} min`),

          React.createElement('div', {
            key: "title",
            className: "text-lg font-semibold",
            style: { color: isCurrentBlock ? ACCENT : themeText }
          }, item.title),

          React.createElement('div', {
            key: "desc",
            className: "text-sm opacity-70 mt-1"
          }, item.desc)
        ]);
      }))
    ])
  ]);
}

// Render the application
ReactDOM.render(React.createElement(RishiRhythmApp), document.getElementById('root'));