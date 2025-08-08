import React, { useState, useEffect } from 'react';
import Typography from '../components/core/Typography';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détecter la section active
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Ajuster selon la hauteur de votre navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY- offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-light-card/90 dark:bg-synth-darker/90 backdrop-blur-sm shadow-lg shadow-light-accent/20 dark:shadow-neon-cyan/20 lg:py-4 py-2' 
          : 'bg-transparent lg:py-6 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
        <header className="flex items-center justify-between lg:h-16 h-12">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center group"
          >
            <div className="relative">
              <Typography variant="h4" className="mt-6 max-lg:hidden font-orbitron font-bold text-transparent bg-gradient-to-r from-light-accent to-light-accent dark:bg-neon-gradient bg-clip-text group-hover:scale-110 transition-transform duration-300 animate-pulse-neon">
                MICHEL_B.EXE
              </Typography>
              <Typography variant="p" className="mb-6 max-lg:hidden font-rajdhani font-light text-light-accent dark:text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                DEVELOPER.SYS
              </Typography>
              <div className="absolute -inset-1 bg-neon-gradient/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-rajdhani font-bold rounded-lg transition-all duration-300 hover:animate-glitch ${
                    activeSection === link.id
                      ? 'text-neon-violet dark:text-neon-cyan'
                      : 'text-light-text dark:text-gray-300 hover:text-light-accent dark:hover:text-neon-violet'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-gradient rounded-full animate-pulse-neon" />
                  )}
                  <div className="absolute inset-0 bg-light-accent/5 dark:bg-neon-cyan/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 hover:animate-beat-drop" />
                </button>
              ))}
            </div>
            <div className="border-l border-light-border/30 dark:border-white/10 pl-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              className="relative w-10 h-10 flex items-center justify-center text-light-text dark:text-gray-300 hover:text-light-accent dark:hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
              <span 
                className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-current top-3 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}
              />
              </div>
            </button>
          </div>
        </header>
        </div>


      {/* Mobile Navigation */}
      <header
        className={`md:hidden flex transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity justify-center' 
            : 'max-h-0 opacity-0'
        } overflow-hidden bg-light-card/95 dark:bg-synth-darker/95 backdrop-blur-sm border-t border-light-border dark:border-neon-cyan/20`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-rajdhani font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-light-accent dark:text-neon-cyan bg-light-accent/10 dark:bg-neon-cyan/10'
                  : 'text-light-text dark:text-gray-300 hover:text-light-accent dark:hover:text-neon-violet hover:bg-light-accent/5 dark:hover:bg-neon-violet/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>
    </nav>
  );
};

export default Navbar; 