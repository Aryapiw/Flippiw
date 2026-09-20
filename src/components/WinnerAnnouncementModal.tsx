import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, X, UserCheck } from 'lucide-react';
import { SelectedHistoryItem } from '../types';
import { sound } from '../utils/audio';

interface WinnerAnnouncementModalProps {
  winner: SelectedHistoryItem | null;
  onClose: () => void;
  selectedCount: number;
  maxCount: number;
}

export const WinnerAnnouncementModal: React.FC<WinnerAnnouncementModalProps> = ({
  winner,
  onClose,
  selectedCount,
  maxCount,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (winner) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [winner]);

  if (!winner || !show) return null;

  const isFinalWinner = selectedCount === maxCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFDF5] border-4 border-black shadow-[12px_12px_0px_#000] p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4 text-black" />
          <span>SISWA KE-{winner.round} • {isFinalWinner ? '5 / 5 LENGKAP!' : `TOTAL ${selectedCount} / ${maxCount}`}</span>
        </div>

        {/* Main Big Heading */}
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black font-mono">
          🎉 TERPILIH!
        </h2>

        <p className="text-xs sm:text-sm text-black/70 mt-1 font-bold">
          Botol mendarat tegak dengan sempurna pada nomor siswa:
        </p>

        {/* Student Highlight Box */}
        <div className="my-6 p-6 bg-[#A3E635] border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col items-center">
          <div className="px-3.5 py-1 bg-black text-[#FFE600] font-mono font-black text-xs tracking-widest uppercase mb-2">
            NOMOR SISWA TERPILIH
          </div>
          <div className="text-6xl sm:text-7xl font-black text-black tracking-tight font-mono my-1">
            #{winner.student.numberStr}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-black font-bold">
            <UserCheck className="w-4 h-4 text-black" />
            <span>Siswa Nomor {winner.student.numberStr} Berhasil Terpilih!</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3.5 bg-[#FFE600] hover:bg-[#FFF066] text-black font-mono font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {isFinalWinner ? 'TUTUP (5 SISWA LENGKAP)' : 'LANJUTKAN FLIP BERIKUTNYA'}
          </button>
        </div>

      </div>
    </div>
  );
};
