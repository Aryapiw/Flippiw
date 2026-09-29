import React, { useState } from 'react';
import { MonitorPlay, Sparkles, TrendingUp, Info } from 'lucide-react';
import { CaseStudy } from '../types';
import { sound } from '../utils/audio';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onOpenPresentation: (caseId: number) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  onOpenPresentation,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`case-study-${caseStudy.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0px_#000]"
    >
      {/* Top Banner with Category & Case ID */}
      <div
        className="p-4 border-b-3 border-black flex items-center justify-between flex-wrap gap-2 transition-colors"
        style={{ backgroundColor: caseStudy.badgeColor }}
      >
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black text-white font-mono font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#FFF]">
            STUDI KASUS #{caseStudy.id}
          </span>
          <span className="text-xs font-mono font-black uppercase text-black">
            {caseStudy.category}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenPresentation(caseStudy.id);
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-black hover:text-white text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 hover:scale-105 transition-all"
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          <span>SLIDE PROYEKTOR</span>
        </button>
      </div>

      {/* Main Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black font-mono text-black leading-tight mb-4">
            {caseStudy.title}
          </h3>

          {/* 3 Metric Badges with Interactive Hover Pop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            {caseStudy.metrics.map((metric, idx) => (
              <div
                key={`metric-${idx}`}
                className="bg-[#FFFDF5] border-2 border-black p-2.5 shadow-[2px_2px_0px_#000] transition-all hover:bg-[#FFE600] hover:-translate-y-0.5"
              >
                <div className="text-[10px] font-mono font-black uppercase text-black/60">
                  {metric.label}
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-black my-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Core Case Study Text */}
          <div className="bg-[#FFFDF5] border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
            <span className="text-[11px] font-mono font-black uppercase text-black/80 block mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Kasus APBN 2026</span>
            </span>
            <p className="text-sm text-black leading-relaxed font-semibold">
              {caseStudy.content}
            </p>
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-black/60 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Analisis Kebijakan</span>
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenPresentation(caseStudy.id);
            }}
            className="text-xs font-mono font-black uppercase underline hover:text-blue-600 flex items-center gap-1 transition-all hover:translate-x-1"
          >
            Tampilkan di Layar Penuh →
          </button>
        </div>
      </div>
    </div>
  );
};
