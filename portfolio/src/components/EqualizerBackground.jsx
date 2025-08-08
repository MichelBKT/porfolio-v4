import React, { useEffect, useRef, memo } from 'react';

window.webkitAudioContext = window.webkitAudioContext || window.AudioContext;
const EqualizerBackground = ({ audioElement, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const isTabActiveRef = useRef(true);

  // Performance settings
  const TARGET_FPS = 30; // Réduit de 60 à 30 fps
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  // Détection d'onglet actif/inactif - simplifié
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const initializeAudioContext = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (!sourceRef.current && audioElement) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        analyserRef.current.fftSize = 128; // Réduit pour de meilleures performances
        analyserRef.current.smoothingTimeConstant = 0.9; // Plus de lissage
        
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }

      startVisualization();
    } catch (error) {
      console.error('Erreur initialisation audio context:', error);
      startFakeVisualization();
    }
  };
    useEffect(() => {
        if (audioElement && isPlaying) {
            initializeAudioContext().then(() => {});
        } else {
            stopVisualization();
        }

        return () => stopVisualization();
    }, [audioElement, initializeAudioContext, isPlaying]);

  const startVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = (currentTime) => {
      if (!isPlaying || !isTabActiveRef.current) return;

      // Throttling des frames pour réduire la consommation CPU
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      analyserRef.current.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Configuration
      const barWidth = canvas.width / bufferLength * 2.5;
      let barHeight;
      let x = 0;

      // Dessiner les barres d'égaliseur
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Gradient harmonieux avec thème synthwave
        const intensity = dataArray[i] / 255;
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        
        // Progression du haut vers le bas avec intensité dynamique
        gradient.addColorStop(0, `rgba(57, 255, 20, ${0.9 + intensity * 0.1})`); // Neon green intense
        gradient.addColorStop(0.3, `rgba(0, 255, 255, ${0.8 + intensity * 0.2})`); // Neon cyan
        gradient.addColorStop(0.6, `rgba(138, 43, 226, ${0.7 + intensity * 0.3})`); // Bass purple  
        gradient.addColorStop(1, `rgba(255, 0, 255, ${0.6 + intensity * 0.4})`);
        
        ctx.fillStyle = gradient;
        
        // Barre principale
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        // Effet de réflexion harmonieux
        const reflectionGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height + barHeight * 0.3);
        reflectionGradient.addColorStop(0, `rgba(57, 255, 20, ${intensity * 0.4})`);
        reflectionGradient.addColorStop(0.5, `rgba(0, 255, 255, ${intensity * 0.3})`);
        reflectionGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
        
        ctx.fillStyle = reflectionGradient;
        ctx.fillRect(x, canvas.height, barWidth, barHeight * 0.3);
        
        x += barWidth + 1;
      }

      // Particules flottantes basées sur les fréquences
      drawParticles(ctx, dataArray, canvas);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const drawParticles = (ctx, dataArray, canvas) => {
    const avgFrequency = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const maxParticles = 20; // Limite le nombre de particules
    const particleCount = Math.min(Math.floor(avgFrequency / 15), maxParticles);

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 1; // Taille réduite
      const opacity = Math.random() * 0.5 + 0.2; // Opacité réduite
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      
      // Couleurs variées pour les particules
      const particleColors = [
        `rgba(57, 255, 20, ${opacity})`,   // Neon green
        `rgba(0, 255, 255, ${opacity})`,   // Neon cyan  
        `rgba(255, 0, 255, ${opacity})`,   // Neon magenta
      ];
      ctx.fillStyle = particleColors[i % 3];
      ctx.fill();
    }
  };

  const startFakeVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const barCount = 64;
    
    const draw = (currentTime) => {
      if (!isPlaying || !isTabActiveRef.current) return;

      // Throttling des frames
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / barCount;
      
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * canvas.height * 0.7;
        const x = i * barWidth;
        
        const fakeIntensity = Math.random();
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, `rgba(57, 255, 20, ${0.7 + fakeIntensity * 0.3})`);
        gradient.addColorStop(0.3, `rgba(0, 255, 255, ${0.6 + fakeIntensity * 0.3})`);
        gradient.addColorStop(0.6, `rgba(138, 43, 226, ${0.5 + fakeIntensity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 0, 255, ${0.4 + fakeIntensity * 0.4})`); 
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        
        // Réflexion harmonieuse
        const reflectionGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height + barHeight * 0.2);
        reflectionGradient.addColorStop(0, `rgba(57, 255, 20, ${fakeIntensity * 0.3})`);
        reflectionGradient.addColorStop(0.5, `rgba(0, 255, 255, ${fakeIntensity * 0.2})`);
        reflectionGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
        
        ctx.fillStyle = reflectionGradient;
        ctx.fillRect(x, canvas.height, barWidth - 1, barHeight * 0.2);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      {/* Canvas pour l'égaliseur */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Effets d'arrière-plan additionnels */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grille cyberpunk */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Lignes de scan */}
        <div 
          className="absolute inset-0 opacity-5 animate-pulse"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
            animation: 'scan-lines 0.1s linear infinite'
          }}
        />
        
        {/* Orbes lumineux flottants */}
        {isPlaying && [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-radial from-neon-cyan/20 to-transparent animate-float-particle"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scan-lines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </>
  );
};

export default memo(EqualizerBackground);