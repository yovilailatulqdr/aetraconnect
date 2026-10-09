import React, { useState, useRef } from 'react';
import { Upload, X, FileSpreadsheet, ClipboardPaste, Check, AlertCircle } from 'lucide-react';
import { parseExcelFile, parseCsvText } from '../utils/excelParser';
import { WorkbookData } from '../types/excel';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkbookLoaded: (wb: WorkbookData) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onWorkbookLoaded }) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase();

      if (!['xlsx', 'xls', 'csv'].includes(extension || '')) {
        throw new Error('Format file tidak didukung. Harap unggah file dengan format .xlsx, .xls, atau .csv');
      }

      const buffer = await file.arrayBuffer();
      const workbook = parseExcelFile(buffer, fileName, file.size);

      if (workbook.sheetNames.length === 0 || !workbook.sheets[workbook.activeSheetName]) {
        throw new Error('File tidak memiliki sheet data yang valid atau kosong.');
      }

      onWorkbookLoaded(workbook);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal membaca file Excel.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePasteSubmit = () => {
    setErrorMsg(null);
    if (!pasteText.trim()) {
      setErrorMsg('Teks CSV / TSV tidak boleh kosong.');
      return;
    }
    setIsProcessing(true);
    try {
      const workbook = parseCsvText(pasteText.trim(), 'Data_Tempelan_Manual.csv');
      if (workbook.sheetNames.length === 0 || workbook.sheets[workbook.activeSheetName]?.rows.length === 0) {
        throw new Error('Gagal mengekstrak data tabular dari teks yang ditempelkan.');
      }
      onWorkbookLoaded(workbook);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memproses data CSV.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">Unggah File Excel Anda</h2>
              <p className="text-xs text-neutral-400">
                Mendukung file .xlsx, .xls, .csv, atau tempel data langsung
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Mode */}
        <div className="flex border-b border-neutral-800 px-6 pt-2 bg-neutral-950/40">
          <button
            onClick={() => { setActiveMode('upload'); setErrorMsg(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeMode === 'upload'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Unggah File (.xlsx / .xls / .csv)
          </button>
          <button
            onClick={() => { setActiveMode('paste'); setErrorMsg(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeMode === 'paste'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ClipboardPaste className="h-4 w-4" />
            Tempel CSV / TSV Teks
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeMode === 'upload' ? (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : 'border-neutral-700 bg-neutral-950/60 hover:border-neutral-500 hover:bg-neutral-950/80'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />
                <div className="p-3 rounded-full bg-neutral-800 text-emerald-400 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-neutral-200 text-center mb-1">
                  {isProcessing ? 'Sedang Membaca & Membedah Data...' : 'Klik untuk Memilih File atau Tarik ke Sini'}
                </p>
                <p className="text-xs text-neutral-400 text-center">
                  Mendukung Microsoft Excel (.xlsx, .xls) dan Comma-Separated Values (.csv) hingga puluhan ribu baris
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Parsing instan di peramban</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Kerahasiaan aman</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-neutral-300">
                Tempelkan teks tabel atau CSV yang disalin dari Excel / Google Sheets:
              </label>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Tanggal,Produk,Wilayah,Pendapatan,Biaya&#10;2026-01-01,Laptop,Jakarta,15000000,11000000&#10;2026-01-02,Mouse,Bandung,250000,120000"
                rows={7}
                className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-3 text-xs font-mono text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handlePasteSubmit}
                disabled={isProcessing || !pasteText.trim()}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <ClipboardPaste className="h-4 w-4" />
                <span>{isProcessing ? 'Memproses Data...' : 'Proses & Buat Dashboard Otomatis'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
