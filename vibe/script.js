// Game State
let gameState = {
    currentScenario: 0,
    scores: {
        chaos: 0,
        chill: 0,
        emo: 0,
        savage: 0
    },
    timeLeft: 5,
    timerInterval: null,
    totalScenarios: 12,
    isGameActive: false,
    currentScenarioData: null
};

// Expanded Vibe Profiles with score-based variations
const vibeProfiles = {
    chaos: {
        name: "Chaos Gremlin 🔥",
        emoji: "🔥",
        gradient: "linear-gradient(135deg, #ff0080, #8000ff)",
        descriptions: {
            low: [
                "You're giving controlled chaos energy. Still unhinged, but make it organized bestie! 🔥",
                "Chaos gremlin on training wheels - you're getting there but not quite feral yet! 💀",
                "Baby's first chaos moment! You're learning the art of beautiful disaster! ✨",
                "Chaos curious but still keeping some sanity intact. We love a cautious queen! 🤡",
                "You dip your toes in chaos but keep a life jacket on. Safety first bestie! 🌊"
            ],
            medium: [
                "Balanced chaos energy! You know when to stir the pot and when to chill. Perfect combo! 🔥",
                "You're the chaos coordinator we all need! Organized madness at its finest! 💥",
                "Part-time menace, full-time icon. You choose your chaos moments wisely! ⚡",
                "Selective chaos bestie! You know which battles to fight and which to chaos! 👑",
                "Medium chaos energy - you're the friend who starts drama but also brings snacks! 🍿"
            ],
            high: [
                "MAXIMUM CHAOS UNLOCKED! You ARE the main character everyone fears but secretly wants to be! 🔥💀",
                "Pure unhinged energy! You thrive on drama and live for the absolute chaos of it all! 💥",
                "Chaos incarnate bestie! You don't just watch the world burn, you provide the matches! 🔥",
                "Professional menace behavior! You wake up and choose violence every single day! ⚡",
                "Peak chaos gremlin! You're the reason group chats have trust issues and we LIVE for it! 👹"
            ]
        }
    },
    chill: {
        name: "Unbothered Icon 😎",
        emoji: "😎",
        gradient: "linear-gradient(135deg, #00ff80, #3a86ff)",
        descriptions: {
            low: [
                "Chill with a side of spice! You're mostly zen but can throw hands when needed! 😎",
                "Semi-unbothered energy. You care but like, not THAT much you know? 🌊",
                "Part-time chill, part-time ready to throw down. We love the duality! ✨",
                "Chill but make it spicy! You're zen until someone tests your patience! 🌶️",
                "Relaxed but not boring! You bring the calm AND the entertainment! 🎵"
            ],
            medium: [
                "Perfectly balanced chill energy! You know when to care and when to let it slide! 😎",
                "Master of selective unbothered-ness! You pick your battles like a true strategist! 🧘",
                "Chill coordinator bestie! You keep everyone grounded while staying iconic! 🌊",
                "Zen with personality! You're calm but your humor hits different! ✨",
                "Medium chill means maximum efficiency! You don't waste energy on nonsense! 💫"
            ],
            high: [
                "ULTIMATE UNBOTHERED QUEEN/KING! Nothing shakes your vibe, you're human zen incarnate! 😎✨",
                "Maximum chill achieved! You're giving weighted blanket energy and we're here for it! 🌊",
                "Unbothered legend! Problems bounce off you like you're made of Teflon! 💎",
                "Peak zen bestie! You're so chill that ice cubes are jealous of your temperature! 🧊",
                "Absolutely untouchable chill! You float above drama like you have your own gravity! 🌙"
            ]
        }
    },
    emo: {
        name: "Soft Life Poet 😭",
        emoji: "😭",
        gradient: "linear-gradient(135deg, #8000ff, #ff0080)",
        descriptions: {
            low: [
                "Soft energy but with a backbone! You feel things but you're not drowning in it! 💜",
                "Emo-adjacent bestie! You appreciate the aesthetic but keep it light! 🌙",
                "Gentle soul with hidden strength! You're sensitive but know your worth! ✨",
                "Soft but not spineless! You feel deeply but don't let it consume you! 💫",
                "Part-time poet, full-time pragmatist! You balance feelings with logic! 📝"
            ],
            medium: [
                "Perfect soft life balance! You feel everything deeply but channel it beautifully! 💜",
                "Emotional intelligence queen! You understand feelings but don't let them rule you! 🌙",
                "Balanced poet energy! You create beauty from pain without drowning in it! ✨",
                "Medium soft means maximum depth! You feel it all but stay afloat! 🌊",
                "Curated vulnerability bestie! You share your heart but protect your peace! 💎"
            ],
            high: [
                "MAXIMUM SOFT LIFE POET! You feel everything in 4K and your playlist hits different! 😭💜",
                "Peak emotional intelligence! You're sensitive, poetic, and the main character of your story! 🌙",
                "Professional feelings-haver! Your aesthetic is immaculate and your heart is pure art! ✨",
                "Ultimate soft bestie! You turn pain into poetry and trauma into triumph! 📝",
                "Feeling things at maximum capacity! You're a walking emotional masterpiece! 💫"
            ]
        }
    },
    savage: {
        name: "No Filter Legend 😤",
        emoji: "😤",
        gradient: "linear-gradient(135deg, #ff0080, #00ff80)",
        descriptions: {
            low: [
                "Savage in training! You have the spirit but you're still learning to roast! 😤",
                "Baby savage energy! You're getting there but still have a filter sometimes! 🔥",
                "Part-time savage, full-time considerate! You know when to turn up the heat! ⚡",
                "Selective savage bestie! You choose your victims... I mean moments wisely! 👑",
                "Savage lite - all the attitude with less of the casualties! 💫"
            ],
            medium: [
                "Balanced savage energy! You know when to slay and when to stay calm! 😤",
                "Strategic savage! You pick your battles and win them all! ⚡",
                "Professional roaster on weekends only! You save your energy for worthy targets! 🔥",
                "Medium savage means maximum impact! You don't waste good material! 💯",
                "Calculated chaos bestie! Every savage moment is perfectly timed! 👑"
            ],
            high: [
                "MAXIMUM SAVAGE UNLOCKED! Sharp tongue, zero patience, absolute SLAY energy periodt! 😤🔥",
                "No filter legend activated! People fear you but also secretly want to be you! ⚡",
                "Peak savage behavior! You wake up and choose violence in the most elegant way! 👑",
                "Professional roast master! Your comebacks have their own zip codes! 💯",
                "Ultimate no-chill energy! You're giving boss vibes and everyone's taking notes! 💥"
            ]
        }
    }
};

