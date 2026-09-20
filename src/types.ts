export interface Student {
  id: number; // 1 to 36
  numberStr: string; // "01" to "36"
  name: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: number; // 1 to 5
  title: string;
  category: string;
  badgeColor: string;
  content: string; // Teks studi kasus inti dari pengguna
  metrics: MetricItem[]; // 3 poin data ringkas
  discussionPoint: string; // 1 fokus pertanyaan diskusi
}

export interface SelectedHistoryItem {
  round: number;
  student: Student;
  timestamp: string;
}

export type SelectorFlipState = 'idle' | 'flipping' | 'landed' | 'complete';

