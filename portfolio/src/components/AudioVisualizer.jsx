import React, { useState, useEffect, useRef } from 'react';

const AudioVisualizer = ({ barCount = 20, height = 60, interactive = true }) => {
  const [bars, setBars] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const intervalRef = useRef(null);

  // Détection d'onglet actif/inactif
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const generateRandomBars = () => {
      return Array.from({ length: barCount }, (_, index) => ({
        id: index,
        height: Math.random() * 100 + 10,
        color: ['#00ffff', '#8a2be2', '#9400d3', '#39ff14'][Math.floor(Math.random() * 4)]
      }));
    };

    setBars(generateRandomBars());

    if (interactive && isTabActive) {
      // Intervalles fixes pour éviter les changements brusques
      const updateInterval = 400; // Intervalle fixe pour éviter les problèmes
      intervalRef.current = setInterval(() => {
        setBars(generateRandomBars());
      }, updateInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [barCount, isHovered, interactive, isTabActive]);

  return (
      <div
          className="audio-visualizer"
          onMouseEnter={() => interactive && setIsHovered(true)}
          onMouseLeave={() => interactive && setIsHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px',
            height: `${height}px`,
            cursor: interactive ? 'pointer' : 'default',
          }}
      >
        {bars.map((bar) => (
            <div
                key={bar.id}
                style={{
                  width: '4px',
                  height: `${bar.height}%`,
                  backgroundColor: bar.color,
                  transition: 'height 0.2s ease',
                }}
            ></div>
        ))}
      </div>
  );
};

export default AudioVisualizer;
