import React, { useEffect, useRef } from 'react';
import { useFrames, TOTAL_FRAMES } from '../context/FrameContext';

interface CanvasEyeProps {
  progressRef: React.MutableRefObject<number>;
}

export const CanvasEye: React.FC<CanvasEyeProps> = ({ progressRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { frames, isCriticalLoaded } = useFrames();
  
  useEffect(() => {
    if (!isCriticalLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentFrame = 0;
    let animationFrameId: number;

    const resize = () => {
      const vWidth = window.innerWidth;
      const vHeight = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = vWidth * dpr;
      canvas.height = vHeight * dpr;
      
      canvas.style.width = `${vWidth}px`;
      canvas.style.height = `${vHeight}px`;
      
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const targetFrameExact = progressRef.current * (TOTAL_FRAMES - 1);
      
      // Smooth interpolation
      currentFrame += (targetFrameExact - currentFrame) * 0.12;
      
      // Avoid tiny subpixel jitters near the end
      if (Math.abs(targetFrameExact - currentFrame) < 0.01) {
        currentFrame = targetFrameExact;
      }
      
      const frameIndex = Math.floor(currentFrame);
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
      
      const img = frames[clampedIndex];
      
      const vWidth = window.innerWidth;
      const vHeight = window.innerHeight;

      // Clear the canvas to black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, vWidth, vHeight);
      
      if (img && img.complete) {
        const imgRatio = img.width / img.height;
        const vRatio = vWidth / vHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        // We use cover behavior to fill screen but never stretch
        if (imgRatio > vRatio) {
           drawHeight = vHeight;
           drawWidth = vHeight * imgRatio;
           offsetX = (vWidth - drawWidth) / 2;
           offsetY = 0;
        } else {
           drawWidth = vWidth;
           drawHeight = vWidth / imgRatio;
           offsetX = 0;
           offsetY = (vHeight - drawHeight) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }















































































































































































































































































































































































      
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frames, progressRef, isCriticalLoaded]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};
