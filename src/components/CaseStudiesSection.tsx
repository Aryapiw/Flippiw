import React, { useState } from 'react';
import { BookOpen, MonitorPlay, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CaseStudy, SelectedHistoryItem } from '../types';
import { CaseStudyCard } from './CaseStudyCard';
import { sound } from '../utils/audio';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  selectedList: SelectedHistoryItem[];
  onOpenPresentation: (caseId: number) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  selectedList,
  onOpenPresentation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(caseStudies.map((c) => c.category)))];

  const filteredCases = selectedCategory === 'ALL'
    ? caseStudies
    : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <section id="studi-kasus" className="w-full py-12 border-t-4 border-black bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-mono font-black text-xs uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>MATERI PRESENTASI & ANALISIS KELAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-mono uppercase text-black">
              5 STUDI KASUS APBN 2026
            </h2>
            <p className="text-sm text-black/70 font-medium max-w-xl mt-1">
              Topik kebijakan fiskal strategis yang akan dipaparkan dan diperdebatkan oleh 5 siswa terpilih dari bottle flip challenge.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenPresentation(1);
            }}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 bg-[#FFE600] hover:bg-[#FFF066] text-black font-mono font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <MonitorPlay className="w-5 h-5" />
            <span>MULAI PRESENTASI SLIDE (1 - 5)</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
          <span className="text-xs font-mono font-black uppercase text-black/60 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-[2px_2px_0px_#FFE600]'
                  : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {cat === 'ALL' ? 'SEMUA KASUS (5)' : cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((cs) => {
            return (
              <CaseStudyCard
                key={cs.id}
                caseStudy={cs}
                onOpenPresentation={onOpenPresentation}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
