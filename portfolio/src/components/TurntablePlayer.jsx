import React, { useState, useRef, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';

const TurntablePlayer = ({ onAudioRef, onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const tracks = [
    {
      name: "Moment - Nicolas Binder",
      url: "/audio/Nicolas Binder.mp3",
      cover: "/images/vinyl.png"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (onAudioRef && audioRef.current) {
      onAudioRef(audioRef.current);
    }
  }, [onAudioRef]);

  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  // Animation du vinyle optimisée
  useEffect(() => {
    let lastFrameTime = 0;
    const TARGET_FPS = 30; // Réduit de 60 à 30 fps
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (!document.hidden && isPlaying) {
        const animate = (currentTime) => {
          if (currentTime - lastFrameTime < FRAME_INTERVAL) {
            animationRef.current = requestAnimationFrame(animate);
            return;
          }
          lastFrameTime = currentTime;
          
          setRotation(prev => (prev + 0.3) % 360); // Rotation plus lente
          animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      const animate = (currentTime) => {
        if (currentTime - lastFrameTime < FRAME_INTERVAL) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTime = currentTime;
        
        setRotation(prev => (prev + 0.3) % 360); // Rotation plus lente
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Erreur lors de la lecture audio:', error);
        }
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-10 right-2 sm:right-4 z-50 bg-synth-dark/80 backdrop-blur-sm border border-neon-cyan/30 rounded-full p-2 sm:p-3 hover:bg-synth-dark hover:border-neon-cyan/60 transition-all duration-300 group"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-neon-cyan animate-pulse"></div>
                <div className="w-1 h-4 bg-neon-violet animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-4 bg-neon-violet animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[8px] border-l-neon-cyan border-y-[6px] border-y-transparent ml-1"></div>
            )}
          </div>
        </div>
      </button>

      {/* Platine DJ complète */}
      <div className={`fixed top-16 right-4 z-40 transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        
        {/* Console DJ */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl p-6 w-80 shadow-2xl">
          
          {/* Header avec logo DJ */}
          <div className="text-center mb-4">
            <div className="text-neon-cyan font-orbitron font-bold text-lg mb-2">PORTFOLIO DECK</div>
            <div className="text-neon-violet text-xs font-rajdhani">PROFESSIONAL DJ SYSTEM</div>
          </div>

          {/* Platine */}
          <div className="relative bg-black rounded-full w-48 h-48 mx-auto mb-6 border-4 border-gray-700 shadow-inner">
            
            {/* Base de la platine */}
            <div className="absolute inset-2 bg-gray-900 rounded-full border-2 border-gray-600">
              
              {/* Vinyle */}
              <div 
                className="absolute inset-4 bg-gradient-radial from-gray-900 via-black to-gray-800 rounded-full border border-gray-700 shadow-lg"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(from 0deg, #1a1a1a 0deg, #000 45deg, #1a1a1a 90deg, #000 135deg, #1a1a1a 180deg, #000 225deg, #1a1a1a 270deg, #000 315deg, #1a1a1a 360deg)`
                }}
              >
                {/* Lignes de vinyle */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div 
                    key={i}
                    className="absolute border border-gray-700/30 rounded-full"
                    style={{
                      top: `${i * 10}%`,
                      left: `${i * 10}%`,
                      right: `${i * 10}%`,
                      bottom: `${i * 10}%`
                    }}
                  />
                ))}
                
                {/* Centre du vinyle avec image personnalisée */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-violet rounded-full border-2 border-neon-cyan shadow-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={tracks[currentTrack]?.cover || "/images/memoji.png"} 
                    alt="Album cover" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                
                {/* Points de repère sur le vinyle */}
                <div className="absolute top-2 left-1/2 w-1 h-1 bg-neon-cyan rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-neon-cyan rounded-full transform -translate-x-1/2"></div>
                <div className="absolute left-2 top-1/2 w-1 h-1 bg-neon-cyan rounded-full transform -translate-y-1/2"></div>
                <div className="absolute right-2 top-1/2 w-1 h-1 bg-neon-cyan rounded-full transform -translate-y-1/2"></div>
              </div>
              
              {/* Bras de la platine */}
              <div 
                className="absolute -top-8 -right-4 w-20 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full shadow-lg origin-right"
                style={{ 
                  transform: `rotate(${isPlaying ? '-25deg' : '-35deg'})`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {/* Tête de lecture */}
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-neon-cyan rounded-full transform -translate-y-1/2 shadow-glow"></div>
                {/* Support du bras */}
                <div className="absolute right-0 top-1/2 w-4 h-4 bg-gray-500 rounded-full transform -translate-y-1/2 border-2 border-gray-400"></div>
              </div>
            </div>
          </div>

          {/* Visualiseur principal */}
          <div className="mb-4 bg-black rounded-lg p-3 border border-neon-cyan/30">
            <div className="text-neon-cyan text-xs mb-2 font-rajdhani">{tracks[currentTrack]?.name || 'No Track'}</div>
            <AudioVisualizer barCount={20} height={30} interactive={false} />
          </div>

          {/* Contrôles DJ */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Bouton Previous */}
            <button
              onClick={prevTrack}
              className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition-all duration-300 border-2 border-gray-600 hover:border-neon-violet group"
            >
              <div className="w-0 h-0 border-r-[12px] border-r-neon-cyan border-y-[8px] border-y-transparent group-hover:border-r-neon-violet transition-colors"></div>
            </button>

            {/* Bouton Play/Pause principal */}
            <button
              onClick={togglePlay}
              className={`rounded-full p-4 transition-all duration-300 border-2 relative overflow-hidden ${
                isPlaying 
                  ? 'bg-neon-cyan/20 border-neon-cyan hover:bg-neon-cyan/30' 
                  : 'bg-gray-700 border-gray-600 hover:bg-neon-cyan/20 hover:border-neon-cyan'
              }`}
            >
              <div className="relative z-10">
                {isPlaying ? (
                  <div className="flex gap-1.5 items-center justify-center">
                    <div className="w-2 h-6 bg-neon-cyan rounded"></div>
                    <div className="w-2 h-6 bg-neon-cyan rounded"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[16px] border-l-neon-cyan border-y-[10px] border-y-transparent ml-1"></div>
                )}
              </div>
              {/* Effet de pulsation quand en lecture */}
              {isPlaying && (
                <div className="absolute inset-0 bg-neon-cyan/20 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Bouton Next */}
            <button
              onClick={nextTrack}
              className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition-all duration-300 border-2 border-gray-600 hover:border-neon-violet group"
            >
              <div className="w-0 h-0 border-l-[12px] border-l-neon-cyan border-y-[8px] border-y-transparent group-hover:border-l-neon-violet transition-colors"></div>
            </button>
          </div>

          {/* Contrôle de volume avec design DJ */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between text-xs text-neon-cyan mb-2 font-rajdhani">
              <span>MASTER VOL</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #00ffff ${volume * 100}%, #374151 ${volume * 100}%)`
                }}
              />
              {/* Graduations */}
              <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* LED Status */}
          <div className="flex justify-center mt-4 gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-neon-green animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${volume > 0.5 ? 'bg-neon-cyan animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${volume > 0.8 ? 'bg-neon-violet animate-pulse' : 'bg-gray-600'}`}></div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Erreur audio:', e);
          setIsPlaying(false);
        }}
        playsInline
        controls={false}
      >
        <source src={tracks[currentTrack]?.url} type="audio/mpeg" />
      </audio>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          box-shadow: 0 0 10px #00ffff;
          border: 2px solid #000;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px #00ffff;
        }

        .shadow-glow {
          box-shadow: 0 0 10px #00ffff;
        }

        @keyframes spin-vinyl {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default TurntablePlayer;