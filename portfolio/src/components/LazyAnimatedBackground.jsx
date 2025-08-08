import React, { useState, useEffect, lazy, Suspense } from 'react';

// Lazy load du composant lourd
const AnimatedBackground = lazy(() => import('./AnimatedBackground'));

const LazyAnimatedBackground = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Délai avant de charger les animations lourdes
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);

    // Observer si l'utilisateur interagit avec la page
    const handleUserInteraction = () => {
      setIsVisible(true);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };

    document.addEventListener('mousemove', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // Fallback léger pendant le chargement
  const LightBackground = () => (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)'
      }}
    />
  );

  if (!shouldRender || !isVisible) {
    return <LightBackground />;
  }

  return (
    <Suspense fallback={<LightBackground />}>
      <AnimatedBackground />
    </Suspense>
  );
};

export default LazyAnimatedBackground;