// Cookie Management
const CookieManager = {
    set: (name, value, days = 30) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
    },
    
    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                try {
                    return JSON.parse(c.substring(nameEQ.length, c.length));
                } catch(e) {
                    return null;
                }
            }
        }
        return null;
    },
    
    addUsedScenario: (scenarioIndex) => {
        let usedScenarios = CookieManager.get('usedScenarios') || [];
        usedScenarios.push(scenarioIndex);
        
        // Keep only last 60 used scenarios (5 sessions * 12 scenarios)
        if (usedScenarios.length > 60) {
            usedScenarios = usedScenarios.slice(-60);
        }
        
        CookieManager.set('usedScenarios', usedScenarios);
    },
    
    getUsedScenarios: () => {
        return CookieManager.get('usedScenarios') || [];
    }
};

// Scenarios Database
const scenarios = [
    {
        text: "Your crush leaves you on read 📱",
        responses: {
            "😎": "chill",
            "🔥": "chaos", 
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Group project, nobody contributes 😤",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo", 
            "😤": "savage"
        }
    },
    {
        text: "Your order arrives wrong again 🍔💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone spoils a Netflix show 😡",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Bestie tags you in an ugly photo 🫠",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You just got paid 💸",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your ex posts with someone new 📸",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "WiFi goes down during important call 📡",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone screenshots your story 👀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your phone dies at 1% 🔋💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Professor assigns homework on Friday 📚😭",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your favorite song comes on shuffle 🎵✨",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone cuts in line at Starbucks ☕😠",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your TikTok gets 10K views overnight 📱🚀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Parents ask about your grades 📊😬",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You get left on delivered for 3 days 💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone steals your parking spot 🚗😠",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your Amazon package gets stolen 📦💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Group chat goes off without you 📱👻",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You accidentally like your ex's old pic 💀📸",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your card gets declined in public 💳😳",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone copies your outfit exactly 👗💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You walk into a spider web 🕷️😱",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your Spotify Wrapped is embarrassing 🎵💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You send a text to the wrong person 📱😬",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your food delivery is 2 hours late 🍕⏰",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone doesn't return your energy 🙄💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You realize you've been singing wrong lyrics 🎵💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your boss schedules a Monday morning meeting 📅😴",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You find out there was a party without you 🎉💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your favorite show gets cancelled 📺💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone eats your labeled food in the fridge 🥪😠",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You get a parking ticket 🎫💸",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your phone auto-corrects to something embarrassing 📱💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You trip in front of your crush 🤡💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone spoils the season finale 📺😡",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your streak on Duolingo ends 🦉💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You accidentally open your front camera 📱😱",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your playlist starts playing out loud 🔊💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone doesn't laugh at your joke 🤡💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You realize you're in the wrong Zoom call 💻😬",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your favorite artist drops a surprise album 🎵✨",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You see your ex with someone hotter 💀🔥",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone asks if you're okay when you're fine 😐",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your meme gets stolen and goes viral 📱💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You accidentally call your teacher 'mom' 👩‍🏫💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your DoorDash driver steals your food 🍔💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You get ghosted after a great first date 👻💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone screenshots your Snapchat 📱👀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your favorite coffee shop runs out of your order ☕💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You find out your crush is taken 💍💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone unfollows you on Instagram 📱💔",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your WiFi cuts out during a clutch gaming moment 🎮💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You accidentally send a thirst trap to your mom 📱💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Someone leaves you on read for a week 💌👻",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "Your favorite influencer gets cancelled 📱💥",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    },
    {
        text: "You realize you've been pronouncing a word wrong your whole life 🗣️💀",
        responses: {
            "😎": "chill",
            "🔥": "chaos",
            "😭": "emo",
            "😤": "savage"
        }
    }
];

// Feedback messages for each vibe
const feedbackMessages = {
    chaos: ["Chaotic energy! 💥", "It's giving unhinged! 🔥", "Absolute menace behavior! 😈", "Chaos mode activated! 💀", "Bestie chose violence! ⚡"],
    chill: ["That's so unbothered! 😎", "Main character chill! ✨", "No cap, zen vibes! 🌊", "Periodt queen/king! 🧘‍♀️", "It's the chill for me! 💫"],
    emo: ["Felt that in my soul! 💫", "Main character energy! 🌙", "It's giving poet vibes! 📝", "Emotional damage! 💕", "We love a deep thinker! 🖤"],
    savage: ["That was COLD! 💯", "No mercy bestie! ⚡", "Ice in your veins! 🧊", "Absolutely ruthless! 👑", "Savage move fr! 🔥"]
};

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
};

