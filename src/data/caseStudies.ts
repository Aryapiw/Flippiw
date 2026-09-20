import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: 'Studi Kasus 1 — APBN 2026',
    category: 'Kinerja Fiskal',
    badgeColor: '#FFE600',
    content:
      'Pada Semester I 2026, APBN digunakan untuk mendorong pertumbuhan ekonomi, menjaga daya beli masyarakat, dan mendukung program pembangunan nasional. Pendapatan negara mencapai Rp1.459,4 triliun, sedangkan belanja negara mencapai Rp1.656 triliun, sehingga terjadi defisit Rp196,5 triliun atau 0,76% PDB. Pemerintah tetap menjaga defisit agar terkendali di tengah ketidakpastian ekonomi global.',
    metrics: [
      { label: 'Pendapatan Negara', value: 'Rp 1.459,4 T' },
      { label: 'Belanja Negara', value: 'Rp 1.656,0 T' },
      { label: 'Defisit APBN', value: 'Rp 196,5 T (0,76% PDB)' },
    ],
    discussionPoint:
      'Bagaimana menjaga defisit anggaran tetap terkendali sembari memastikan belanja negara efektif menopang daya beli masyarakat?',
  },
  {
    id: 2,
    title: 'Studi Kasus 2 — Subsidi BBM 2026',
    category: 'Subsidi Energi',
    badgeColor: '#00F0FF',
    content:
      'Pemerintah memastikan harga BBM bersubsidi tidak naik hingga akhir 2026. Kebijakan ini didukung anggaran yang cukup serta SAL (sisa anggaran lebih) sebesar Rp420 triliun sebagai cadangan jika harga minyak dunia meningkat. Pemerintah juga mempercepat belanja negara untuk menjaga pertumbuhan ekonomi tetap stabil dan merata.',
    metrics: [
      { label: 'Harga BBM', value: 'Tetap / Tidak Naik' },
      { label: 'Cadangan SAL', value: 'Rp 420,0 T' },
      { label: 'Akselerasi Belanja', value: 'Stabil & Merata' },
    ],
    discussionPoint:
      'Bagaimana mengelola cadangan SAL Rp420 triliun agar subsidi BBM tepat sasaran dan tidak tergerus jika harga minyak dunia naik?',
  },
  {
    id: 3,
    title: 'Studi Kasus 3 — Pemisahan Anggaran MBG dan Pendidikan',
    category: 'Anggaran Pendidikan',
    badgeColor: '#A3E635',
    content:
      'Mahkamah Konstitusi memutuskan bahwa anggaran Makan Bergizi Gratis (MBG) harus dipisahkan dari anggaran pendidikan paling lambat pada APBN 2028. Anggaran pendidikan tetap harus memenuhi minimal 20% dari APBN dan APBD untuk kebutuhan utama seperti guru, peserta didik, sarana-prasarana, dan kurikulum. Program MBG tetap dapat berjalan, tetapi harus memiliki alokasi anggaran tersendiri.',
    metrics: [
      { label: 'Mandatori Pendidikan', value: 'Minimal 20%' },
      { label: 'Batas Pemisahan', value: 'APBN 2028' },
      { label: 'Alokasi MBG', value: 'Pos Anggaran Khusus' },
    ],
    discussionPoint:
      'Bagaimana skema terbaik memisahkan pos anggaran MBG tanpa mengurangi hak kesejahteraan guru dan fasilitas belajar siswa?',
  },
  {
    id: 4,
    title: 'Studi Kasus 4 — Efisiensi Anggaran BMKG',
    category: 'Layanan Publik',
    badgeColor: '#FF6B9D',
    content:
      'BMKG tetap menjalankan APBN 2026 sesuai target meskipun terdapat efisiensi anggaran pemerintah. Anggaran difokuskan pada layanan cuaca, iklim, gempa, pembangunan infrastruktur observasi, dan pemeliharaan alat. BMKG memastikan layanan peringatan dini tetap berjalan 24 jam tanpa mengurangi kualitas, sekaligus memperkuat antisipasi El Niño dan tata kelola keuangan.',
    metrics: [
      { label: 'Layanan Peringatan', value: '24 Jam Nonstop' },
      { label: 'Fokus Anggaran', value: 'Alat & Observasi' },
      { label: 'Mitigasi Iklim', value: 'Antisipasi El Niño' },
    ],
    discussionPoint:
      'Bagaimana strategi BMKG mempertahankan akurasi peringatan dini bencana 24 jam di tengah efisiensi operasional?',
  },
  {
    id: 5,
    title: 'Studi Kasus 5 — APBN untuk Menjaga Pertumbuhan Ekonomi',
    category: 'Pertumbuhan Makro',
    badgeColor: '#FFE600',
    content:
      'Pemerintah menggunakan APBN untuk menjaga pertumbuhan ekonomi tetap kuat. Pada Triwulan I 2026, ekonomi Indonesia tumbuh 5,61% dengan inflasi terkendali di 2,4%. Pemerintah mempercepat belanja negara hingga 31,4% untuk THR, bantuan pangan, dan subsidi agar daya beli masyarakat terjaga. Sementara itu, defisit anggaran tetap dijaga rendah di kisaran 0,93% PDB.',
    metrics: [
      { label: 'Pertumbuhan Q1', value: '5,61% (Inflasi 2,4%)' },
      { label: 'Akselerasi Belanja', value: '+31,4%' },
      { label: 'Defisit Q1', value: '0,93% PDB' },
    ],
    discussionPoint:
      'Bagaimana percepatan belanja seperti THR dan bantuan pangan mampu menggerakkan ekonomi riil secara berkelanjutan?',
  },
];
