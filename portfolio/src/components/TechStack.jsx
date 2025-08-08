import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'motion/react';

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const techData = {
    frontend: [
      {
        name: 'HTML5',
        icon: '🌐',
        projects: ['Garage Parrot', 'Jobspot', 'Agilix'],
        recentlyLearned: false,
        inMyJob: true,
        color: 'from-orange-500 to-red-500'
      },
      {
        name: 'CSS3',
        icon: '🎨',
        projects: ['Garage Parrot', 'Agilix', 'Portfolio', 'Jobspot'],
        recentlyLearned: false,
        inMyJob: true,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        name: 'JavaScript',
        icon: '⚡',
        projects: ['Agilix', 'IRC', 'Portfolio', "Garage Parrot"],
        recentlyLearned: false,
        inMyJob: true,
        color: 'from-yellow-400 to-yellow-600'
      },
      {
        name: 'TypeScript',
        icon: '🛡️',
        projects: ['Portfolio'],
        recentlyLearned: true,
        inMyJob: false,
        color: 'from-blue-600 to-blue-800'
      },
      {
        name: 'React',
        icon: '⚛️',
        projects: ['Agilix', 'IRC', 'Portfolio'],
        recentlyLearned: false,
        inMyJob: false,
        color: 'from-cyan-400 to-cyan-600'
      },
      {
        name: 'Figma',
        icon: '🎯',
        projects: ['Portfolio', 'Agilix'],
        recentlyLearned: true,
        inMyJob: false,
        color: 'from-purple-500 to-pink-500'
      },
      {
        name: 'MongoDB',
        icon: '🌿',
        projects: ['IRC'],
        recentlyLearned: false,
        inMyJob: false,
        color: 'from-green-400 to-green-600'
      }
    ],
    backend: [
      {
        name: 'Node.js',
        icon: '🟢',
        projects: ['Agilix', 'IRC'],
        recentlyLearned: false,
        inMyJob: true,
        color: 'from-green-500 to-green-700'
      },
      {
        name: 'Express',
        icon: '🚀',
        projects: ['IRC'],
        inMyJob: false,
        recentlyLearned: false,
        color: 'from-gray-600 to-gray-800'
      },
      {
        name: 'PHP',
        icon: '🐘',
        projects: ['Garage Parrot', 'Jobspot', 'NSA'],
        inMyJob: true,
        recentlyLearned: false,
        color: 'from-purple-600 to-indigo-600'
      },
      {
        name: 'Symfony',
        icon: '🎼',
        inMyJob: true,
        projects: ['Garage Parrot'],
        recentlyLearned: false,
        color: 'from-black to-gray-900'
      },
      {
        name: 'Laravel',
        icon: '🔴',
        projects: ['Jobspot'],
        inMyJob: false,
        recentlyLearned: true,
        color: 'from-red-500 to-red-700'
      },
      {
        name: 'Java',
        icon: '☕',
        projects: ['RPG Empire'],
        inMyJob: false,
        recentlyLearned: true,
        color: 'from-orange-600 to-red-600'
      },
      {
        name: 'Python',
        icon: '🐍',
        projects: ['RPG HD2D', 'Cybersecurity'],
        inMyJob: false,
        recentlyLearned: true,
        color: 'from-blue-500 to-yellow-500'
      },
      {
        name: 'Linux',
        icon: '🐧',
        projects: ['NSA', 'Cybersecurity'],
        inMyJob: true,
        recentlyLearned: true,
        color: 'from-yellow-400 to-orange-500'
      },
      {
        name: 'JetBrains',
        icon: '🧠',
        projects: ['Développement'],
        inMyJob: true,
        recentlyLearned: false,
        color: 'from-pink-500 to-purple-600'
      },
      {
        name: 'MySQL',
        icon: '🐬️',
        projects: ['Base de données'],
        inMyJob: true,
        recentlyLearned: false,
        color: 'from-blue-600 to-blue-600'
      }
    ]
  };

  useEffect(() => {
      const timer = setTimeout(() => {

          return () => clearTimeout(timer);
      }, []);
  })
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };


  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
          Stack Technologique
        </h2>
        <p className="text-text-light/80 dark:text-text-dark/80 text-lg">
          Découvrez mes compétences techniques et les projets associés
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-lg rounded-2xl p-2 border border-neon-cyan/20">
          {['frontend', 'backend'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-white shadow-lg shadow-neon-cyan/25'
                  : 'text-white/20 dark:text-text-dark/70 hover:text-neon-cyan'
              }`}
            >
              {category === 'frontend' ? 'Frontend' : 'Backend'}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {techData[activeCategory].map((tech) => (
            <motion.div
              key={`${activeCategory}-${tech.name}`}
              variants={itemVariants}
              className="group relative bg-bg-light/30 dark:bg-bg-dark/30 backdrop-blur-lg rounded-2xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-xl hover:shadow-neon-cyan/10"
            >
              {/* Badges */}
              <div className="absolute -top-2 -right-2 flex gap-2">
                {tech.recentlyLearned && (
                  <div className="bg-gradient-to-r from-neon-magenta to-bass-purple text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse-neon">
                    Nouveau
                  </div>
                )}
                {tech.inMyJob && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg shadow-green-500/25">
                    Travail
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{tech.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white dark:text-text-dark">
                      {tech.name}
                    </h3>
                  </div>
                </div>
              </div>


              {/* Projects */}
              <div>
                <p className="text-sm font-semibold text-white dark:text-text-dark/80 mb-2">
                  Projets associés :
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.projects.map((project) => (
                    <span
                      key={project}
                      className="px-3 py-1 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full border border-neon-cyan/30 hover:bg-neon-cyan/30 transition-all duration-200"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/5 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <div className="flex justify-center items-center space-x-6 text-sm text-white relative z-50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-magenta to-bass-purple animate-pulse" />
            <span>Récemment appris</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
            <span>Utilisé au travail</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-cyan" />
            <span>Projets associés</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechStack;