import React from 'react';
import { Trophy, CheckCircle2, User, Sparkles } from 'lucide-react';
import { SelectedHistoryItem } from '../types';

interface SelectedResultsPanelProps {
  selectedList: SelectedHistoryItem[];
  maxCount: number;
}

export const SelectedResultsPanel: React.FC<SelectedResultsPanelProps> = ({
  selectedList,
  maxCount,
}) => {
  return (
    <div className="w-full bg-[#0D111D]/90 border border-slate-800 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 font-mono">
              HASIL SISWA TERPILIH
            </h3>
            <p className="text-[11px] text-slate-400">
              Daftar siswa resmi yang berhasil didarati botol flip
            </p>
          </div>
        </div>

        {/* Progress indicator badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-300">
            {selectedList.length} / {maxCount} SELESAI
          </span>
        </div>
      </div>

      {/* Grid of 5 Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {Array.from({ length: maxCount }).map((_, idx) => {
          const item = selectedList[idx];
          const slotNum = idx + 1;

          if (item) {
            return (
              <div
                key={`slot-filled-${item.student.id}`}
                className="relative overflow-hidden rounded-xl bg-gradient-to-b from-cyan-950/40 via-slate-900/80 to-[#0A0D14] border-2 border-cyan-500/60 p-3.5 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Glow accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    RONDE {item.round}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="my-1.5">
                  <div className="text-2xl font-black font-mono text-white tracking-wider">
                    #{item.student.numberStr}
                  </div>
                  <div className="text-sm font-bold text-cyan-100 truncate mt-0.5" title={item.student.name}>
                    {item.student.name}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>TERPILIH</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={`slot-empty-${slotNum}`}
              className="rounded-xl border border-dashed border-slate-800/80 bg-slate-900/30 p-3.5 flex flex-col items-center justify-center min-h-[115px] text-center"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500 text-xs font-mono font-bold mb-1.5">
                {slotNum}
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Slot Kosong
              </span>
              <span className="text-[10px] text-slate-600 mt-0.5">
                Menunggu flip...
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
