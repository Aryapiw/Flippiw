import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Student,
  CaseStudy,
  SelectedHistoryItem,
  SelectorFlipState,
} from './types';
import { generateDefaultStudents, EXCLUDED_NUMBERS } from './data/students';
import { CASE_STUDIES } from './data/caseStudies';
import { sound } from './utils/audio';

import { Navbar } from './components/Navbar';
import { BottleFlipHero } from './components/BottleFlipHero';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { RulesSection } from './components/RulesSection';
import { Footer } from './components/Footer';
import { WinnerAnnouncementModal } from './components/WinnerAnnouncementModal';
import { PresentationSlideMode } from './components/PresentationSlideMode';
import { ConfirmResetModal } from './components/ConfirmResetModal';

const STORAGE_KEY_STUDENTS = 'bottle_flip_students_v6';
const STORAGE_KEY_SELECTED = 'bottle_flip_selected_v6';
const TARGET_SELECTED_COUNT = 5;

export function App() {
  // Students state (excludes removed numbers: 3, 7, 15, 16, 17, 25, 34, 36)
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((s: Student) => !EXCLUDED_NUMBERS.has(s.id));
          if (filtered.length > 0) return filtered;
        }
      }
    } catch (e) {
      console.warn('Failed to load students from localStorage:', e);
    }
    return generateDefaultStudents();
  });

  // Selected students history (max 5)
  const [selectedList, setSelectedList] = useState<SelectedHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SELECTED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item: SelectedHistoryItem) => !EXCLUDED_NUMBERS.has(item?.student?.id));
        }
      }
    } catch (e) {
      console.warn('Failed to load selected from localStorage:', e);
    }
    return [];
  });

  // Modals and Presentation Mode
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [currentWinnerModal, setCurrentWinnerModal] = useState<SelectedHistoryItem | null>(null);
  const [presentationCaseId, setPresentationCaseId] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Flip state & physical animation coordinates
  const [flipState, setFlipState] = useState<SelectorFlipState>('idle');
  const [currentTargetId, setCurrentTargetId] = useState<number | null>(null);
  const [bottlePositionX, setBottlePositionX] = useState<number>(16);
  const [actorTransition, setActorTransition] = useState<string>('none');
  const [bottleAnimStyle, setBottleAnimStyle] = useState<React.CSSProperties>({});

  const totalRotationRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isFlipping = flipState === 'flipping';

  // Persist students in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.warn('Failed to save students to localStorage:', e);
    }
  }, [students]);

  // Persist selected in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED, JSON.stringify(selectedList));
    } catch (e) {
      console.warn('Failed to save selected to localStorage:', e);
    }
  }, [selectedList]);

  // Clean up animation timeouts and requestAnimationFrame on unmount
  useEffect(() => {
    return () => {
      animationTimeoutRef.current.forEach((t) => clearTimeout(t));
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const selectedStudentIds = selectedList.map((item) => item.student.id);
  const isAllSelected = selectedList.length >= TARGET_SELECTED_COUNT;

  // Helper to calculate exact X position above the student card or Garis Start (id=0)
  const calculateCardXPosition = (studentId: number): number => {
    const cardEl = document.querySelector(`[data-student-id="${studentId}"]`) as HTMLElement;
    if (cardEl && cardEl.offsetLeft !== undefined) {
      return cardEl.offsetLeft + (cardEl.offsetWidth / 2) - 48;
    }
    if (studentId === 0) {
      return 16;
    }
    const index = students.findIndex((s) => s.id === studentId);
    return 16 + 120 + (index >= 0 ? index : 0) * 122;
  };

  // Reset bottle back to the start line
  const resetBottleToStart = (smooth: boolean = true) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    animationTimeoutRef.current.forEach((t) => clearTimeout(t));
    animationTimeoutRef.current = [];

    const startX = calculateCardXPosition(0);
    setCurrentTargetId(null);
    setFlipState('idle');
    totalRotationRef.current = 0;

    if (smooth) {
      // Smooth camera scroll back to start
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
      // Smooth bottle return animation
      setActorTransition('transform 800ms cubic-bezier(0.25, 1, 0.5, 1)');
      setBottlePositionX(startX);
      setBottleAnimStyle({
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)',
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
      });
      const innerEl = document.getElementById('flipping-bottle-inner');
      if (innerEl) {
        innerEl.style.transition = 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)';
        innerEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
      }

      const tClear = setTimeout(() => {
        setActorTransition('none');
        if (innerEl) {
          innerEl.style.transition = 'none';
        }
      }, 850);
      animationTimeoutRef.current.push(tClear);
    } else {
      setActorTransition('none');
      setBottlePositionX(startX);
      setBottleAnimStyle({
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
      });
      const innerEl = document.getElementById('flipping-bottle-inner');
      if (innerEl) {
        innerEl.style.transition = 'none';
        innerEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }
  };

  // Align initial bottle position with Garis Start (id=0) on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      const initX = calculateCardXPosition(0);
      setBottlePositionX(initX);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  // ============================================================
  // CORE MECHANISM: BOTTLE FLIP WITH SLOW DRAMATIC SPIN &
  // ALWAYS LAUNCHING FROM GARIS START FOR EVERY SINGLE ROUND
  // ============================================================
  const handleFlipBottle = () => {
    if (isFlipping || isAllSelected) return;

    // Filter remaining candidates pool
    const remainingStudents = students.filter(
      (s) => !selectedStudentIds.includes(s.id)
    );

    if (remainingStudents.length === 0) return;

    // 1. Fair Random Student Determination
    const randomIndex = Math.floor(Math.random() * remainingStudents.length);
    const chosenStudent = remainingStudents[randomIndex];

    // Clear previous timeouts & animation frames
    animationTimeoutRef.current.forEach((t) => clearTimeout(t));
    animationTimeoutRef.current = [];
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setFlipState('flipping');
    setCurrentTargetId(null);
    setActorTransition('none');

    // GUARANTEED: ALWAYS LAUNCH FROM GARIS START
    const startX = calculateCardXPosition(0);
    setBottlePositionX(startX);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }

    sound.playWhoosh();

    const targetX = calculateCardXPosition(chosenStudent.id);
    // Slower, dramatic, cinematic flight (4.6 seconds)
    const flightDurationMs = 4600;

    // 5 full 360-degree flips = 1800° for a slow, clearly visible flip in the air
    const spinRotations = 1800;
    const prevRotation = 0;
    const targetRotation = 1800;
    totalRotationRef.current = targetRotation;

    // Bring bottle arena smoothly into browser view
    const arenaEl = document.getElementById('bottle-flip');
    if (arenaEl) {
      arenaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // REAL-TIME SCREEN & CAMERA TRACKING: Follow the bottle as it flips with full physics!
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const trackBottleCamera = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / flightDurationMs);
      const eased = easeOutCubic(progress);

      // 1. Horizontal movement from Garis Start to target card
      const currentX = startX + (targetX - startX) * eased;
      setBottlePositionX(currentX);

      // 2. High parabolic vertical arc (rises to -190px at midpoint, descends smoothly to table)
      const arcY = -Math.sin(progress * Math.PI) * 190;

      // 3. Smooth slow-motion rotation flip
      const currentRot = prevRotation + progress * spinRotations;

      // 4. Subtle scale zoom during flight
      const currentScale = 1 + Math.sin(progress * Math.PI) * 0.08;

      // Apply transform directly to inner bottle actor for 60fps/120fps hardware-accelerated smoothness
      const innerEl = document.getElementById('flipping-bottle-inner');
      if (innerEl) {
        innerEl.style.transition = 'none';
        innerEl.style.transform = `translate3d(0, ${arcY}px, 0) rotate(${currentRot}deg) scale(${currentScale})`;
      }

      // Center viewport camera on the flying bottle
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const containerWidth = container.clientWidth;
        const bottleCenter = currentX + 48; // bottle center point
        const targetScroll = bottleCenter - containerWidth / 2;
        container.scrollLeft = Math.max(
          0,
          Math.min(container.scrollWidth - containerWidth, targetScroll)
        );
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(trackBottleCamera);
      }
    };

    animFrameRef.current = requestAnimationFrame(trackBottleCamera);

    // Audio cues during mid-air flip spin (spaced for 4.6s slow-motion suspense)
    const t1 = setTimeout(() => sound.playFlipSpin(), 700);
    const t2 = setTimeout(() => sound.playFlipSpin(), 1500);
    const t3 = setTimeout(() => sound.playFlipSpin(), 2300);
    const t4 = setTimeout(() => sound.playFlipSpin(), 3100);
    const t5 = setTimeout(() => sound.playFlipSpin(), 3900);

    // Phase 2: Landing impact, table bounce & standing upright at target number
    const tImpact = setTimeout(() => {
      // Bottle lands with high-impact thud
      sound.playBottleLanding();

      // Sharp landing bounce
      setBottleAnimStyle({
        transition: 'transform 260ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: `translate3d(0, -14px, 0) rotate(${targetRotation}deg) scale(1.03)`,
      });

      const tSettle = setTimeout(() => {
        // Settled standing upright on the target card
        setBottleAnimStyle({
          transition: 'transform 180ms ease-out',
          transform: `translate3d(0, 0, 0) rotate(${targetRotation}deg) scale(1)`,
        });

        // Highlight chosen target student
        setCurrentTargetId(chosenStudent.id);
        setFlipState('landed');

        // Confetti burst
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFE600', '#00F0FF', '#A3E635', '#FF6B9D', '#000000', '#ffffff'],
        });

        // Record chosen student in history (pure student number selection)
        const newRecord: SelectedHistoryItem = {
          round: selectedList.length + 1,
          student: chosenStudent,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedList = [...selectedList, newRecord];
        setSelectedList(updatedList);

        if (updatedList.length >= TARGET_SELECTED_COUNT) {
          sound.playGrandFinish();
        } else {
          sound.playCelebration();
        }

        // Show celebration announcement modal
        const tModal = setTimeout(() => {
          setCurrentWinnerModal(newRecord);
        }, 450);
        animationTimeoutRef.current.push(tModal);

      }, 260);
      animationTimeoutRef.current.push(tSettle);

    }, flightDurationMs);

    animationTimeoutRef.current.push(t1, t2, t3, t4, t5, tImpact);
  };

  // Close winner modal and return bottle back to start line
  const handleCloseWinnerModal = () => {
    setCurrentWinnerModal(null);
    resetBottleToStart(true);
  };

  // Reset all selections with in-app modal confirmation
  const handleReset = () => {
    sound.playClick();
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    sound.playClick();
    setIsResetModalOpen(false);
    setSelectedList([]);
    resetBottleToStart(false);

    try {
      localStorage.removeItem(STORAGE_KEY_SELECTED);
    } catch (e) {
      console.warn('Failed to clear selected in localStorage:', e);
    }
  };

  const handleOpenPresentation = (caseId: number = 1) => {
    setPresentationCaseId(caseId);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans selection:bg-[#FFE600] selection:text-black flex flex-col justify-between antialiased">
      {/* Neobrutalism Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenEditModal={() => {}}
        onOpenPresentationMode={() => handleOpenPresentation(1)}
        onReset={handleReset}
        selectedCount={selectedList.length}
        totalTarget={TARGET_SELECTED_COUNT}
        isFlipping={isFlipping}
        studentsCount={students.length}
      />

      <main className="flex-1">
        {/* 1. Interactive Bottle Flip Selector Hero Section with Real-Time Screen Follow */}
        <BottleFlipHero
          students={students}
          selectedList={selectedList}
          caseStudies={CASE_STUDIES}
          isFlipping={isFlipping}
          onFlip={handleFlipBottle}
          onReset={handleReset}
          currentTargetId={currentTargetId}
          bottlePositionX={bottlePositionX}
          bottleAnimStyle={bottleAnimStyle}
          actorTransition={actorTransition}
          scrollContainerRef={scrollContainerRef}
          onSelectCaseToView={(caseId) => {
            const el = document.getElementById(`case-study-${caseId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        />

        {/* 2. 5 Studi Kasus APBN 2026 Section (Simple, Clean & Focused) */}
        <CaseStudiesSection
          caseStudies={CASE_STUDIES}
          selectedList={selectedList}
          onOpenPresentation={handleOpenPresentation}
        />

        {/* 3. Rules & Guidelines Section */}
        <RulesSection />
      </main>

      {/* Neobrutalism Footer */}
      <Footer
        onReset={handleReset}
        selectedCount={selectedList.length}
      />

      {/* In-App Confirmation Modal for Reset */}
      <ConfirmResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        selectedCount={selectedList.length}
      />

      {/* Winner Announcement Modal (Numbers 1-36 only) */}
      <WinnerAnnouncementModal
        winner={currentWinnerModal}
        onClose={handleCloseWinnerModal}
        selectedCount={selectedList.length}
        maxCount={TARGET_SELECTED_COUNT}
      />

      {/* Fullscreen Projector Presentation Slide Mode */}
      <PresentationSlideMode
        isOpen={presentationCaseId !== null}
        onClose={() => setPresentationCaseId(null)}
        caseStudies={CASE_STUDIES}
        initialCaseId={presentationCaseId ?? 1}
      />
    </div>
  );
}

export default App;
