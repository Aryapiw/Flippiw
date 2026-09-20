import React from 'react';
import { Sparkles, Users, Volume2, VolumeX, Edit3, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenEditModal: () => void;
  onReset: () => void;
  selectedCount: number;
  totalTarget: number;
  isFlipping: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenEditModal,
  onReset,
  selectedCount,
  totalTarget,
  isFlipping,
}) => {
  return (
    <header className="w-full border-b border-cyan-500/20 bg-[#0C0E17]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            <div className="w-full h-full bg-[#090A0F] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-wider text-white uppercase font-mono">
                BOTTLE FLIP <span className="text-cyan-400">SELECTOR</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                PROJEKTOR READY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Flip the bottle. Let fate decide.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Sound Toggle */}
          <button
            type="button"
            id="btn-sound-toggle"
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              soundEnabled
                ? 'bg-slate-800/80 border-cyan-500/30 text-cyan-300 hover:bg-slate-700/80'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Matikan Suara SFX' : 'Aktifkan Suara SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          {/* Edit Students Button */}
          <button
            type="button"
            id="btn-edit-students"
            disabled={isFlipping}
            onClick={() => {
              sound.playClick();
              onOpenEditModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>EDIT SISWA (36)</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            id="btn-reset-selector"
            disabled={isFlipping || selectedCount === 0}
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 hover:bg-red-900/50 hover:border-red-400 text-red-300 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-400" />
            <span>RESET</span>
          </button>
        </div>
      </div>
    </header>
  );
};
