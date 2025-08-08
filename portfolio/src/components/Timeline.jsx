import React, { useState, useEffect, memo } from 'react';
import Typography from './Typography';

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  const timelineData = [
    {
      id: 1,
      year: "2024/2027",
      title: "MSC PRO 2027",
      company: "EPITECH",
      description: "Poursuite d'études en alternance dans l'informatique. Spécialisation en cybersécurité en 2026",
      side: "left",
      color: "neon-green"
    },
    {
      id: 2,
      year: "2024",
      title: "TITRE PROFESSIONNEL\nDÉVELOPPEUR WEB ET\nWEB MOBILE (BAC +2)",
      company: "Studi à distance",
      description: "Reconversion dans l'informatique et le développement web",
      side: "right",
      color: "neon-green"
    },
    {
      id: 3,
      year: "2019-2022",
      title: "Gestionnaire paie et\nadministration du personnel",
      company: "Sogetrel Nancy",
      description: "Pendant 3 ans",
      side: "left",
      color: "red"
    },
    {
      id: 4,
      year: "2015-2019",
      title: "Gestionnaire paie et\nadministration du personnel",
      company: "Les Maisons Hospitalières Nancy",
      description: "Pendant 4 ans",
      side: "right",
      color: "red"
    },
    {
      id: 5,
      year: "2014",
      title: "TITRE PROFESSIONNEL\nGESTIONNAIRE PAIE",
      company: "Afpa Laxou",
      description: "Spécialisation dans le domaine\nde la gestion des salaires",
      side: "left",
      color: "neon-cyan"
    },
    {
      id: 6,
      year: "2012-2014",
      title: "Aide comptable",
      company: "Adapah Longlaville",
      description: "Pendant 2 ans",
      side: "right",
      color: "neon-cyan"
    },
    {
      id: 7,
      year: "2011",
      title: "DUT GEA PMO",
      company: "IUT de Longwy",
      description: "Poursuite d'études supérieures\nen gestion des entreprises et\ndes administrations",
      side: "left",
      color: "neon-violet"
    },
    {
      id: 8,
      year: "2006",
      title: "BAC STT COMPTA / GESTION",
      company: "Lycée Alfred Mézières Longwy",
      description: "Baccalauréat technologique",
      side: "right",
      color: "neon-violet"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('[data-timeline-item]');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color, isVisible) => {
    const colors = {
      'neon-green': {
        border: 'border-neon-green',
        text: 'text-neon-green',
        bg: 'bg-neon-green/10',
        glow: 'shadow-[0_0_15px_rgba(0,255,65,0.3)]'
      },
      'red': {
        border: 'border-red-500',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
      },
      'neon-cyan': {
        border: 'border-neon-cyan',
        text: 'text-neon-cyan',
        bg: 'bg-neon-cyan/10',
        glow: 'shadow-[0_0_15px_rgba(0,255,255,0.3)]'
      },
      'neon-violet': {
        border: 'border-neon-violet',
        text: 'text-neon-violet',
        bg: 'bg-neon-violet/10',
        glow: 'shadow-[0_0_15px_rgba(138,43,226,0.3)]'
      }
    };
    
    const colorSet = colors[color];
    return {
      ...colorSet,
      glow: isVisible ? colorSet.glow : ''
    };
  };

  return (
    <div className="relative max-w-6xl mx-auto py-8">
      {/* Ligne centrale */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-green transform -translate-x-1/2" />
      
      {/* Points de connexion sur la ligne */}
      {timelineData.map((item, index) => {
        const isVisible = visibleItems.has(item.id);
        const colors = getColorClasses(item.color, isVisible);
        
        return (
          <div
            key={item.id}
            data-id={item.id}
            data-timeline-item
            className={`relative flex ${item.side === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'} mb-16`}
          >
            {/* Point central sur la timeline */}
            <div className="absolute left-1/2 top-8 w-6 h-6 transform -translate-x-1/2">
              <div className={`w-full h-full ${colors.bg} ${colors.border} border-2 rounded-full ${isVisible ? colors.glow : ''} transition-all duration-500`}>
                <div className={`w-2 h-2 ${item.color === 'neon-green' ? 'bg-neon-green' : item.color === 'red' ? 'bg-red-500' : item.color === 'neon-cyan' ? 'bg-neon-cyan' : 'bg-neon-violet'} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? 'animate-pulse' : ''}`} />
              </div>
              
              {/* Ligne de connexion */}
              <div className={`absolute top-1/2 ${item.side === 'left' ? 'right-6 w-8' : 'left-6 w-8'} h-0.5 ${colors.border} transform -translate-y-1/2`} />
            </div>

            {/* Contenu de la card */}
            <div className={`w-80 ${item.side === 'left' ? 'mr-16' : 'ml-16'} transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : item.side === 'left' ? 'translate-x-8 opacity-0' : '-translate-x-8 opacity-0'}`}>
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 backdrop-blur-sm ${isVisible ? colors.glow : ''} transition-all duration-500`}>
                {/* Header avec année */}
                <div className={`${colors.text} font-orbitron text-sm font-bold mb-2 text-right`}>
                  {item.year}
                </div>
                
                {/* Titre principal */}
                <Typography className={`${colors.text} font-orbitron text-lg font-bold mb-2 leading-tight whitespace-pre-line`}>
                  {item.title}
                </Typography>
                
                {/* Logo/Company */}
                <div className={`${colors.border} border-t pt-2 mb-3`}>
                  <Typography className={`${colors.text} font-rajdhani font-bold text-base opacity-80`}>
                    {item.company}
                  </Typography>
                </div>
                
                {/* Description */}
                <Typography className="text-gray-300 font-rajdhani text-sm leading-relaxed whitespace-pre-line">
                  {item.description}
                </Typography>
                
                {/* Effet de scan line */}
                {isVisible && (
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${item.color === 'neon-green' ? 'bg-neon-green' : item.color === 'red' ? 'bg-red-500' : item.color === 'neon-cyan' ? 'bg-neon-cyan' : 'bg-neon-violet'} opacity-60 animate-pulse`} />
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Effet de particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-neon-cyan/30 rounded-full animate-float-slow"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default memo(Timeline);