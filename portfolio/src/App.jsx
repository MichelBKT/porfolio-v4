import React, { useState, useCallback, memo, lazy, Suspense } from 'react';

// Lazy loading des composants lourds
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EqualizerBackground from './components/EqualizerBackground';
import LazyAnimatedBackground from './components/LazyAnimatedBackground';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MediaController from "./components/MediaController.jsx";

function App() {
  const [audioElement, setAudioElement] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioRef = useCallback((audio) => {
    setAudioElement(audio);
  }, []);

  const handlePlayingChange = useCallback((playing) => {
    setIsAudioPlaying(playing);
  }, []);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen relative overflow-hidden bg-light-bg dark:bg-synth-dark transition-colors duration-300">
          {/* Animated Background */}
          <LazyAnimatedBackground />
          
          {/* Égaliseur en arrière-plan avec effets visuels */}
          <EqualizerBackground 
            audioElement={audioElement} 
            isPlaying={isAudioPlaying}
            />
          
          <Navbar />

            <MediaController 
              onAudioRef={handleAudioRef}
              onPlayingChange={handlePlayingChange}
            />
          <main>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-neon-cyan">Chargement...</div></div>}>
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
