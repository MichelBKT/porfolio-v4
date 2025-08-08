import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('savoir-faire');

  const skillsData = {
    'savoir-faire': [
      {
        name: 'Développement Full-Stack',
        icon: '💻',
        description: 'Conception et développement d\'applications web complètes',
        contexts: ['Projets personnels', 'Formation Epitech'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-blue-500 to-indigo-600'
      },
      {
        name: 'Architecture Logicielle',
        icon: '🏗️',
        description: 'Conception d\'architectures évolutives et maintenables',
        contexts: ['Projets complexes', 'Patterns de design'],
        inMyJob: false,
        recentlyDeveloped: true,
        color: 'from-purple-500 to-pink-500'
      },
      {
        name: 'Gestion de Base de Données',
        icon: '🗄️',
        description: 'Conception, optimisation et administration de BDD',
        contexts: ['MySQL', 'MongoDB', 'PostgreSQL'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-green-500 to-emerald-500'
      },
      {
        name: 'DevOps & Déploiement',
        icon: '🚀',
        description: 'Containerisation, CI/CD et automatisation',
        contexts: ['Docker', 'Git workflows', 'Nginx'],
        inMyJob: false,
        recentlyDeveloped: true,
        color: 'from-orange-500 to-red-500'
      },
      {
        name: 'Tests & Qualité Code',
        icon: '🧪',
        description: 'Tests unitaires, intégration et bonnes pratiques',
        contexts: ['Jest', 'Testing patterns', 'Code review'],
        inMyJob: false,
        recentlyDeveloped: true,
        color: 'from-cyan-500 to-blue-500'
      },
      {
        name: 'Cybersécurité',
        icon: '🔐',
        description: 'Sécurisation des applications et infrastructures',
        contexts: ['TryHackMe', 'Pentesting', 'Vulnérabilités'],
        inMyJob: false,
        recentlyDeveloped: true,
        color: 'from-red-600 to-purple-600'
      }
    ],
    'savoir-etre': [
      {
        name: 'Adaptabilité',
        icon: '🔄',
        description: 'Capacité à s\'adapter rapidement aux nouvelles technologies',
        contexts: ['Reconversion réussie', 'Veille technologique'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-emerald-500 to-teal-500'
      },
      {
        name: 'Autonomie',
        icon: '🎯',
        description: 'Capacité à mener des projets de bout en bout',
        contexts: ['Projets personnels', 'Auto-formation'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-blue-500 to-purple-500'
      },
      {
        name: 'Esprit d\'équipe',
        icon: '🤝',
        description: 'Collaboration efficace et partage de connaissances',
        contexts: ['Projets de groupe', 'Pair programming'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-orange-500 to-yellow-500'
      },
      {
        name: 'Curiosité Technique',
        icon: '🔍',
        description: 'Passion pour l\'apprentissage continu et l\'innovation',
        contexts: ['Nouvelles technologies', 'Open source'],
        inMyJob: false,
        recentlyDeveloped: false,
        color: 'from-purple-500 to-pink-500'
      },
      {
        name: 'Résolution de Problèmes',
        icon: '🧩',
        description: 'Approche méthodique pour résoudre les défis techniques',
        contexts: ['Debugging', 'Optimisation', 'Innovation'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-green-500 to-blue-500'
      },
      {
        name: 'Communication',
        icon: '💬',
        description: 'Vulgarisation technique et documentation claire',
        contexts: ['Documentation projet', 'Présentation'],
        inMyJob: true,
        recentlyDeveloped: true,
        color: 'from-cyan-500 to-indigo-500'
      },
      {
        name: 'Rigueur Professionnelle',
        icon: '📋',
        description: 'Méthodologie issue de l\'expérience en comptabilité',
        contexts: ['Gestion des paies', 'Processus qualité'],
        inMyJob: true,
        recentlyDeveloped: false,
        color: 'from-indigo-600 to-purple-600'
      },
      {
        name: 'Leadership Technique',
        icon: '👨‍💻',
        description: 'Capacité à guider et mentorer sur les aspects techniques',
        contexts: ['Projets étudiants', 'Code review'],
        inMyJob: false,
        recentlyDeveloped: true,
        color: 'from-red-500 to-orange-500'
      }
    ]
  };

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
    <div className="w-full max-w-6xl mx-auto p-8 mt-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
          Compétences & Qualités
        </h2>
        <p className="text-text-light/80 dark:text-text-dark/80 text-lg">
          Mon savoir-faire technique et mon savoir-être professionnel
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-lg rounded-2xl p-2 border border-neon-cyan/20">
          {['savoir-faire', 'savoir-etre'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-white shadow-lg shadow-neon-cyan/25'
                  : 'text-text-light/70 dark:text-text-dark/70 hover:text-neon-cyan'
              }`}
            >
              {category === 'savoir-faire' ? 'Savoir-Faire' : 'Savoir-Être'}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsData[activeCategory].map((skill) => (
            <motion.div
              key={`${activeCategory}-${skill.name}`}
              variants={itemVariants}
              className="group relative bg-bg-light/30 dark:bg-bg-dark/30 backdrop-blur-lg rounded-2xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-xl hover:shadow-neon-cyan/10"
            >
              {/* Badges */}
              <div className="absolute -top-2 -right-2 flex gap-2">
                {skill.recentlyDeveloped && (
                  <div className="bg-gradient-to-r from-neon-magenta to-bass-purple text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse-neon">
                    Nouveau
                  </div>
                )}
                {skill.inMyJob && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg shadow-green-500/25">
                    Travail
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl flex-shrink-0">{skill.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70 mb-3">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Contexts */}
              <div>
                <p className="text-sm font-semibold text-text-light/80 dark:text-text-dark/80 mb-2">
                  Contextes d'application :
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.contexts.map((context) => (
                    <span
                      key={context}
                      className="px-3 py-1 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full border border-neon-cyan/30 hover:bg-neon-cyan/30 transition-all duration-200"
                    >
                      {context}
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
        <div className="flex justify-center items-center space-x-6 text-sm text-text-light/60 dark:text-white relative z-50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-magenta to-bass-purple animate-pulse" />
            <span>Récemment développé</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
            <span>Utilisé au travail</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-cyan" />
            <span>Contextes d'application</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsShowcase;