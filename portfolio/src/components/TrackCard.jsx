import React, { useState } from 'react';
import { projects } from '../data/projects';
import AudioVisualizer from './AudioVisualizer';

const TrackCard = ({ projectId, onClick, isPlaying = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const project = projects.find(p => p.id === projectId);
  
  if (!project) return null;

  // Simuler une durée de track
  const trackDuration = Math.floor(Math.random() * 4) + 2; // 2-5 minutes
  const minutes = Math.floor(trackDuration);
  const seconds = Math.floor((trackDuration % 1) * 60);

  return (
    <div 
      className={`group relative bg-club-gray border border-neon-cyan/20 rounded-lg p-4 cursor-pointer 
        transition-all duration-300 transform hover:scale-105 hover:border-neon-violet/50
        ${isPlaying ? 'border-neon-cyan animate-pulse-neon' : ''}`}
      onClick={() => onClick(projectId)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track number and play button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-orbitron text-sm
            ${isPlaying ? 'border-neon-cyan text-neon-cyan' : 'border-neon-violet text-neon-violet'}
            transition-all duration-300 group-hover:animate-beat-drop`}>
            {isPlaying ? '▶' : projects.findIndex(p => p.id === projectId) + 1}
          </div>
          <div className="text-neon-cyan font-rajdhani text-sm">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
          </div>
        </div>
        
        {/* Mini equalizer */}
        <div className="w-16">
          <AudioVisualizer barCount={8} height={20} interactive={false} />
        </div>
      </div>

      {/* Album art */}
      <div className="relative mb-3 overflow-hidden rounded-md">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-32 object-cover transition-all duration-300 
            ${isHovered ? 'scale-110 brightness-110' : 'brightness-75'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-synth-dark/80 via-transparent to-transparent" />
        
        {/* Genre/Status badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-bass-purple/80 text-xs font-rajdhani text-white rounded-full">
            {project.subtitle || 'TRACK'}
          </span>
        </div>
      </div>

      {/* Track info */}
      <div className="space-y-2">
        <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-neon-cyan transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm font-rajdhani line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags as genres */}
        <div className="flex flex-wrap gap-1 mt-3">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-neon-violet/20 text-neon-violet text-xs font-rajdhani rounded-full border border-neon-violet/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover effects */}
      <div className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-neon-gradient/5 rounded-lg" />
        <div className="absolute inset-0 border border-neon-cyan/30 rounded-lg animate-pulse-neon" />
      </div>
    </div>
  );
};

export default TrackCard;