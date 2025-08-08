import React from 'react';
import { projects } from '../data/projects';

const CardDetails = ({ projectId }) => {
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <div className="text-white">Projet non trouvé</div>;
  }

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          <p className="text-galaxy-light mb-4">{project.subtitle}</p>
          <p className="text-gray-300 mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-galaxy-light/20 text-galaxy-light px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Fonctionnalités principales</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-galaxy-light text-white px-6 py-2 rounded-lg hover:bg-galaxy-light/80 transition-colors"
            >
              Voir le code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Voir la démo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails; 