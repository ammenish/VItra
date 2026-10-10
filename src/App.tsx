import { useEffect } from 'react';
// @ts-ignore
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FrameProvider } from './context/FrameContext';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { ScrollTimeline } from './components/ScrollTimeline';
import { ScreeningApp } from './components/application/ScreeningApp';
import { TechnologySection } from './components/TechnologySection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // CRITICAL: Sync Lenis with GSAP ScrollTrigger to prevent pinning overlaps
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Respect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      lenis.destroy();
    }

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <FrameProvider>
      <Preloader />
      
      <main className="bg-black min-h-screen text-white">
        <Hero />
        
        <ScrollTimeline />
        
        <ScreeningApp />

        <TechnologySection />
      </main>
    </FrameProvider>
  );
}

export default App;
