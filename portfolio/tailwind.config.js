/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "text-gradient": "linear-gradient(90deg, rgba(42,5,41,1) 8%, rgba(0,240,255,1) 100%)",
                "neon-gradient": "linear-gradient(45deg, #00FFFF, #FF00FF, #8A2BE2)",
                "synth-gradient": "linear-gradient(135deg, #0080FF, #6A0DAD, #FF00FF)",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'monospace'],
                'rajdhani': ['Rajdhani', 'sans-serif'],
                'space-grotesk': ['Space Grotesk', 'sans-serif'],
                'zen-dots': ['Zen Dots', 'cursive'],
            },
            colors: {
                // Electronic Music Theme - Dark Mode
                'synth-dark': '#0a0a0a',
                'synth-darker': '#050505',
                'neon-cyan': '#00FFFF',
                'neon-magenta': '#FF00FF',
                'neon-violet': '#8A2BE2',
                'neon-green': '#39FF14',
                'bass-purple': '#6A0DAD',
                'beat-blue': '#0080FF',
                'club-gray': '#1a1a1a',
                
                // Light Mode Theme
                'light-bg': '#f8fafc',
                'light-card': '#ffffff',
                'light-text': '#1e293b',
                'light-accent': '#3b82f6',
                'light-secondary': '#64748b',
                'light-border': '#e2e8f0',
                
                // Galaxy colors for backward compatibility
                'galaxy-dark': '#0a0a1a',
                'galaxy-light': '#4a90e2',
                'galaxy-blue': '#1E1E2E',
                'galaxy-purple': '#6B46C1',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'blink': 'blink 1s step-end infinite',
                'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
                'glitch': 'glitch 0.3s ease-in-out',
                'beat-drop': 'beatDrop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                'equalizer': 'equalizer 1s ease-in-out infinite',
                'float-particle': 'floatParticle 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                pulseNeon: {
                    '0%, 100%': { 
                        textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
                        opacity: '1'
                    },
                    '50%': { 
                        textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
                        opacity: '0.8'
                    },
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                },
                beatDrop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                },
                equalizer: {
                    '0%, 100%': { height: '20%' },
                    '50%': { height: '100%' },
                },
                floatParticle: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-20px) rotate(120deg)' },
                    '66%': { transform: 'translateY(10px) rotate(240deg)' },
                },
            },
        },
    },
    plugins: [],
};