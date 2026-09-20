import React from 'react';
import { HelpCircle, Award, Target, Flame, Users, CheckSquare } from 'lucide-react';

export const RulesSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Lontarkan Bottle Flip di Proyektor',
      desc: 'Guru atau moderator menekan tombol "FLIP BOTOL SEKARANG!". Botol akan melayang dan berputar di udara dengan simulasi fisika parabolik hingga mendarat tegak di salah satu nomor siswa yang tersedia.',
      color: '#FFE600',
    },
    {
      num: '02',
      title: 'Pemilihan 5 Siswa Terpilih',
      desc: 'Tiap ronde penarikan memilih 1 siswa secara acak dan adil hingga terkumpul 5 siswa terpilih. Siswa yang sudah terpilih tidak akan terpilih ulang dalam putaran yang sama.',
      color: '#00F0FF',
    },
    {
      num: '03',
      title: 'Pemaparan Solusi & Pilihan Kebijakan',
      desc: 'Siswa terpilih maju ke depan kelas atau membuka Mode Slide Proyektor untuk menganalisis latar belakang masalah, membedah pro-kontra opsi kebijakan fiskal, dan merekomendasikan solusi terbaik.',
      color: '#A3E635',
    },
    {
      num: '04',
      title: 'Debat & Tanya Jawab Interaktif',
      desc: 'Audiens kelas dapat mengajukan sanggahan atau pertanyaan kritis sesuai daftar poin diskusi yang tertera di tiap studi kasus untuk menguji ketajaman analisa pemateri.',
      color: '#FF6B9D',
    },
  ];

  return (
    <section id="aturan" className="w-full py-12 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#A3E635] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono font-black text-xs uppercase tracking-wider mb-2">
            <CheckSquare className="w-4 h-4" />
            <span>PANDUAN PEMBELAJARAN KELAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-mono uppercase text-black">
            CARA MAIN & ATURAN PRESENTASI
          </h2>
          <p className="text-sm sm:text-base text-black/70 font-medium mt-2">
            Flip Challenge dirancang agar suasana belajar ekonomi makro dan APBN menjadi aktif, menegangkan, dan adil bagi seluruh siswa kelas.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#FFFDF5] border-3 border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-10 h-10 border-2 border-black flex items-center justify-center font-mono font-black text-sm mb-3 shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-black font-mono text-black uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-black/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment Rubric Banner */}
        <div className="bg-[#FFFDF5] border-3 border-black p-6 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-black" />
            <h4 className="text-sm font-mono font-black uppercase text-black">
              RUBRIK PENILAIAN PRESENTASI SISWA TERPILIH:
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-white border-2 border-black">
              <span className="font-mono font-black block text-black mb-1">1. Penguasaan Data (35%)</span>
              <p className="text-black/70">Mampu mengaitkan angka pagu APBN 2026, indikator fiskal, dan dampaknya ke masyarakat.</p>
            </div>
            <div className="p-3 bg-white border-2 border-black">
              <span className="font-mono font-black block text-black mb-1">2. Ketajaman Analisis Opsi (35%)</span>
              <p className="text-black/70">Menimbang pro dan kontra dari kebijakan alternatif secara objektif dan realistis.</p>
            </div>
            <div className="p-3 bg-white border-2 border-black">
              <span className="font-mono font-black block text-black mb-1">3. Keberanian Menjawab Tanya Jawab (30%)</span>
              <p className="text-black/70">Kesiapan merespon pertanyaan audiens kelas dengan argumentasi logis dan santun.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
