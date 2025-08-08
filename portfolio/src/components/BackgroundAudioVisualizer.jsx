import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundAudioVisualizer = ({ audioElement, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const isTabActiveRef = useRef(true);
  const { isDark } = useTheme();

  const [isInitialized, setIsInitialized] = useState(false);

  // Performance settings
  const TARGET_FPS = 30; // Réduit de 60 à 30 fps
  const FRAME_INTERVAL = 1000 / TARGET_FPS;
  const MOBILE_PARTICLE_COUNT = 5; // Réduit pour mobile
  const DESKTOP_PARTICLE_COUNT = 10;

  // Détection d'onglet actif/inactif - simplifié
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Fonction de fallback pour les effets statiques optimisée
  const drawFallbackEffects = (ctx, canvas, isMobile) => {
    const time = Date.now() * 0.0005; // Ralenti l'animation
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Couleurs basées sur le thème
    const colors = isDark 
      ? { primary: '#00ffff', secondary: '#8a2be2', accent: '#39ff14' }
      : { primary: '#3b82f6', secondary: '#6366f1', accent: '#10b981' };

    // Effet de pulsation centrale simple
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulseSize = 100 + Math.sin(time * 2) * 30;
    
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
    gradient.addColorStop(0, `${colors.primary}20`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    ctx.fill();

    if (!isMobile) {
      // Particules flottantes réduites
      const particleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * canvas.height;
        const size = 2 + Math.sin(time * 3 + i) * 1;
        
        ctx.fillStyle = `${colors.accent}60`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    if (audioElement && !isInitialized) {
      initAudioContext();
    }
  }, [audioElement, isInitialized]);

  // Gérer la visualisation basée sur l'état de lecture
  useEffect(() => {
    startVisualization();
    
    return () => stopVisualization();
  }, [isPlaying, isDark]);

  const initAudioContext = async () => {
    try {
      // Créer le contexte audio
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Reprendre le contexte audio si suspendu (requis sur mobile)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Créer l'analyseur avec optimisation
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 128; // Réduit de 256 à 128 pour de meilleures performances
      analyserRef.current.smoothingTimeConstant = 0.9; // Plus de lissage
      
      // Connecter l'élément audio à l'analyseur
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
      
      // Créer le tableau de données pour les fréquences
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du contexte audio:', error);
      // Fallback: continuer sans visualisation audio
      setIsInitialized(false);
    }
  };

  const startVisualization = () => {
    if (animationRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Détection mobile pour optimiser les performances
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (currentTime) => {
      // Throttling des frames pour réduire la consommation CPU
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      // Vérifier si l'onglet est toujours actif
      if (!isTabActiveRef.current) {
        return;
      }

      if (!analyserRef.current || !dataArrayRef.current) {
        // Fallback: dessiner des effets statiques si pas d'audio data
        drawFallbackEffects(ctx, canvas, isMobile);
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      
      // Obtenir les données de fréquence
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculer l'intensité moyenne et les basses
      const averageIntensity = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
      const bassIntensity = dataArrayRef.current.slice(0, 20).reduce((sum, value) => sum + value, 0) / 20;
      const midIntensity = dataArrayRef.current.slice(20, 60).reduce((sum, value) => sum + value, 0) / 40;
      const highIntensity = dataArrayRef.current.slice(60, 128).reduce((sum, value) => sum + value, 0) / 68;
      
      // Effacer le canvas avec transparence
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Couleurs basées sur le thème
      const colors = isDark 
        ? {
            bass: '#00ffff',
            mid: '#8a2be2', 
            high: '#39ff14',
            accent: '#9400d3'
          }
        : {
            bass: '#3b82f6',
            mid: '#6366f1',
            high: '#10b981', 
            accent: '#8b5cf6'
          };

      // Effet de pulsation central basé sur les basses
      if (bassIntensity > 50) {
        const pulseSize = (bassIntensity / 255) * 200 + 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
        gradient.addColorStop(0, `${colors.bass}${Math.floor(bassIntensity / 255 * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Barres de fréquence réactives sur les côtés
      const barWidth = canvas.width / dataArrayRef.current.length * 2;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const barHeight = (dataArrayRef.current[i] / 255) * canvas.height * 0.6;
        const x = i * barWidth;
        
        // Couleur basée sur la fréquence
        let color = colors.bass;
        if (i > 60) color = colors.high;
        else if (i > 20) color = colors.mid;
        
        const opacity = (dataArrayRef.current[i] / 255 * 0.4).toFixed(2);
        ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        
        // Barres du côté gauche (bas vers le haut)
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        
        // Barres du côté droit (haut vers le bas)
        ctx.fillRect(canvas.width - x - barWidth, 0, barWidth - 2, barHeight);
      }

      // Particules réactives optimisées
      const maxParticles = isMobile ? 15 : 30; // Limite le nombre de particules
      const particleCount = Math.min(Math.floor(averageIntensity / 15), maxParticles);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = (Math.random() * 2 + 1) * (averageIntensity / 255); // Taille réduite
        
        ctx.shadowColor = colors.accent;
        ctx.shadowBlur = 8; // Réduit le blur
        ctx.fillStyle = `${colors.accent}${Math.floor(Math.random() * 128 + 127).toString(16)}`;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      // Ondes sonores circulaires basées sur les médiums
      if (midIntensity > 30) {
        const waveCount = 3;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let w = 0; w < waveCount; w++) {
          const radius = (midIntensity / 255) * 300 + w * 100;
          const opacity = (midIntensity / 255 * 0.2).toFixed(2);
          
          ctx.strokeStyle = `${colors.mid}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Effet de grille réactive basé sur les hautes fréquences
      if (highIntensity > 40) {
        const gridSize = 50;
        const intensity = highIntensity / 255;
        
        ctx.strokeStyle = `${colors.high}${Math.floor(intensity * 0.3 * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        
        // Lignes verticales
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Lignes horizontales
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Effacer le canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      stopVisualization();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: isDark ? 'screen' : 'multiply',
        opacity: 0.7
      }}
    />
  );
};

export default BackgroundAudioVisualizer;