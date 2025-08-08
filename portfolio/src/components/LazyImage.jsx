import React, { useState, useRef, useEffect, memo } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L3N2Zz4=',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Préchargement 50px avant que l'image soit visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`${className} overflow-hidden`} {...props}>
      {isInView && (
        <>
          {!isLoaded && (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm transition-opacity duration-300"
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
            loading="lazy"
            decoding="async"
          />
        </>
      )}
      {!isInView && (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default memo(LazyImage);