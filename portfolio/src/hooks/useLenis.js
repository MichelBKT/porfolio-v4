import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId;
    let lastTime = 0;
    const TARGET_FPS = 30; // Même optimisation que les autres composants
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    function raf(time) {
      // Throttling pour réduire la fréquence
      if (time - lastTime < FRAME_INTERVAL) {
        rafId = requestAnimationFrame(raf);
        return;
      }
      lastTime = time;

      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);
};