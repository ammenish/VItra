import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white z-20">
      <div className="absolute top-8 left-8">
        <h2 className="text-xs font-mono tracking-widest text-gray-400">RETINAL INTELLIGENCE</h2>
      </div>

      <nav className="absolute top-8 right-8 hidden md:flex space-x-12 text-[10px] tracking-widest text-gray-400">
        <a href="#overview" className="hover:text-white transition-colors">OVERVIEW</a>
        <a href="#anatomy" className="hover:text-white transition-colors">ANATOMY</a>
        <a href="#screening" className="hover:text-white transition-colors">SCREENING</a>
        <a href="#analysis" className="hover:text-white transition-colors">ANALYSIS</a>
        <a href="#results" className="hover:text-white transition-colors">RESULTS</a>
        <a href="#tech" className="hover:text-white transition-colors">TECHNOLOGY</a>
      </nav>

      <div className="flex flex-col items-center text-center space-y-6 max-w-4xl px-4">
        <h1 className="text-5xl md:text-8xl font-light tracking-tighter">
          SEE BEYOND <br />
          <span className="text-gray-500">THE SURFACE</span>
        </h1>
        <div className="space-y-2">
          <p className="text-sm md:text-base tracking-[0.3em] text-gray-400 max-w-xl font-light uppercase">
            AI-assisted diabetic retinopathy screening
          </p>
          <p className="text-xs tracking-[0.2em] text-gray-600 font-light">
            Detect. Explain. Refer.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center animate-bounce">
        <div className="text-[10px] tracking-widest text-gray-500 mb-2">SCROLL TO EXPLORE</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
    </section>
  );
};
