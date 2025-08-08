import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

const Card = ({ projectId, onClick }) => {
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-galaxy-dark/80 rounded-lg overflow-hidden backdrop-blur-sm border border-galaxy-purple/20 hover:border-galaxy-purple/40 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(projectId)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-galaxy-dark to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-galaxy-light mb-3">
          {project.subtitle}
        </p>
        <p className="text-gray-300 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex justify-end">
          <button className="text-galaxy-light hover:text-white transition-colors duration-300 flex items-center gap-2">
            En savoir plus
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card; 