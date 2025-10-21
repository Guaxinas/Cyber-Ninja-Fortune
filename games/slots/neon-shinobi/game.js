// Copilot: Create a slot game called "Neon Shinobi".
// Theme: Futuristic cyberpunk Tokyo with ninja warriors, synthwave vibe and neon effects.
// Grid: 5x4 reels, 25 paylines, high volatility, RTP 96.8%.
// Symbols: Energy katana, neural chip, drone, digital oni mask, datapad, A-K-Q-J-10 with glitch effect.
// Features:
// - Wild Shinobi: substitutes all except bonus symbols
// - Cyber Hack Bonus: triggered by 3 hacker symbols (choose firewalls to reveal rewards)
// - Shadow Dash Free Spins: triggered randomly, with increasing multipliers
// - Overdrive Mode: after 5 consecutive wins, reels accelerate with visual overdrive effect

class NeonShinobiSlot {
    constructor() {
        this.config = {
            reels: 5,
            rows: 4,
            paylines: 25,
            rtp: 96.8,
            volatility: 'high'
        };

        this.symbols = {
            WILD_SHINOBI: { id: 'wild', value: 1000, isWild: true },
            ENERGY_KATANA: { id: 'katana', value: 750 },
            NEURAL_CHIP: { id: 'chip', value: 500 },
            DRONE: { id: 'drone', value: 400 },
            ONI_MASK: { id: 'mask', value: 300 },
            DATAPAD: { id: 'pad', value: 250 },
            HACK: { id: 'hack', value: 0, isScatter: true },
            ACE: { id: 'a', value: 150 },
            KING: { id: 'k', value: 125 },
            QUEEN: { id: 'q', value: 100 },
            JACK: { id: 'j', value: 75 },
            TEN: { id: '10', value: 50 }
        };

        this.state = {
            credits: 1000,
            bet: 1,
            wins: [],
            isSpinning: false,
            consecutiveWins: 0,
            isOverdrive: false,
            freeSpins: 0,
            multiplier: 1
        };

        this.sounds = {
            spin: null,
            win: null,
            bigWin: null,
            bonus: null,
            overdrive: null,
            ambient: null
        };

        this.animations = {
            symbolGlow: null,
            neonFlash: null,
            overdriveEffect: null,
            shadowDash: null
        };

        this.init();
    }

    init() {
        this.loadAssets();
        this.setupCanvas();
        this.setupEvents();
        this.initAnimations();
        this.startAmbientSound();
    }

    loadAssets() {
        // Load symbol images
        this.symbolImages = {};
        Object.keys(this.symbols).forEach(symbol => {
            const img = new Image();
            img.src = `assets/symbols/${this.symbols[symbol].id}.png`;
            this.symbolImages[symbol] = img;
        });

        // Load sounds
        this.loadSounds();
    }

    loadSounds() {
        const soundFiles = {
            spin: 'reel-spin.mp3',
            win: 'win.mp3',
            bigWin: 'big-win.mp3',
            bonus: 'bonus-trigger.mp3',
            overdrive: 'overdrive-activate.mp3',
            ambient: 'cyberpunk-ambient.mp3'
        };

        Object.entries(soundFiles).forEach(([key, file]) => {
            this.sounds[key] = new Audio(`assets/sounds/${file}`);
        });
    }

    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size based on config
        this.canvas.width = this.config.reels * 150;  // 150px per symbol
        this.canvas.height = this.config.rows * 150;
        
