import React from 'react';
import { Database, X, ArrowRight, Check } from 'lucide-react';
import { SAMPLE_DATASETS, SampleDatasetDefinition } from '../data/sampleDatasets';
import { WorkbookData } from '../types/excel';

interface DatasetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDatasetId?: string;
  onSelectDataset: (wb: WorkbookData, datasetId: string) => void;
}

export const DatasetSelectorModal: React.FC<DatasetSelectorModalProps> = ({
  isOpen,
  onClose,
  currentDatasetId,
  onSelectDataset,
}) => {
  if (!isOpen) return null;

  const handleSelect = (ds: SampleDatasetDefinition) => {
    const wb = ds.getWorkbook();
    onSelectDataset(wb, ds.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100">Pilih Contoh Dataset Realistis</h2>
              <p className="text-xs text-neutral-400">
                Uji coba langsung kemampuan analisis & dashboard tanpa perlu menyiapkan file
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

        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {SAMPLE_DATASETS.map((ds) => {
            const isSelected = currentDatasetId === ds.id;
            return (
              <div
                key={ds.id}
                onClick={() => handleSelect(ds)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-950/80'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                      {ds.name}
                    </span>
                    <span className="text-xs text-neutral-500">·</span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {ds.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {ds.description}
                  </p>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    File simulasi: {ds.fileName}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                      <Check className="h-3.5 w-3.5" />
                      Aktif
                    </span>
                  ) : (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 group-hover:bg-emerald-500 group-hover:text-neutral-950 text-xs font-semibold transition-colors">
                      <span>Buka</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
