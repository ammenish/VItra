import React from 'react';

export const StoryOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
      
      <div className="story-text-1 absolute opacity-0 translate-y-10 flex flex-col items-center">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-2 border-b border-cyan-800/50 pb-2">PHASE 01</div>
        <h2 className="text-4xl md:text-5xl font-light tracking-widest text-white">THE HUMAN EYE</h2>
      </div>

      <div className="story-text-2 absolute opacity-0 translate-y-10 flex flex-col items-center">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-2 border-b border-cyan-800/50 pb-2">PHASE 02</div>
        <h2 className="text-4xl md:text-5xl font-light tracking-widest text-white">RETINAL ANATOMY</h2>
      </div>

      <div className="story-text-3 absolute opacity-0 translate-y-10 flex flex-col items-center text-center max-w-2xl px-4">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-2 border-b border-cyan-800/50 pb-2">PHASE 03</div>
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white leading-relaxed">
          DIABETIC RETINOPATHY BEGINS BENEATH THE SURFACE
        </h2>
      </div>

      <div className="story-text-4 absolute opacity-0 translate-y-10 flex flex-col items-center">
        <div className="text-[10px] tracking-[0.5em] text-green-500 mb-2 border-b border-green-800/50 pb-2">SYSTEM READY</div>
        <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white">INITIALIZING ANALYSIS SYSTEM</h2>
      </div>
      
      {/* Cinematic / Scientific visual accents */}
      <div className="absolute top-8 left-8 text-xs font-mono text-cyan-700/50 tracking-widest opacity-50">
        SYS.REQ // 192.F
      </div>
      <div className="absolute bottom-8 right-8 text-xs font-mono text-cyan-700/50 tracking-widest opacity-50">
        AXIS: 14.2 // ROT: 0.00
      </div>
      <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col space-y-2 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 h-[2px] bg-cyan-500" />
        ))}
      </div>
    </div>
  );
};
