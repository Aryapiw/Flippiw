import React, { useState } from 'react';
import {
  FileText,
  RotateCcw,
  Trophy,
  BookOpenCheck,
  MapPin,
  FileEdit,
  Repeat,
  Timer,
  Users,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Pin,
  X,
  Lightbulb,
  ExternalLink,
  Flame,
  MousePointerClick
} from 'lucide-react';
import { AnimatedReveal } from './AnimatedReveal';
import { sound } from '../utils/audio';

interface RuleStep {
  number: number;
  phase: 'Persiapan & Flip' | 'Pengerjaan Kasus' | 'Rotasi & Diskusi';
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  note: string;
  highlight?: boolean;
  expandedTips: string[];
}

const RULES_DATA: RuleStep[] = [
  {
    number: 1,
    phase: 'Persiapan & Flip',
    title: '8 Soal di Meja',
    description: 'Terdapat 8 soal yang tersedia di meja.',
    badge: 'Tersedia di Meja',
    icon: FileText,
    color: '#FFE600', // Yellow
    note: 'Siapkan konsentrasi sebelum memulai giliran!',
    expandedTips: [
      'Soal disusun acak di atas meja station utama dalam amplop tertutup.',
      'Setiap nomor soal terhubung dengan salah satu materi kebijakan fiskal APBN.',
      'Peserta dilarang membuka atau membolak-balik amplop sebelum berhasil melakukan flip botol.'
    ]
  },
  {
    number: 2,
    phase: 'Persiapan & Flip',
    title: 'Kesempatan Flip Botol',
    description: 'Setiap peserta mendapatkan kesempatan untuk melakukan flip botol.',
    badge: 'Giliran Pemain',
    icon: RotateCcw,
    color: '#00F0FF', // Cyan
    note: 'Lakukan flip dengan teknik terbaik agar botol mendarat tegak!',
    expandedTips: [
      'Gunakan teknik lemparan memutar 360 derajat di udara dengan ketinggian wajar.',
      'Flip botol dilakukan di area pelemparan yang telah ditentukan agar aman dan adil.',
      'Beri dukungan sportivitas pada setiap giliran teman sekelas.'
    ]
  },
  {
    number: 3,
    phase: 'Persiapan & Flip',
    title: 'Botol Berdiri = Ambil Soal',
    description: 'Jika botol berhasil berdiri, peserta berhak mengambil 1 soal yang tersedia.',
    badge: 'Reward Berhasil',
    icon: Trophy,
    color: '#A3E635', // Lime
    note: 'Hanya botol yang mendarat tegak sempurna yang berhak mengambil soal.',
    expandedTips: [
      'Botol harus berdiri tegak stabil tanpa terjatuh atau bersandar pada benda lain.',
      'Setelah dinyatakan sah oleh guru/rekan, ambil 1 lembar soal yang belum terambil.',
      'Jika botol terjatuh/gagal, antre kembali untuk kesempatan berikutnya sesuai giliran.'
    ]
  },
  {
    number: 4,
    phase: 'Pengerjaan Kasus',
    title: 'Baca & Kerjakan Kasus',
    description: 'Peserta membaca dan mengerjakan soal sesuai studi kasus yang telah disediakan.',
    badge: 'Analisis Masalah',
    icon: BookOpenCheck,
    color: '#FDE047', // Light Amber
    note: 'Pahami konteks studi kasus APBN dengan cermat.',
    expandedTips: [
      'Cocokkan nomor studi kasus pada soal dengan papan informasi studi kasus kelas.',
      'Analisis data fiskal, defisit, dan prioritas belanja pada teks kasus.',
      'Fokus menjawab inti pertanyaan kasus secara logis dan kritis.'
    ]
  },
  {
    number: 5,
    phase: 'Pengerjaan Kasus',
    title: 'Studi Kasus Tetap di Tempat',
    description: 'Studi kasus tidak boleh dibawa ke tempat pengerjaan. Peserta hanya boleh membacanya di tempat yang telah disediakan.',
    badge: '⚠️ Aturan Ketat',
    icon: MapPin,
    color: '#FF6B6B', // Coral Red
    highlight: true,
    note: 'Dilarang memindahkan lembar studi kasus dari area baca yang ditentukan!',
    expandedTips: [
      'Lembar studi kasus bersifat referensi bersama dan tetap berada di meja station khusus.',
      'Peserta diperbolehkan mencatat poin-poin penting di kertas buram saat berada di station baca.',
      'Kembali ke meja pengerjaan pribadi untuk menguraikan jawaban lengkap.'
    ]
  },
  {
    number: 6,
    phase: 'Pengerjaan Kasus',
    title: 'Tulis Jawaban di Kertas',
    description: 'Jawaban ditulis pada kertas yang telah disediakan.',
    badge: 'Lembar Jawaban',
    icon: FileEdit,
    color: '#C084FC', // Purple
    note: 'Tuliskan argumen dan solusi secara jelas, runut, dan rapi.',
    expandedTips: [
      'Tuliskan nama siswa/nomor urut dan nomor studi kasus di pojok kanan atas lembar jawaban.',
      'Gunakan struktur penulisan: Identifikasi Masalah → Analisis Dampak → Rekomendasi Solusi Fiskal.',
      'Pastikan tulisan terbaca jelas untuk sesi presentasi dan evaluasi.'
    ]
  },
  {
    number: 7,
    phase: 'Rotasi & Diskusi',
    title: 'Flip Ulang untuk Soal Baru',
    description: 'Setelah selesai mengerjakan, jika masih terdapat soal di meja, peserta boleh melakukan flip botol kembali untuk mendapatkan soal berikutnya.',
    badge: 'Putaran Lanjutan',
    icon: Repeat,
    color: '#38BDF8', // Sky Blue
    note: 'Selesaikan satu soal terlebih dahulu sebelum mencoba mengambil soal baru.',
    expandedTips: [
      'Serahkan atau letakkan jawaban soal pertama di tempat pengumpulan sebelum flip lagi.',
      'Flip botol ulang berlaku jika kuota 8 soal belum habis diambil.',
      'Maksimal perolehan soal per siswa disesuaikan dengan panduan guru pembimbing.'
    ]
  },
  {
    number: 8,
    phase: 'Rotasi & Diskusi',
    title: 'Batas Waktu & Stok Soal',
    description: 'Permainan berlanjut hingga seluruh soal selesai diambil atau waktu yang ditentukan berakhir.',
    badge: 'Kondisi Akhir',
    icon: Timer,
    color: '#FB923C', // Orange
    note: 'Manfaatkan sisa waktu pengerjaan secara optimal.',
    expandedTips: [
      'Perhatikan stopwatch atau timer countdown kelas yang dipasang di layar depan.',
      'Apabila waktu tuntas, seluruh aktivitas flip dan penulisan dihentikan secara serentak.',
      'Semua kertas pengerjaan dirapikan di meja masing-masing peserta.'
    ]
  },
  {
    number: 9,
    phase: 'Rotasi & Diskusi',
    title: 'Diskusi & Pembahasan Bersama',
    description: 'Setelah permainan selesai, seluruh peserta akan membahas dan mendiskusikan jawaban bersama-sama.',
    badge: 'Sesi Pleno',
    icon: Users,
    color: '#34D399', // Emerald
    note: 'Saling bertukar pandangan dan evaluasi pemecahan masalah fiskal.',
    expandedTips: [
      'Siswa terpilih atau sukarelawan memaparkan argumen solusi atas soal yang diperoleh.',
      'Seluruh peserta dapat memberikan tanggapan, sanggahan santun, atau ide pelengkap.',
      'Guru merangkum poin esensial kebijakan fiskal APBN 2026 sebagai kesimpulan bersama.'
    ]
  },
];

