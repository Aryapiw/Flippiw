import React, { useRef, useEffect } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Student } from '../types';
import { RealisticBottle } from './RealisticBottle';

interface TrackLaneProps {
  students: Student[];
  selectedStudentIds: number[];
  currentTargetId: number | null;
  bottlePositionX: number; // in pixels relative to track scroll content
  isFlipping: boolean;
  bottleAnimStyle: React.CSSProperties;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const TrackLane: React.FC<TrackLaneProps> = ({
  students,
  selectedStudentIds,
  currentTargetId,
  bottlePositionX,
  isFlipping,
  bottleAnimStyle,
  scrollContainerRef,
}) => {
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Auto scroll horizontally into view smoothly when target is chosen or changing
  useEffect(() => {
    if (currentTargetId && scrollContainerRef.current) {
      const targetEl = cardRefs.current.get(currentTargetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentTargetId, scrollContainerRef]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full my-6 select-none">
      {/* Visual Navigation Controls for Classroom Presentation */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
            LINTASAN NOMOR 01 — 36
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            Geser horizontal lintasan atau tonton botol melayang & mendarat di atas nomor siswa:
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Geser Kiri"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Geser Kanan"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Track Frame */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0B0F19] via-[#090C14] to-[#06080F] border-2 border-slate-800 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Futuristic Background Circuit & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

        {/* Scrollable Container hosting both the Air Stage and the Number Cards */}
        <div
          ref={scrollContainerRef}
          className="relative w-full overflow-x-auto pb-4 pt-2 custom-scrollbar scroll-smooth"
        >
          {/* Internal Track Canvas with fixed width accommodating all 36 students */}
          <div className="min-w-max px-4">
            
            {/* ============================================================ */}
            {/* BOTTLE AIR SPACE (Synchronous with student cards column) */}
            {/* ============================================================ */}
            <div className="relative w-full h-52 sm:h-60 flex items-end justify-start border-b-2 border-cyan-500/30 pb-2 mb-6">
              {/* Glowing Rail Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/30 via-cyan-400 to-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

              {/* Guide Indicator */}
              <div className="absolute -bottom-2.5 left-8 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold bg-[#090C14] px-3 py-0.5 rounded-full border border-cyan-500/40 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>FLIP TRACK 01-36</span>
              </div>

              {/* FLIPPING BOTTLE ACTOR */}
              <div
                id="flipping-bottle-actor"
                style={{
                  transform: `translateX(${bottlePositionX}px)`,
                  transition: isFlipping ? 'none' : 'transform 0.4s ease-out',
                }}
                className="absolute bottom-1 z-30 pointer-events-none origin-bottom will-change-transform"
              >
                {/* The Animated Flip Wrapper using keyframe/spring styles */}
                <div style={bottleAnimStyle} className="origin-center">
                  <RealisticBottle isGlowing={currentTargetId !== null && !isFlipping} />
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* HORIZONTAL NUMBER TRACK: 01 to 36 */}
            {/* ============================================================ */}
            <div className="flex items-stretch gap-3">
              {students.map((student) => {
                const isSelected = selectedStudentIds.includes(student.id);
                const isCurrentTarget = currentTargetId === student.id;

                return (
                  <div
                    key={student.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(student.id, el);
                      else cardRefs.current.delete(student.id);
                    }}
                    data-student-id={student.id}
                    className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-3 flex flex-col items-center justify-between border-2 transition-all duration-300 relative select-none ${
                      isCurrentTarget
                        ? 'bg-gradient-to-b from-cyan-500/30 to-blue-900/60 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)] scale-105 z-20'
                        : isSelected
                        ? 'bg-slate-900/40 border-slate-800/80 opacity-45 grayscale'
                        : 'bg-[#111728]/90 border-slate-800 hover:border-cyan-500/40 hover:bg-[#151e33]'
                    }`}
                  >
                    {/* Status Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                    )}

                    {isCurrentTarget && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-cyan-400 text-black text-[9px] font-black tracking-widest font-mono uppercase shadow-md animate-bounce">
                        TARGET!
                      </div>
                    )}

                    {/* Big Student Number */}
                    <div
                      className={`text-2xl sm:text-3xl font-black font-mono tracking-tight mt-1 ${
                        isCurrentTarget
                          ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                          : isSelected
                          ? 'text-slate-500'
                          : 'text-slate-200'
                      }`}
                    >
                      {student.numberStr}
                    </div>

                    {/* Student Name */}
                    <div
                      className={`w-full text-center text-xs font-semibold truncate mt-1 px-1 ${
                        isCurrentTarget
                          ? 'text-white font-bold'
                          : isSelected
                          ? 'text-slate-600 line-through'
                          : 'text-slate-300'
                      }`}
                      title={student.name}
                    >
                      {student.name}
                    </div>

                    {/* Status Tag */}
                    <div className="mt-2.5 w-full pt-1.5 border-t border-slate-800/80 text-center">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
                          isCurrentTarget
                            ? 'text-cyan-300 font-black'
                            : isSelected
                            ? 'text-red-400/80'
                            : 'text-slate-500'
                        }`}
                      >
                        {isCurrentTarget ? 'TERPILIH' : isSelected ? 'SELECTED' : 'READY'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
