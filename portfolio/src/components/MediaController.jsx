import React, { useState, useRef, useCallback, useMemo, memo, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';

const MediaController = ({ onAudioRef, onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaType, setMediaType] = useState('audio'); // 'audio' or 'video'
  const [rotation, setRotation] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const animationRef = useRef(null);

  // Audio track unique - toujours "Nicolas Binder - Moment"
  const audioTrack = useMemo(() => ({
    name: "Nicolas Binder - Moment",
    url: "/audio/Nicolas Binder.mp3",
    cover: "/images/vinyl.png",
    duration: "3:24"
  }), []);

  const videoItems = useMemo(() => [
    {
      name: "Nicolas Binder - Moment",
      videoUrl: "/videos/Nicolas Binder-Moment_Clip.mp4",
      duration: "3:24",
      type: "Music Video"
    },
    {
      name: "Demo Popeye",
      videoUrl: "/videos/DemoPopeye.mp4",
      duration: "2:15",
      type: "Game Demo"
    },
    {
      name: "RPG Empire Demo",
      videoUrl: "/videos/RPGEmpireDemo.mp4",
      duration: "4:32",
      type: "Game Demo"
    },
    {
      name: "Demo Agilix",
      videoUrl: "/videos/demoAgilix.mp4",
      duration: "1:45",
      type: "App Demo"
    }
  ], []);

  // Gérer les références et callbacks pour l'audio
  useEffect(() => {
    if (onAudioRef && audioRef.current) {
      onAudioRef(audioRef.current);
    }
  }, [onAudioRef]);

  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying && mediaType === 'audio');
    }
  }, [isPlaying, mediaType, onPlayingChange]);

  // Animation du vinyle optimisée
  useEffect(() => {
    let lastFrameTime = 0;
    const TARGET_FPS = 30; // Réduit de 60 à 30 fps
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (!document.hidden && isPlaying && mediaType === 'audio') {
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

    if (isPlaying && mediaType === 'audio') {
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
  }, [isPlaying, mediaType]);

  // Synchroniser le volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const particles = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${i * 0.3}s`,
      size: Math.random() * 3 + 1
    })), []
  );

  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const toggleMedia = useCallback(() => {
    const currentRef = mediaType === 'audio' ? audioRef.current : videoRef.current;
    if (currentRef) {
      if (isPlaying) {
        currentRef.pause();
        setIsPlaying(false);
      } else {
        currentRef.play().catch(e => console.log('Media play failed:', e));
        setIsPlaying(true);
      }
    }
  }, [isPlaying, mediaType]);

  const nextMedia = useCallback(() => {
    if (mediaType === 'video') {
      setCurrentMedia((prev) => (prev + 1) % videoItems.length);
      if (isPlaying && videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(e => console.log('Media play failed:', e));
      }
    }
    // En mode audio, pas de changement car il n'y a qu'une piste
  }, [isPlaying, mediaType, videoItems.length]);

  const prevMedia = useCallback(() => {
    if (mediaType === 'video') {
      setCurrentMedia((prev) => (prev - 1 + videoItems.length) % videoItems.length);
      if (isPlaying && videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(e => console.log('Media play failed:', e));
      }
    }
    // En mode audio, pas de changement car il n'y a qu'une piste
  }, [isPlaying, mediaType, videoItems.length]);

  const selectMedia = useCallback((index) => {
    if (mediaType === 'video') {
      setCurrentMedia(index);
      if (isPlaying && videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(e => console.log('Media play failed:', e));
      }
    }
    // En mode audio, pas de sélection car il n'y a qu'une piste
  }, [isPlaying, mediaType]);

  const switchMediaType = useCallback(() => {
    // Arrêter le média actuel
    if (isPlaying) {
      const currentRef = mediaType === 'audio' ? audioRef.current : videoRef.current;
      if (currentRef) {
        currentRef.pause();
      }
    }
    
    // Changer de type
    const newType = mediaType === 'audio' ? 'video' : 'audio';
    setMediaType(newType);
    
    // Si on était en train de jouer, reprendre avec le nouveau type
    if (isPlaying) {
      setTimeout(() => {
        const newRef = newType === 'audio' ? audioRef.current : videoRef.current;
        if (newRef) {
          newRef.play().catch(e => console.log('Media play failed:', e));
        }
      }, 100);
    }
  }, [isPlaying, mediaType]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (mediaType === 'video' && videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen, mediaType]);

  const currentVideoItem = videoItems[currentMedia];
  const hasVideo = currentVideoItem?.videoUrl;
  const hasAudio = audioTrack.url;

  return (
    <>
      {/* Audio element (hidden) */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={audioTrack.url} type="audio/mp3" />
      </audio>

      {/* Vidéo d'arrière-plan ou Vinyle */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {mediaType === 'video' && hasVideo && (
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            loop
            muted={false}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onFullscreenChange={() => setIsFullscreen(document.fullscreenElement !== null)}
          >
            <source src={currentVideoItem?.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Vinyle pour le mode audio */}
        {mediaType === 'audio' && hasAudio && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <img
                src={audioTrack.cover}
                alt={audioTrack.name}
                className="w-96 h-96 rounded-full object-cover transition-transform duration-100 ease-linear shadow-2xl"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-synth-dark rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-neon-violet/50"></div>
            </div>
          </div>
        )}
        
        {/* Overlay dynamique */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          isPlaying && mediaType === 'video' ? 'bg-black/40' : 'bg-black/60'
        } mix-blend-multiply`}></div>
        
        {/* Gradient overlay futuriste */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/10 via-transparent to-neon-cyan/10"></div>
        
        {/* Particules flottantes améliorées */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full animate-float-particle ${
                isPlaying ? (mediaType === 'audio' ? 'bg-neon-magenta/30' : 'bg-neon-cyan/30') : 'bg-neon-violet/20'
              } transition-colors duration-500`}
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: particle.animationDelay,
                animationDuration: `${6 + (particle.id % 4)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Toggle Button avec animation */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 left-4 z-50 group"
        aria-label="Toggle media controller"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 ${
            isPlaying 
              ? (mediaType === 'audio' ? 'bg-neon-magenta/40 animate-pulse' : 'bg-neon-green/40 animate-pulse') 
              : 'bg-neon-violet/40'
          }`}></div>
          
          {/* Button container */}
          <div className={`relative bg-synth-dark/90 backdrop-blur-md border-2 rounded-full p-3 transition-all duration-300 ${
            isPlaying 
              ? (mediaType === 'audio' ? 'border-neon-magenta/60 hover:border-neon-magenta' : 'border-neon-green/60 hover:border-neon-green') 
              : 'border-neon-violet/60 hover:border-neon-violet'
          } hover:scale-110 hover:shadow-2xl`}>
            
            {/* Icon animation */}
            <div className="w-6 h-6 relative">
              {isPlaying ? (
                <div className="flex items-center justify-center h-full gap-0.5">
                  {mediaType === 'audio' ? (
                    // Icon audio (onde sonore)
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neon-magenta">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  ) : (
                    // Icon vidéo (barres d'égaliseur)
                    [...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-0.5 bg-neon-green rounded-full animate-equalizer transition-colors duration-300`}
                        style={{
                          height: `${12 + (i % 2) * 4}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${0.8 + (i % 3) * 0.2}s`
                        }}
                      />
                    ))
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-0 h-0 border-l-[10px] border-l-neon-violet border-y-[6px] border-y-transparent ml-1 group-hover:border-l-neon-cyan transition-colors duration-300"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Contrôleur média responsive */}
      <div className={`fixed z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      } 
      // Mobile
      bottom-20 left-4 right-4
      // Tablet
      md:bottom-20 md:left-4 md:right-auto md:w-96
      // Desktop
      lg:w-[420px] xl:w-[480px]
      `}>
        
        <div className="relative">
          {/* Glow background */}
          <div className="absolute inset-0 bg-neon-violet/10 rounded-2xl blur-xl"></div>
          
          {/* Main container */}
          <div className="relative bg-synth-dark/95 backdrop-blur-xl border border-neon-violet/40 rounded-2xl p-4 md:p-6 shadow-2xl">

            {/* Header compact */}
            <div className="text-center mb-4">
              <div className="text-neon-violet font-orbitron font-bold text-base md:text-lg mb-1 animate-pulse-neon">
                MEDIA CONTROLLER
              </div>
              <div className="text-neon-cyan text-xs font-rajdhani tracking-wider">
                v3.0 • UNIFIED
              </div>
            </div>

            {/* Media Type Toggle compact */}
            <div className="mb-4">
              <div className="flex items-center justify-center">
                <div className="bg-synth-darker rounded-full p-1 flex">
                  <button
                    onClick={() => setMediaType('audio')}
                    className={`px-3 py-1.5 rounded-full text-xs font-rajdhani font-bold transition-all duration-300 ${
                      mediaType === 'audio' 
                        ? 'bg-neon-magenta text-white shadow-lg shadow-neon-magenta/20' 
                        : 'text-neon-magenta/60 hover:text-neon-magenta/80'
                    }`}
                  >
                    AUDIO
                  </button>
                  <button
                    onClick={() => setMediaType('video')}
                    className={`px-3 py-1.5 rounded-full text-xs font-rajdhani font-bold transition-all duration-300 ${
                      mediaType === 'video' 
                        ? 'bg-neon-cyan text-white shadow-lg shadow-neon-cyan/20' 
                        : 'text-neon-cyan/60 hover:text-neon-cyan/80'
                    }`}
                  >
                    VIDEO
                  </button>
                </div>
              </div>
            </div>


            {/* Audio Visualizer compact */}
            {isPlaying && (
              <div className="mb-4 bg-synth-darker/50 backdrop-blur-sm rounded-lg p-3 border border-neon-violet/20">
                <div className="text-neon-violet text-xs mb-2 font-rajdhani font-bold tracking-wider">
                  {mediaType === 'audio' ? 'SPECTRUM' : 'AUDIO'}
                </div>
                <AudioVisualizer barCount={12} height={20} interactive={false} />
              </div>
            )}

            {/* Volume Control */}
            <div className="mb-4 bg-synth-darker/50 backdrop-blur-sm rounded-lg p-3 border border-neon-violet/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neon-violet text-xs font-rajdhani font-bold">VOLUME</span>
                <span className="text-neon-cyan text-xs font-rajdhani">{Math.round(volume * 100)}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-synth-darker rounded-lg appearance-none cursor-pointer slider"
                />
                <style>{`
                  .slider {
                    background: linear-gradient(to right, 
                      rgba(138, 43, 226, 0.6) 0%, 
                      rgba(138, 43, 226, 0.6) ${volume * 100}%, 
                      rgba(30, 30, 40, 0.8) ${volume * 100}%, 
                      rgba(30, 30, 40, 0.8) 100%);
                  }
                  .slider::-webkit-slider-track {
                    height: 8px;
                    background: transparent;
                    border-radius: 4px;
                  }
                  .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(45deg, #8A2BE2, #00FFFF);
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
                  }
                  .slider::-moz-range-track {
                    height: 8px;
                    background: rgba(30, 30, 40, 0.8);
                    border-radius: 4px;
                    border: none;
                  }
                  .slider::-moz-range-progress {
                    height: 8px;
                    background: rgba(138, 43, 226, 0.6);
                    border-radius: 4px;
                  }
                  .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(45deg, #8A2BE2, #00FFFF);
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
                  }
                `}</style>
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Previous button - plus petit */}
              <button
                onClick={prevMedia}
                className="bg-synth-darker hover:bg-neon-violet/20 rounded-lg p-2 transition-all duration-300 border border-neon-violet/30 hover:border-neon-violet group hover:scale-105 opacity-70 hover:opacity-100"
                aria-label="Previous media"
              >
                <div className="w-0 h-0 border-r-[10px] border-r-neon-violet border-y-[6px] border-y-transparent group-hover:border-r-neon-cyan transition-colors mx-auto"></div>
              </button>

              {/* Play/Pause button - plus grand et central */}
              <button
                onClick={toggleMedia}
                className={`rounded-xl p-4 transition-all duration-300 border-2 relative overflow-hidden hover:scale-110 shadow-lg ${
                  isPlaying 
                    ? (mediaType === 'audio' ? 'bg-neon-magenta/40 border-neon-magenta hover:bg-neon-magenta/50 shadow-neon-magenta/30' : 'bg-neon-violet/40 border-neon-violet hover:bg-neon-violet/50 shadow-neon-violet/30') 
                    : 'bg-synth-darker border-neon-violet/50 hover:bg-neon-violet/30 hover:border-neon-violet shadow-neon-violet/20'
                }`}
                aria-label={isPlaying ? "Pause media" : "Play media"}
              >
                <div className="relative z-10 flex justify-center">
                  {isPlaying ? (
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-6 bg-white rounded-sm"></div>
                      <div className="w-2 h-6 bg-white rounded-sm"></div>
                    </div>
                  ) : (
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                  )}
                </div>
                {/* Glow effect pour le bouton play */}
                <div className={`absolute inset-0 rounded-xl blur-sm transition-all duration-300 ${
                  isPlaying 
                    ? (mediaType === 'audio' ? 'bg-neon-magenta/30 animate-pulse' : 'bg-neon-violet/30 animate-pulse')
                    : 'bg-neon-violet/20'
                }`}></div>
              </button>

              {/* Next button - plus petit */}
              <button
                onClick={nextMedia}
                className="bg-synth-darker hover:bg-neon-violet/20 rounded-lg p-2 transition-all duration-300 border border-neon-violet/30 hover:border-neon-violet group hover:scale-105 opacity-70 hover:opacity-100"
                aria-label="Next media"
              >
                <div className="w-0 h-0 border-l-[10px] border-l-neon-violet border-y-[6px] border-y-transparent group-hover:border-l-neon-cyan transition-colors mx-auto"></div>
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={switchMediaType}
                className={`bg-synth-darker hover:bg-neon-magenta/20 rounded-lg p-2 transition-all duration-300 border border-neon-magenta/30 hover:border-neon-magenta group hover:scale-105 ${
                  !hasVideo && !hasAudio ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Switch media type"
                disabled={!hasVideo && !hasAudio}
              >
                <div className="relative w-4 h-4 mx-auto">
                  {mediaType === 'audio' ? (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neon-magenta group-hover:fill-white transition-colors">
                      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7.27L8.91 13.5 6 10.59l2.91-2.91L11 9.77V12z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neon-cyan group-hover:fill-white transition-colors">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  )}
                </div>
              </button>

              <button
                onClick={toggleFullscreen}
                className={`bg-synth-darker rounded-lg p-2 transition-all duration-300 border border-neon-cyan/30 group ${
                  mediaType === 'video' && hasVideo 
                    ? 'hover:bg-neon-cyan/20 hover:border-neon-cyan hover:scale-105 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                aria-label="Toggle fullscreen"
                disabled={mediaType !== 'video' || !hasVideo}
              >
                <div className="relative w-4 h-4 mx-auto">
                  <div className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 transition-colors ${
                    mediaType === 'video' && hasVideo
                      ? 'border-neon-cyan group-hover:border-white'
                      : 'border-gray-500'
                  }`}></div>
                  <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 transition-colors ${
                    mediaType === 'video' && hasVideo
                      ? 'border-neon-cyan group-hover:border-white'
                      : 'border-gray-500'
                  }`}></div>
                  <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 transition-colors ${
                    mediaType === 'video' && hasVideo
                      ? 'border-neon-cyan group-hover:border-white'
                      : 'border-gray-500'
                  }`}></div>
                  <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 transition-colors ${
                    mediaType === 'video' && hasVideo
                      ? 'border-neon-cyan group-hover:border-white'
                      : 'border-gray-500'
                  }`}></div>
                </div>
              </button>
            </div>

            {/* Enhanced Playlist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <div className="text-neon-violet text-xs font-rajdhani font-bold tracking-wider">{mediaType === 'audio' ? 'AUDIO TRACK' : 'VIDEO LIBRARY'}</div>
                <div className="text-neon-cyan text-xs font-rajdhani">{mediaType === 'audio' ? '1/1' : `${currentMedia + 1}/${videoItems.length}`}</div>
              </div>
              
              <div className="max-h-28 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-neon-violet/30 scrollbar-track-synth-darker">
                {mediaType === 'audio' ? (
                  // Mode audio - afficher uniquement la piste audio
                  <div className="bg-neon-magenta/30 text-white border border-neon-magenta/60 shadow-lg shadow-neon-magenta/20 w-full text-left p-2 rounded text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse shadow-lg shadow-neon-magenta/50"></div>
                        <div>
                          <div className="font-rajdhani font-bold">{audioTrack.name}</div>
                          <div className="flex gap-2 text-xs opacity-70 mt-1">
                            <span>Music</span>
                            <span className="text-neon-magenta">♪</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-neon-cyan text-xs font-mono">{audioTrack.duration}</div>
                    </div>
                  </div>
                ) : (
                  // Mode vidéo - afficher les vidéos disponibles
                  videoItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => selectMedia(index)}
                      className={`w-full text-left p-2 rounded text-xs transition-all duration-300 group ${
                        currentMedia === index 
                          ? 'bg-neon-violet/30 text-white border border-neon-violet/60 shadow-lg shadow-neon-violet/20' 
                          : 'text-neon-violet/70 hover:bg-neon-violet/10 hover:text-neon-violet border border-transparent hover:border-neon-violet/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentMedia === index 
                              ? 'bg-neon-violet animate-pulse shadow-lg shadow-neon-violet/50' 
                              : 'bg-neon-violet/40 group-hover:bg-neon-violet/70'
                          }`}></div>
                          <div>
                            <div className="font-rajdhani font-bold">{item.name}</div>
                            <div className="flex gap-2 text-xs opacity-70 mt-1">
                              <span>{item.type}</span>
                              <span className="text-neon-cyan">▶</span>
                              <span className="text-neon-magenta">♪</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-neon-cyan text-xs font-mono">{item.duration}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Enhanced Status Panel */}
            <div className="mt-4 pt-3 border-t border-neon-violet/20">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isPlaying ? (mediaType === 'audio' ? 'bg-neon-magenta animate-pulse shadow-lg shadow-neon-magenta/50' : 'bg-neon-green animate-pulse shadow-lg shadow-neon-green/50') : 'bg-gray-600'
                    }`}></div>
                    <span className="text-xs font-rajdhani text-neon-violet/70">
                      {mediaType === 'audio' ? 'AUDIO' : 'VIDEO'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentMedia >= 0 ? 'bg-neon-cyan animate-pulse shadow-lg shadow-neon-cyan/50' : 'bg-gray-600'
                    }`}></div>
                    <span className="text-xs font-rajdhani text-neon-violet/70">SOURCE</span>
                  </div>
                </div>
                
                <div className="text-xs font-rajdhani text-neon-violet/50">
                  v3.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MediaController);