export const TataCaraBermain: React.FC = () => {
  const [filterPhase, setFilterPhase] = useState<string>('ALL');
  const [activeModalStep, setActiveModalStep] = useState<RuleStep | null>(null);

  const phases = ['ALL', 'Persiapan & Flip', 'Pengerjaan Kasus', 'Rotasi & Diskusi'];

  const displayedRules = filterPhase === 'ALL'
    ? RULES_DATA
    : RULES_DATA.filter((r) => r.phase === filterPhase);

  const handleOpenStepModal = (step: RuleStep) => {
    sound.playClick();
    setActiveModalStep(step);
  };

  const handleCloseStepModal = () => {
    sound.playClick();
    setActiveModalStep(null);
  };

  return (
    <section id="tata-cara-bermain" className="w-full py-14 border-t-4 border-black bg-[#FFFBEB] relative overflow-hidden">
      
      {/* Decorative Background Grid Pattern */}
      <div className="absolute inset-0 bg-neo-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Lazy Pop-In */}
        <AnimatedReveal animation="pop-in" duration={450} threshold={0.15}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono font-black text-xs uppercase tracking-wider mb-3 animate-float-badge">
                <Sparkles className="w-4 h-4 text-black" />
                <span>PANDUAN & ATURAN PERMAINAN</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono uppercase text-black tracking-tight flex items-center gap-3">
                <span>TATA CARA BERMAIN</span>
              </h2>
              
              <p className="text-sm sm:text-base text-black/80 font-bold max-w-2xl mt-2 leading-relaxed">
                Ikuti 9 alur utama permainan Bottle Flip dan pengerjaan studi kasus berikut. Klik pada kartu mana saja untuk melihat panduan detail & tips pengerjaan!
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-mono font-black text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black animate-ping"></span>
                <span>8 SOAL DI MEJA</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#A3E635] border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-mono font-black text-black animate-bounce-subtle">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>9 LANGKAH UTAMA</span>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* Phase Filter Tabs with Slide-In */}
        <AnimatedReveal animation="slide-up" delay={100} duration={400}>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 custom-scrollbar">
            <span className="text-xs font-mono font-black uppercase text-black/60 mr-1 hidden sm:inline">
              FILTER FASE:
            </span>
            {phases.map((phase) => {
              const isActive = filterPhase === phase;
              return (
                <button
                  key={phase}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setFilterPhase(phase);
                  }}
                  className={`px-4 py-2 text-xs font-mono font-black uppercase border-2 border-black whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-black text-white shadow-[4px_4px_0px_#FFE600] -translate-y-0.5'
                      : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] hover:-translate-y-0.5'
                  }`}
                >
                  {phase === 'ALL' ? '⚡ SEMUA TAHAPAN (1 - 9)' : phase}
                </button>
              );
            })}
          </div>
        </AnimatedReveal>

        {/* 9 Rules Grid with Staggered Multi-Animation Lazy Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRules.map((item, idx) => {
            const Icon = item.icon;
            // Alternate animation styles: pop-in, slide-up, flip for the strict rule card!
            const animType = item.highlight ? 'flip' : idx % 2 === 0 ? 'pop-in' : 'slide-up';
            const staggerDelay = (idx % 3) * 80;

            return (
              <AnimatedReveal
                key={item.number}
                animation={animType}
                delay={staggerDelay}
                duration={450}
                threshold={0.1}
                className="h-full"
              >
                <div
                  onClick={() => handleOpenStepModal(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenStepModal(item);
                    }
                  }}
                  className={`group relative flex flex-col justify-between h-full p-5 bg-white border-3 border-black shadow-[5px_5px_0px_#000] cursor-pointer transition-all duration-200 hover:-translate-y-2 hover:shadow-[9px_9px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 select-none ${
                    item.highlight ? 'ring-3 ring-[#FF6B6B]' : ''
                  }`}
                >
                  {/* Top Bar: Number badge & Phase Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Big Step Number Badge with hover tilt */}
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-12 h-12 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center font-mono font-black text-xl text-black group-hover:rotate-6 transition-transform"
                      >
                        {String(item.number).padStart(2, '0')}
                      </div>

                      {/* Phase / Rule Tag */}
                      <span
                        className={`text-[11px] font-mono font-black uppercase px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 ${
                          item.highlight ? 'bg-[#FF6B6B] text-white' : 'bg-gray-100 text-black group-hover:bg-[#FFE600]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-10 h-10 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform"
                      >
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="font-mono font-black text-lg text-black uppercase leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Main Description (The exact user point) */}
                    <div
                      className={`p-3.5 border-2 border-black mb-3 transition-colors ${
                        item.highlight ? 'bg-[#FFF1F2]' : 'bg-[#F9FAFB] group-hover:bg-amber-50/60'
                      }`}
                    >
                      <p className="text-sm font-bold text-black leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Tip & Click Prompt */}
                  <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-black/70 font-semibold italic truncate">
                      {item.highlight ? (
                        <AlertTriangle className="w-4 h-4 text-[#E11D48] shrink-0" />
                      ) : (
                        <Pin className="w-4 h-4 text-black/50 shrink-0" />
                      )}
                      <span className="truncate">{item.note}</span>
                    </div>

                    <span className="shrink-0 flex items-center gap-1 font-mono font-black text-[10px] uppercase text-black bg-[#FFE600] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>Buka</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* Highlight Banner: 3 Kunci Keberhasilan Bermain with Slide-Up */}
        <AnimatedReveal animation="slide-up" delay={200} duration={500}>
          <div className="mt-12 p-6 bg-white border-4 border-black shadow-[7px_7px_0px_#000]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center animate-bounce-subtle">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-mono font-black text-lg uppercase text-black">
                    3 PANDUAN PENTING SELAMA GAME BERLANGSUNG
                  </h4>
                  <p className="text-xs text-black/70 font-bold">
                    Perhatikan etika dan ketentuan teknis selama sesi aktivitas kelas
                  </p>
                </div>
              </div>
              <span className="self-start md:self-auto text-xs font-mono font-black px-3 py-1 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] animate-pulse-glow">
                ATURAN KELAS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FFFBEB] border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFE600] border border-black font-mono font-black text-xs flex items-center justify-center">1</span>
                  <span className="font-mono font-black text-xs uppercase text-black">Ketepatan Flip</span>
                </div>
                <p className="text-xs text-black/80 font-semibold leading-relaxed">
                  Botol harus mendarat tegak stabil untuk dinyatakan sah berhak mengambil 1 amplop/soal di meja.
                </p>
              </div>

              <div className="p-4 bg-[#FFF1F2] border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B6B] text-white border border-black font-mono font-black text-xs flex items-center justify-center">2</span>
                  <span className="font-mono font-black text-xs uppercase text-black">Zonasi Baca Kasus</span>
                </div>
                <p className="text-xs text-black/80 font-semibold leading-relaxed">
                  Lembar studi kasus tidak boleh dipindahkan ke meja peserta. Membaca hanya di station yang disediakan.
                </p>
              </div>

              <div className="p-4 bg-[#ECFDF5] border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#34D399] border border-black font-mono font-black text-xs flex items-center justify-center">3</span>
                  <span className="font-mono font-black text-xs uppercase text-black">Diskusi & Evaluasi</span>
                </div>
                <p className="text-xs text-black/80 font-semibold leading-relaxed">
                  Setelah semua soal terjawab atau waktu tuntas, seluruh kelas membedah jawaban secara komprehensif.
                </p>
              </div>
            </div>
          </div>
        </AnimatedReveal>

      </div>

      {/* POP-UP DETAIL MODAL FOR STEP CLICK */}
      {activeModalStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FFFDF5] border-4 border-black shadow-[10px_10px_0px_#000] p-6 sm:p-7 text-left overflow-hidden animate-pop-modal">
            
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleCloseStepModal}
              className="absolute top-4 right-4 p-2 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{ backgroundColor: activeModalStep.color }}
                className="w-14 h-14 border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center font-mono font-black text-2xl text-black shrink-0"
              >
                {String(activeModalStep.number).padStart(2, '0')}
              </div>
              <div>
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 bg-black text-[#FFE600] inline-block mb-1">
                  {activeModalStep.phase}
                </span>
                <h3 className="font-mono font-black text-xl sm:text-2xl text-black uppercase leading-tight">
                  {activeModalStep.title}
                </h3>
              </div>
            </div>

            {/* Primary Step Description */}
            <div
              className={`p-4 border-3 border-black mb-5 shadow-[3px_3px_0px_#000] ${
                activeModalStep.highlight ? 'bg-[#FFF1F2]' : 'bg-[#FFFBEB]'
              }`}
            >
              <div className="text-xs font-mono font-black uppercase text-black/60 mb-1">
                Ketetapan Aturan:
              </div>
              <p className="text-base font-black text-black leading-relaxed font-sans">
                {activeModalStep.description}
              </p>
            </div>

            {/* Expanded Tips & Details */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 font-mono font-black text-xs uppercase text-black">
                <Lightbulb className="w-4 h-4 text-[#FFE600]" />
                <span>Tips & Panduan Teknis di Kelas:</span>
              </div>
              <ul className="space-y-2">
                {activeModalStep.expandedTips.map((tip, tipIdx) => (
                  <li
                    key={`tip-${tipIdx}`}
                    className="flex items-start gap-2.5 p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-semibold text-black/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Close action */}
            <button
              type="button"
              onClick={handleCloseStepModal}
              className="w-full py-3.5 bg-[#FFE600] hover:bg-[#FFF066] text-black font-mono font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              MENGERTI & KEMBALI KE GAME
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