        // Enable alpha blending for neon effects
        this.ctx.globalCompositeOperation = 'screen';
    }

    setupEvents() {
        document.getElementById('spin-button').addEventListener('click', () => this.spin());
        document.getElementById('bet-amount').addEventListener('change', (e) => {
            this.state.bet = parseInt(e.target.value);
        });
    }

    initAnimations() {
        // Neon glow effect for symbols
        this.animations.symbolGlow = {
            create: (x, y, color) => {
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 50);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, 'transparent');
                return gradient;
            }
        };

        // Overdrive visual effect
        this.animations.overdriveEffect = {
            active: false,
            intensity: 0,
            update: () => {
                if (this.animations.overdriveEffect.active) {
                    this.animations.overdriveEffect.intensity += 0.1;
                    // Add motion blur and speed lines
                }
            }
        };
    }

    spin() {
        if (this.state.isSpinning) return;
        
        // Deduct bet
        if (this.state.credits < this.state.bet) {
            this.showMessage('Insufficient credits!');
            return;
        }
        
        this.state.credits -= this.state.bet;
        this.state.isSpinning = true;
        this.sounds.spin.play();
        
        // Check for overdrive mode
        if (this.state.consecutiveWins >= 5) {
            this.activateOverdrive();
        }
        
        // Generate new symbol positions
        this.generateSpinResult().then(result => {
            this.evaluateWin(result);
            this.state.isSpinning = false;
        });
    }

    async generateSpinResult() {
        // Simulate server-side RNG
        return new Promise(resolve => {
            setTimeout(() => {
                const result = Array(this.config.reels).fill().map(() =>
                    Array(this.config.rows).fill().map(() =>
                        this.getRandomSymbol()
                    )
                );
                resolve(result);
            }, this.state.isOverdrive ? 1000 : 2000);
        });
    }

    getRandomSymbol() {
        const symbols = Object.keys(this.symbols);
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    evaluateWin(result) {
        // Check paylines
        let totalWin = 0;
        this.config.paylines.forEach(payline => {
            const win = this.checkPayline(result, payline);
            if (win > 0) {
                totalWin += win;
                this.showWinAnimation(payline, win);
            }
        });

        // Update state
        if (totalWin > 0) {
            this.state.consecutiveWins++;
            this.state.credits += totalWin;
            this.playWinSound(totalWin);
        } else {
            this.state.consecutiveWins = 0;
            this.deactivateOverdrive();
        }

        // Check for bonus features
        this.checkBonus(result);
    }

    activateOverdrive() {
        this.state.isOverdrive = true;
        this.animations.overdriveEffect.active = true;
        this.sounds.overdrive.play();
        
        // Add visual effects
        document.body.classList.add('overdrive-active');
    }

    deactivateOverdrive() {
        this.state.isOverdrive = false;
        this.animations.overdriveEffect.active = false;
        document.body.classList.remove('overdrive-active');
    }

    checkBonus(result) {
        // Count HACK symbols
        const hackCount = result.flat().filter(symbol => symbol === 'HACK').length;
        
        if (hackCount >= 3) {
            this.startCyberHackBonus();
        }
        
        // Random trigger for Shadow Dash
        if (Math.random() < 0.05) {  // 5% chance
            this.startShadowDashFeature();
        }
    }

    startCyberHackBonus() {
        this.sounds.bonus.play();
        // Implement firewall mini-game
        // Show modal with firewall grid
        // Player clicks to reveal rewards
    }

    startShadowDashFeature() {
        this.state.freeSpins = 10;
        this.state.multiplier = 1;
        this.sounds.bonus.play();
        // Implement free spins with increasing multiplier
    }

    showWinAnimation(payline, amount) {
        // Create neon trail effect along winning payline
        this.animations.neonFlash = {
            points: payline,
            color: amount > 100 ? '#ff00ff' : '#00ffff',
            duration: 1000
        };
    }

    playWinSound(amount) {
        if (amount > this.state.bet * 50) {
            this.sounds.bigWin.play();
        } else {
            this.sounds.win.play();
        }
    }

    showMessage(text) {
        // Implement message overlay with cyberpunk style
        const message = document.createElement('div');
        message.className = 'game-message';
        message.textContent = text;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }

    // Animation loop
    update() {
        requestAnimationFrame(() => this.update());
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawSymbols();
        if (this.state.isOverdrive) {
            this.drawOverdriveEffects();
        }
        this.drawUI();
    }
}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new NeonShinobiSlot();
});