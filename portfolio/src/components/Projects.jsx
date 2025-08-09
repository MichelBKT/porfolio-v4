import React, { useState, useMemo } from 'react';
import TypewriterTwoLines from './TypewriterTwoLines';
import CardDetails from './CardDetails';
import TrackCard from './TrackCard';
import ProjectFilter from './ProjectFilter';
import { projects } from '../data/projects';
import Typography from './Typography';
import AudioVisualizer from './AudioVisualizer';

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return uniqueCategories.sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedProjectId(null);
  };

  const handleProjectClick = (projectId) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(projectId);
      setTimeout(() => {
        const element = document.getElementById('card-details');
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:py-20 lg:py-24" id='projects'>
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        {/* DJ Console Header */}
        <div>
          <div className="bg-club-gray border border-neon-cyan/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
              <div>
                <Typography variant='h1' className="font-orbitron font-bold text-transparent bg-neon-gradient bg-clip-text mb-2 animate-pulse-neon">
                  <TypewriterTwoLines fullText="MY PLAYLIST" />
                </Typography>
                <Typography className="text-sm sm:text-base lg:text-lg font-rajdhani text-neon-cyan">
                  PROJECTS.EXE
                </Typography>
              </div>
              
              {/* Master equalizer */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="text-right">
                  <div className="text-neon-violet font-rajdhani text-sm">MASTER VOL</div>
                  <div className="text-white font-orbitron text-lg">{filteredProjects.length} TRACKS</div>
                </div>
                <AudioVisualizer barCount={20} height={60} interactive={true} />
              </div>
            </div>
            
            <Typography className="text-gray-300 font-rajdhani text-sm sm:text-base text-center sm:text-left">
              Collection de projets techniques // Cliquez sur une track pour les détails complets
            </Typography>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Playlist */}
        <div>
          <div className="bg-club-gray/50 border border-neon-violet/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProjects.map((project) => (
                <TrackCard 
                  key={project.id}
                  projectId={project.id}
                  onClick={handleProjectClick}
                  isPlaying={selectedProjectId === project.id}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedProjectId && (
          <div id="card-details" className="py-6 sm:py-8">
            <div className="bg-synth-darker border border-neon-cyan/30 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm animate-beat-drop">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse mr-3" />
                <Typography className="font-orbitron text-neon-cyan">NOW PLAYING</Typography>
              </div>
              <CardDetails projectId={selectedProjectId} />
            </div>
          </div>
        )}
        </div>
    </div>
  );
};
export default Projects; 