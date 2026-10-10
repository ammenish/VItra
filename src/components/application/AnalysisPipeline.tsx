import React, { useEffect, useState } from 'react';

interface AnalysisPipelineProps {
  imageSrc: string;
  onComplete: () => void;
}

const pipelineSteps = [
  'INITIALIZING MODEL...',
  'PREPROCESSING IMAGE...',
  'EXTRACTING RETINAL STRUCTURE...',
  'PERFORMING VESSEL ANALYSIS...',
  'DETECTING CLINICAL LESIONS...',
  'CLASSIFYING DR SEVERITY...'
];

export const AnalysisPipeline: React.FC<AnalysisPipelineProps> = ({ imageSrc: _imageSrc, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate pipeline progression
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= pipelineSteps.length - 1) {
          clearInterval(timer);
          // Small delay before moving to results
          setTimeout(() => onComplete(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center animate-fade-in mt-16">
      
      <div className="w-32 h-32 mb-12 relative">
        <div className="absolute inset-0 rounded-full border border-cyan-900"></div>
        <div className="absolute inset-0 rounded-full border-t border-cyan-400 animate-spin" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 rounded-full border-l border-blue-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        </div>
      </div>

      <div className="text-center space-y-2 mb-12">
        <h3 className="text-2xl font-light text-white tracking-widest uppercase">
          {pipelineSteps[currentStep]}
        </h3>
        <p className="text-cyan-600 text-xs tracking-widest font-mono">
          PHASE 0{currentStep + 1} // 06
        </p>
      </div>

      {/* Visual Pipeline indicator */}
      <div className="w-full flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -z-10"></div>
        
        {pipelineSteps.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${
              index < currentStep ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 
              index === currentStep ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)] animate-pulse' : 'bg-gray-800'
            }`}></div>
          </div>
        ))}
      </div>
      
      {/* Fake Console log effect */}
      <div className="w-full mt-16 p-4 bg-[#050505] border border-gray-800 rounded text-xs font-mono text-gray-500 h-32 overflow-hidden flex flex-col justify-end">
        <div className="space-y-1 opacity-70">
          {pipelineSteps.slice(0, currentStep + 1).map((step, i) => (
             <div key={i} className="flex items-center space-x-2 text-cyan-700">
               <span>&gt;</span>
               <span>{step}</span>
               {i < currentStep && <span className="text-green-700 ml-2">[DONE]</span>}
               {i === currentStep && <span className="animate-pulse">_</span>}
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};
