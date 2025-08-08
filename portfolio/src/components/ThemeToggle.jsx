import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="relative z-10 mb-7 left-2 top-12 lg:top-4 p-2 rounded-full w-7 h-7 bg-light-card/80 dark:bg-synth-dark/80 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative z-10 mb-7 left-2 top-12 lg:top-4 p-2 rounded-full transition-all duration-300 hover:scale-110
                 bg-light-card/80 dark:bg-synth-dark/80 backdrop-blur-sm border
                 border-light-border/50 dark:border-neon-cyan/30 
                 hover:border-light-accent/60 dark:hover:border-neon-cyan/60
                 text-light-text dark:text-white/80 
                 hover:text-light-accent dark:hover:text-neon-cyan
                 shadow-md hover:shadow-lg hover:shadow-light-accent/20 dark:hover:shadow-neon-cyan/20
                 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-neon-cyan focus:ring-opacity-50
                 active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-3 h-3 transition-all duration-300">
        {isDark ? (
          <svg
            className="w-3 h-3 transform transition-all duration-300 group-hover:rotate-12"
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
              clipRule="evenodd" 
            />
          </svg>
        ) : (
          <svg 
            className="w-3 h-3 transform transition-all duration-300 group-hover:-rotate-12"
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
            />
          </svg>
        )}
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-light-accent/10 dark:bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </button>
  );
};

export default ThemeToggle;