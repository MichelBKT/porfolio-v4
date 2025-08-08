import React, { memo } from 'react';
import TypewriterTwoLines from './TypewriterTwoLines';
import Typography from '../components/core/Typography';
import AudioVisualizer from './AudioVisualizer';
import FloatingMemoji from "./FloatingMemoji.jsx";
import SystemMessage from "./SystemMessage.jsx";
import EqualizerBackground from "./EqualizerBackground.jsx";
import Timeline from './Timeline';

const Home = () => {
  const downloadCV = () => {
    document.location.href = "/CV_Michel_BANCKAERT_v15.pdf";
  };

  const redirectToSectionContact = () => {
    document.location.href = "#contact"
  }
  
  return (
    <div className="min-h-screen py-16 px-4 sm:py-20 lg:py-24 mt-32 relative">
        {/* EqualizerBackground désactivé pour optimiser les performances */}
        {/* <EqualizerBackground audioElement={null} isPlaying={false} /> */}
        
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16 relative z-10">
          {/* Main Header with Track Style */}
          <div className="bg-club-gray/10 border border-neon-cyan/30 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm max-w-4xl w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-violet/20 border border-neon-violet rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-neon-violet rounded-full animate-pulse" />
                </div>
                <div>
                  <Typography className="text-neon-cyan font-rajdhani text-sm">NOW PLAYING</Typography>
                  <Typography className="text-white font-orbitron text-lg">PORTFOLIO.EXE</Typography>
                </div>
              </div>
              <AudioVisualizer barCount={15} height={40} interactive={true} />
            </div>
            
            <header>
              <Typography variant="h1" className="text-2xl sm:text-4xl lg:text-6xl font-orbitron font-bold text-transparent bg-gradient-to-r from-neon-cyan to-blue-500 bg-clip-text mb-6 sm:mb-8 text-center animate-pulse-neon">
                <TypewriterTwoLines fullText="Michel_B" />
              </Typography>
            </header>

            <FloatingMemoji />

            <SystemMessage />

          </div>

          {/* Navigation Panel */}
          <div className="bg-synth-darker border border-neon-violet/30 rounded-xl p-4 sm:p-6 max-w-2xl w-full">
            <Typography className="text-neon-violet font-orbitron text-center mb-4 sm:mb-6 font-bold text-sm sm:text-base">
              {'>> CONTROL_PANEL.SYS'}
            </Typography>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={downloadCV}
                className="bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-orbitron font-bold px-4 py-3 sm:px-6 sm:py-4 lg:px-8 text-xs sm:text-sm lg:text-base rounded-lg transition-all duration-300 hover:animate-beat-drop border border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] relative z-10"
              >
                {'>> DOWNLOAD_CV.PDF'}
              </button>
              <button
                onClick={redirectToSectionContact}
                className="bg-gradient-to-r from-neon-violet to-purple-600 text-white font-orbitron font-bold px-4 py-3 sm:px-6 sm:py-4 lg:px-8 text-xs sm:text-sm lg:text-base rounded-lg transition-all duration-300 hover:animate-beat-drop hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-neon-violet/50 relative z-10"
              >
                {'>> CONTACT.EXE'}
              </button>
            </div>
          </div>

          {/* About Summary */}
          <div className="bg-club-gray border border-neon-green/20 rounded-lg p-4 sm:p-6 max-w-3xl w-full backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse mr-3" />
              <Typography className="text-neon-green font-rajdhani text-sm font-bold">
                SYSTEM STATUS: ONLINE
              </Typography>
            </div>
            
            <Typography className="text-gray-300 max-w-2xl text-center font-rajdhani text-sm sm:text-base lg:text-lg">
              Je suis <span className="text-neon-cyan font-bold">développeur web junior</span> et mon objectif est de vous présenter mes projets 
              et vous décrire mon parcours. Explorez mes compétences techniques, mes expériences et découvrez mon univers à travers ce
              <span className="text-neon-violet font-bold"> PORTFOLIO v4.0</span> !
            </Typography>
          </div>
          {/* Career Timeline Section */}
          <div className="bg-club-gray border border-neon-violet/30 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm max-w-3xl w-full">
            <div className="flex items-center justify-center my-8">
              <AudioVisualizer barCount={30} height={20} interactive={false} />
            </div>
            
            <Typography variant="h2" className="text-xl sm:text-3xl lg:text-2xl font-orbitron text-transparent bg-neon-gradient bg-clip-text lg:top-2 bottom-2 relative sm:mb-8 text-center animate-pulse-neon">
              {'>> CAREER_VISUAL.DAT'}
            </Typography>
            
            <div className="relative">
              <Timeline />
            </div>
            
            <Typography className="text-center mt-6 text-neon-cyan font-rajdhani">
             {'>> TIMELINE_LOADED.SUCCESS'}
            </Typography>
          </div>
        </div>
    </div>
  );
}

export default memo(Home);