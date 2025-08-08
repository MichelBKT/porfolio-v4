import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = ({ image, children, effect = 'default' }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Effet de parallax pour l'image
      if (effect === 'default') {
        gsap.to(imageRef.current, {
          yPercent: 30,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      } else if (effect === 'zoom') {
        gsap.to(imageRef.current, {
          scale: 1.2,
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Animation du contenu
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [effect]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={image}
          alt="Parallax background"
          className="absolute top-0 left-0 w-full h-[85%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-galaxy-dark/50 via-galaxy-dark/30 to-galaxy-dark/80" />
      </div>
      <div className="relative z-20 min-h-screen flex items-center justify-center py-4">
        <div ref={contentRef} className="w-full max-w-7xl mx-auto px-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection; 