const gameElements = {
    progressFill: document.getElementById('progress-fill'),
    currentScenario: document.getElementById('current-scenario'),
    totalScenarios: document.getElementById('total-scenarios'),
    timerCircle: document.getElementById('timer-circle'),
    timerText: document.getElementById('timer-text'),
    scenarioBubble: document.getElementById('scenario-bubble'),
    scenarioText: document.getElementById('scenario-text'),
    emojiButtons: document.getElementById('emoji-buttons'),
    feedbackFlash: document.getElementById('feedback-flash'),
    feedbackText: document.getElementById('feedback-text')
};

const resultElements = {
    vibeEmoji: document.getElementById('vibe-emoji'),
    vibeName: document.getElementById('vibe-name'),
    vibeDescription: document.getElementById('vibe-description'),
    vibePercentage: document.getElementById('vibe-percentage'),
    vibeCard: document.getElementById('vibe-card')
};

// Initialize game
function init() {
    setupEventListeners();
    gameElements.totalScenarios.textContent = gameState.totalScenarios;
}

// Event listeners
function setupEventListeners() {
    // Emoji button clicks
    const emojiButtons = document.querySelectorAll('.emoji-btn');
    emojiButtons.forEach(btn => {
        btn.addEventListener('click', () => handleEmojiClick(btn));
        // Add touch feedback
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('touchend', () => {
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });

    // Touch gestures for swipe
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (!gameState.isGameActive) return;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!gameState.isGameActive) return;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Prevent zoom on double tap
    document.addEventListener('touchend', (e) => {
        if (e.target.closest('.emoji-btn')) return;
        e.preventDefault();
    }, { passive: false });
}

// Handle swipe gestures
function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) < swipeThreshold) return;
    
    if (swipeDistance > 0) {
        // Swipe up - positive/confident
        handleResponse('chaos');
    } else {
        // Swipe down - negative/chill  
        handleResponse('chill');
    }
}

// Start game
function startGame() {
    resetGameState();
    switchScreen('game');
    loadNextScenario();
}

// Reset game state
function resetGameState() {
    gameState.currentScenario = 0;
    gameState.scores = { chaos: 0, chill: 0, emo: 0, savage: 0 };
    gameState.timeLeft = 5;
    gameState.isGameActive = true;
    gameState.finalResults = null; // Clear stored results
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
}

