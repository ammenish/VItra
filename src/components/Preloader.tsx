import React, { useEffect, useRef } from 'react';
import { useFrames, TOTAL_FRAMES } from '../context/FrameContext';
import gsap from 'gsap';

export const Preloader: React.FC = () => {
  const { progress, loadedCount, isCriticalLoaded } = useFrames();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If we have critical frames loaded (or all frames), fade out the preloader
    // We can fade out once the first ~10 frames are loaded so the user can start scrolling
    if (isCriticalLoaded) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [isCriticalLoaded]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-xs tracking-[0.3em] font-light text-gray-400">
          LOADING VISUALIZATION
        </h1>
        <div className="text-3xl font-light tabular-nums tracking-widest">
          {progress}%
        </div>
        
        {/* Subtle progress bar */}
        <div className="w-64 h-[1px] bg-gray-800 mt-8 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-[10px] text-gray-600 mt-4 tracking-widest uppercase">
          {loadedCount} / {TOTAL_FRAMES} FRAMES
        </div>
      </div>
    </div>
  );
};
