import React from 'react';
import { FileSpreadsheet, Upload, Sparkles, Database, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'blueprint' | 'audit' | 'table' | 'ai' | 'builder';
  onTabChange: (tab: 'dashboard' | 'blueprint' | 'audit' | 'table' | 'ai' | 'builder') => void;
  fileName: string;
  sheetNames: string[];
  activeSheet: string;
  onSheetChange: (sheet: string) => void;
  onOpenUpload: () => void;
  onOpenSampleSelector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  fileName,
  sheetNames,
  activeSheet,
  onSheetChange,
  onOpenUpload,
  onOpenSampleSelector,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-neutral-100">
              SheetVision Studio
            </span>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="truncate max-w-[140px] sm:max-w-[220px]" title={fileName}>
                {fileName}
              </span>
              {sheetNames.length > 1 && (
                <>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <div className="flex items-center gap-1">
                    <Layers className="h-3 w-3 text-neutral-500" />
                    <select
                      value={activeSheet}
                      onChange={(e) => onSheetChange(e.target.value)}
                      className="rounded bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
                    >
                      {sheetNames.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Segmented Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Dashboard Utama
          </button>
          <button
            onClick={() => onTabChange('blueprint')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'blueprint'
                ? 'bg-neutral-800 text-emerald-300 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Potensi & Blueprint BI
          </button>
          <button
            onClick={() => onTabChange('builder')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'builder'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Studio Kustom
          </button>
          <button
            onClick={() => onTabChange('audit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'audit'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Audit Kualitas Data
          </button>
          <button
            onClick={() => onTabChange('table')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'table'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Data Mentah
          </button>
          <button
            onClick={() => onTabChange('ai')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              currentTab === 'ai'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Konsultan AI</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSampleSelector}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
            title="Muat contoh dataset realistis"
          >
            <Database className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Pilih Contoh Data</span>
            <span className="sm:hidden">Contoh</span>
          </button>
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap font-semibold shadow-sm"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Unggah Excel</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex overflow-x-auto border-t border-neutral-800 bg-neutral-900/70 px-2 py-1 gap-1">
        {(
          [
            ['dashboard', 'Dashboard'],
            ['blueprint', 'Potensi BI'],
            ['builder', 'Kustom'],
            ['audit', 'Audit Data'],
            ['table', 'Tabel'],
            ['ai', 'AI Insight'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`px-3 py-1 text-xs rounded whitespace-nowrap font-medium ${
              currentTab === key
                ? 'bg-neutral-800 text-emerald-300'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
};
