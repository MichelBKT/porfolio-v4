import React, { useState, useRef, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';

const AudioPlayer = ({ onAudioRef, onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);
  useRef(null);
  useRef(null);
  const tracks = [
    {
      name: "Moment - Nicolas Binder",
      url: "/audio/Nicolas Binder.mp3"
    },
    {
        name: "Memories - Aurora Night",
        url: "/audio/Aurora Night - Memories Beautiful Chillstep.mp3"
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Partager la référence audio avec le parent
  useEffect(() => {
    if (onAudioRef && audioRef.current) {
      onAudioRef(audioRef.current);
    }
  }, [onAudioRef]);

  // Notifier le parent des changements d'état de lecture
  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          // Essayer de lire l'audio
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Erreur lors de la lecture audio:', error);
          // Sur mobile, parfois il faut essayer plusieurs fois
          if (error.name === 'NotAllowedError') {
            console.log('Lecture audio bloquée - interaction utilisateur requise');
          }
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
        className="mt-4 fixed top-10 right-2 sm:right-4 z-50 bg-synth-dark/80 backdrop-blur-sm border border-neon-cyan/30 rounded-full p-2 sm:p-3 hover:bg-synth-dark hover:border-neon-cyan/60 transition-all duration-300 group"
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

      {/* Audio Player Panel */}
      <div className={`fixed top-12 mt-14 right-2 sm:top-16 sm:right-4 z-40 bg-synth-dark/90 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-3 sm:p-4 w-72 sm:w-80 transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        
        {/* Track Info */}
        <div className="text-center mb-3 sm:mb-4">
          <h3 className="text-neon-cyan font-medium text-xs sm:text-sm mb-1">
            {tracks[currentTrack]?.name || 'No Track'}
          </h3>
          <div className="flex justify-center">
            <AudioVisualizer barCount={12} height={20} interactive={false} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <button
            onClick={prevTrack}
            className="p-2 hover:bg-neon-cyan/10 rounded-full transition-colors duration-300 group"
          >
            <div className="w-0 h-0 border-r-[10px] border-r-neon-cyan border-y-[6px] border-y-transparent group-hover:border-r-neon-violet transition-colors duration-300"></div>
          </button>

          <button
            onClick={togglePlay}
            className="p-3 bg-neon-cyan/20 hover:bg-neon-cyan/30 rounded-full transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-neon-cyan"></div>
                  <div className="w-1.5 h-4 bg-neon-cyan"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[12px] border-l-neon-cyan border-y-[8px] border-y-transparent ml-1"></div>
              )}
            </div>
          </button>

          <button
            onClick={nextTrack}
            className="p-2 hover:bg-neon-cyan/10 rounded-full transition-colors duration-300 group"
          >
            <div className="w-0 h-0 border-l-[10px] border-l-neon-cyan border-y-[6px] border-y-transparent group-hover:border-l-neon-violet transition-colors duration-300"></div>
          </button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neon-cyan/70">
            <span>Volume</span>
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
              className="w-full h-1 bg-synth-light/20 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #00ffff ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
              }}
            />
          </div>
        </div>

        {/* Track List */}
        <div className="mt-4 space-y-1">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => setCurrentTrack(index)}
              className={`w-full text-left px-2 py-1 rounded text-xs transition-all duration-300 ${
                currentTrack === index 
                  ? 'bg-neon-cyan/20 text-neon-cyan' 
                  : 'text-neon-cyan/60 hover:bg-neon-cyan/10 hover:text-neon-cyan/80'
              }`}
            >
              {track.name}
            </button>
          ))}
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
        // Attributs pour améliorer la compatibilité mobile
        playsInline
        controls={false}
      >
        <source src={tracks[currentTrack]?.url} type="audio/mpeg" />
      </audio>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width:12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          box-shadow: 0 0 10px #00ffff;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px #00ffff;
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;