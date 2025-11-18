import React, { useEffect, useState, useRef } from "react";
import SunCalc from "suncalc";

// Rishi Rhythm — Final Stable Version (JSX fixed)
// - 50 hardcoded mantras with bija crowns and high-quality audio path placeholders
// - Tanpura ambience layer that plays alongside mantra
// - Play/Pause chant with ambient, muteable Brahma chime, Hora calculation
// - Hindi font loader, Rishi Mode, settings panel, full schedule

export default function RishiRhythmApp() {
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

  // geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => {}
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

  // MANTRAS (50) — each has en, hi, bija, audio
  const MANTRAS = [
    { en: "Om Bhur Bhuvah Svah — The cosmic invocation.", hi: "ॐ भूर्भुवः स्वः — ब्रह्मांडीय आवाहन।", bija: "ॐ भूः भुवः स्वः | ॐ ह्रीं क्लीं", audio: "/audio/shuddh/mantra01.mp3" },
    { en: "Om Namah Shivaya — Salutation to auspicious consciousness.", hi: "ॐ नमः शिवाय।", bija: "ॐ ह्रीं नमः शिवाय", audio: "/audio/shuddh/mantra02.mp3" },
    { en: "Lokah Samastah Sukhino Bhavantu — May all beings be happy.", hi: "लोकाः समस्ताः सुखिनो भवन्तु।", bija: "ॐ शांतिः क्लीं", audio: "/audio/shuddh/mantra03.mp3" },
    { en: "Om Gam Ganapataye Namaha — Remove obstacles.", hi: "ॐ गं गणपतये नमः।", bija: "ॐ गं", audio: "/audio/shuddh/mantra04.mp3" },
    { en: "Asato Ma Sad Gamaya — From unreal to real.", hi: "असतो मा सद्गमय।", bija: "ॐ ह्रीं", audio: "/audio/shuddh/mantra05.mp3" },
    { en: "Tamaso Ma Jyotir Gamaya — From darkness to light.", hi: "तमसो मा ज्योतिर्गमय।", bija: "ॐ नमो नमः", audio: "/audio/shuddh/mantra06.mp3" },
    { en: "Mrityor Ma Amritam Gamaya — From death to immortality.", hi: "मृत्योर्मा अमृतं गमय।", bija: "ॐ रहुम", audio: "/audio/shuddh/mantra07.mp3" },
    { en: "Om Purnamadah Purnamidam — That is whole, this is whole.", hi: "ॐ पूर्णमदः पूर्णमिदम्।", bija: "ॐ", audio: "/audio/shuddh/mantra08.mp3" },
    { en: "Om Shanti Shanti Shanti — Peace.", hi: "ॐ शान्तिः शान्तिः शान्तिः।", bija: "ॐ शान्तिः", audio: "/audio/shuddh/mantra09.mp3" },
    { en: "Om Saha Navavatu — May He protect us together.", hi: "ॐ सह नाववतु।", bija: "ॐ सह", audio: "/audio/shuddh/mantra10.mp3" },
    { en: "Tejasvinavadhitamastu — May our study be radiant.", hi: "तेजस्विनावधीतमस्तु।", bija: "ॐ तेजः", audio: "/audio/shuddh/mantra11.mp3" },
    { en: "Om Shreem Mahalakshmyai Namaha.", hi: "ॐ श्रीं महालक्ष्म्यै नमः।", bija: "ॐ श्रीं", audio: "/audio/shuddh/mantra12.mp3" },
    { en: "Om Aim Sarasvatyai Namaha.", hi: "ॐ ऐं सरस्वत्यै नमः।", bija: "ॐ ऐं", audio: "/audio/shuddh/mantra13.mp3" },
    { en: "Maha Mrityunjaya — Om Tryambakam Yajamahe.", hi: "ॐ त्र्यम्बकं यजामहे।", bija: "ॐ त्र्यम्बकं", audio: "/audio/shuddh/mantra14.mp3" },
    { en: "Durga Suktam — Om Jatavedase.", hi: "दुर्गा सूक्त।", bija: "ॐ दुर्गायै नमः", audio: "/audio/shuddh/mantra15.mp3" },
    { en: "Narayanam Pataye Swaha.", hi: "नारायणं पतये स्वाहा।", bija: "ॐ नारायणाय नमः", audio: "/audio/shuddh/mantra16.mp3" },
    { en: "Om Namo Bhagavate Vasudevaya.", hi: "ॐ नमो भगवते वासुदेवाय।", bija: "ॐ नमो", audio: "/audio/shuddh/mantra17.mp3" },
    { en: "Om Namo Narayanaya.", hi: "ॐ नमो नारायणाय।", bija: "ॐ नारायणाय", audio: "/audio/shuddh/mantra18.mp3" },
    { en: "Gayatri — Dhiyo Yo Nah Prachodayat.", hi: "गायत्री मंत्र — धियो यो नः प्रचोदयात्।", bija: "ॐ भूर्भुवः स्वः", audio: "/audio/shuddh/mantra19.mp3" },
    { en: "Om Ram Ramaya Namaha.", hi: "ॐ राम रामाय नमः।", bija: "ॐ राम", audio: "/audio/shuddh/mantra20.mp3" },
    { en: "Om Krim Kalikayai Namaha.", hi: "ॐ क्रीं कालीकायै नमः।", bija: "ॐ क्रीं", audio: "/audio/shuddh/mantra21.mp3" },
    { en: "Om Dum Durgayai Namaha.", hi: "ॐ दुं दुर्गायै नमः।", bija: "ॐ दुं", audio: "/audio/shuddh/mantra22.mp3" },
    { en: "Medha Suktam — Om Medhadevi.", hi: "मेधा सूक्त।", bija: "ॐ मेधा", audio: "/audio/shuddh/mantra23.mp3" },
    { en: "Sri Suktam — Om Hreem Shriye.", hi: "श्री सूक्त।", bija: "ॐ ह्रीं", audio: "/audio/shuddh/mantra24.mp3" },
    { en: "Purusha Suktam — Sahasra Sirsha.", hi: "पुरुष सूक्त।", bija: "ॐ पुरुषाय", audio: "/audio/shuddh/mantra25.mp3" },
    { en: "Narayan Suktam.", hi: "नारायण सूक्त।", bija: "ॐ नारायणाय", audio: "/audio/shuddh/mantra26.mp3" },
    { en: "Rudram — Namakam.", hi: "रुद्रम।", bija: "ॐ रुद्राय नमः", audio: "/audio/shuddh/mantra27.mp3" },
    { en: "Chamakam.", hi: "चमकम्।", bija: "ॐ चम", audio: "/audio/shuddh/mantra28.mp3" },
    { en: "Shanti Mantra — Om Dyauh Shantih.", hi: "शान्ति मंत्र।", bija: "ॐ शान्तिः", audio: "/audio/shuddh/mantra29.mp3" },
    { en: "Brahma Suktam — Hiranyagarbha.", hi: "ब्रह्म सूक्त।", bija: "ॐ ब्रह्म", audio: "/audio/shuddh/mantra30.mp3" },
    { en: "Om Rudraya Namaha.", hi: "ॐ रुद्राय नमः।", bija: "ॐ रुद्र", audio: "/audio/shuddh/mantra31.mp3" },
    { en: "Om Hreem Namah Shivaya.", hi: "ॐ ह्रीं नमः शिवाय।", bija: "ॐ ह्रीं", audio: "/audio/shuddh/mantra32.mp3" },
    { en: "Bhagavati Suktam.", hi: "भगवती सूक्तम्।", bija: "ॐ भगवती", audio: "/audio/shuddh/mantra33.mp3" },
    { en: "Vakratunda Mahakaya.", hi: "वक्रतुण्ड महाकाय।", bija: "ॐ वक्रतुण्डः", audio: "/audio/shuddh/mantra34.mp3" },
    { en: "Shreem Klim Mahalakshmyai.", hi: "श्रीं क्लीं महालक्ष्म्यै।", bija: "ॐ श्रीं क्लीं", audio: "/audio/shuddh/mantra35.mp3" },
    { en: "Om Namah Chandikayai.", hi: "ॐ नमः चण्डिकायै।", bija: "ॐ चण्डिका", audio: "/audio/shuddh/mantra36.mp3" },
    { en: "Sarvesham Svastir Bhavatu.", hi: "सर्वेषां स्वस्तिर्भवतु।", bija: "ॐ स्वस्ति", audio: "/audio/shuddh/mantra37.mp3" },
    { en: "Sarvesham Shantir Bhavatu.", hi: "सर्वेषां शान्तिर्भवतु।", bija: "ॐ शान्ति", audio: "/audio/shuddh/mantra38.mp3" },
    { en: "Sarvesham Purnam Bhavatu.", hi: "सर्वेषां पूर्णं भवतु।", bija: "ॐ पूर्ण", audio: "/audio/shuddh/mantra39.mp3" },
    { en: "Om Anandamaya Chaitanyamaya.", hi: "ॐ आनन्दमयः चैतन्यमयः।", bija: "ॐ आनन्द", audio: "/audio/shuddh/mantra40.mp3" },
    { en: "Om Tat Sat.", hi: "ॐ तत्सत्।", bija: "ॐ तत्सत्", audio: "/audio/shuddh/mantra41.mp3" },
    { en: "Om Soham — I am That.", hi: "सोऽहम्।", bija: "सोऽहम्", audio: "/audio/shuddh/mantra42.mp3" },
    { en: "Hamsa Gayatri — Om Hamsa Hamsaya Vidmahe.", hi: "हंस गायत्री।", bija: "ॐ हंस", audio: "/audio/shuddh/mantra43.mp3" },
    { en: "Om Shreem Brzee.", hi: "ॐ श्रीं ब्रज़ी।", bija: "ॐ श्रीं ब्रज़ी", audio: "/audio/shuddh/mantra44.mp3" },
    { en: "Om Kleem Krishnaya Namaha.", hi: "ॐ क्लीं कृष्णाय नमः।", bija: "ॐ क्लीं", audio: "/audio/shuddh/mantra45.mp3" },
    { en: "Gayatri (alternate).", hi: "गायत्री वैकल्पिक।", bija: "ॐ भूर्भुवः स्वः", audio: "/audio/shuddh/mantra46.mp3" },
    { en: "Om Aim Hrim Klim — Saraswati/Gayatri seed.", hi: "ॐ ऐं ह्रीं क्लीं।", bija: "ॐ ऐं ह्रीं क्लीं", audio: "/audio/shuddh/mantra47.mp3" },
    { en: "Om Namo Narayani.", hi: "ॐ नमो नारायणी।", bija: "ॐ नारायणी", audio: "/audio/shuddh/mantra48.mp3" },
    { en: "Om Shanti Om.", hi: "ॐ शान्ति ॐ।", bija: "ॐ शान्ति", audio: "/audio/shuddh/mantra49.mp3" },
    { en: "Om — The primal sound.", hi: "ॐ।", bija: "ॐ", audio: "/audio/shuddh/mantra50.mp3" },
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
    } else {
      audioRef.current.src = todaysMantra.audio;
    }

    if (!ambientRef.current) {
      ambientRef.current = new Audio("/audio/ambience/tanpura_drone.mp3");
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.25;
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

  // translations
  const T = {
    en: {
      settings: "Settings",
      location: "Location (manual input if needed)",
      apply: "Apply",
      language: "Language",
      rishiMode: "Rishi Mode",
      muteChime: "Mute Brahma Muhurta Chime",
      gita: "Bhagavad Gita",
      localTime: "Local Time",
      sunrise: "Sunrise",
      brahma: "Brahma Muhurta",
      notes: "Rishi Notes",
      mantraTitle: "Mantra of the Day",
      hora: "Current Hora",
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
      muteChime: "ब्रह्म मुहूर्त घंटी बंद करें",
      gita: "भगवद गीता",
      localTime: "स्थानीय समय",
      sunrise: "सूर्योदय",
      brahma: "ब्रह्म मुहूर्त",
      notes: "ऋषि सूत्र",
      mantraTitle: "दिन का मंत्र",
      hora: "वर्तमान होरा",
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

  // Hora calculation
  function getHora() {
    if (!sunTimes || !sunTimes.sunrise || !sunTimes.sunset) return "—";
    const sunrise = new Date(sunTimes.sunrise).getTime();
    const sunset = new Date(sunTimes.sunset).getTime();
    if (sunset <= sunrise) return "—";
    const dayMs = sunset - sunrise;
    const nightMs = 24 * 3600000 - dayMs;
    const isDay = now.getTime() >= sunrise && now.getTime() < sunset;
    const slotMs = isDay ? dayMs / 12 : nightMs / 12;
    const base = isDay ? sunrise : sunset;
    const idx = Math.floor((now.getTime() - base) / slotMs);
    if (isNaN(idx)) return "—";
    const rulers = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
    return rulers[((idx % 7) + 7) % 7];
  }

  // build schedule
  function buildFullSchedule() {
    const sr = sunTimes?.sunrise ? new Date(sunTimes.sunrise) : (() => { const d = new Date(); d.setHours(6,30,0,0); return d; })();
    const brahmaStart = addMinutes(sr, -90);
    return [
      { id: "brahma", title: lang === "hi" ? "ब्रह्म मुहूर्त — मौन" : "Brahma Muhurta — Silence", start: brahmaStart, duration: 30, desc: lang === "hi" ? "पूर्व दिशा की ओर बैठें।" : "Sit facing east." },
      { id: "sandhya", title: lang === "hi" ? "संध्या" : "Sandhyā", start: addMinutes(brahmaStart, 30), duration: 20, desc: lang === "hi" ? "अर्घ्य और ध्यान" : "Arghya and invocation." },
      { id: "pranayama", title: lang === "hi" ? "प्राणायाम" : "Prāṇāyāma", start: addMinutes(brahmaStart, 50), duration: 30, desc: lang === "hi" ? "धीमी श्वास" : "Breathwork and japa." },
      { id: "walk", title: lang === "hi" ? "सूर्योदय भ्रमण" : "Sunrise Walk", start: sr, duration: 30, desc: lang === "hi" ? "प्राकृतिक रोशनी से मिलें" : "Walk in morning light." },
      { id: "study", title: lang === "hi" ? "प्रातः साधना" : "Morning Sādhanā", start: addMinutes(sr,30), duration: 150, desc: lang === "hi" ? "अध्ययन और रचना" : "Deep creative work." },
      { id: "midday", title: lang === "hi" ? "मध्यान्ह—मुख्य भोजन" : "Madhyāhna — Main Meal", start: addMinutes(sr,210), duration: 60, desc: lang === "hi" ? "मध्यान्ह भोजन" : "Main meal." },
      { id: "afternoon", title: lang === "hi" ? "दोपहर—हल्का कार्य" : "Afternoon — Light Work", start: addMinutes(sr,270), duration: 180, desc: lang === "hi" ? "हल्का कार्य" : "Light tasks and errands." },
      { id: "sandhya2", title: lang === "hi" ? "सायं संध्या" : "Evening Sandhyā", start: sunTimes?.sunset ? new Date(sunTimes.sunset) : addMinutes(sr,720), duration: 20, desc: lang === "hi" ? "सूर्यास्त ध्यान" : "Sunset contemplation." },
      { id: "dinner", title: lang === "hi" ? "हल्का रात्रि भोजन" : "Light Dinner", start: addMinutes(sr,780), duration: 45, desc: lang === "hi" ? "हल्का भोजन" : "Simple dinner." },
      { id: "night", title: lang === "hi" ? "रात्रि—विश्राम" : "Night — Rest", start: addMinutes(sr,870), duration: 480, desc: lang === "hi" ? "शांति से निद्रा" : "Early sleep and rest." },
    ];
  }

  const fullSchedule = buildFullSchedule();
  const themeBg = rishiMode ? "#1a120b" : "#e9eef3";
  const themeText = rishiMode ? "#C47A54" : "#111";
  const themeShadow = rishiMode ? "8px 8px 16px #0d0805, -8px -8px 16px #2e1d13" : "8px 8px 16px #c5cacf, -8px -8px 16px #ffffff";

  // top info
  const localTimeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunriseStr = sunTimes?.sunrise ? toTime(sunTimes.sunrise) : "06:30";
  const brahmaStr = toTime(addMinutes(sunTimes?.sunrise ? new Date(sunTimes.sunrise) : new Date(new Date().setHours(6,30,0,0)), -90));

  function isNowInBlock(item) {
    const s = new Date(item.start);
    const e = addMinutes(s, item.duration);
    return now >= s && now < e;
  }

  return (
    <div className="min-h-screen p-6" style={{ background: themeBg, color: themeText, fontFamily: lang === "hi" ? "Hind, sans-serif" : "system-ui" }}>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ boxShadow: themeShadow, fontSize: "1.8rem" }}>
            ॐ
          </div>

          <button onClick={() => setSettingsOpen(!settingsOpen)} className="w-12 h-12 rounded-3xl flex items-center justify-center" style={{ boxShadow: themeShadow }} aria-label="Settings">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: ACCENT }}></div>
          </button>
        </div>

        {/* top cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ label: T[lang].localTime, value: localTimeStr }, { label: T[lang].sunrise, value: sunriseStr }, { label: T[lang].brahma, value: brahmaStr }].map((b, i) => (
            <div key={i} className="p-5 rounded-3xl" style={{ boxShadow: themeShadow }}>
              <div className="text-xs opacity-60 mb-1">{b.label}</div>
              <div className="text-xl font-medium" style={{ color: ACCENT }}>{b.value}</div>
            </div>
          ))}
          </div>

        {/* SETTINGS PANEL */}
        {settingsOpen && (
          <div className="p-6 rounded-3xl" style={{ boxShadow: themeShadow }}>
            <h2 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].settings}</h2>

            {/* location inputs */}
            <div className="mt-4 text-sm opacity-70">{T[lang].location}</div>
            <div className="flex gap-2 mt-1">
              <input className="px-3 py-2 rounded-xl bg-transparent border" placeholder="Lat" value={manualCoords.lat} onChange={(e) => setManualCoords({ ...manualCoords, lat: e.target.value })} />
              <input className="px-3 py-2 rounded-xl bg-transparent border" placeholder="Lon" value={manualCoords.lon} onChange={(e) => setManualCoords({ ...manualCoords, lon: e.target.value })} />
              <button className="px-4 py-2 rounded-xl text-white text-sm" style={{ backgroundColor: ACCENT }} onClick={() => setCoords({ lat: Number(manualCoords.lat), lon: Number(manualCoords.lon) })}>{T[lang].apply}</button>
            </div>

            {/* language */}
            <div className="mt-4 text-sm opacity-70">{T[lang].language}</div>
            <div className="flex gap-3 mt-1">
              <button onClick={() => setLang("en")}>EN</button>
              <button onClick={() => setLang("hi")}>हिन्दी</button>
            </div>

            {/* rishi mode */}
            <div className="mt-4 text-sm opacity-70">{T[lang].rishiMode}</div>
            <button onClick={() => setRishiMode(!rishiMode)} className="mt-1 px-4 py-2 rounded-xl" style={{ background: ACCENT, color: "white" }}>{rishiMode ? "ON" : "OFF"}</button>

            {/* mute chime */}
            <div className="mt-4 text-sm opacity-70">{T[lang].muteChime}</div>
            <button onClick={() => setMuteChime(!muteChime)} className="mt-1 px-4 py-2 rounded-xl" style={{ background: ACCENT, color: "white" }}>{muteChime ? "ON" : "OFF"}</button>
          </div>
        )}

        {/* MANTRA OF THE DAY */}
        <div className="p-6 rounded-3xl" style={{ boxShadow: themeShadow }}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].mantraTitle}</h3>
              <p className="mt-2 opacity-80 text-sm">{mantraText}</p>
              <p className="mt-2 opacity-60 text-sm italic">{mantraBija}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={togglePlay} className="px-4 py-2 rounded-xl" style={{ background: ACCENT, color: "white" }}>{isPlaying ? "Pause Chant" : "Play Chant"}</button>
              <div className="text-xs opacity-70">Audio pronunciation: śuddh (not anglicised)</div>
            </div>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="space-y-4">
          {fullSchedule.map((item) => (
            <div key={item.id} className="p-5 rounded-3xl" style={{ boxShadow: isNowInBlock(item) ? "inset 6px 6px 12px #c5cacf, inset -6px -6px 12px #ffffff" : themeShadow }}>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs opacity-60">{toTime(item.start)} • {item.duration} min</div>
                  <div className="text-lg font-semibold mt-1">{item.title}</div>
                  <div className="text-sm opacity-70 mt-1">{item.desc}</div>
                </div>
                {isNowInBlock(item) && <div className="text-xs font-semibold text-green-500">Now</div>}
              </div>
            </div>
          ))}
        </div>

        {/* HORA */}
        <div className="p-6 rounded-3xl" style={{ boxShadow: themeShadow }}>
          <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>{T[lang].hora}</h3>
          <div className="mt-2 text-sm opacity-80">{getHora()}</div>
        </div>

        {/* Footer / rituals */}
        <footer className="mt-8 p-4 rounded-2xl" style={{ boxShadow: themeShadow }}>
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
