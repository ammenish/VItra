import React, { useState, useRef, useCallback } from 'react';

interface UploadImageProps {
  onUpload: (imageSrc: string) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleSubmit = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-6 animate-fade-in">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          w-full aspect-[4/3] max-h-[400px] rounded-xl border-2 border-dashed cursor-pointer
          flex flex-col items-center justify-center space-y-4 transition-all duration-300
          backdrop-blur-md bg-black/30
          ${isDragging
            ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
            : 'border-white/20 hover:border-cyan-500/50 hover:bg-black/40'
          }
        `}
      >
        {preview ? (
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <img
              src={preview}
              alt="Retinal fundus preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-gray-300 font-mono tracking-wider">
              {fileName}
            </div>
          </div>
        ) : (
          <>
            {/* Upload Icon */}
            <div className={`
              w-16 h-16 rounded-full border-2 flex items-center justify-center
              transition-all duration-300
              ${isDragging ? 'border-cyan-400 text-cyan-400 scale-110' : 'border-white/30 text-white/50'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>

            <div className="text-center space-y-1.5">
              <p className="text-sm text-gray-200 font-medium tracking-wide">
                {isDragging ? 'Drop your image here' : 'Upload Retinal Fundus Image'}
              </p>
              <p className="text-[11px] text-gray-500 font-mono tracking-wider">
                DRAG & DROP OR CLICK TO BROWSE
              </p>
            </div>

            <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-mono">
              <span>JPEG</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>PNG</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>TIFF</span>
            </div>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Action Buttons */}
      {preview && (
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              setFileName('');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-xs font-mono tracking-wider text-gray-300 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            CLEAR
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-cyan-600/80 hover:bg-cyan-500/90 border border-cyan-400/30 text-xs font-mono tracking-wider text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-200 active:scale-95"
          >
            PROCEED TO QUALITY CHECK →
          </button>
        </div>
      )}
    </div>
  );
};
