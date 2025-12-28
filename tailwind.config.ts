import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: "#a020f0", // Cor principal extraída do custom.css
                    "purple-rgb": "160, 32, 240",
                },
                background: {
                    primary: "#0d0d12", // Fundo principal
                    secondary: "#1a1a1a",
                },
                status: {
                    online: "#00ff89", // Cor do status online
                    success: "#28a745",
                    danger: "#e74c3c",
                }
            },
            fontFamily: {
                orbitron: ["var(--font-orbitron)", "sans-serif"],
                roboto: ["var(--font-roboto)", "sans-serif"],
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, -100%), rgba(160, 32, 240, 0.15), transparent 50%)',
                'button-brand': 'linear-gradient(45deg, #a020f0, #8a2be2)', // Gradiente VIP
            },
            boxShadow: {
                'neon': '0 0 10px rgba(160, 32, 240, 0.7), 0 0 20px rgba(160, 32, 240, 0.5)',
                'button-neon': '0 5px 20px rgba(160, 32, 240, 0.4)',
            },
            animation: {
                'pulse-slow': 'pulse 4s infinite ease-in-out',
                'scanline': 'scanline 3s linear infinite',
            },
            animation: {
  'scroll-left': 'scroll-left 80s linear infinite', // Velocidade sincronizada com o seu CSS original
            },
            keyframes: {
                'scroll-left': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
                       }
            }, 
            keyframes: {
                scanline: {
                    '0%': { left: '-150%' },
                    '100%': { left: '150%' }
                }
            }
        },
    },
    plugins: [],
};
export default config;