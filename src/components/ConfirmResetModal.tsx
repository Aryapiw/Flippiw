import React from 'react';
import { AlertTriangle, RotateCcw, X, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface ConfirmResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    sound.playBottleLanding();
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#FFFDF5] border-4 border-black shadow-[10px_10px_0px_#000] p-6 text-center overflow-hidden">
        {/* Top Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 p-1.5 bg-white hover:bg-black hover:text-white border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
          title="Batal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-14 h-14 mx-auto mb-4 bg-[#FF6B9D] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transform -rotate-3">
          <RotateCcw className="w-7 h-7 text-black" />
        </div>

        {/* Heading */}
        <h3 className="text-xl sm:text-2xl font-black font-mono uppercase text-black mb-2">
          RESET HASIL PEMILIHAN?
        </h3>

        <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed mb-4">
          {selectedCount > 0 ? (
            <>
              Saat ini ada <strong className="font-black font-mono text-black underline">{selectedCount} siswa terpilih</strong> untuk studi kasus. Apakah Anda yakin ingin menghapus semua hasil dan memulai dari ronde 1 kembali?
            </>
          ) : (
            <>
              Posisi botol flip dan riwayat pemilihan akan direset ke kondisi awal.
            </>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t-2 border-black">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-mono font-black uppercase bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            BATAL
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-mono font-black uppercase bg-[#FF6B9D] hover:bg-[#ff85af] text-black border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>YA, RESET (0/5)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
