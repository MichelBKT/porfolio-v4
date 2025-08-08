import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from 'framer-motion';

const FloatingMemoji = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10 , -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative w-48 h-36 mx-auto my-auto"
    >
      {/* Effet de lueur */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-2xl"
      />

      {/* Memoji flottant */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/images/memoji.png"
          alt="Michel Banckaert - Avatar memoji développeur web créatif et passionné"
          className="w-28 h-28 object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingMemoji;