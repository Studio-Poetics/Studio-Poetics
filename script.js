const backgrounds = {
    pow: {
        gradient: 'linear-gradient(45deg, #ff3838, #ff6b9d, #ffa726, #ffeb3b)',
        pattern: 'stars'
    },
    boom: {
        gradient: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
        pattern: 'explosion'
    },
    zap: {
        gradient: 'linear-gradient(45deg, #4ecdc4, #44a08d, #56ab2f, #a8edea)',
        pattern: 'lightning'
    },
    default: {
        gradient: 'linear-gradient(45deg, #ff6b9d, #4ecdc4, #45b7d1, #f9ca24)',
        pattern: 'default'
    }
};

let currentBackground = 'default';
let clickCount = 0;

function changeBackground(type) {
    const body = document.body;
    const dotsPattern = document.querySelector('.dots-pattern');
    const halftonePattern = document.querySelector('.halftone-pattern');
    
    clickCount++;
    
    if (currentBackground === type) {
        type = 'default';
    }
    
    currentBackground = type;
    const bg = backgrounds[type];
    
    body.style.background = bg.gradient;
    body.style.backgroundSize = '400% 400%';
    body.style.animation = 'gradientShift 8s ease-in-out infinite';
    
    addClickEffect(type);
    updatePatterns(type, dotsPattern, halftonePattern);
    
    setTimeout(() => {
        body.classList.add('bg-transition');
    }, 100);
    
    setTimeout(() => {
        body.classList.remove('bg-transition');
    }, 600);
}

function addClickEffect(type) {
    const clickedBubble = document.querySelector(`.bubble-${getBubbleNumber(type)}`);
    
    clickedBubble.style.transform = 'scale(1.2) rotate(10deg)';
    clickedBubble.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        clickedBubble.style.transform = '';
    }, 300);
    
    createParticles(type);
    showRandomMessage(type);
}

function getBubbleNumber(type) {
    switch(type) {
        case 'pow': return '1';
        case 'boom': return '2';
        case 'zap': return '3';
        default: return '1';
    }
}

function createParticles(type) {
    const colors = {
        pow: ['#ff3838', '#ff6b9d', '#ffa726'],
        boom: ['#667eea', '#764ba2', '#f5576c'],
        zap: ['#4ecdc4', '#44a08d', '#56ab2f']
    };
    
    const particleColors = colors[type] || colors.pow;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(particleColors[Math.floor(Math.random() * particleColors.length)]);
        }, i * 50);
    }
}

function createParticle(color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.animation = 'particleFall 3s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

function showRandomMessage(type) {
    const messages = {
        pow: ['KAPOW!', 'SMASH!', 'WHACK!', 'THWAP!'],
        boom: ['KABOOM!', 'CRASH!', 'BANG!', 'BLAST!'],
        zap: ['BZZZAP!', 'FLASH!', 'SPARK!', 'VOLT!']
    };
    
    const randomMsg = messages[type][Math.floor(Math.random() * messages[type].length)];
    
    const msgElement = document.createElement('div');
    msgElement.textContent = randomMsg;
    msgElement.style.position = 'fixed';
    msgElement.style.top = '20px';
    msgElement.style.right = '20px';
    msgElement.style.fontSize = '2rem';
    msgElement.style.fontWeight = '700';
    msgElement.style.color = 'white';
    msgElement.style.textShadow = '3px 3px 0px #000';
    msgElement.style.zIndex = '1000';
    msgElement.style.animation = 'messageSlide 2s ease-out forwards';
    msgElement.style.fontFamily = 'Fredoka, sans-serif';
    
    document.body.appendChild(msgElement);
    
    setTimeout(() => {
        msgElement.remove();
    }, 2000);
}

function updatePatterns(type, dotsPattern, halftonePattern) {
    const patterns = {
        pow: {
            dots: `radial-gradient(circle at 25% 25%, #fff 4px, transparent 4px),
                   radial-gradient(circle at 75% 75%, #ff3838 3px, transparent 3px),
                   radial-gradient(circle at 50% 10%, #ffa726 2px, transparent 2px)`,
            halftone: `radial-gradient(circle, transparent 15%, rgba(255,56,56,0.3) 16%, rgba(255,56,56,0.3) 25%, transparent 26%)`
        },
        boom: {
            dots: `radial-gradient(circle at 30% 70%, #fff 4px, transparent 4px),
                   radial-gradient(circle at 80% 20%, #667eea 3px, transparent 3px),
                   radial-gradient(circle at 20% 40%, #764ba2 2px, transparent 2px)`,
            halftone: `radial-gradient(circle, transparent 15%, rgba(102,126,234,0.3) 16%, rgba(102,126,234,0.3) 25%, transparent 26%)`
        },
        zap: {
            dots: `radial-gradient(circle at 40% 80%, #fff 4px, transparent 4px),
                   radial-gradient(circle at 60% 30%, #4ecdc4 3px, transparent 3px),
                   radial-gradient(circle at 90% 60%, #44a08d 2px, transparent 2px)`,
            halftone: `radial-gradient(circle, transparent 15%, rgba(78,205,196,0.3) 16%, rgba(78,205,196,0.3) 25%, transparent 26%)`
        },
        default: {
            dots: `radial-gradient(circle at 20% 20%, #fff 3px, transparent 3px),
                   radial-gradient(circle at 80% 80%, #fff 2px, transparent 2px),
                   radial-gradient(circle at 40% 60%, #fff 1px, transparent 1px)`,
            halftone: `radial-gradient(circle, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 30%, transparent 31%)`
        }
    };
    
    const pattern = patterns[type] || patterns.default;
    
    dotsPattern.style.backgroundImage = pattern.dots;
    halftonePattern.style.backgroundImage = pattern.halftone;
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFall {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(100vh) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes messageSlide {
            0% { 
                transform: translateX(100px); 
                opacity: 0; 
            }
            20% { 
                transform: translateX(0); 
                opacity: 1; 
            }
            80% { 
                transform: translateX(0); 
                opacity: 1; 
            }
            100% { 
                transform: translateX(-100px); 
                opacity: 0; 
            }
        }
        
        .bg-transition {
            transition: background 0.5s ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
});