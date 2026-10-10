import React, { useState } from 'react';
import { VirtualAssistant } from './VirtualAssistant';

interface ResultsDashboardProps {
  imageSrc: string;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ imageSrc, onReset }) => {
  const [activeView, setActiveView] = useState<'ORIGINAL' | 'HEATMAP' | 'OVERLAY'>('OVERLAY');
  const isDemo = true; // Indicates these are simulated results

  // Simulated lesions for the assistant to talk about
  const lesions = [
    { name: 'Microaneurysms', count: 23 },
    { name: 'Hemorrhages', count: 8 },
  ];

  return (
    <div className="w-full max-w-7xl animate-fade-in flex flex-col space-y-6">
      
      {/* Voice Assistant */}
      <VirtualAssistant 
        isVisible={true} 
        drSeverity="Moderate NPDR, Level 2" 
        confidence="87%" 
        lesions={lesions} 
      />

      {/* Top Main Result Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Original Image Focus */}
        <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-300">Fundus Image</h3>
          </div>
          <div className="relative flex-1 bg-black rounded flex items-center justify-center min-h-[300px]">
            <img src={imageSrc} alt="Fundus Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        {/* Middle: AI Prediction & Grade */}
        <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 flex flex-col shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-sm font-medium text-gray-300">AI Prediction</h3>
            {isDemo && <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded uppercase tracking-wider">Demo Mode</span>}
          </div>
          
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-xs text-gray-500 mb-1">Severity Grade</p>
              <h2 className="text-3xl font-medium text-orange-500">MODERATE NPDR</h2>
              <p className="text-xs text-gray-400 mt-1">LEVEL 2</p>
            </div>

            <div>
               <div className="flex justify-between mb-2">
                 <span className="text-xs text-gray-400">Confidence Score</span>
                 <span className="text-sm text-green-500 font-mono">87%</span>
               </div>
               <div className="w-full h-1.5 bg-gray-900 rounded overflow-hidden">
                 <div className="h-full bg-green-500 rounded" style={{ width: '87%' }}></div>
               </div>
            </div>
            
            <div className="pt-6 border-t border-gray-800">
               <p className="text-xs text-gray-500 mb-2">Referral Recommendation</p>
               <div className="bg-orange-950/30 border border-orange-900/50 p-3 rounded flex items-start space-x-3">
                 <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                 </svg>
                 <div>
                   <h4 className="text-sm font-medium text-orange-400 mb-1">Refer to Ophthalmologist</h4>
                   <p className="text-xs text-gray-400">Moderate signs of Diabetic Retinopathy detected. Specialist consultation is recommended.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Analysis Report Info */}
        <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 flex flex-col shadow-xl">
          <h3 className="text-sm font-medium text-gray-300 mb-6">Analysis Report</h3>
          
          <div className="space-y-4 flex-1">
            <ReportRow label="Patient ID" value="DEMO-001" />
            <ReportRow label="Date of Analysis" value={new Date().toLocaleDateString()} />
            <ReportRow label="Image Type" value="Color Fundus" />
            <ReportRow label="Eye" value="Right (OD)" />
            <ReportRow label="AI Model" value="RetinalVision v2.1" />
            <ReportRow label="Image Quality" value="Good" valueColor="text-green-500" />
          </div>

          <div className="mt-6 space-y-3">
             <button className="w-full py-2 bg-cyan-900/20 text-cyan-400 border border-cyan-800 hover:bg-cyan-900/40 transition-colors text-xs tracking-widest rounded flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                <span>DOWNLOAD REPORT</span>
             </button>
             <button 
                onClick={onReset}
                className="w-full py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-xs tracking-widest rounded"
             >
               NEW SCAN
             </button>
          </div>
        </div>

      </div>

      {/* Bottom Secondary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detected Clinical Evidence */}
        <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-xl">
           <h3 className="text-sm font-medium text-gray-300 mb-6">Detected Clinical Evidence</h3>
           <div className="space-y-3">
              <EvidenceRow label="Microaneurysms" count={23} color="bg-red-500" />
              <EvidenceRow label="Hemorrhages" count={8} color="bg-orange-500" />
              <EvidenceRow label="Hard Exudates" count={12} color="bg-yellow-500" />
              <EvidenceRow label="Soft Exudates" count={5} color="bg-green-500" />
              <EvidenceRow label="Abnormal Vessels" count={2} color="bg-purple-500" />
              <EvidenceRow label="Cotton Wool Spots" count={0} color="bg-blue-500" />
           </div>
        </div>

        {/* Explainability / Grad-CAM */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 flex flex-col shadow-xl">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-medium text-gray-300">Model Explainability (Grad-CAM)</h3>
              <div className="flex space-x-2 bg-gray-900 rounded p-1">
                 <ViewToggle active={activeView === 'ORIGINAL'} onClick={() => setActiveView('ORIGINAL')} label="Original" />
                 <ViewToggle active={activeView === 'HEATMAP'} onClick={() => setActiveView('HEATMAP')} label="Heatmap" />
                 <ViewToggle active={activeView === 'OVERLAY'} onClick={() => setActiveView('OVERLAY')} label="Overlay" />
              </div>
           </div>

           <div className="flex-1 flex gap-6">
             <div className="flex-1 bg-black rounded border border-gray-800 flex items-center justify-center relative min-h-[300px] overflow-hidden">
                <img 
                  src={imageSrc} 
                  alt="Fundus Base" 
                  className={`absolute inset-0 w-full h-full object-contain ${activeView === 'HEATMAP' ? 'opacity-0' : 'opacity-100'}`} 
                />
                
                {/* Simulated Heatmap Layer */}
                {(activeView === 'HEATMAP' || activeView === 'OVERLAY') && (
                   <div className={`absolute inset-0 w-full h-full flex items-center justify-center mix-blend-screen ${activeView === 'OVERLAY' ? 'opacity-70' : 'opacity-100'}`}>
                      {/* We simulate a heatmap with radial gradients positioned roughly where lesions would be found on a typical fundus */}
                      <div className="w-full h-full max-w-md aspect-square relative opacity-80 filter blur-xl mix-blend-screen rounded-full overflow-hidden">
                          <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-red-600 rounded-full"></div>
                          <div className="absolute top-[50%] left-[40%] w-24 h-24 bg-yellow-500 rounded-full"></div>
                          <div className="absolute top-[60%] left-[30%] w-20 h-20 bg-green-500 rounded-full"></div>
                          <div className="absolute top-[40%] right-[30%] w-40 h-40 bg-orange-600 rounded-full"></div>
                          <div className="absolute bottom-[20%] left-[40%] w-20 h-20 bg-red-500 rounded-full"></div>
                          
                          {/* Fill rest with cool colors to represent low attention */}
                          <div className="absolute inset-0 bg-blue-900/30 -z-10 mix-blend-screen"></div>
                      </div>
                   </div>
                )}
             </div>

             {/* Heatmap Legend */}
             <div className="w-12 flex flex-col items-center py-4 space-y-2">
                <span className="text-[10px] text-gray-500 uppercase">High</span>
                <div className="w-3 flex-1 rounded bg-gradient-to-b from-red-500 via-yellow-500 to-blue-900"></div>
                <span className="text-[10px] text-gray-500 uppercase">Low</span>
             </div>
           </div>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-950/20 border border-yellow-900/50 p-4 rounded flex items-center justify-center space-x-3 text-center">
         <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
         </svg>
         <p className="text-xs text-yellow-600/80">
            This is an AI-assisted analysis and not a clinical diagnosis. Please correlate with clinical findings.
         </p>
      </div>

    </div>
  );
};

const ReportRow = ({ label, value, valueColor = 'text-gray-200' }: { label: string, value: string, valueColor?: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-gray-500">{label}</span>
    <span className={`${valueColor} font-medium`}>{value}</span>
  </div>
);

const EvidenceRow = ({ label, count, color }: { label: string, count: number, color: string }) => (
  <div className="flex justify-between items-center bg-black/40 backdrop-blur-sm border border-white/5 p-3 rounded">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-xs text-gray-300">{label}</span>
    </div>
    <span className="text-sm font-mono text-gray-400">{count}</span>
  </div>
);

const ViewToggle = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded transition-colors ${active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}
  >
    {label}
  </button>
);
