import React, { useState, useEffect } from 'react';

const WaveformTimeline = ({ events = [], className = "" }) => {
  const [animatedBars, setAnimatedBars] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState({});

  const toggleEventVisibility = (index) => {
    setVisibleEvents(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    // Generate random waveform bars for visual effect
    const bars = Array.from({ length: 130 }, (_, index) => ({
      id: index,
      height: Math.random() * 100 + 5,
      active: false,
      color: ['neon-cyan','neon-magenta', 'neon-violet', 'neon-green'][Math.floor(Math.random() * 4)]
    }));
    setAnimatedBars(bars);

    // Animate bars progressively
    const interval = setInterval(() => {
      setAnimatedBars(prev => 
        prev.map(bar => ({
          ...bar,
          height: Math.random() * 100 + 5,
          active: Math.random() > 0.4
        }))
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Waveform background */}
      <div className="flex items-end justify-center h-40 bg-synth-darker rounded-lg border border-neon-cyan/20 p-4 overflow-hidden relative">
        {animatedBars.map((bar) => (
          <div
            key={bar.id}
            className={`w-2 rounded-t-sm transition-all duration-1000 ease-in-out ${
              bar.active ? `bg-${bar.color} opacity-80` : `bg-${bar.color} opacity-20`
            }`}
            style={{
              height: `${bar.height}%`,
              boxShadow: bar.active ? `0 0 8px rgba(0, 255, 255, 0.5)` : 'none',
            }}
          />
        ))}
        
        {/* Progress line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta opacity-60 transform -translate-y-1/2 rounded-full" />
      </div>

      {/* Timeline events */}
      <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
        <div className="relative flex justify-between">
          {events.map((event, index) => {
            const colors = ['neon-cyan', 'neon-violet', 'neon-magenta', 'neon-green', 'neon-cyan'];
            const eventColor = colors[index % colors.length];
            
            return (
              <div
                key={index}
                className="relative group flex flex-col items-center"
              >
                {/* Event marker */}
                <div 
                  className={`w-5 h-5 bg-${eventColor} rounded-full border-2 border-synth-dark animate-pulse cursor-pointer group-hover:scale-150 transition-all duration-300 shadow-lg z-10`}
                  style={{
                    boxShadow: `0 0 15px rgba(0, 255, 255, 0.7)`,
                    animation: `pulse 2s infinite ${index * 0.4}s`
                  }}
                  onClick={() => toggleEventVisibility(index)}
                />

                {/* Event info - responsive visibility */}
                <div className={`absolute top-8 transform transition-all duration-300 group-hover:scale-105 ${
                  // Desktop: always visible, Mobile/Tablet: only visible when clicked
                  visibleEvents[index] ? 'block' : 'hidden md:block'
                }`}>
                  <div className="bg-synth-darker/90 border border-neon-cyan/40 rounded-lg p-3 text-center min-w-max backdrop-blur-sm">
                    <div className={`font-orbitron text-sm text-${eventColor} font-bold`}>
                      {event.year}
                    </div>
                    <div className="font-rajdhani text-xs text-white mt-1 font-bold">
                      {event.title}
                    </div>
                    {event.description && (
                      <div className="font-rajdhani text-xs text-gray-300 mt-1 max-w-24 leading-tight">
                        {event.description}
                      </div>
                    )}
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-neon-cyan/40" />
                </div>

                {/* Connecting line to timeline */}
                <div className={`absolute top-5 w-px h-3 bg-${eventColor} opacity-60`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline labels - hidden on mobile/tablet */}
      <div className="mt-32 hidden md:flex justify-between px-4 text-xs text-neon-cyan/70 font-rajdhani">
        <span>DÉBUT</span>
        <span>AUJOURD'HUI</span>
      </div>
    </div>
  );
};

export default WaveformTimeline;