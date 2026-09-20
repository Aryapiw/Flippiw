import React from 'react';
import { Flame, RotateCcw, ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onReset: () => void;
  selectedCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onReset, selectedCount }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 border-t-4 border-black bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FFE600] border-2 border-black flex items-center justify-center font-mono font-black text-xs">
            <Flame className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="text-sm font-mono font-black uppercase text-black">
              FLIP CHALLENGE • APBN 2026
            </div>
            <div className="text-xs text-black/60 font-medium">
              Interaktif Bottle Flip Selector untuk Pembelajaran Fiskal Kelas
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B9D] hover:bg-[#ff85af] text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
            title="Reset Pemilihan Siswa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{selectedCount > 0 ? `RESET HASIL (${selectedCount}/5)` : 'RESET PEMILIHAN (0/5)'}</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 bg-white text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>KE ATAS</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
