import React, { useState, useEffect, useRef } from 'react';
import { blogPosts } from '../data/blogPosts';
import ArticleSlidePanel from './ArticleSlidePanel';

const TerminalBlog = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'ascii-art', content: null },
    { type: 'security-info', content: null },
    { type: 'success', content: 'michel@portfolio:~/blog$ ls -la' },
    { type: 'info', content: `Articles trouvés: ${blogPosts.length}` }
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const typewriterEffect = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setCurrentCommand(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 50);
  };

  const executeCommand = (command) => {
    const newHistory = [...terminalHistory, { type: 'command', content: `michel@portfolio:~/blog$ ${command}` }];
    
    if (command === 'ls' || command === 'ls -la') {
      newHistory.push({ type: 'file-list', content: blogPosts });
    } else if (command.startsWith('cat ')) {
      const postId = command.replace('cat ', '').replace('.md', '');
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        if (command.includes('--full')) {
          setSelectedArticle(post);
          setIsPanelOpen(true);
          newHistory.push({ type: 'success', content: `Ouverture de l'article "${post.title}" dans le panneau latéral...` });
        } else {
          newHistory.push({ type: 'article', content: post });
        }
      } else {
        newHistory.push({ type: 'error', content: `Article '${postId}' non trouvé` });
      }
    } else if (command === 'help') {
      newHistory.push({ 
        type: 'help', 
        content: [
          'Commandes disponibles:',
          '  ls, ls -la     - Lister les articles',
          '  cat <article>  - Afficher un article',
          '  clear          - Vider le terminal',
          '  help           - Afficher cette aide'
        ]
      });
    } else if (command === 'clear') {
      setTerminalHistory([
        { type: 'system', content: 'Terminal nettoyé...' },
        { type: 'success', content: 'michel@portfolio:~/blog$ ' }
      ]);
      setCurrentCommand('');
      return;
    } else if (command.trim()) {
      newHistory.push({ type: 'error', content: `Commande '${command}' non reconnue. Tapez 'help' pour la liste des commandes.` });
    }
    
    setTerminalHistory(newHistory);
    setCurrentCommand('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      executeCommand(currentCommand.trim());
    }
  };

  const quickCommand = (command) => {
    if (!isTyping) {
      typewriterEffect(command, () => {
        setTimeout(() => executeCommand(command), 500);
      });
    }
  };

  const renderContent = (item) => {
    switch (item.type) {
      case 'ascii-art':
        return (
          <div className="text-neon-green font-mono lg:text-2xl text-xs leading-none mb-4">
            <pre>{`
██╗  ██╗ █████╗  ██████╗██╗  ██╗████████╗██╗   ██╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝╚══██╔══╝██║   ██║ 
███████║███████║██║     █████╔╝    ██║   ██║   ██║ 
██╔══██║██╔══██║██║     ██╔═██╗    ██║   ██║   ██║ 
██║  ██║██║  ██║╚██████╗██║  ██╗   ██║   ╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
            `}</pre>
      </div>
        );
      
      case 'security-info':
        return (
          <div className="text-green-400 font-mono text-sm mb-4 p-3 border border-green-500/30 rounded bg-green-500/10">
            <div className="text-neon-green font-bold mb-2">🔒 SÉCURITÉ - INFORMATION IMPORTANTE</div>
            <div className="space-y-1">
              <div>• Ce terminal est un simulateur SÉCURISÉ</div>
              <div>• Aucune commande système réelle n'est exécutée</div>
              <div>• Seules les commandes de blog prédéfinies fonctionnent</div>
              <div>• Votre système et vos données sont protégés</div>
              <div className="text-neon-cyan mt-2">➜ Tapez 'help' pour voir les commandes disponibles</div>
            </div>
          </div>
        );

      case 'success':
        return <div className="text-neon-cyan font-mono text-sm">{item.content}</div>;
      
      case 'info':
        return <div className="text-blue-400 font-mono text-sm">[INFO] {item.content}</div>;
      
      case 'command':
        return <div className="text-white font-mono text-sm">{item.content}</div>;
      
      case 'error':
        return <div className="text-red-400 font-mono text-sm">[ERROR] {item.content}</div>;
      
      case 'help':
        return (
          <div className="text-yellow-400 font-mono text-sm space-y-1">
            {item.content.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        );
      
      case 'file-list':
        return (
          <div className="space-y-2">
            {item.content.map((post, index) => (
              <div key={post.id} className="flex items-center space-x-4 font-mono text-sm">
                <span className="text-neon-cyan max-md:hidden">-rw-r--r--</span>
                <span className="text-white w-8 max-md:hidden">{index + 1}</span>
                <span className="text-neon-magenta max-md:hidden">{post.date}</span>
                <span className="text-yellow-400">{post.readTime}</span>
                <button
                  onClick={() => post.title !== 'NC' ? quickCommand(`cat ${post.id}`) : null}
                  className={`text-neon-green hover:text-white transition-colors cursor-pointer ${post.title === 'NC' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={post.title === 'NC'}
                >
                  {post.id}.md
                </button>
                <span className="text-gray-400">// {post.title}</span>
              </div>
            ))}
          </div>
        );

      case 'article': {
        const post = item.content;
        return (
          <div className="border border-neon-cyan p-4 my-4 bg-black/30">
            <div className="text-neon-magenta font-mono text-xs mb-2">
              ┌─ ARTICLE: {post.title} ─┐
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4 text-sm font-mono">
                <span className="text-neon-cyan">📅 {post.date}</span>
                <span className="text-yellow-400">⏱️ {post.readTime}</span>
                <span className="text-neon-green">👤 {post.author}</span>
              </div>
              
              {post.image && (
                <div className="text-blue-400 font-mono text-sm">
                  📸 [IMAGE: {post.image}]
                </div>
              )}
              
              <div className="text-gray-300 leading-relaxed">
                {post.excerpt}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-neon-violet font-mono text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={() => {
                    setSelectedArticle(post);
                    setIsPanelOpen(true);
                  }}
                  className="px-3 py-1 bg-neon-magenta/20 text-neon-magenta font-mono text-xs rounded hover:bg-neon-magenta/30 transition-colors border border-neon-magenta/30"
                >
                  Lire l'article complet →
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      default:
        return <div className="text-white font-mono text-sm">{item.content}</div>;
    }
  };

  const handleClosePage = () => {
    setIsPanelOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="relative z-10 min-h-screen dark:bg-synth-dark bg-gray-600 opacity-80 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-orbitron text-neon-cyan mb-2">
              ~/blog
            </h1>
            <p className="text-gray-400 font-mono">Terminal de blog interactif / Collection d'articles à consulter</p>
          </div>

          <div className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 ml-4 font-mono text-sm">michel@portfolio:~/blog</span>
            </div>
            
            <div 
              ref={terminalRef}
              className="p-4 h-160 overflow-y-auto scrollbar-thin scrollbar-thumb-neon-cyan scrollbar-track-gray-800"
            >
              {terminalHistory.map((item, index) => (
                <div key={index} className="mb-2">
                  {renderContent(item)}
                </div>
              ))}
              
              <div className="flex items-center">
                <span className="text-neon-cyan font-mono text-sm mr-2">
                  michel@portfolio:~/blog$
                </span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => !isTyping && setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1"
                  placeholder="Tapez 'help' pour commencer..."
                  disabled={isTyping}
                />
                <span className={`text-white font-mono text-sm ml-1 ${showCursor && !isTyping ? 'opacity-100' : 'opacity-0'}`}>
                  █
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => quickCommand('ls')}
              className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan font-mono text-sm rounded hover:bg-neon-cyan/30 transition-colors"
            >
              ls
            </button>
            <button
              onClick={() => quickCommand('help')}
              className="px-3 py-1 bg-yellow-400/20 text-yellow-400 font-mono text-sm rounded hover:bg-yellow-400/30 transition-colors"
            >
              help
            </button>
            <button
              onClick={() => quickCommand('clear')}
              className="px-3 py-1 bg-red-400/20 text-red-400 font-mono text-sm rounded hover:bg-red-400/30 transition-colors"
            >
              clear
            </button>
          </div>
        </div>
      </div>

      <ArticleSlidePanel 
        isOpen={isPanelOpen}
        article={selectedArticle}
        onClose={handleClosePage}
      />
    </>
  );
};

export default TerminalBlog;