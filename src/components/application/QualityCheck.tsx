import React, { useEffect, useState } from 'react';

interface QualityCheckProps {
  imageSrc: string;
  onComplete: (passed: boolean) => void;
}

export const QualityCheck: React.FC<QualityCheckProps> = ({ imageSrc, onComplete }) => {
  const [, setProgress] = useState(0);
  const [status, setStatus] = useState<'ANALYZING' | 'GOOD' | 'POOR'>('ANALYZING');
  
  // Simulated metrics
  const [metrics, setMetrics] = useState({
    focus: 0,
    fov: 0,
    illumination: 0
  });

  useEffect(() => {
    // Simulate the analysis process
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / steps) * 100;
      setProgress(currentProgress);

      // Interpolate metrics for visual effect
      setMetrics({
        focus: Math.min(92, currentProgress),
        fov: Math.min(89, currentProgress),
        illumination: Math.min(85, currentProgress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStatus('GOOD');
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 animate-fade-in mt-8">
      {/* Image Preview Panel */}
      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 flex flex-col relative">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
          <h3 className="text-sm font-medium text-gray-300">Fundus Image Preview</h3>
          <span className="text-xs text-gray-500 font-mono">EYE: RIGHT (OD)</span>
        </div>
        
        <div className="relative flex-1 min-h-[400px] flex items-center justify-center bg-black rounded overflow-hidden">
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Fundus" 
              className={`max-w-full max-h-full object-contain transition-all duration-1000 ${status === 'ANALYZING' ? 'filter grayscale brightness-50' : 'filter-none'}`} 
            />
          )}
          
          {/* Scanning Line Effect */}
          {status === 'ANALYZING' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-scan"></div>
          )}
        </div>
      </div>

      {/* Quality Metrics Panel */}
      <div className="w-full md:w-80 flex flex-col space-y-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-300 mb-6">Image Quality Assessment</h3>
          
          <div className="space-y-6">
            <MetricBar label="Focus" value={metrics.focus} target={92} isAnalyzing={status === 'ANALYZING'} />
            <MetricBar label="Field of View" value={metrics.fov} target={89} isAnalyzing={status === 'ANALYZING'} />
            <MetricBar label="Illumination" value={metrics.illumination} target={85} isAnalyzing={status === 'ANALYZING'} />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Overall Status</div>
            {status === 'ANALYZING' && (
              <div className="flex items-center space-x-3 text-cyan-500">
                <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Assessing Quality...</span>
              </div>
            )}
            {status === 'GOOD' && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-green-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm font-medium">Image quality is sufficient</span>
                </div>
                <p className="text-xs text-gray-400">Proceeding with AI analysis...</p>
                <button 
                  onClick={() => onComplete(true)}
                  className="w-full py-2 bg-green-900/20 text-green-400 border border-green-800 hover:bg-green-900/40 transition-colors text-xs tracking-widest rounded mt-2"
                >
                  START AI ANALYSIS
                </button>
              </div>
            )}
            {status === 'POOR' && (
               <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-sm font-medium">Image quality insufficient</span>
                </div>
                <button 
                  onClick={() => onComplete(false)}
                  className="w-full py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-xs tracking-widest rounded"
                >
                  RECAPTURE IMAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for metric bars
const MetricBar = ({ label, value, target, isAnalyzing }: { label: string, value: number, target: number, isAnalyzing: boolean }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex justify-between text-xs">
      <span className="text-gray-400">{label}</span>
      <span className={isAnalyzing ? 'text-cyan-400 font-mono' : 'text-gray-200 font-mono'}>
        {Math.round(value)}%
      </span>
    </div>
    <div className="w-full h-1.5 bg-gray-900 rounded overflow-hidden">
      <div 
        className={`h-full rounded transition-all duration-75 ${isAnalyzing ? 'bg-cyan-500' : (target >= 80 ? 'bg-green-500' : 'bg-red-500')}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);
