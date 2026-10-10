import React from 'react';
import { DashboardBlueprint, SheetData } from '../types/excel';
import { Target, Compass, Sparkles, Copy, Check, ArrowRight, Layers, FileCode } from 'lucide-react';

interface DashboardBlueprintViewProps {
  sheet: SheetData;
  blueprints: DashboardBlueprint[];
  keyQuestions: string[];
  suggestedFormulas: Array<{ name: string; formula: string; explanation: string }>;
  onOpenAiAdvisor: () => void;
}

export const DashboardBlueprintView: React.FC<DashboardBlueprintViewProps> = ({
  sheet,
  blueprints,
  keyQuestions,
  suggestedFormulas,
  onOpenAiAdvisor,
}) => {
  const [copiedFormula, setCopiedFormula] = React.useState<string | null>(null);

  const handleCopy = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner explaining the analysis capability */}
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Compass className="h-4 w-4" />
            <span>Kajian Potensi & Arsitektur Dashboard</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-100">
            Cetak Biru (Blueprint) Dashboard Terbaik untuk Data Ini
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Berdasarkan deteksi {sheet.numericColumns.length} kolom metrik kuantitatif dan{' '}
            {sheet.categoryColumns.length + sheet.dateColumns.length} dimensi filter pada sheet{' '}
            <strong className="text-neutral-100">"{sheet.sheetName}"</strong>, kami telah menyusun
            arsitektur dashboard berbasis peran (role-based) untuk efektivitas pengambilan keputusan.
          </p>
        </div>

        <button
          onClick={onOpenAiAdvisor}
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950"
        >
          <Sparkles className="h-4 w-4" />
          <span>Minta Rekomendasi AI Mendalam</span>
        </button>
      </div>

      {/* Role-Based Dashboard Blueprints */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
            Pilihan Model Dashboard Berdasarkan Sasaran Pengguna
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((bp, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-4">
                <div className="border-b border-neutral-800 pb-3">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1">
                    TARGET: {bp.targetRole}
                  </div>
                  <h4 className="text-base font-bold text-neutral-100">{bp.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {bp.objective}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 font-medium">
                    Struktur Komposisi Rekomendasi
                  </span>
                  <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300 font-medium leading-relaxed">
                    {bp.recommendedLayout}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 font-medium">
                    Visualisasi Kunci yang Harus Ada
                  </span>
                  <div className="space-y-2">
                    {bp.visualizationsSuggested.map((viz, vIdx) => (
                      <div
                        key={vIdx}
                        className="p-2.5 rounded-lg border border-neutral-800/80 bg-neutral-950/40 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200">
                            {viz.title}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {viz.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {viz.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Formulas & DAX Calculations */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-neutral-200">
              Formula Metrik Turunan (Calculated KPI / DAX / Excel)
            </h3>
          </div>
          <span className="text-xs text-neutral-500">
            Dapat langsung disalin ke Excel atau Power BI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedFormulas.map((f, i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-950/70 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-neutral-200 block">
                  {f.name}
                </span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {f.explanation}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between bg-neutral-900 p-2 rounded border border-neutral-800">
                <code className="text-xs font-mono text-emerald-400 truncate pr-2" title={f.formula}>
                  {f.formula}
                </code>
                <button
                  onClick={() => handleCopy(f.formula)}
                  className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                  title="Salin formula"
                >
                  {copiedFormula === f.formula ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Business Questions Answered */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-neutral-200">
            Pertanyaan Kunci Bisnis yang Dapat Dijawab Oleh Dashboard Ini
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyQuestions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg border border-neutral-800/80 bg-neutral-950/40"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono">
                {idx + 1}
              </div>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
