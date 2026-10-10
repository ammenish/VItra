import React, { useState } from 'react';
import { MATLAB_DR_APP_URL } from '../../config';
import { UploadImage } from './UploadImage';
import { QualityCheck } from './QualityCheck';
import { AnalysisPipeline } from './AnalysisPipeline';
import { ResultsDashboard } from './ResultsDashboard';

type ScreeningStage = 'UPLOAD' | 'QUALITY' | 'ANALYSIS' | 'RESULTS';

export const ScreeningApp: React.FC = () => {
  const [stage, setStage] = useState<ScreeningStage>('UPLOAD');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (imageSrc: string) => {
    setUploadedImage(imageSrc);
    setStage('QUALITY');
  };

  const handleQualityCheckComplete = (passed: boolean) => {
    if (passed) {
      setStage('ANALYSIS');
    } else {
      setStage('UPLOAD');
      setUploadedImage(null);
    }
  };

  const handleAnalysisComplete = () => {
    setStage('RESULTS');
  };

  const handleReset = () => {
    setStage('UPLOAD');
    setUploadedImage(null);
  };

  return (
    <div id="screening" className="w-full min-h-screen bg-transparent text-white flex flex-col relative z-20 overflow-hidden font-sans pt-12">
      {/* Top Application Header */}
      <header className="px-8 py-4 border-b border-white/10 flex justify-between items-center bg-black/30 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 rounded-full border-2 border-cyan-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-gray-200">RETINAL INTELLIGENCE</h2>
        </div>
        <div className="flex space-x-6 text-xs text-gray-400 font-mono tracking-widest">
          <div className="flex items-center space-x-2">
            <span>PATIENT ID:</span>
            <span className="text-gray-200">DEMO-001</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>STATUS:</span>
            <span className="text-cyan-400">{stage}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 flex flex-col items-center justify-start overflow-y-auto z-10 relative">
        {/* Live MATLAB Application Launch CTA */}
        <div className="w-full max-w-4xl mb-8 p-5 sm:p-6 rounded-lg bg-black/40 border border-cyan-500/30 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-cyan-500/50">
          <div className="flex flex-col text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                MATLAB DR Screening Application
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide">
              Launch the live AI-powered diabetic retinopathy screening system.
            </p>
          </div>

          <a
            href={MATLAB_DR_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Try VITRA - Launch the live AI-powered diabetic retinopathy screening system in a new tab"
            className="group inline-flex items-center justify-center px-6 py-3 border border-cyan-500/70 bg-cyan-950/30 hover:bg-cyan-500/20 text-white text-xs font-medium tracking-widest uppercase rounded transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer whitespace-nowrap"
          >
            <span>TRY VITRA</span>
            <span className="ml-2 text-cyan-400 font-semibold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        {stage === 'UPLOAD' && (
          <UploadImage onUpload={handleImageUpload} />
        )}
        
        {stage === 'QUALITY' && uploadedImage && (
          <QualityCheck 
            imageSrc={uploadedImage} 
            onComplete={handleQualityCheckComplete} 
          />
        )}

        {stage === 'ANALYSIS' && uploadedImage && (
          <AnalysisPipeline 
            imageSrc={uploadedImage}
            onComplete={handleAnalysisComplete}
          />
        )}

        {stage === 'RESULTS' && uploadedImage && (
          <ResultsDashboard 
            imageSrc={uploadedImage}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};