// Switch between screens
function switchScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
    
    // Add animation delay for smoother transitions
    // Note: Timer is managed by loadNextScenario(), not here
}

// Load next scenario
function loadNextScenario() {
    if (gameState.currentScenario >= gameState.totalScenarios) {
        endGame();
        return;
    }
    
    // Get used scenarios from cookies
    const usedScenarios = CookieManager.getUsedScenarios();
    
    // Filter out recently used scenarios
    const availableScenarios = scenarios.filter((scenario, index) => 
        !usedScenarios.includes(index)
    );
    
    // If no unused scenarios available, reset and use all scenarios
    let scenarioPool = availableScenarios.length > 0 ? availableScenarios : scenarios;
    let selectedScenario, selectedIndex;
    
    if (availableScenarios.length > 0) {
        // Pick from unused scenarios
        const randomPoolIndex = Math.floor(Math.random() * availableScenarios.length);
        selectedScenario = availableScenarios[randomPoolIndex];
        selectedIndex = scenarios.indexOf(selectedScenario);
    } else {
        // Reset used scenarios if all have been used
        CookieManager.set('usedScenarios', []);
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        selectedScenario = scenarios[randomIndex];
        selectedIndex = randomIndex;
    }
    
    // Store the selected scenario
    gameState.currentScenarioData = selectedScenario;
    CookieManager.addUsedScenario(selectedIndex);
    
    // Update UI
    gameElements.scenarioText.textContent = gameState.currentScenarioData.text;
    gameElements.currentScenario.textContent = gameState.currentScenario + 1;
    
    // Update progress
    const progress = ((gameState.currentScenario) / gameState.totalScenarios) * 100;
    gameElements.progressFill.style.width = progress + '%';
    
    // Animate scenario bubble
    gameElements.scenarioBubble.classList.remove('animate-in');
    setTimeout(() => {
        gameElements.scenarioBubble.classList.add('animate-in');
    }, 100);
    
    // Reset timer
    resetTimer();
    startTimer();
}

// Timer functions
function startTimer() {
    gameState.timeLeft = 5;
    gameElements.timerText.textContent = gameState.timeLeft;
    gameElements.timerCircle.classList.remove('warning');
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        gameElements.timerText.textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 2) {
            gameElements.timerCircle.classList.add('warning');
        }
        
        if (gameState.timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function resetTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    gameElements.timerCircle.classList.remove('warning');
}

function handleTimeout() {
    // Show meme culture timeout message instead of compliment
    const timeoutMessages = [
        "Time's up bestie! 💀",
        "You froze like Windows 95! 🖥️",
        "That's a no from me dawg! 🐕",
        "Error 404: Decision not found! 💻",
        "Left you hanging like my last relationship! 💔",
        "Slower than internet explorer! 🐌",
        "That's not very cash money of you! 💸",
        "You really said 'nah I'm good'! 🙃",
        "Time flew but you didn't! ⏰",
        "Commitment issues much? 💀"
    ];
    
    const randomMessage = timeoutMessages[Math.floor(Math.random() * timeoutMessages.length)];
    
    gameElements.feedbackText.textContent = randomMessage;
    gameElements.feedbackFlash.classList.remove('hidden');
    gameElements.feedbackFlash.classList.add('show');
    
    setTimeout(() => {
        gameElements.feedbackFlash.classList.remove('show');
        setTimeout(() => {
            gameElements.feedbackFlash.classList.add('hidden');
        }, 200);
    }, 1500);
    
    // Still need to select a random response for scoring
    const randomVibe = ['chaos', 'chill', 'emo', 'savage'][Math.floor(Math.random() * 4)];
    
    // Update score but skip normal feedback
    gameState.isGameActive = false;
    resetTimer();
    gameState.scores[randomVibe] += 1;
    gameState.currentScenario++;
    
    setTimeout(() => {
        gameState.isGameActive = true;
        loadNextScenario();
    }, 2000); // Longer delay for timeout message
}

// Handle emoji button click
function handleEmojiClick(button) {
    if (!gameState.isGameActive) return;
    
    const emoji = button.textContent;
    const vibe = gameState.currentScenarioData.responses[emoji];
    
    // Visual feedback
    button.classList.add('selected');
    setTimeout(() => button.classList.remove('selected'), 500);
    
    handleResponse(vibe);
}

