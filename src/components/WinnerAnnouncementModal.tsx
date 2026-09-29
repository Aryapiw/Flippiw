import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, X, UserCheck, Flame, PartyPopper } from 'lucide-react';
import { SelectedHistoryItem } from '../types';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

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

      // Trigger multi-angle celebratory confetti bursts
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFE600', '#00F0FF', '#FF6B6B', '#A3E635', '#000000'],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0.1, y: 0.7 },
            colors: ['#FFE600', '#00F0FF', '#A3E635'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 0.9, y: 0.7 },
            colors: ['#FFE600', '#FF6B6B', '#A3E635'],
          });
        }, 200);
      } catch (err) {
        console.warn('Confetti launch error:', err);
      }
    } else {
      setShow(false);
    }
  }, [winner]);

  if (!winner || !show) return null;

  const isFinalWinner = selectedCount === maxCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      
      {/* Modal Card with Pop-Up Animation */}
      <div className="relative w-full max-w-md bg-[#FFFDF5] border-4 border-black shadow-[12px_12px_0px_#000] p-6 sm:p-8 text-center overflow-hidden animate-pop-modal">
        
        {/* Background Decorative Neo-Dots Pattern */}
        <div className="absolute inset-0 bg-neo-dots opacity-40 pointer-events-none" />

        {/* Close button with hover spring */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Floating Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono text-xs font-black uppercase tracking-widest mb-4 animate-float-badge">
          <PartyPopper className="w-4 h-4 text-black" />
          <span>SISWA KE-{winner.round} • {isFinalWinner ? '5 / 5 LENGKAP!' : `TOTAL ${selectedCount} / ${maxCount}`}</span>
        </div>

        {/* Main Big Heading */}
        <h2 className="relative z-10 text-3xl sm:text-5xl font-black uppercase tracking-tight text-black font-mono flex items-center justify-center gap-2">
          <span>🎉 TERPILIH!</span>
        </h2>

        <p className="relative z-10 text-xs sm:text-sm text-black/70 mt-1 font-bold">
          Botol mendarat tegak dengan sempurna pada nomor siswa:
        </p>

        {/* Student Highlight Box with Stamp & Shimmer Impact */}
        <div className="relative z-10 my-6 p-6 bg-[#A3E635] border-3 border-black shadow-[8px_8px_0px_#000] flex flex-col items-center animate-stamp overflow-hidden">
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />

          <div className="relative px-3.5 py-1 bg-black text-[#FFE600] font-mono font-black text-xs tracking-widest uppercase mb-2 shadow-[2px_2px_0px_#000]">
            NOMOR SISWA TERPILIH
          </div>
          
          <div className="relative text-6xl sm:text-7xl font-black text-black tracking-tight font-mono my-1 drop-shadow-[2px_2px_0px_#FFF]">
            #{winner.student.numberStr}
          </div>

          <div className="relative mt-3 flex items-center gap-2 text-xs text-black font-black bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
            <UserCheck className="w-4 h-4 text-black" />
            <span>Siswa Nomor {winner.student.numberStr} Berhasil Terpilih!</span>
          </div>
        </div>

        {/* Action Button with Pulse Glow */}
        <div className="relative z-10 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-4 bg-[#FFE600] hover:bg-[#FFF066] text-black font-mono font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2"
          >
            {isFinalWinner ? (
              <>
                <Trophy className="w-5 h-5 text-black" />
                <span>TUTUP (5 SISWA LENGKAP)</span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 text-black" />
                <span>LANJUTKAN FLIP BERIKUTNYA</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
