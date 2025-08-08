import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const FlipFlopAnimation = ({ 
  children,
  duration = 7000, // Durée totale de l'animation
  onComplete,
  triggerAnimation = true,
  repeat = true,
   // Intervalle de répétition si onComplete est fourni
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('waiting'); // 'waiting', 'spinning', 'settling', 'shrinking', 'idle', 'completed'
  const [animationKey, setAnimationKey] = useState(0); // Pour forcer la réinitialisation

  useEffect(() => {
    if (triggerAnimation) {
      // Démarrer immédiatement la première phase
      setIsVisible(true);
      setAnimationPhase('waiting');
    } else {
      setIsVisible(false);
      setAnimationPhase('idle');
    }
  }, [triggerAnimation]);

  useEffect(() => {
    if (animationPhase === 'waiting') {
      // Attendre 3 secondes puis commencer l'animation
      const waitTimer = setTimeout(() => {
        setAnimationPhase('spinning');
      }, 6000); // 6 secondes d'attente

      return () => clearTimeout(waitTimer);
    } else if (animationPhase === 'spinning') {
      // After spinning duration, start settling
      const spinTimer = setTimeout(() => {
        setAnimationPhase('settling');
      }, duration * 0.6); // 80% of duration for spinning

      return () => clearTimeout(spinTimer);
    } else if (animationPhase === 'settling') {
      // After settling, start shrinking
      const settleTimer = setTimeout(() => {
        setAnimationPhase('shrinking');
      }, duration * 0.2); // 20% of duration for settling

      return () => clearTimeout(settleTimer);
    } else if (animationPhase === 'shrinking') {
      // After shrinking, move to idle state
      const shrinkTimer = setTimeout(() => {
        setAnimationPhase('idle');
        setIsVisible(false); // Masquer immédiatement
      }, 100); // Durée de l'animation de rétrécissement

      return () => clearTimeout(shrinkTimer);
    } else if (animationPhase === 'idle') {
      // After idle, move to completed state
      const idleTimer = setTimeout(() => {
        setAnimationPhase('completed');
      }, 50); // Court délai pour l'état idle

      return () => clearTimeout(idleTimer);
    } else if (animationPhase === 'completed') {
      // After completed, handle restart or end
      const completedTimer = setTimeout(() => {
        if (onComplete) onComplete();
        
        // Si repeat est activé, programmer la prochaine animation
        if (repeat && triggerAnimation) {

          setTimeout(() => {
            // Puis réapparaître et redémarrer avec une nouvelle clé
            setAnimationKey(prev => prev + 1); // Force complete reset
            setAnimationPhase('waiting'); // Reset phase first
            setIsVisible(true); // Then show
          }, 3000); // Pause de 3 secondes avant réapparition complète
        } else {
          setIsVisible(false);
          setAnimationPhase('idle');
        }
      }, 100); // Court délai

      return () => clearTimeout(completedTimer);
    }
  }, [animationPhase, duration, onComplete, repeat, triggerAnimation]);


  const topSpinVariants = {
    initial: { 
      rotateZ: 0,
      y: 0,
      scale: 1,
      opacity: 1
    },
    waiting: {
      rotateZ: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    spinning: {
      rotateZ: [0, 1800, 3600, 5400, 7200], // Rotation rapide puis ralentissement
      y: [0, -5, -10, -5, 0], // Légère oscillation verticale
      scale: [1, 1.02, 1.05, 1.02, 1],
      transition: {
        duration: duration * 0.8 / 1000, // 80% du temps pour tourner
        ease: [0.25, 0.1, 0.25, 1], // Easing qui simule le ralentissement
        times: [0, 0.2, 0.4, 0.7, 1] // Distribution du temps
      }
    },
    settling: {
      rotateZ: [7200, 7380, 7320, 7200], // Oscillations finales comme une toupie qui s'arrête
      y: [0, -2, -1, 0], // Petites oscillations
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: duration * 0.2 / 1000, // 20% du temps pour s'arrêter
        ease: [0.68, -0.25, 0.265, 1.25], // Easing avec oscillation
        times: [0, 0.3, 0.7, 1]
      }
    },
    shrinking: {
      rotateZ: [7200, 8400, 9600, 12000], // Continue rotation during shrinking
      y: [0, 0, -2, -10], // Upward movement for suction effect
      scale: [1, 0.5, 0.2, 0], // More aggressive shrinking
      opacity: [0.8, 0.3, 0.1, 0], // Start fading immediately, no flash
      rotateX: [0, 15, 45, 90], // 3D rotation for suction effect
      transition: {
        duration: 0.8,
        ease: [0.6, 0.0, 0.2, 1], // More aggressive easing
        times: [0, 0.15, 0.5, 1] // Even faster initial fade
      }
    },
      completed: {
        rotateZ: 12000, // Keep final rotation
        y: -10, // Keep final position
        scale: 0, // Stay shrunk
        opacity: 0, // Stay invisible
        rotateX: 90, // Keep final rotation
        transition: {
          duration: 0.1,
          ease: "easeOut"
        }
      }
  };

  return (
    <div className="relative" style={{ minHeight: 'inherit' }}>
      {/* Conteneur invisible pour maintenir l'espace */}
      <div className="invisible" aria-hidden="true">
        {children}
      </div>
      
      {/* Animation par-dessus */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={`topspin-${animationKey}`}
              variants={topSpinVariants}
              initial="initial"
              animate={animationPhase}
              exit="shrinking"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className="relative"
            >
              <motion.div
                className="drop-shadow-2xl" // Ombre pour l'effet de toupie
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlipFlopAnimation;