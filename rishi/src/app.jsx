import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SunCalc from 'suncalc';

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

          // Clear with transparent background
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw frequency bars
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height * 0.4;

            const intensity = dataArray[i] / 255;
            ctx.fillStyle = `rgba(196, 122, 84, ${intensity * 0.6})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
          }

          // Draw central ripple effect
          const avgFreq = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
          if (avgFreq > 50) {
            const rippleSize = (avgFreq / 255) * 300;
            const opacity = Math.min(0.8, avgFreq / 255);

            ctx.strokeStyle = `rgba(196, 122, 84, ${opacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, rippleSize, 0, 2 * Math.PI);
            ctx.stroke();

            // Inner ripple
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
  const [scheduleMode, setScheduleMode] = useState("authentic"); // "authentic" or "adjusted"

  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  // Load Hindi font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Enhanced geolocation with better error handling
  useEffect(() => {
    // Don't request location if we already have saved coordinates
    const savedCoords = localStorage.getItem('rishiRhythmCoords');
    if (savedCoords) {
      return; // Skip auto-location request if we have saved coords
    }

    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
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

  // Function to request location permission
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      return;
    }

    setLocationStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationStatus('granted');
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        setLocationStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

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

  // MANTRAS (50) — each has en, hi, bija, audio
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
    },
    {
      en: "Om Gam Ganapataye Namaha — Salutations to Lord Ganesha, remover of obstacles.",
      hi: "ॐ गं गणपतये नमः",
      bija: "गं",
      audio: "/audio/shuddh/mantra04.mp3"
    },
    {
      en: "Asato Ma Sad Gamaya Tamaso Ma Jyotir Gamaya Mrityor Ma Amritam Gamaya — Lead me from untruth to truth, darkness to light, death to immortality.",
      hi: "असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मा अमृतं गमय",
      bija: "ॐ",
      audio: "/audio/shuddh/mantra05.mp3"
    },
    {
      en: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat — Maha Mrityunjaya Mantra for liberation from death.",
      hi: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्",
      bija: "ॐ हौं जूं सः",
      audio: "/audio/shuddh/mantra06.mp3"
    },
    {
      en: "Om Purnamadah Purnamidam Purnat Purnamudachyate Purnasya Purnamadaya Purnamevavashishyate — That is whole, this is whole, from wholeness comes wholeness.",
      hi: "ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते",
      bija: "ॐ पूर्णम्",
      audio: "/audio/shuddh/mantra07.mp3"
    },
    {
      en: "Om Shanti Shanti Shanti — Peace in body, mind and spirit.",
      hi: "ॐ शान्तिः शान्तिः शान्तिः",
      bija: "शान्तिः",
      audio: "/audio/shuddh/mantra08.mp3"
    },
    {
      en: "Om Saha Navavatu Saha Nau Bhunaktu Saha Viryam Karavavahai Tejasvi Navadhitamastu Ma Vidvishavahai — May we be protected together, nourished together, work with vigor together.",
      hi: "ॐ सह नाववतु सह नौ भुनक्तु सह वीर्यं करवावहै तेजस्विनावधीतमस्तु मा विद्विषावहै",
      bija: "ॐ सह",
      audio: "/audio/shuddh/mantra09.mp3"
    },
    {
      en: "Om Shreem Mahalakshmyai Namaha — Salutations to Goddess Lakshmi for abundance and prosperity.",
      hi: "ॐ श्रीं महालक्ष्म्यै नमः",
      bija: "श्रीं",
      audio: "/audio/shuddh/mantra10.mp3"
    },
    {
      en: "Om Aim Sarasvatyai Namaha — Salutations to Goddess Saraswati for knowledge and wisdom.",
      hi: "ॐ ऐं सरस्वत्यै नमः",
      bija: "ऐं",
      audio: "/audio/shuddh/mantra11.mp3"
    },
    {
      en: "Om Namo Bhagavate Vasudevaya — Salutations to Lord Krishna, the divine consciousness.",
      hi: "ॐ नमो भगवते वासुदेवाय",
      bija: "ॐ नमो",
      audio: "/audio/shuddh/mantra12.mp3"
    },
    {
      en: "Om Namo Narayanaya — Salutations to Lord Narayana, the supreme being.",
      hi: "ॐ नमो नारायणाय",
      bija: "ॐ नारायणाय",
      audio: "/audio/shuddh/mantra13.mp3"
    },
    {
      en: "Hare Rama Hare Rama Rama Rama Hare Hare Hare Krishna Hare Krishna Krishna Krishna Hare Hare — The Maha Mantra for liberation.",
      hi: "हरे राम हरे राम राम राम हरे हरे हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
      bija: "हरे",
      audio: "/audio/shuddh/mantra14.mp3"
    },
    {
      en: "Om Krim Kalikayai Namaha — Salutations to Goddess Kali for protection and transformation.",
      hi: "ॐ क्रीं कालिकायै नमः",
      bija: "क्रीं",
      audio: "/audio/shuddh/mantra15.mp3"
    },
    {
      en: "Om Dum Durgayai Namaha — Salutations to Goddess Durga for strength and courage.",
      hi: "ॐ दुं दुर्गायै नमः",
      bija: "दुं",
      audio: "/audio/shuddh/mantra16.mp3"
    },
    {
      en: "Om Rudraya Namaha — Salutations to Lord Rudra, the fierce aspect of Shiva.",
      hi: "ॐ रुद्राय नमः",
      bija: "रुं",
      audio: "/audio/shuddh/mantra17.mp3"
    },
    {
      en: "Om Hreem Namah Shivaya — Sacred sound with salutations to Lord Shiva.",
      hi: "ॐ ह्रीं नमः शिवाय",
      bija: "ह्रीं",
      audio: "/audio/shuddh/mantra18.mp3"
    },
    {
      en: "Vakratunda Mahakaya Suryakoti Samaprabha Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada — Invocation to Lord Ganesha.",
      hi: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा",
      bija: "गं",
      audio: "/audio/shuddh/mantra19.mp3"
    },
    {
      en: "Om Namah Chandikayai — Salutations to Goddess Chandi, the fierce Divine Mother.",
      hi: "ॐ नमः चण्डिकायै",
      bija: "चं",
      audio: "/audio/shuddh/mantra20.mp3"
    },
    {
      en: "Sarvesham Svastir Bhavatu Sarvesham Shantir Bhavatu Sarvesham Purnam Bhavatu Sarvesham Mangalam Bhavatu — May all be blessed with wellbeing, peace, fulfillment and auspiciousness.",
      hi: "सर्वेषां स्वस्तिर्भवतु सर्वेषां शान्तिर्भवतु सर्वेषां पूर्णं भवतु सर्वेषां मंगलं भवतु",
      bija: "ॐ मंगलम्",
      audio: "/audio/shuddh/mantra21.mp3"
    },
    {
      en: "Om Anandamaya Chaitanyamaya Satyamaya Parabrahma — Divine consciousness, bliss, truth, supreme reality.",
      hi: "ॐ आनन्दमय चैतन्यमय सत्यमय परब्रह्म",
      bija: "ॐ सत्",
      audio: "/audio/shuddh/mantra22.mp3"
    },
    {
      en: "Om Tat Sat — That is Truth, the ultimate reality.",
      hi: "ॐ तत्सत्",
      bija: "सत्",
      audio: "/audio/shuddh/mantra23.mp3"
    },
    {
      en: "So Hum — I am That, the realization of unity with the divine.",
      hi: "सोऽहम्",
      bija: "सोऽहम्",
      audio: "/audio/shuddh/mantra24.mp3"
    },
    {
      en: "Om Kleem Krishnaya Namaha — Sacred sound with salutations to Lord Krishna.",
      hi: "ॐ क्लीं कृष्णाय नमः",
      bija: "क्लीं",
      audio: "/audio/shuddh/mantra25.mp3"
    },
    {
      en: "Om Aim Hrim Klim Chamundayai Vichhe — The powerful mantra to Goddess Chamunda.",
      hi: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
      bija: "ऐं ह्रीं क्लीं",
      audio: "/audio/shuddh/mantra26.mp3"
    },
    {
      en: "Om Namo Narayani — Salutations to the Divine Mother Narayani.",
      hi: "ॐ नमो नारायणी",
      bija: "ॐ नारायणी",
      audio: "/audio/shuddh/mantra27.mp3"
    },
    {
      en: "Om Dyauh Shantir Antariksha Shantih Prithvi Shantir Aapah Shantir Oshadhayah Shantih — Peace mantra for all realms.",
      hi: "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथ्वी शान्तिरापः शान्तिरोषधयः शान्तिः",
      bija: "ॐ शान्तिः",
      audio: "/audio/shuddh/mantra28.mp3"
    },
    {
      en: "Sahasrashirsha Purusha Sahasraksha Sahasrapat Sa Bhumim Vishvato Vritva Atyatishthad Dashangulam — From the Purusha Sukta.",
      hi: "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् स भूमिं विश्वतो वृत्वा अत्यतिष्ठद्दशांगुलम्",
      bija: "ॐ पुरुषाय",
      audio: "/audio/shuddh/mantra29.mp3"
    },
    {
      en: "Om Hreem Shreem Kleem Maha Lakshmi Namaha — Complete Lakshmi mantra for prosperity.",
      hi: "ॐ ह्रीं श्रीं क्लीं महालक्ष्मी नमः",
      bija: "ह्रीं श्रीं क्लीं",
      audio: "/audio/shuddh/mantra30.mp3"
    },
    {
      en: "Om Hram Hreem Hraum Sah Suryaya Namaha — Sun mantra for vitality and illumination.",
      hi: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
      bija: "ह्रां ह्रीं ह्रौं सः",
      audio: "/audio/shuddh/mantra31.mp3"
    },
    {
      en: "Om Shram Shreem Shraum Sah Chandraya Namaha — Moon mantra for peace and cooling energy.",
      hi: "ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः",
      bija: "श्रां श्रीं श्रौं सः",
      audio: "/audio/shuddh/mantra32.mp3"
    },
    {
      en: "Om Kram Kreem Kraum Sah Bhaumaya Namaha — Mars mantra for courage and strength.",
      hi: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
      bija: "क्रां क्रीं क्रौं सः",
      audio: "/audio/shuddh/mantra33.mp3"
    },
    {
      en: "Om Bram Breem Braum Sah Budhaya Namaha — Mercury mantra for intelligence and communication.",
      hi: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
      bija: "ब्रां ब्रीं ब्रौं सः",
      audio: "/audio/shuddh/mantra34.mp3"
    },
    {
      en: "Om Gram Greem Graum Sah Gurave Namaha — Jupiter mantra for wisdom and prosperity.",
      hi: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
      bija: "ग्रां ग्रीं ग्रौं सः",
      audio: "/audio/shuddh/mantra35.mp3"
    },
    {
      en: "Om Dram Dreem Draum Sah Shukraya Namaha — Venus mantra for love and beauty.",
      hi: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
      bija: "द्रां द्रीं द्रौं सः",
      audio: "/audio/shuddh/mantra36.mp3"
    },
    {
      en: "Om Sham Shanaischaraya Namaha — Saturn mantra for discipline and karmic balance.",
      hi: "ॐ शं शनैश्चराय नमः",
      bija: "शं",
      audio: "/audio/shuddh/mantra37.mp3"
    },
    {
      en: "Om Ram Rahave Namaha — Rahu mantra for overcoming obstacles and illusions.",
      hi: "ॐ रां राहवे नमः",
      bija: "रां",
      audio: "/audio/shuddh/mantra38.mp3"
    },
    {
      en: "Om Kem Ketave Namaha — Ketu mantra for spiritual growth and detachment.",
      hi: "ॐ कें केतवे नमः",
      bija: "कें",
      audio: "/audio/shuddh/mantra39.mp3"
    },
    {
      en: "Om Sarva Mangala Mangalye Shive Sarvaartha Sadhike Sharanye Tryambake Gauri Narayani Namostute — Complete Devi mantra.",
      hi: "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके शरण्ये त्र्यम्बके गौरी नारायणि नमोस्तुते",
      bija: "ॐ दुं दुर्गायै",
      audio: "/audio/shuddh/mantra40.mp3"
    },
    {
      en: "Ya Devi Sarva Bhuteshu Shakti Rupena Samsthita Namastasyai Namastasyai Namastasyai Namo Namah — Salutations to the Divine Mother in all beings.",
      hi: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः",
      bija: "ॐ शक्तयै",
      audio: "/audio/shuddh/mantra41.mp3"
    },
    {
      en: "Om Hanumate Namaha — Salutations to Lord Hanuman for strength and devotion.",
      hi: "ॐ हनुमते नमः",
      bija: "हं",
      audio: "/audio/shuddh/mantra42.mp3"
    },
    {
      en: "Ram Ram Rameti Rame Raame Manorame Sahasranama Tattulyam Rama Nama Varanane — The power of Ram's name.",
      hi: "राम राम रामेति रमे रामे मनोरमे सहस्रनाम तत्तुल्यं राम नाम वराणने",
      bija: "राम",
      audio: "/audio/shuddh/mantra43.mp3"
    },
    {
      en: "Om Ganga Gange Gangaye Namaha — Salutations to Mother Ganga for purification.",
      hi: "ॐ गंगा गंगे गंगायै नमः",
      bija: "गं",
      audio: "/audio/shuddh/mantra44.mp3"
    },
    {
      en: "Om Sharavanabhava Namaha — Salutations to Lord Murugan, son of Shiva.",
      hi: "ॐ शरवणभव नमः",
      bija: "शं",
      audio: "/audio/shuddh/mantra45.mp3"
    },
    {
      en: "Om Bhur Bhuva Swaha — The three worlds invocation for cosmic consciousness.",
      hi: "ॐ भूर्भुवः स्वः",
      bija: "ॐ भूः भुवः स्वः",
      audio: "/audio/shuddh/mantra46.mp3"
    },
    {
      en: "Om Mani Padme Hum — The jewel in the lotus, compassion mantra.",
      hi: "ॐ मणि पद्मे हूं",
      bija: "ॐ मणि",
      audio: "/audio/shuddh/mantra47.mp3"
    },
    {
      en: "Gate Gate Paragate Parasamgate Bodhi Svaha — Gone, gone, gone beyond, completely gone beyond, awakening, so be it.",
      hi: "गते गते पारगते पारसंगते बोधि स्वाहा",
      bija: "गते",
      audio: "/audio/shuddh/mantra48.mp3"
    },
    {
      en: "Om Shanti Om — Sacred sound with peace, the universal blessing.",
      hi: "ॐ शान्ति ॐ",
      bija: "ॐ शान्तिः",
      audio: "/audio/shuddh/mantra49.mp3"
    },
    {
      en: "Om — The primordial sound, the cosmic vibration from which all creation emerges.",
      hi: "ॐ",
      bija: "ॐ",
      audio: "/audio/shuddh/mantra50.mp3"
    }
  ];

  // select today's mantra by date (stable)
  const dayIndex = new Date().getDate() % MANTRAS.length;
  const todaysMantra = MANTRAS[dayIndex] || MANTRAS[0];

  // load selected mantra text (language aware)
  const mantraText = lang === "hi" ? todaysMantra.hi : todaysMantra.en;
  const mantraBija = todaysMantra.bija || "";

  // prepare audio element for mantra playback and ambience
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(todaysMantra.audio);
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous";
    } else {
      audioRef.current.src = todaysMantra.audio;
    }

    if (!ambientRef.current) {
      ambientRef.current = new Audio("/audio/ambience/tanpura_drone.mp3");
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.25;
      ambientRef.current.crossOrigin = "anonymous";
    } else {
      ambientRef.current.src = "/audio/ambience/tanpura_drone.mp3";
    }

    if (audioRef.current) audioRef.current.onended = () => setIsPlaying(false);
  }, [dayIndex]);

  // play/pause handler
  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (ambientRef.current) ambientRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.volume = 0.85;
    audioRef.current.play().catch((e) => console.warn("Audio play prevented", e));

    if (ambientRef.current) ambientRef.current.play().catch(() => {});

    setIsPlaying(true);
  }

  // Brahma chime (fires at exact minute of brahma start)
  useEffect(() => {
    if (!sunTimes || !sunTimes.sunrise) return;
    const brahma = new Date(new Date(sunTimes.sunrise).getTime() - 90 * 60000);
    const timer = setInterval(() => {
      const diffMs = Math.abs(now.getTime() - brahma.getTime());
      if (diffMs < 1000 && !muteChime) {
        try {
          const ch = new Audio("/audio/brahma_chime.mp3");
          ch.volume = 0.12;
          ch.play().catch((e) => console.warn("Chime play prevented", e));
        } catch (e) {
          console.warn(e);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sunTimes, muteChime, now]);

  // State for hora info modal
  const [showHoraInfo, setShowHoraInfo] = useState(false);
  const [locationStatus, setLocationStatus] = useState('requesting'); // 'requesting', 'granted', 'denied', 'unavailable'

  // Load saved coordinates from localStorage on startup
  useEffect(() => {
    const savedCoords = localStorage.getItem('rishiRhythmCoords');
    if (savedCoords) {
      try {
        const parsed = JSON.parse(savedCoords);
        if (parsed.lat && parsed.lon) {
          setCoords(parsed);
          setManualCoords({ lat: parsed.lat.toString(), lon: parsed.lon.toString() });
          setLocationStatus('granted');
        }
      } catch (e) {
        console.warn('Failed to parse saved coordinates:', e);
      }
    }
  }, []);

  // Save coordinates to localStorage whenever they change
  useEffect(() => {
    if (coords) {
      localStorage.setItem('rishiRhythmCoords', JSON.stringify(coords));
    }
  }, [coords]);

  // translations
  const T = {
    en: {
      settings: "Settings",
      location: "Location (manual input if needed)",
      apply: "Apply",
      language: "Language",
      rishiMode: "Rishi Mode",
      scheduleMode: "Schedule Type",
      authentic: "Authentic Vedic",
      adjusted: "Modern Adapted",
      muteChime: "Mute Brahma Muhurta Chime",
      gita: "Bhagavad Gita",
      localTime: "Local Time",
      sunrise: "Sunrise",
      brahma: "Brahma Muhurta",
      notes: "Rishi Notes",
      mantraTitle: "Mantra of the Day",
      hora: "Current Hora",
      horaExplanation: "Hora is a Vedic time division where each hour of day and night is ruled by a specific planet. Each planetary hour carries unique energy and is favorable for different activities. The sequence follows a specific pattern based on sunrise and sunset times.",
      rituals: [
        "Touch the earth after waking",
        "Keep morning silence",
        "Offer water to Sun & Earth",
        "Eat light at night",
        "Sit with breath daily",
        "Avoid unnecessary friction",
      ],
    },
    hi: {
      settings: "सेटिंग्स",
      location: "स्थान (हाथ से भरें)",
      apply: "लागू करें",
      language: "भाषा",
      rishiMode: "ऋषि मोड",
      scheduleMode: "दिनचर्या प्रकार",
      authentic: "शुद्ध वैदिक",
      adjusted: "आधुनिक समायोजित",
      muteChime: "ब्रह्म मुहूर्त घंटी बंद करें",
      gita: "भगवद गीता",
      localTime: "स्थानीय समय",
      sunrise: "सूर्योदय",
      brahma: "ब्रह्म मुहूर्त",
      notes: "ऋषि सूत्र",
      mantraTitle: "दिन का मंत्र",
      hora: "वर्तमान होरा",
      horaExplanation: "होरा वैदिक काल विभाजन है जहाँ दिन और रात का हर घंटा किसी विशिष्ट ग्रह द्वारा शासित होता है। प्रत्येक ग्रहीय घंटे में अनोखी ऊर्जा होती है और यह विभिन्न गतिविधियों के लिए अनुकूल होता है।",
      rituals: [
        "जागते ही धरती को स्पर्श करें",
        "सुबह मौन रखें",
        "सूर्य और पृथ्वी को अर्घ्य दें",
        "रात को हल्का भोजन करें",
        "प्रतिदिन श्वास साधना करें",
        "अनावश्यक विवाद से बचें",
      ],
    },
  };

  // Planetary data for hora
  const planetaryData = {
    Sun: {
      symbol: "☉",
      color: "#FFD700",
      significance: "Leadership, authority, government work, father figures",
      element: "Fire",
      energy: "Royal, commanding, creative"
    },
    Moon: {
      symbol: "☽",
      color: "#C0C0C0",
      significance: "Emotions, intuition, mother figures, home matters",
      element: "Water",
      energy: "Nurturing, receptive, flowing"
    },
    Mars: {
      symbol: "♂",
      color: "#FF4500",
      significance: "Action, courage, sports, surgery, conflicts",
      element: "Fire",
      energy: "Dynamic, assertive, warrior-like"
    },
    Mercury: {
      symbol: "☿",
      color: "#32CD32",
      significance: "Communication, learning, business, travel",
      element: "Earth",
      energy: "Quick, analytical, versatile"
    },
    Jupiter: {
      symbol: "♃",
      color: "#4169E1",
      significance: "Wisdom, teaching, spirituality, expansion",
      element: "Ether",
      energy: "Benevolent, expansive, wise"
    },
    Venus: {
      symbol: "♀",
      color: "#FF69B4",
      significance: "Love, beauty, arts, luxury, relationships",
      element: "Water",
      energy: "Harmonious, artistic, luxurious"
    },
    Saturn: {
      symbol: "♄",
      color: "#696969",
      significance: "Discipline, hard work, restrictions, elderly",
      element: "Air",
      energy: "Structured, patient, karmic"
    }
  };

  // Hora calculation - Enhanced with error handling
  function getHoraData() {
    if (!sunTimes || !sunTimes.sunrise || !sunTimes.sunset) return { planet: "—", data: null };

    try {
      const sunrise = new Date(sunTimes.sunrise).getTime();
      const sunset = new Date(sunTimes.sunset).getTime();
      const nowMs = now.getTime();

      if (sunset <= sunrise) return { planet: "—", data: null };

      const dayMs = sunset - sunrise;
      const nightMs = 24 * 3600000 - dayMs;
      const isDay = nowMs >= sunrise && nowMs < sunset;
      const slotMs = isDay ? dayMs / 12 : nightMs / 12;

      let base, idx;
      if (isDay) {
        base = sunrise;
        idx = Math.floor((nowMs - base) / slotMs);
      } else {
        // Handle night time differently
        if (nowMs >= sunset) {
          base = sunset;
          idx = Math.floor((nowMs - base) / slotMs);
        } else {
          // Early morning before sunrise
          base = sunset - 24 * 3600000; // Yesterday's sunset
          idx = Math.floor((nowMs - base) / slotMs);
        }
      }

      if (isNaN(idx) || idx < 0 || idx >= 12) return { planet: "—", data: null };

      const rulers = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
      const baseIndex = isDay ? 0 : 3; // Day starts with Sun, Night with Moon
      const planet = rulers[((idx + baseIndex) % 7)];

      return { planet, data: planetaryData[planet], isDay, timeRemaining: Math.ceil((slotMs - (nowMs - base)) / 60000) };
    } catch (e) {
      console.error('Hora calculation error:', e);
      return { planet: "—", data: null };
    }
  }

  // Legacy function for compatibility
  function getHora() {
    return getHoraData().planet;
  }

  // Authentic Vedic Dinacharya - Based on Charaka Samhita & Sushruta Samhita
  function buildAuthenticSchedule() {
    const sr = sunTimes?.sunrise ? new Date(sunTimes.sunrise) : (() => { const d = new Date(); d.setHours(6,30,0,0); return d; })();
    const ss = sunTimes?.sunset ? new Date(sunTimes.sunset) : (() => { const d = new Date(); d.setHours(18,0,0,0); return d; })();

    // Authentic Brahma Muhurta: 48 minutes, starting 96 minutes before sunrise
    const brahmaStart = addMinutes(sr, -96);

    return [
      {
        id: "brahma_muhurta",
        title: lang === "hi" ? "ब्रह्म मुहूर्त साधना" : "Brahma Muhurta Sadhana",
        start: brahmaStart,
        duration: 48,
        desc: lang === "hi" ? "ध्यान, प्राणायाम, वेद स्तुति और ईश्वर प्रार्थना" : "Meditation, pranayama, Vedic chanting and divine prayer"
      },
      {
        id: "danta_dhavana",
        title: lang === "hi" ? "दन्त धावन व शौच" : "Oral Care & Elimination",
        start: addMinutes(brahmaStart, 48),
        duration: 15,
        desc: lang === "hi" ? "नीम दातुन, कुल्ला, मल-मूत्र त्याग" : "Neem twig brushing, gargling, natural elimination"
      },
      {
        id: "abhyanga_snana",
        title: lang === "hi" ? "अभ्यंग स्नान" : "Oil Massage & Bath",
        start: addMinutes(brahmaStart, 63),
        duration: 30,
        desc: lang === "hi" ? "तिल तेल मालिश, उष्ण जल स्नान" : "Sesame oil massage, warm water bath"
      },
      {
        id: "sandhyavandana",
        title: lang === "hi" ? "प्रातः संध्यावन्दन" : "Morning Sandhyavandana",
        start: addMinutes(brahmaStart, 93),
        duration: 27,
        desc: lang === "hi" ? "गायत्री जप, अर्घ्य, प्राणायाम" : "Gayatri japa, water offering, pranayama"
      },
      {
        id: "surya_upasana",
        title: lang === "hi" ? "सूर्योपासना" : "Solar Worship",
        start: sr,
        duration: 30,
        desc: lang === "hi" ? "सूर्य नमस्कार, सूर्य मंत्र जप" : "Sun salutation, solar mantra recitation"
      },
      {
        id: "svadhyaya",
        title: lang === "hi" ? "स्वाध्याय व गुरुसेवा" : "Self-Study & Service",
        start: addMinutes(sr, 30),
        duration: 120,
        desc: lang === "hi" ? "धर्मशास्त्र अध्ययन, गुरु सेवा, वेद पाठ" : "Dharma scripture study, guru service, Vedic recitation"
      },
      {
        id: "yoga_vyayama",
        title: lang === "hi" ? "योगासन व व्यायाम" : "Yoga & Physical Exercise",
        start: addMinutes(sr, 150),
        duration: 60,
        desc: lang === "hi" ? "आसन, प्राणायाम, शारीरिक बल वर्धन" : "Asanas, pranayama, physical strengthening"
      },
      {
        id: "madhyahna_bhojana",
        title: lang === "hi" ? "मध्याह्न भोजन (पहला आहार)" : "Midday Meal (First Meal)",
        start: addMinutes(sr, 360), // 6 hours after sunrise
        duration: 60,
        desc: lang === "hi" ? "षडरस पूर्ण सात्विक भोजन, मौन आहार" : "Complete six-taste sattvic meal, silent eating"
      },
      {
        id: "madhyahna_visrama",
        title: lang === "hi" ? "मध्याह्न विश्राम" : "Midday Rest",
        start: addMinutes(sr, 420),
        duration: 60,
        desc: lang === "hi" ? "वाम पार्श्व शयन, गहरी श्वास" : "Left-side rest, deep breathing"
      },
      {
        id: "karma_yoga",
        title: lang === "hi" ? "कर्मयोग व सेवा" : "Karma Yoga & Service",
        start: addMinutes(sr, 480),
        duration: 120,
        desc: lang === "hi" ? "समाज सेवा, गृह कार्य, शिल्प साधना" : "Social service, household duties, craft practice"
      },
      {
        id: "aparahna_adhyayana",
        title: lang === "hi" ? "अपराह्न अध्ययन" : "Afternoon Learning",
        start: addMinutes(sr, 600),
        duration: 90,
        desc: lang === "hi" ? "व्यावहारिक विद्या, कला, संगीत साधना" : "Practical knowledge, arts, music practice"
      },
      {
        id: "sandhya_vandana",
        title: lang === "hi" ? "सायं संध्यावन्दन" : "Evening Sandhyavandana",
        start: addMinutes(ss, -30),
        duration: 30,
        desc: lang === "hi" ? "त्रिकाल संध्या, दीप प्रज्वलन" : "Trikal sandhya, lamp lighting"
      },
      {
        id: "sayam_ahara",
        title: lang === "hi" ? "सायं आहार (द्वितीय आहार)" : "Evening Meal (Second Meal)",
        start: addMinutes(ss, 60),
        duration: 45,
        desc: lang === "hi" ? "सुपाच्य, हल्का भोजन, सूर्यास्त के बाद" : "Digestible, light food, after sunset"
      },
      {
        id: "satsanga",
        title: lang === "hi" ? "सत्संग व कीर्तन" : "Satsang & Devotional Singing",
        start: addMinutes(ss, 105),
        duration: 60,
        desc: lang === "hi" ? "आध्यात्मिक चर्चा, भजन-कीर्तन" : "Spiritual discourse, devotional singing"
      },
      {
        id: "ratri_sadhana",
        title: lang === "hi" ? "रात्रि साधना" : "Night Practice",
        start: addMinutes(ss, 165),
        duration: 45,
        desc: lang === "hi" ? "जप-ध्यान, श्रवण, मनन" : "Japa meditation, listening, contemplation"
      },
      {
        id: "shayya_yoga",
        title: lang === "hi" ? "शय्या योग व निद्रा" : "Sleep Preparation & Rest",
        start: addMinutes(ss, 210),
        duration: Math.floor((addMinutes(sr, -96).getTime() + 24*60*60*1000 - addMinutes(ss, 210).getTime()) / 60000),
        desc: lang === "hi" ? "दाहिने पार्श्व शयन, श्वास साक्षी भाव" : "Right-side sleeping, breath awareness"
      }
    ];
  }

  // Adjusted Modern Schedule - Adapted for contemporary life
  function buildAdjustedSchedule() {
    const sr = sunTimes?.sunrise ? new Date(sunTimes.sunrise) : (() => { const d = new Date(); d.setHours(6,30,0,0); return d; })();
    const ss = sunTimes?.sunset ? new Date(sunTimes.sunset) : (() => { const d = new Date(); d.setHours(18,0,0,0); return d; })();

    const brahmaStart = addMinutes(sr, -96);

    return [
      {
        id: "brahma",
        title: lang === "hi" ? "ब्रह्म मुहूर्त" : "Brahma Muhurta",
        start: brahmaStart,
        duration: 48,
        desc: lang === "hi" ? "पूर्व दिशा में मौन ध्यान और प्राणायाम" : "Silent meditation and pranayama facing east"
      },
      {
        id: "pre_sunrise",
        title: lang === "hi" ? "सूर्योदय पूर्व तैयारी" : "Pre-Sunrise Preparation",
        start: addMinutes(brahmaStart, 48),
        duration: 48,
        desc: lang === "hi" ? "स्नान, संध्या और सूर्योदय तैयारी" : "Ablutions, sandhya and sunrise preparation"
      },
      {
        id: "sunrise",
        title: lang === "hi" ? "सूर्योदय दर्शन" : "Sunrise Observation",
        start: sr,
        duration: 30,
        desc: lang === "hi" ? "सूर्य नमस्कार और अर्घ्य" : "Surya namaskara and arghya offering"
      },
      {
        id: "morning_sadhana",
        title: lang === "hi" ? "प्रातः साधना" : "Morning Sadhana",
        start: addMinutes(sr, 30),
        duration: 120,
        desc: lang === "hi" ? "अध्ययन, मंत्र जप और योग" : "Study, mantra chanting and yoga practice"
      },
      {
        id: "breakfast",
        title: lang === "hi" ? "प्रातः आहार" : "Morning Meal",
        start: addMinutes(sr, 150),
        duration: 30,
        desc: lang === "hi" ? "हल्का और पौष्टिक नाश्ता" : "Light and nutritious breakfast"
      },
      {
        id: "work",
        title: lang === "hi" ? "कार्य काल" : "Work Period",
        start: addMinutes(sr, 180),
        duration: 240,
        desc: lang === "hi" ? "मुख्य कार्य और व्यावसायिक गतिविधियां" : "Main work and professional activities"
      },
      {
        id: "midday_meal",
        title: lang === "hi" ? "मध्याह्न भोजन" : "Midday Meal",
        start: addMinutes(sr, 420),
        duration: 60,
        desc: lang === "hi" ? "दिन का मुख्य भोजन" : "Main meal of the day"
      },
      {
        id: "afternoon_rest",
        title: lang === "hi" ? "अपराह्न विश्राम" : "Afternoon Rest",
        start: addMinutes(sr, 480),
        duration: 60,
        desc: lang === "hi" ? "विश्राम या हल्का कार्य" : "Rest or light activities"
      },
      {
        id: "evening_activities",
        title: lang === "hi" ? "सायंकालीन गतिविधियां" : "Evening Activities",
        start: addMinutes(sr, 540),
        duration: Math.max(60, Math.floor((ss.getTime() - addMinutes(sr, 540).getTime()) / 60000) - 30),
        desc: lang === "hi" ? "व्यायाम, मित्रों से मिलना" : "Exercise, social activities"
      },
      {
        id: "sunset_sandhya",
        title: lang === "hi" ? "सायं संध्या" : "Evening Sandhya",
        start: addMinutes(ss, -30),
        duration: 30,
        desc: lang === "hi" ? "सूर्यास्त ध्यान और संध्या वंदन" : "Sunset meditation and sandhya prayers"
      },
      {
        id: "evening_meal",
        title: lang === "hi" ? "सायं आहार" : "Evening Meal",
        start: addMinutes(ss, 30),
        duration: 45,
        desc: lang === "hi" ? "हल्का रात्रि भोजन" : "Light evening meal"
      },
      {
        id: "night_routine",
        title: lang === "hi" ? "रात्रि दिनचर्या" : "Night Routine",
        start: addMinutes(ss, 75),
        duration: 45,
        desc: lang === "hi" ? "पारिवारिक समय, चिंतन" : "Family time, reflection"
      },
      {
        id: "sleep",
        title: lang === "hi" ? "निद्रा काल" : "Sleep Time",
        start: addMinutes(ss, 120),
        duration: Math.floor((addMinutes(sr, -96).getTime() + 24*60*60*1000 - addMinutes(ss, 120).getTime()) / 60000),
        desc: lang === "hi" ? "गहरी और शांत निद्रा" : "Deep and peaceful sleep"
      }
    ];
  }

  // Main schedule builder based on mode
  function buildFullSchedule() {
    return scheduleMode === "authentic" ? buildAuthenticSchedule() : buildAdjustedSchedule();
  }

  const fullSchedule = buildFullSchedule();

  // Enhanced neumorphic design with better contrast
  const themeBg = rishiMode ? "#1a120b" : "#f0f4f8";  // Slightly greyish for better neumorphic effect
  const themeText = rishiMode ? "#C47A54" : "#1e293b";
  const cardBg = rishiMode ? "#1a120b" : "#f0f4f8";
  const themeShadow = rishiMode
    ? "12px 12px 24px #0d0805, -12px -12px 24px #2e1d13"
    : "12px 12px 24px #d1d9e0, -12px -12px 24px #ffffff";
  const insetShadow = rishiMode
    ? "inset 8px 8px 16px #0d0805, inset -8px -8px 16px #2e1d13"
    : "inset 8px 8px 16px #d1d9e0, inset -8px -8px 16px #ffffff";

  // top info
  const localTimeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunriseStr = sunTimes?.sunrise ? toTime(sunTimes.sunrise) : "06:30";
  const brahmaStr = toTime(addMinutes(sunTimes?.sunrise ? new Date(sunTimes.sunrise) : new Date(new Date().setHours(6,30,0,0)), -96));

  function isNowInBlock(item) {
    const s = new Date(item.start);
    const e = addMinutes(s, item.duration);
    return now >= s && now < e;
  }

  return (
    <div className="min-h-screen p-6 neumorphic-bg" style={{ background: themeBg, color: themeText, fontFamily: lang === "hi" ? "Hind, sans-serif" : "system-ui" }}>
      <AudioVisualizer isPlaying={isPlaying} audioRef={audioRef} />

      <div className="max-w-4xl mx-auto space-y-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center card-hover" style={{
            boxShadow: themeShadow,
            backgroundColor: cardBg,
            border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`,
            fontSize: "1.8rem",
            color: ACCENT
          }}>
            ॐ
          </div>

          <button onClick={() => setSettingsOpen(!settingsOpen)} className="w-12 h-12 rounded-3xl flex items-center justify-center card-hover" style={{
            boxShadow: themeShadow,
            backgroundColor: cardBg,
            border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
          }} aria-label="Settings">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: ACCENT }}></div>
          </button>
        </div>

        {/* SETTINGS PANEL - moved above cards for mobile */}
        {settingsOpen && (
          <div className="p-6 rounded-3xl" style={{
            boxShadow: themeShadow,
            backgroundColor: cardBg,
            border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
          }}>
            <h2 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].settings}</h2>

            {/* Location Section */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3" style={{ color: ACCENT }}>📍 {T[lang].location}</h4>

              {/* Current Status */}
              <div className="mb-4 p-3 rounded-xl" style={{
                backgroundColor: rishiMode ? '#2a1d14' : '#f8fafc',
                border: `1px solid ${locationStatus === 'granted' ? '#10B981' : ACCENT}40`
              }}>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>{' '}
                  {locationStatus === 'granted' ? '✅ Location Active' :
                   locationStatus === 'requesting' ? '🔄 Requesting...' :
                   locationStatus === 'denied' ? '❌ Access Denied' :
                   '🚫 Unavailable'}
                </p>
                {coords && (
                  <p className="text-xs mt-1 opacity-70">
                    📍 {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                  </p>
                )}
              </div>

              {/* Manual Input */}
              <div className="space-y-3">
                <p className="text-sm opacity-70">Enter coordinates manually:</p>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="px-4 py-3 rounded-xl border-2 text-center font-mono"
                    style={{
                      backgroundColor: rishiMode ? '#2a1d14' : 'white',
                      borderColor: rishiMode ? '#3a2d24' : '#e2e8f0',
                      color: themeText
                    }}
                    placeholder="Latitude"
                    value={manualCoords.lat}
                    onChange={(e) => setManualCoords({ ...manualCoords, lat: e.target.value })}
                  />
                  <input
                    className="px-4 py-3 rounded-xl border-2 text-center font-mono"
                    style={{
                      backgroundColor: rishiMode ? '#2a1d14' : 'white',
                      borderColor: rishiMode ? '#3a2d24' : '#e2e8f0',
                      color: themeText
                    }}
                    placeholder="Longitude"
                    value={manualCoords.lon}
                    onChange={(e) => setManualCoords({ ...manualCoords, lon: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-3 rounded-xl text-white font-medium"
                    style={{ backgroundColor: ACCENT }}
                    onClick={() => {
                      if (manualCoords.lat && manualCoords.lon) {
                        const newCoords = { lat: Number(manualCoords.lat), lon: Number(manualCoords.lon) };
                        setCoords(newCoords);
                        setLocationStatus('granted');
                        // Close settings after successful entry
                        setSettingsOpen(false);
                      }
                    }}
                  >
                    📍 {T[lang].apply}
                  </button>
                  {locationStatus !== 'granted' && locationStatus !== 'unavailable' && (
                    <button
                      className="px-4 py-3 rounded-xl font-medium"
                      style={{
                        backgroundColor: rishiMode ? '#2a1d14' : '#e2e8f0',
                        color: themeText
                      }}
                      onClick={requestLocation}
                    >
                      🔄 Auto
                    </button>
                  )}
                </div>
                <p className="text-xs opacity-60 text-center">
                  💡 Tip: Search "my coordinates" or use Google Maps to find your lat/lon
                </p>
                {coords && (
                  <button
                    className="mt-3 px-4 py-2 rounded-xl w-full text-sm"
                    style={{
                      backgroundColor: rishiMode ? '#2a1d14' : '#f87171',
                      color: 'white',
                      opacity: 0.8
                    }}
                    onClick={() => {
                      localStorage.removeItem('rishiRhythmCoords');
                      setCoords(null);
                      setManualCoords({ lat: '', lon: '' });
                      setLocationStatus('requesting');
                      // Try to get location again
                      requestLocation();
                    }}
                  >
                    🗑️ Clear Saved Location
                  </button>
                )}
              </div>
            </div>

            {/* language */}
            <div className="mt-4 text-sm opacity-70">{T[lang].language}</div>
            <div className="flex gap-3 mt-1">
              <button onClick={() => setLang("en")}>EN</button>
              <button onClick={() => setLang("hi")}>हिन्दी</button>
            </div>

            {/* schedule mode */}
            <div className="mt-4 text-sm opacity-70">{T[lang].scheduleMode}</div>
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setScheduleMode("authentic")}
                className="px-4 py-2 rounded-xl font-medium"
                style={{
                  background: scheduleMode === "authentic" ? ACCENT : (rishiMode ? '#2a1d14' : '#e2e8f0'),
                  color: scheduleMode === "authentic" ? "white" : themeText
                }}
              >
                {T[lang].authentic}
              </button>
              <button
                onClick={() => setScheduleMode("adjusted")}
                className="px-4 py-2 rounded-xl font-medium"
                style={{
                  background: scheduleMode === "adjusted" ? ACCENT : (rishiMode ? '#2a1d14' : '#e2e8f0'),
                  color: scheduleMode === "adjusted" ? "white" : themeText
                }}
              >
                {T[lang].adjusted}
              </button>
            </div>

            {/* rishi mode */}
            <div className="mt-4 text-sm opacity-70">{T[lang].rishiMode}</div>
            <button onClick={() => setRishiMode(!rishiMode)} className="mt-1 px-4 py-2 rounded-xl" style={{ background: ACCENT, color: "white" }}>{rishiMode ? "ON" : "OFF"}</button>

            {/* mute chime */}
            <div className="mt-4 text-sm opacity-70">{T[lang].muteChime}</div>
            <button onClick={() => setMuteChime(!muteChime)} className="mt-1 px-4 py-2 rounded-xl" style={{ background: ACCENT, color: "white" }}>{muteChime ? "ON" : "OFF"}</button>
          </div>
        )}

        {/* Location Status Card (only show if location is not granted) */}
        {locationStatus !== 'granted' && !coords && (
          <div className="p-6 rounded-3xl" style={{
            boxShadow: themeShadow,
            backgroundColor: cardBg,
            border: `2px solid ${ACCENT}40`
          }}>
            <div className="flex items-center gap-4">
              <div className="text-3xl">📍</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>
                  {locationStatus === 'requesting' ? 'Requesting Location...' :
                   locationStatus === 'denied' ? 'Location Access Needed' :
                   locationStatus === 'unavailable' ? 'Location Unavailable' : 'Enable Location'}
                </h3>
                <p className="text-sm opacity-75 mb-3">
                  {locationStatus === 'requesting' ? 'Please allow location access in your browser' :
                   locationStatus === 'denied' ? 'Location needed for accurate sunrise/sunset times and hora calculation' :
                   locationStatus === 'unavailable' ? 'Geolocation not supported. Use manual coordinates below.' :
                   'Allow location access for personalized Vedic timing'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {locationStatus === 'denied' && (
                    <button
                      onClick={requestLocation}
                      className="px-4 py-2 rounded-xl text-white font-medium"
                      style={{ backgroundColor: ACCENT }}
                    >
                      🔄 Try Again
                    </button>
                  )}
                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="px-4 py-2 rounded-xl font-medium"
                    style={{
                      backgroundColor: rishiMode ? '#2a1d14' : '#e2e8f0',
                      color: themeText
                    }}
                  >
                    📝 Enter Manually
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ label: T[lang].localTime, value: localTimeStr }, { label: T[lang].sunrise, value: sunriseStr }, { label: T[lang].brahma, value: brahmaStr }].map((b, i) => (
            <div key={i} className="p-6 rounded-3xl card-hover" style={{
              boxShadow: themeShadow,
              backgroundColor: cardBg,
              border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
            }}>
              <div className="text-xs opacity-60 mb-2 font-medium uppercase tracking-wider">{b.label}</div>
              <div className="text-2xl font-bold" style={{ color: ACCENT }}>{b.value}</div>
            </div>
          ))}
        </div>

        {/* MANTRA OF THE DAY */}
        <div className="p-6 rounded-3xl card-hover" style={{
          boxShadow: themeShadow,
          backgroundColor: cardBg,
          border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
        }}>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].mantraTitle}</h3>
              <button onClick={togglePlay} className="px-4 py-2 rounded-xl flex-shrink-0 font-medium" style={{ background: ACCENT, color: "white" }}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>

            {/* Sanskrit/Hindi Text */}
            <div className="p-4 rounded-2xl" style={{
              backgroundColor: rishiMode ? '#2a1d14' : '#f8fafc',
              boxShadow: insetShadow
            }}>
              <p className="text-base leading-relaxed" style={{
                fontFamily: "Hind, sans-serif",
                color: ACCENT,
                fontWeight: "500"
              }}>
                {todaysMantra.hi}
              </p>
            </div>

            {/* English Translation */}
            <div>
              <p className="text-sm leading-relaxed opacity-85">
                {todaysMantra.en}
              </p>
            </div>

            {/* Bija Mantras */}
            {mantraBija && (
              <div className="p-3 rounded-xl border-l-4" style={{
                backgroundColor: `${ACCENT}08`,
                borderColor: ACCENT
              }}>
                <p className="text-xs opacity-70 mb-1 font-medium">Bija Mantras:</p>
                <p className="text-sm italic" style={{
                  fontFamily: "Hind, sans-serif",
                  color: ACCENT
                }}>
                  {mantraBija}
                </p>
              </div>
            )}

            <div className="text-xs opacity-60 text-center">
              Audio pronunciation: śuddh (traditional, not anglicised)
            </div>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="space-y-4">
          {fullSchedule.map((item) => {
            const isCurrentBlock = isNowInBlock(item);
            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl card-hover relative"
                style={{
                  boxShadow: isCurrentBlock ? insetShadow : themeShadow,
                  backgroundColor: isCurrentBlock
                    ? (rishiMode ? '#2a1d14' : '#f0f9ff')
                    : cardBg,
                  border: `2px solid ${isCurrentBlock ? ACCENT : (rishiMode ? '#2a1d14' : '#e2e8f0')}`,
                  background: isCurrentBlock
                    ? `linear-gradient(135deg, ${ACCENT}08 0%, ${cardBg} 100%)`
                    : cardBg
                }}
              >
                {/* Current time indicator */}
                {isCurrentBlock && (
                  <div
                    className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: ACCENT }}
                  />
                )}

                <div className="flex justify-between">
                  <div>
                    <div className="text-xs opacity-60 flex items-center gap-2">
                      <span>{toTime(item.start)} • {item.duration} min</span>
                      {isCurrentBlock && (
                        <span
                          className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: ACCENT,
                            color: 'white'
                          }}
                        >
                          LIVE
                        </span>
                      )}
                    </div>
                    <div
                      className="text-lg font-semibold mt-1"
                      style={{ color: isCurrentBlock ? ACCENT : themeText }}
                    >
                      {item.title}
                    </div>
                    <div className="text-sm opacity-70 mt-1">{item.desc}</div>
                  </div>
                  {isCurrentBlock && (
                    <div className="flex flex-col items-end">
                      <div className="text-xs font-semibold" style={{ color: ACCENT }}>
                        Current
                      </div>
                      <div className="text-2xl animate-pulse" style={{ color: ACCENT }}>●</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ENHANCED HORA CARD */}
        {(() => {
          const horaData = getHoraData();
          const { planet, data, isDay, timeRemaining } = horaData;

          return (
            <div className="p-8 rounded-3xl relative overflow-hidden" style={{
              boxShadow: themeShadow,
              backgroundColor: cardBg,
              border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
            }}>
              {/* Background Gradient based on planet */}
              {data && (
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `radial-gradient(circle at center, ${data.color} 0%, transparent 70%)`
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold" style={{ color: ACCENT }}>
                      {T[lang].hora}
                    </h3>
                    <button
                      onClick={() => setShowHoraInfo(!showHoraInfo)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs card-hover"
                      style={{
                        backgroundColor: rishiMode ? '#2a1d14' : '#e2e8f0',
                        color: ACCENT,
                        border: `1px solid ${ACCENT}30`
                      }}
                      title="What is Hora?"
                    >
                      i
                    </button>
                  </div>
                  {timeRemaining > 0 && (
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
                      backgroundColor: rishiMode ? '#2a1d14' : '#e2e8f0',
                      color: themeText
                    }}>
                      {timeRemaining}min left
                    </span>
                  )}
                </div>

                {/* Hora Explanation Panel */}
                {showHoraInfo && (
                  <div className="mb-4 p-4 rounded-2xl" style={{
                    backgroundColor: rishiMode ? '#2a1d14' : '#f8fafc',
                    border: `1px solid ${ACCENT}30`,
                    boxShadow: insetShadow
                  }}>
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: ACCENT }}>
                      What is Hora?
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90">
                      {T[lang].horaExplanation}
                    </p>
                  </div>
                )}

                {data ? (
                  <div className="space-y-4">
                    {/* Planet Symbol and Name */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-pulse"
                        style={{
                          backgroundColor: `${data.color}20`,
                          border: `2px solid ${data.color}`,
                          animation: `planetPulse 3s ease-in-out infinite`
                        }}
                      >
                        {data.symbol}
                      </div>
                      <div>
                        <h4 className="text-3xl font-bold" style={{ color: data.color }}>
                          {planet}
                        </h4>
                        <p className="text-sm opacity-70">
                          {isDay ? 'Day' : 'Night'} • {data.element} Element
                        </p>
                      </div>
                    </div>

                    {/* Energy Description */}
                    <div className="p-4 rounded-2xl" style={{
                      backgroundColor: rishiMode ? '#2a1d14' : '#f8fafc',
                      boxShadow: insetShadow
                    }}>
                      <h5 className="font-semibold mb-2 text-sm opacity-80">Energy:</h5>
                      <p className="text-sm" style={{ color: data.color }}>{data.energy}</p>
                    </div>

                    {/* Significance */}
                    <div>
                      <h5 className="font-semibold mb-2 text-sm opacity-80">Best for:</h5>
                      <p className="text-sm leading-relaxed">{data.significance}</p>
                    </div>

                    {/* Activity Recommendation */}
                    <div className="mt-4 p-4 rounded-xl" style={{
                      backgroundColor: `${data.color}15`,
                      border: `2px solid ${data.color}40`
                    }}>
                      <p className="text-sm font-bold text-center" style={{ color: data.color }}>
                        {lang === 'hi' ? 'अनुकूल समय' : 'Favorable Time'}
                      </p>
                      <p className="text-xs text-center mt-1 opacity-80">
                        {planet} {T[lang].hora}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🌍</div>
                    <p className="text-sm font-medium mb-2" style={{ color: ACCENT }}>
                      Location Required
                    </p>
                    <p className="text-xs opacity-70 mb-4">
                      Hora calculation needs your location for accurate sunrise/sunset times
                    </p>
                    <div className="flex gap-2 justify-center">
                      {locationStatus !== 'unavailable' && (
                        <button
                          onClick={requestLocation}
                          className="px-4 py-2 rounded-xl text-white text-sm font-medium"
                          style={{ backgroundColor: ACCENT }}
                        >
                          📍 Enable Location
                        </button>
                      )}
                      <button
                        onClick={() => setSettingsOpen(true)}
                        className="px-4 py-2 rounded-xl text-sm font-medium"
                        style={{
                          backgroundColor: rishiMode ? '#2a1d14' : '#e2e8f0',
                          color: themeText
                        }}
                      >
                        📝 Manual Entry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Footer / rituals */}
        <footer className="mt-8 p-4 rounded-2xl" style={{
          boxShadow: themeShadow,
          backgroundColor: cardBg,
          border: `1px solid ${rishiMode ? '#2a1d14' : '#e2e8f0'}`
        }}>
          <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].notes}</h3>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm opacity-70">
            {T[lang].rituals.map((r, idx) => (
              <li key={idx}>• {r}</li>
            ))}
          </ul>
        </footer>

      </div>
    </div>
  );
}

// Export the application component
export default RishiRhythmApp;