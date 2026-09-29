import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MonitorPlay, Sparkles, TrendingUp, Key } from 'lucide-react';
import { CaseStudy } from '../types';
import { sound } from '../utils/audio';

interface PresentationSlideModeProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudies: CaseStudy[];
  initialCaseId?: number;
}

export const PresentationSlideMode: React.FC<PresentationSlideModeProps> = ({
  isOpen,
  onClose,
  caseStudies,
  initialCaseId = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (initialCaseId) {
      const foundIdx = caseStudies.findIndex((c) => c.id === initialCaseId);
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
      }
    }
  }, [initialCaseId, caseStudies, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
        e.preventDefault();
        sound.playClick();
        setCurrentIndex((prev) => (prev < caseStudies.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        sound.playClick();
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, caseStudies.length, onClose]);

  if (!isOpen) return null;

  const currentCase = caseStudies[currentIndex];

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < caseStudies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-3 sm:p-6 transition-all duration-300 select-none">
      
      {/* Slide Container in Neobrutalism with Pop Modal Entrance */}
      <div className="w-full h-full max-w-5xl mx-auto bg-[#FFFDF5] border-4 border-black shadow-[12px_12px_0px_#000] flex flex-col overflow-hidden animate-pop-modal">
        
        {/* Slide Top Navigation Bar */}
        <div
          className="p-4 border-b-4 border-black flex items-center justify-between flex-wrap gap-2 transition-colors duration-300"
          style={{ backgroundColor: currentCase.badgeColor }}
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-black text-white font-mono font-black text-sm uppercase shadow-[2px_2px_0px_#FFF]">
              SLIDE {currentIndex + 1} / {caseStudies.length}
            </span>
            <span className="font-mono font-black text-sm uppercase text-black hidden sm:inline">
              APBN 2026 • {currentCase.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-black hidden md:flex items-center gap-1 bg-white/80 px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
              <Key className="w-3 h-3 text-black" />
              <span>Gunakan keyboard ◄ ► / Spasi</span>
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              title="Tutup Mode Slide (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Scrollable Body with Dynamic Pop-In per slide change */}
        <div
          key={`slide-content-${currentCase.id}`}
          className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar flex flex-col justify-between animate-pop-in"
        >
          <div className="space-y-6">
            
            {/* Case Title */}
            <div>
              <div className="inline-block px-3 py-1 bg-black text-[#FFE600] font-mono font-black text-xs uppercase mb-3 shadow-[2px_2px_0px_#000]">
                KASUS #{currentCase.id} • {currentCase.category}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-mono text-black leading-tight">
                {currentCase.title}
              </h1>
            </div>

            {/* 3 Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {currentCase.metrics.map((m, mIdx) => (
                <div
                  key={`slide-m-${mIdx}`}
                  className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform"
                >
                  <div className="text-xs font-mono font-black uppercase text-black/60">
                    {m.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-black my-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Simple Case Content */}
            <div className="bg-white border-3 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000]">
              <span className="text-xs font-mono font-black uppercase text-black/80 block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Poin Pembahasan APBN 2026:</span>
              </span>
              <p className="text-base sm:text-lg text-black leading-relaxed font-semibold">
                {currentCase.content}
              </p>
            </div>

          </div>
        </div>

        {/* Slide Bottom Footer Navigation */}
        <div className="p-4 border-t-4 border-black bg-white flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFFDF5] hover:bg-[#FFE600] disabled:opacity-30 disabled:hover:bg-[#FFFDF5] text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>KASUS SEBELUMNYA</span>
          </button>

          {/* Quick jump numbers */}
          <div className="flex items-center gap-2">
            {caseStudies.map((cs, idx) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-9 h-9 font-mono font-black text-xs border-2 border-black transition-all ${
                  idx === currentIndex
                    ? 'bg-black text-white shadow-[3px_3px_0px_#FFE600] scale-110 -translate-y-0.5'
                    : 'bg-white text-black hover:bg-gray-100 shadow-[1px_1px_0px_#000]'
                }`}
              >
                {cs.id}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentIndex === caseStudies.length - 1}
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFE600] hover:bg-[#FFF066] disabled:opacity-30 disabled:hover:bg-[#FFE600] text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>KASUS BERIKUTNYA</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
