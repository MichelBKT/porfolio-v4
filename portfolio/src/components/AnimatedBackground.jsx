import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const isTabActiveRef = useRef(true);
  const { isDark } = useTheme();

  // Performance settings
  const TARGET_FPS = 30; // Réduit de 60 à 30 fps
  const FRAME_INTERVAL = 1000 / TARGET_FPS;
  const MOBILE_PARTICLE_COUNT = 30; // Réduit de 100 à 30 pour mobile
  const DESKTOP_PARTICLE_COUNT = 50; // Réduit de 100 à 50 pour desktop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId;

    // Déclaration anticipée de la fonction animate
    let animate;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 50;
    let gridOffset = 0;

    // Particles system optimisé
    const particles = [];
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;

    // Energy waves
    const waves = [];
    const waveCount = 3;

    // Define color schemes based on theme
    const darkColors = ['#00ffff', '#8a2be2', '#8a2be2', '#00ff41'];
    const lightColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981'];
    const particleColors = isDark ? darkColors : lightColors;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        color: particleColors[Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Initialize waves
    const waveColors = isDark ? ['#00ffff', '#8a2be2', '#8a2be2'] : ['#3b82f6', '#6366f1', '#8b5cf6'];
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: Math.random() * canvas.height,
        amplitude: Math.random() * 30 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.01,
        color: waveColors[i % 3],
        alpha: 0.3
      });
    }

    const drawGrid = (time) => {
      const gridColor = isDark ? 'rgba(0, 255, 255' : 'rgba(59, 130, 246';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = (gridOffset % gridSize) - gridSize; x < canvas.width + gridSize; x += gridSize) {
        const alpha = 0.1 + Math.sin(time * 0.001 + x * 0.01) * 0.05;
        ctx.strokeStyle = `${gridColor}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        const alpha = 0.1 + Math.sin(time * 0.001 + y * 0.01) * 0.05;
        ctx.strokeStyle = `${gridColor}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      gridOffset += 0.5;
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update pulse
        particle.pulse += 0.05;
        const pulseAlpha = particle.alpha + Math.sin(particle.pulse) * 0.3;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, pulseAlpha);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    const drawWaves = () => {
      waves.forEach(wave => {
        wave.phase += wave.speed;
        
        ctx.save();
        ctx.globalAlpha = wave.alpha;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 20;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawScanlines = () => {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = isDark ? '#00ffff' : '#3b82f6';
      
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }
      ctx.restore();
    };

    const drawVignette = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(248, 250, 252, 0.3)');
      
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    // Détection d'onglet actif/inactif
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
      if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else if (!document.hidden && animate) {
        animate(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate = (time) => {
      // Protection contre les canvas invalides
      if (!canvas || !ctx) return;
      
      // Throttling des frames pour réduire la consommation CPU
      if (time - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = time;

      // Vérifier si l'onglet est toujours actif
      if (!isTabActiveRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawGrid(time);
        drawWaves(time);
        drawParticles(time);
        
        // Réduire les effets sur mobile
        if (!isMobile) {
          drawScanlines();
        }
        drawVignette();
      } catch (error) {
        console.warn('Animation error:', error);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <>
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          background: isDark 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
        }}
      />
      
      {/* Additional CSS Animations */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {/* Floating Orbs - réduits pour mobile */}
        {Array.from({ length: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 3 : 5 }, (_, i) => {
          const orbColors = isDark 
            ? ['#00ffff', '#8a2be2', '#8a2be2', '#00ff41']
            : ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981'];
          
          return (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full opacity-40 animate-float-slow"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${orbColors[i % 4]} 0%, transparent 90%)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          );
        })}

        {/* Laser Beams */}
        {Array.from({ length: 3 }, (_, i) => {
          const laserColors = isDark 
            ? ['#00ffff', '#8a2be2', '#8a2be2']
            : ['#3b82f6', '#6366f1', '#8b5cf6'];
          
          return (
            <div
              key={`laser-${i}`}
              className="absolute h-px opacity-80 animate-laser-sweep"
              style={{
                width: '200%',
                left: '-50%',
                top: `${20 + i * 30}%`,
                background: `linear-gradient(90deg, transparent 0%, ${laserColors[i]} 50%, transparent 100%)`,
                animationDelay: `${i * 2}s`,
                animationDuration: '8s',
                transform: 'rotate(-15deg)'
              }}
            />
          );
        })}

        {/* Data Stream - réduit pour mobile */}
        {!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (
        <div className="absolute right-0 top-0 w-1 h-full opacity-30">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`data-${i}`}
              className={`absolute w-full h-2 animate-data-stream ${isDark ? 'bg-neon-cyan' : 'bg-light-accent'}`}
              style={{
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        )}
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes laser-sweep {
          0% { transform: translateX(-100%) rotate(-15deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%) rotate(-15deg); opacity: 0; }
        }
        
        @keyframes data-stream {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
        
        .animate-laser-sweep {
          animation: laser-sweep linear infinite;
        }
        
        .animate-data-stream {
          animation: data-stream linear infinite;
        }
      `}</style>
    </>
  );
};

export default memo(AnimatedBackground);