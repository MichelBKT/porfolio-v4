import React from 'react';
import Typography from './core/Typography';

const ProjectFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-club-gray/50 border border-neon-violet/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Typography className="font-orbitron text-neon-cyan text-sm font-bold">
          FILTRES:
        </Typography>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-2 rounded-lg text-sm font-rajdhani font-bold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-neon-cyan text-black shadow-neon-cyan shadow-sm'
                : 'bg-synth-darker border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/50'
            }`}
          >
            TOUT
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-rajdhani font-bold transition-all duration-300 uppercase ${
                selectedCategory === category
                  ? 'bg-neon-violet text-black shadow-neon-violet shadow-sm'
                  : 'bg-synth-darker border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/10 hover:border-neon-violet/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;