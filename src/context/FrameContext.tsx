import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

export const TOTAL_FRAMES = 192;

interface FrameContextType {
  frames: (HTMLImageElement | null)[];
  loadedCount: number;
  isCriticalLoaded: boolean;
  progress: number; // 0 to 100
}

const FrameContext = createContext<FrameContextType | null>(null);

export const useFrames = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrames must be used within a FrameProvider');
  }
  return context;
};

export const FrameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isCriticalLoaded, setIsCriticalLoaded] = useState(false);
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  useEffect(() => {
    let loaded = 0;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNumber = index + 1;
        const filename = `/eye-frames-clean/frame_${String(frameNumber).padStart(4, '0')}.webp`;
        
        img.src = filename;
        img.onload = () => {
          framesRef.current[index] = img;
          loaded++;
          setLoadedCount(loaded);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${filename}`);
          resolve(); // Resolve anyway to not block
        };
      });
    };

    const loadAll = async () => {
      // Critical path: Load first frame immediately
      await loadFrame(0);
      
      // Load next few frames for immediate smooth start
      const criticalPromises = [];
      for (let i = 1; i < 10 && i < TOTAL_FRAMES; i++) {
        criticalPromises.push(loadFrame(i));
      }
      await Promise.all(criticalPromises);
      setIsCriticalLoaded(true);

      // Load the rest in chunks to avoid overwhelming the browser
      const chunkSize = 10;
      for (let i = 10; i < TOTAL_FRAMES; i += chunkSize) {
        const chunk = [];
        for (let j = i; j < i + chunkSize && j < TOTAL_FRAMES; j++) {
          chunk.push(loadFrame(j));
        }
        await Promise.all(chunk);
      }
    };

    loadAll();
  }, []);

  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <FrameContext.Provider
      value={{
        frames: framesRef.current,
        loadedCount,
        isCriticalLoaded,
        progress,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
};
