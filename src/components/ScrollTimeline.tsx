import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasEye } from './CanvasEye';
import { StoryOverlay } from './StoryOverlay';

gsap.registerPlugin(ScrollTrigger);

export const ScrollTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1000%', // 1000vh for ultra smooth scrolling
        pin: true,
        scrub: 1.5, // Some scrub delay for extra smoothness in GSAP in addition to our canvas lerp
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      }
    });

    // We also sequence the text opacity using the same timeline.
    // The frames progress linearly from 0 to 1 over the timeline.
    // Frame 20-40 out of 192 is roughly 10% to 20% of timeline.
    
    // Concept milestones:
    // "THE HUMAN EYE" ~ 15% (fade in), 25% (fade out)
    // "RETINAL STRUCTURE" ~ 40% (fade in), 50% (fade out)
    // "VASCULAR NETWORK" ~ 65% (fade in), 75% (fade out)
    // "SEE WHAT LIES BENEATH" ~ 85% (fade in), 100% (stays on)

    tl.to('.story-text-1', { opacity: 1, duration: 0.1, y: -20 }, 0.15)
      .to('.story-text-1', { opacity: 0, duration: 0.1, y: -40 }, 0.25)
      
      .to('.story-text-2', { opacity: 1, duration: 0.1, y: -20 }, 0.35)
      .to('.story-text-2', { opacity: 0, duration: 0.1, y: -40 }, 0.45)
      
      .to('.story-text-3', { opacity: 1, duration: 0.1, y: -20 }, 0.60)
      .to('.story-text-3', { opacity: 0, duration: 0.1, y: -40 }, 0.70)
      
      .to('.story-text-4', { opacity: 1, duration: 0.1, y: -20 }, 0.85);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <CanvasEye progressRef={progressRef} />
      <StoryOverlay />
    </div>
  );
};