// Handle response (from click or swipe)
function handleResponse(vibe) {
    if (!gameState.isGameActive) return;
    
    gameState.isGameActive = false;
    resetTimer();
    
    // Update score
    gameState.scores[vibe] += 1;
    
    // Show feedback
    showFeedback(vibe);
    
    // Move to next scenario
    gameState.currentScenario++;
    
    setTimeout(() => {
        gameState.isGameActive = true;
        loadNextScenario();
    }, 1500);
}

// Show feedback animation
function showFeedback(vibe) {
    const messages = feedbackMessages[vibe];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    gameElements.feedbackText.textContent = randomMessage;
    gameElements.feedbackFlash.classList.remove('hidden');
    gameElements.feedbackFlash.classList.add('show');
    
    setTimeout(() => {
        gameElements.feedbackFlash.classList.remove('show');
        setTimeout(() => {
            gameElements.feedbackFlash.classList.add('hidden');
        }, 200);
    }, 1000);
}

// End game and show results
function endGame() {
    gameState.isGameActive = false;
    resetTimer();
    
    // Only calculate results if not already calculated
    if (!gameState.finalResults) {
        // Calculate dominant vibe
        const dominantVibe = Object.keys(gameState.scores).reduce((a, b) => 
            gameState.scores[a] > gameState.scores[b] ? a : b
        );
        
        // Calculate percentage
        const totalResponses = Object.values(gameState.scores).reduce((a, b) => a + b, 0);
        const percentage = Math.round((gameState.scores[dominantVibe] / totalResponses) * 100);
        
        // Determine intensity level and generate description once
        const profile = vibeProfiles[dominantVibe];
        let intensityLevel;
        if (percentage <= 40) {
            intensityLevel = 'low';
        } else if (percentage <= 70) {
            intensityLevel = 'medium';
        } else {
            intensityLevel = 'high';
        }
        
        const descriptions = profile.descriptions[intensityLevel];
        const finalDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        // Store final results to prevent recalculation
        gameState.finalResults = {
            vibe: dominantVibe,
            percentage: percentage,
            description: finalDescription
        };
    }
    
    // Always display results using stored values
    displayResults(gameState.finalResults.vibe, gameState.finalResults.percentage);
    
    // Only switch screen if not already on results screen
    if (!document.getElementById('results-screen').classList.contains('hidden')) {
        return; // Already showing results
    }
    
    setTimeout(() => {
        switchScreen('results');
    }, 500);
}

// Display results
function displayResults(vibe, percentage) {
    const profile = vibeProfiles[vibe];
    
    // Use the stored description from finalResults
    const description = gameState.finalResults.description;
    
    resultElements.vibeDescription.textContent = description;
    resultElements.vibeEmoji.textContent = profile.emoji;
    resultElements.vibeName.textContent = profile.name;
    resultElements.vibePercentage.textContent = percentage + '%';
    
    // Update card styling
    resultElements.vibeCard.style.background = `${profile.gradient}, #fff`;
    resultElements.vibeCard.style.backgroundBlendMode = 'overlay';
}

// Share results
function shareResults() {
    // Use stored final results to ensure consistency
    const { vibe: dominantVibe, percentage } = gameState.finalResults || {
        vibe: Object.keys(gameState.scores).reduce((a, b) => 
            gameState.scores[a] > gameState.scores[b] ? a : b
        ),
        percentage: Math.round((gameState.scores[Object.keys(gameState.scores).reduce((a, b) => 
            gameState.scores[a] > gameState.scores[b] ? a : b
        )] / Object.values(gameState.scores).reduce((a, b) => a + b, 0)) * 100)
    };
    
    const profile = vibeProfiles[dominantVibe];
    
    // Get the current description being displayed
    const currentDescription = resultElements.vibeDescription.textContent;
    
    const shareText = `I just took the Vibe Check! ✨\n\nMy vibe: ${profile.name}\n${currentDescription}\n\n${percentage}% match! What's your vibe?\n\nPlay at: ${window.location.href}`;
    
    if (navigator.share) {
        // Use native sharing on mobile
        navigator.share({
            title: 'Vibe Check Results ✨',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            // Show copied feedback
            const originalText = document.querySelector('.share-btn').textContent;
            document.querySelector('.share-btn').textContent = 'Copied! ✨';
            setTimeout(() => {
                document.querySelector('.share-btn').textContent = originalText;
            }, 2000);
        }).catch(() => {
            // Final fallback - show share text in alert
            alert(shareText);
        });
    }
}

// Play again
function playAgain() {
    resetGameState();
    switchScreen('start');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Prevent context menu on long press
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Force repaint to fix any layout issues
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }, 100);
});