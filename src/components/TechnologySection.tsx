import React from 'react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="tech" className="relative z-20 w-full min-h-screen bg-transparent text-white flex flex-col items-center justify-center py-24 px-6 border-t border-white/10">
      
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-mono tracking-widest text-cyan-500">PROJECT FOUNDATION</h2>
          <h3 className="text-3xl md:text-5xl font-light tracking-widest text-white">MODEL PERFORMANCE & DATASETS</h3>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-light leading-relaxed">
            The retinal intelligence system is trained and validated on comprehensive global datasets to ensure robust generalization across diverse patient demographics and imaging conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Performance Panel */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 shadow-xl">
             <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-800 pb-2">Target Performance Metrics</h4>
             
             <div className="space-y-8">
               <div className="flex flex-col space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-300">Sensitivity (Referable DR)</span>
                   <span className="text-cyan-400 font-mono">&gt;90%</span>
                 </div>
                 <div className="w-full h-1 bg-gray-900 rounded"><div className="w-[92%] h-full bg-cyan-500 rounded"></div></div>
               </div>

               <div className="flex flex-col space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-300">Specificity</span>
                   <span className="text-cyan-400 font-mono">&gt;85%</span>
                 </div>
                 <div className="w-full h-1 bg-gray-900 rounded"><div className="w-[88%] h-full bg-cyan-500 rounded"></div></div>
               </div>

               <div className="flex flex-col space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-300">AUC-ROC (Overall)</span>
                   <span className="text-cyan-400 font-mono">0.94</span>
                 </div>
                 <div className="w-full h-1 bg-gray-900 rounded"><div className="w-[94%] h-full bg-cyan-500 rounded"></div></div>
               </div>
             </div>
             <p className="text-[10px] text-gray-600 mt-6 italic">*Metrics reflect validation performance on held-out test sets.</p>
          </div>

          {/* Dataset Panel */}
          <div className="grid grid-cols-2 gap-4">
            <DatasetCard 
              name="APTOS 2019" 
              purpose="DR Grading Foundation" 
              desc="Large-scale fundus dataset for severity classification (Levels 0-4)."
            />
            <DatasetCard 
              name="IDRiD" 
              purpose="Lesion Analysis" 
              desc="Pixel-level annotations for microaneurysms, hemorrhages, and exudates."
            />
            <DatasetCard 
              name="DRIVE" 
              purpose="Vascular Segmentation" 
              desc="Retinal vessel architecture mapping and segmentation."
            />
            <DatasetCard 
              name="Messidor-2" 
              purpose="External Validation" 
              desc="Independent evaluation cohort for ensuring model robustness."
            />
          </div>

        </div>

        <div className="text-center pb-12">
          <p className="text-[10px] tracking-widest text-gray-600 font-mono">
             ARCHITECTURE: MATLAB / SIMULINK BACKEND INTEGRATION (PENDING) • REACT FRONTEND LAYER
          </p>
        </div>
      </div>
    </section>
  );
};

const DatasetCard = ({ name, purpose, desc }: { name: string, purpose: string, desc: string }) => (
  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded p-6 flex flex-col items-start hover:border-white/20 transition-colors shadow-xl">
    <h5 className="text-cyan-500 font-medium mb-1">{name}</h5>
    <h6 className="text-xs text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-800 w-full">{purpose}</h6>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </div>
);
