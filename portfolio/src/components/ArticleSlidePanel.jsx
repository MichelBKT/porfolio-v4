import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ArticleSlidePanel.css';

const ArticleSlidePanel = ({ isOpen, article, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-synth-dark border-l border-neon-cyan shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 bg-gray-800 border-b border-neon-cyan p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 font-mono text-sm ml-2">
                      michel@portfolio:~/blog/{article.id}.md
                    </span>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded"
                    title="Fermer (Échap)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neon-cyan scrollbar-track-gray-800 p-6">
                <article className="max-w-none prose prose-invert prose-cyan">
                  <div className="border-b border-gray-700 pb-6 mb-8">
                    <h1 className="text-3xl font-orbitron text-neon-cyan mb-4 leading-tight">
                      {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-neon-magenta">📅</span>
                        <span className="text-gray-300">{article.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">⏱️</span>
                        <span className="text-gray-300">{article.readTime}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-neon-green">👤</span>
                        <span className="text-gray-300">{article.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-neon-violet/20 text-neon-violet text-xs font-mono rounded border border-neon-violet/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {article.image && (
                    <div className="mb-8">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full rounded-lg border border-neon-cyan/30 shadow-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="text-gray-300 leading-relaxed text-lg border-l-2 border-neon-cyan pl-4 italic">
                      {article.excerpt}
                    </div>

                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {article.content ? (
                        <div 
                          className="article-content"
                          dangerouslySetInnerHTML={{ __html: article.content }} 
                        />
                      ) : (
                        <div>
                          <p className="text-neon-cyan font-mono mb-4">
                            [ARTICLE COMPLET EN COURS DE RÉDACTION]
                          </p>
                          <p>
                            Ce contenu sera bientôt disponible. En attendant, vous pouvez consulter
                            l'extrait ci-dessus qui donne un aperçu du sujet traité.
                          </p>
                          <p className="mt-4">
                            Pour être notifié de la publication, n'hésitez pas à me contacter
                            via la section Contact du portfolio.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>

              <div className="flex-shrink-0 bg-gray-800 border-t border-neon-cyan p-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 font-mono text-sm">
                    {article.content ? `Ligne 1-${article.content.split('\n').length}` : 'Ligne 1-42'} | 
                    UTF-8 | Markdown
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan font-mono text-sm rounded hover:bg-neon-cyan/30 transition-colors border border-neon-cyan/30"
                  >
                    Retour au terminal
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleSlidePanel;