import React, { useState, useEffect, useRef } from 'react';
import { DoctorSVG } from './DoctorSVG';

interface VirtualAssistantProps {
  isVisible: boolean;
  drSeverity: string;
  confidence: string;
  lesions: { name: string; count: number }[];
}

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ isVisible, drSeverity, confidence, lesions }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  const getScript = () => {
    // Generate conversational script with Hindi/South Indian Aunty touch
    return `Areyyy betaa, aao aao baitho. Let me take a look at your eye scan... okayyy... Achhaa, I see some signs here. 
    Dekho beta, based on the analysis, we are looking at ${drSeverity}, with a confidence of ${confidence}. 
    umhm, we detected some specific features. Yahan par ${lesions[0]?.count || 0} ${lesions[0]?.name} hain, 
    aur ${lesions[1]?.count || 0} ${lesions[1]?.name} dikh rahe hain. 
    Saral Bhasha mein Dear , iska matlab hai ki tumhari aankh ke peeche blood vessels mein thodi swelling aur chote leaks hain. 
    oh, zyada tension mat lo right now, but because they are moderate signs, I highly recommend ki tum jaldi se ek human ophthalmologist ko dikha lo. Okay dear? Apna khayal rakhna.`;
  };

  const playVoice = () => {
    if (!synth.current) return;

    if (isSpeaking) {
      synth.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const script = getScript();
    const utterance = new SpeechSynthesisUtterance(script);

    // Try to find a good Indian female voice (Hindi or Indian English)
    const voices = synth.current.getVoices();
    const indianVoice = voices.find(v =>
      (v.lang === 'hi-IN' || v.lang === 'en-IN') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Rishi') || v.name.includes('Veena'))
    ) || voices.find(v => v.lang.includes('hi') || v.lang.includes('en-IN'));

    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.rate = 0.9; // Slightly slower, like a caring aunty
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.current.speak(utterance);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 relative overflow-hidden mt-6 animate-fade-in shadow-xl">

      {/* Background glow when speaking */}
      {isSpeaking && (
        <div className="absolute inset-0 bg-cyan-900/10 animate-pulse pointer-events-none"></div>
      )}

      {/* Avatar Section */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <div className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-xl transition-opacity duration-300 ${isSpeaking ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

        {/* The SVG Avatar */}
        <div className="w-full h-full rounded-full border-2 border-cyan-800 overflow-hidden relative z-10 bg-white/5 flex items-center justify-center">
          <DoctorSVG isSpeaking={isSpeaking} className="w-[120%] h-[120%] mt-4" />
        </div>

        {/* Status Indicator */}
        <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#0a0a0a] z-20 ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-4 text-center md:text-left z-10">
        <div>
          <h3 className="text-lg font-medium text-cyan-400">Dr. Lakshmi</h3>
          <p className="text-xs tracking-widest text-gray-500 uppercase">AI Medical Assistant</p>
        </div>

        <p className="text-sm text-gray-300 italic">
          "{isSpeaking ? 'Arey Beta, aao aao baitho. Let me take a look at your eye scan... Hmm... Achaa, I see some signs here...' : 'Arey kanna, aao baitho. I can explain these results for you in simple terms.'}"
        </p>

        {speechSupported ? (
          <button
            onClick={playVoice}
            className={`px-6 py-2 rounded text-xs tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 w-full md:w-auto ${isSpeaking
              ? 'bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-900/50'
              : 'bg-cyan-900/30 text-cyan-400 border border-cyan-800 hover:bg-cyan-900/50'
              }`}
          >
            {isSpeaking ? (
              <>
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-3 bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-3 bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>STOP EXPLANATION</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>LISTEN TO EXPLANATION</span>
              </>
            )}
          </button>
        ) : (
          <p className="text-xs text-red-400">Your browser does not support speech synthesis.</p>
        )}
      </div>

    </div>
  );
};
