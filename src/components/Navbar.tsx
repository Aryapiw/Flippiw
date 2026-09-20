import React from 'react';
import { Sparkles, Volume2, VolumeX, Users, RotateCcw, MonitorPlay, BookOpen, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenEditModal: () => void;
  onOpenPresentationMode: () => void;
  onReset: () => void;
  selectedCount: number;
  totalTarget: number;
  isFlipping: boolean;
  studentsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenEditModal,
  onOpenPresentationMode,
  onReset,
  selectedCount,
  totalTarget,
  isFlipping,
  studentsCount = 28,
}) => {
  return (
    <nav className="w-full bg-[#FFFDF5] border-b-4 border-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#FFE600] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transform -rotate-2">
            <Flame className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-mono uppercase">
                FLIP CHALLENGE
              </span>
              <span className="text-[11px] font-black uppercase font-mono px-2 py-0.5 bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                APBN 2026
              </span>
            </div>
            <p className="text-xs text-black/70 font-bold hidden sm:block">
              Simulasi Bottle Flip Pemilih Siswa & 5 Studi Kasus Kebijakan Fiskal
            </p>
          </div>
        </div>

        {/* Quick Nav Anchor Links */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#bottle-flip"
            className="px-3 py-1.5 text-xs font-black uppercase font-mono bg-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            🎯 Bottle Flip
          </a>
          <a
            href="#studi-kasus"
            className="px-3 py-1.5 text-xs font-black uppercase font-mono bg-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#00F0FF] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            📊 5 Studi Kasus
          </a>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-black font-mono border-2 border-black shadow-[2px_2px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 ${
              soundEnabled ? 'bg-[#FFE600] text-black' : 'bg-gray-200 text-gray-600'
            }`}
            title={soundEnabled ? 'Matikan Suara SFX' : 'Aktifkan Suara SFX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          {/* Nomor Siswa Indicator Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black font-mono bg-[#A3E635] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{studentsCount} NOMOR SISWA</span>
          </div>

          {/* Slide Presentation Mode */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenPresentationMode();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black font-mono bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MODE SLIDE</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            disabled={isFlipping}
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-black font-mono bg-[#FF6B9D] hover:bg-[#ff85af] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Reset Siswa Terpilih (0/5)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
