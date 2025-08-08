import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si la page est visible (onglet actif)
 * Utile pour optimiser les performances en pausant les animations
 * quand l'onglet n'est pas visible
 */
const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;