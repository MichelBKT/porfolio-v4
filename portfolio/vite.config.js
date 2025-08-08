import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.js',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Séparer les grosses librairies
                    'vendor-animation': ['framer-motion', 'gsap', '@studio-freight/lenis'],
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-utils': ['@emailjs/browser']
                }
            }
        },
        // Optimiser la taille des chunks
        chunkSizeWarningLimit: 1000,
        // Minification standard
        minify: true
    },
    // Optimisations des ressources
    assetsInclude: ['**/*.webp', '**/*.avif'],
    server: {
        // Préchargement des modules
        warmup: {
            clientFiles: ['./src/components/*.jsx', './src/contexts/*.jsx']
        },
        // Headers de sécurité pour le développement
        headers: {
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'X-XSS-Protection': '1; mode=block'
        }
    },
    // Configuration pour la production
    preview: {
        headers: {
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'X-XSS-Protection': '1; mode=block',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com;"
        }
    }
})
