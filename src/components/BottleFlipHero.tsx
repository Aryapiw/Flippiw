import React, { useRef, useEffect } from 'react';
import { Play, Sparkles, Trophy, CheckCircle2, ChevronLeft, ChevronRight, ArrowDown, RotateCcw, User, Flag } from 'lucide-react';
import { Student, SelectedHistoryItem, CaseStudy } from '../types';
import { RealisticBottle } from './RealisticBottle';

interface BottleFlipHeroProps {
  students: Student[];
  selectedList: SelectedHistoryItem[];
  caseStudies: CaseStudy[];
  isFlipping: boolean;
  onFlip: () => void;
  onReset: () => void;
  currentTargetId: number | null;
  bottlePositionX: number;
  bottleAnimStyle: React.CSSProperties;
  actorTransition?: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onSelectCaseToView: (caseId: number) => void;
}

export const BottleFlipHero: React.FC<BottleFlipHeroProps> = ({
  students,
  selectedList,
  caseStudies,
  isFlipping,
  onFlip,
  onReset,
  currentTargetId,
  bottlePositionX,
  bottleAnimStyle,
  actorTransition = 'none',
  scrollContainerRef,
  onSelectCaseToView,
}) => {
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const selectedStudentIds = selectedList.map((item) => item.student.id);
  const selectedCount = selectedList.length;
  const isComplete = selectedCount >= 5;

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
    <section id="bottle-flip" className="w-full pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header Presentation */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono font-black text-xs uppercase tracking-wider mb-3 transform -rotate-1">
            <Sparkles className="w-4 h-4" />
            <span>SIMULASI BOTTLE FLIP SELECTOR • 36 SISWA KELAS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight text-black leading-none">
            FLIP THE BOTTLE!
          </h1>
          <p className="text-lg sm:text-2xl font-black font-mono text-black mt-2">
            PILIH 5 SISWA SECARA ACAK DENGAN <span className="bg-[#00F0FF] px-2 py-0.5 border-2 border-black">BOTTLE FLIP</span>
          </p>

          {/* Current Status Banner */}
          {!isComplete ? (
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <span className="text-xs font-mono font-black uppercase px-2 py-0.5 bg-black text-[#FFE600]">
                RONDE {selectedCount + 1} / 5
              </span>
              <span className="text-xs sm:text-sm font-bold text-black font-mono">
                Siap Melontarkan Botol untuk Memilih Siswa Berikutnya
              </span>
            </div>
          ) : (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] border-3 border-black shadow-[4px_4px_0px_#000]">
              <Trophy className="w-5 h-5 text-black" />
              <span className="text-sm font-black font-mono uppercase">
                5 / 5 SISWA TELAH LENGKAP TERPILIH!
              </span>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* MAIN BOTTLE FLIP STAGE (Neobrutalism Arena) */}
        {/* ============================================================ */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-4 sm:p-6 mb-8 relative">
          
              {/* Top Stage Bar */}
          <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#00F0FF] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 bg-[#FFE600] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 bg-[#A3E635] border-2 border-black inline-block" />
              <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider ml-1">
                GARIS START & LINTASAN {students.length} NOMOR SISWA
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-black/70 hidden sm:inline">
                Scroll horizontal untuk cek lintasan:
              </span>
              <button
                type="button"
                onClick={handleScrollLeft}
                className="p-1.5 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                title="Geser Kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="p-1.5 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                title="Geser Kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Arena with synchronized Air Zone and Number Cards */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-4 custom-scrollbar"
          >
            <div className="min-w-max px-2">
              
              {/* AIR ZONE: Where the bottle flies & flips */}
              <div className="relative w-full h-56 sm:h-64 flex items-end justify-start border-b-4 border-black pb-2 mb-4 bg-gradient-to-b from-[#FFFDF5] to-amber-50/50">
                
                {/* Visual Grid Lines in Arena */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Laser / Landing Table Rail */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />

                {/* Guide Marker Start */}
                <div className="absolute -bottom-3 left-3 flex items-center gap-1.5 text-[10px] font-mono font-black uppercase bg-[#00F0FF] text-black px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] z-20">
                  <Flag className="w-3 h-3 text-black fill-black" />
                  <span>TITIK AWAL (START)</span>
                </div>

                {/* BOTTLE ACTOR - Synchronously tracked by requestAnimationFrame */}
                <div
                  id="flipping-bottle-actor"
                  style={{
                    transform: `translateX(${bottlePositionX}px)`,
                    transition: actorTransition,
                  }}
                  className="absolute bottom-1 z-30 pointer-events-none origin-bottom will-change-transform"
                >
                  <div
                    id="flipping-bottle-inner"
                    style={bottleAnimStyle}
                    className="origin-center will-change-transform"
                  >
                    <RealisticBottle isGlowing={currentTargetId !== null && !isFlipping} />
                  </div>
                </div>
              </div>

              {/* HORIZONTAL CARDS: GARIS START + 36 STUDENT CARDS */}
              <div className="flex items-stretch gap-2.5 pt-1">
                
                {/* GARIS START CARD (Position 0) */}
                <div
                  data-student-id="0"
                  id="card-start-line"
                  className={`flex-shrink-0 w-24 sm:w-28 p-3 flex flex-col items-center justify-between border-3 border-black transition-all select-none ${
                    currentTargetId === null && !isFlipping
                      ? 'bg-[#00F0FF] shadow-[5px_5px_0px_#000] -translate-y-2 z-10 scale-105'
                      : 'bg-[#00F0FF]/80 shadow-[3px_3px_0px_#000]'
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-black">
                      START
                    </span>
                    <Flag className="w-3.5 h-3.5 text-black fill-black" />
                  </div>

                  <div className="text-3xl font-black font-mono tracking-tight text-black my-2 flex items-center justify-center">
                    🏁
                  </div>

                  <div className="mt-2 w-full pt-1.5 border-t-2 border-black text-center">
                    <span className="text-[9px] font-mono font-black uppercase bg-black text-[#00F0FF] px-1 py-0.5 block">
                      GARIS START
                    </span>
                  </div>
                </div>

                {students.map((student) => {
                  const isSelected = selectedStudentIds.includes(student.id);
                  const isCurrentTarget = currentTargetId === student.id;
                  const selectedIndex = selectedList.findIndex((item) => item.student.id === student.id);

                  return (
                    <div
                      key={student.id}
                      ref={(el) => {
                        if (el) cardRefs.current.set(student.id, el);
                        else cardRefs.current.delete(student.id);
                      }}
                      data-student-id={student.id}
                      className={`flex-shrink-0 w-24 sm:w-28 p-3 flex flex-col items-center justify-between border-3 border-black transition-all select-none ${
                        isCurrentTarget
                          ? 'bg-[#FFE600] shadow-[5px_5px_0px_#000] -translate-y-2 z-20 scale-105'
                          : isSelected
                          ? 'bg-gray-100 opacity-70 shadow-[2px_2px_0px_#000]'
                          : 'bg-[#FFFDF5] shadow-[3px_3px_0px_#000] hover:bg-[#FFE600]/20 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Top Label */}
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-black/60">
                          NO.
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
                          </span>
                        )}
                        {isCurrentTarget && (
                          <span className="px-1.5 py-0.5 bg-black text-[#FFE600] text-[9px] font-mono font-black uppercase animate-bounce">
                            HIT!
                          </span>
                        )}
                      </div>

                      {/* Student Number (No person name, pure number 1-36) */}
                      <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black my-2">
                        {student.numberStr}
                      </div>

                      {/* Status Tag */}
                      <div className="mt-2 w-full pt-1.5 border-t-2 border-black text-center">
                        {isSelected ? (
                          <span className="text-[9px] font-mono font-black uppercase bg-black text-[#FFE600] px-1 py-0.5 block">
                            TERPILIH #{selectedIndex + 1}
                          </span>
                        ) : isCurrentTarget ? (
                          <span className="text-[9px] font-mono font-black uppercase bg-[#FFE600] text-black border border-black px-1 py-0.5 block animate-bounce">
                            LANDED!
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold uppercase text-black/60 block">
                            SIAP
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FLIP ACTION DECK */}
          <div className="mt-6 pt-5 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Progress indicators */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black uppercase">
                HASIL PEMILIHAN:
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((slot) => {
                  const isFilled = slot <= selectedCount;
                  return (
                    <div
                      key={`progress-slot-${slot}`}
                      className={`w-7 h-7 border-2 border-black font-mono font-black text-xs flex items-center justify-center transition-all ${
                        isFilled
                          ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] scale-105'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
              <span className="text-xs font-mono font-bold ml-1">
                ({selectedCount} / 5 SISWA)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {selectedCount > 0 && (
                <button
                  type="button"
                  id="btn-hero-reset-selections"
                  disabled={isFlipping}
                  onClick={onReset}
                  className="px-4 py-3.5 sm:py-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider bg-[#FF6B9D] hover:bg-[#ff85af] text-black border-4 border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2"
                  title="Reset Pemilihan Siswa"
                >
                  <RotateCcw className="w-4 h-4 text-black" />
                  <span>RESET (0/5)</span>
                </button>
              )}

              {/* BIG NEOBRUTALIST FLIP BUTTON */}
              <button
                type="button"
                id="btn-hero-flip-bottle"
                disabled={isFlipping || isComplete}
                onClick={onFlip}
                className={`flex-1 sm:flex-initial px-6 sm:px-10 py-4 font-mono font-black text-base sm:text-lg uppercase tracking-wider border-4 border-black transition-all flex items-center justify-center gap-3 ${
                  isComplete
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-[3px_3px_0px_#000]'
                    : isFlipping
                    ? 'bg-[#00F0FF] text-black cursor-wait shadow-[3px_3px_0px_#000] translate-x-1 translate-y-1'
                    : 'bg-[#FFE600] hover:bg-[#FFF066] text-black shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000]'
                }`}
              >
                {isFlipping ? (
                  <>
                    <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    <span>BOTOL MELAYANG & DIIKUTI LAYAR...</span>
                  </>
                ) : isComplete ? (
                  <>
                    <Trophy className="w-5 h-5 text-black" />
                    <span>5 SISWA LENGKAP TERPILIH</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-black text-black" />
                    <span>FLIP BOTOL SEKARANG!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5 SELECTED STUDENTS SLOTS (NO INDIVIDUAL CASE ASSIGNMENT) */}
        {/* ============================================================ */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-black font-mono uppercase text-black flex items-center gap-2">
              <Trophy className="w-5 h-5 text-black" />
              <span>DAFTAR 5 SISWA TERPILIH (HASIL BOTTLE FLIP)</span>
            </h3>
            <a
              href="#studi-kasus"
              className="text-xs font-mono font-black uppercase text-black hover:underline flex items-center gap-1"
            >
              <span>Lihat Materi 5 Studi Kasus APBN 2026</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const item = selectedList[slotIdx];
              const slotNumber = slotIdx + 1;

              return (
                <div
                  key={`selected-student-slot-${slotNumber}`}
                  className={`border-3 border-black p-4 flex flex-col justify-between transition-all ${
                    item
                      ? 'bg-[#A3E635]/25 border-black shadow-[4px_4px_0px_#000]'
                      : 'bg-white/70 border-dashed border-black/50 shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  {/* Slot Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-black text-white">
                      SISWA TERPILIH #{slotNumber}
                    </span>
                    {item && (
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    )}
                  </div>

                  {/* Student Details */}
                  {item ? (
                    <div>
                      <div className="text-3xl font-black font-mono text-black">
                        #{item.student.numberStr}
                      </div>
                      <div className="text-xs font-mono font-bold text-black uppercase mt-1">
                        Siswa Nomor {item.student.numberStr}
                      </div>
                      <div className="text-[10px] font-mono font-bold text-black/60 mt-2 pt-1 border-t border-black/30">
                        Terpilih pada Ronde {item.round}
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center">
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-black/40 mx-auto flex items-center justify-center text-gray-400 mb-1">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-mono font-bold text-gray-500 italic">
                        Menunggu flip botol...
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
