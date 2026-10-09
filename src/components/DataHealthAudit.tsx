import React from 'react';
import { SheetData } from '../types/excel';
import { ShieldCheck, AlertTriangle, Hash, Calendar, Tag, CheckCircle2 } from 'lucide-react';

interface DataHealthAuditProps {
  sheet: SheetData;
}

export const DataHealthAudit: React.FC<DataHealthAuditProps> = ({ sheet }) => {
  const { headers, columnsProfile, totalRows } = sheet;

  // Calculate overall data completeness
  let totalCells = totalRows * headers.length;
  let totalNulls = 0;
  Object.values(columnsProfile).forEach((p) => {
    totalNulls += p.nullCount;
  });
  const completeness = totalCells > 0 ? Math.round(((totalCells - totalNulls) / totalCells) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Tingkat Kelengkapan Data</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
            {completeness}%
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {totalNulls === 0 ? 'Tidak ada sel kosong (Pristine)' : `${totalNulls} sel kosong dari total ${totalCells} sel`}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Dimensi & Metrik Siap Analisis</span>
            <Tag className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
            {sheet.numericColumns.length} Metrik · {sheet.categoryColumns.length} Kategori
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {sheet.dateColumns.length > 0 ? `Termasuk ${sheet.dateColumns.length} kolom tanggal time-series` : 'Tanpa kolom tanggal otomatis'}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Total Catatan Baris</span>
            <Hash className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
            {totalRows.toLocaleString('id-ID')} Baris
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Rentang dataset memadai untuk visualisasi agregasi
          </p>
        </div>
      </div>

      {/* Column Schema Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 overflow-hidden">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-neutral-200">
              Audit Profil Kolom & Tipe Data
            </h3>
            <span className="text-xs text-neutral-500">
              ({headers.length} Kolom Terdeteksi)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/60 text-neutral-400 font-mono border-b border-neutral-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Nama Kolom</th>
                <th className="py-2.5 px-4 font-medium">Tipe Data</th>
                <th className="py-2.5 px-4 font-medium">Kelengkapan</th>
                <th className="py-2.5 px-4 font-medium">Nilai Unik</th>
                <th className="py-2.5 px-4 font-medium">Peran BI yang Disarankan</th>
                <th className="py-2.5 px-4 font-medium text-right">Ringkasan Statistik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {headers.map((col) => {
                const prof = columnsProfile[col];
                if (!prof) return null;

                const isNullHigh = prof.nullPercentage > 20;

                return (
                  <tr key={col} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-neutral-100">
                      {col}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className="text-neutral-300 font-medium uppercase text-[11px]">
                        {prof.type}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className={isNullHigh ? 'text-amber-400 font-bold' : 'text-neutral-300'}>
                          {100 - prof.nullPercentage}%
                        </span>
                        {isNullHigh && (
                          <span title="Ada sel kosong > 20%">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums text-neutral-400">
                      {prof.uniqueCount} unik
                    </td>

                    <td className="py-3 px-4">
                      {prof.isPotentialMeasure ? (
                        <span className="text-emerald-400 font-medium">
                          Metrik Kuantitatif (Y-Axis / Ukuran)
                        </span>
                      ) : prof.isDateDimension ? (
                        <span className="text-cyan-400 font-medium">
                          Dimensi Waktu (Timeline / Tren)
                        </span>
                      ) : prof.isPotentialDimension ? (
                        <span className="text-violet-400 font-medium">
                          Dimensi Kategori (X-Axis / Slice)
                        </span>
                      ) : prof.isPotentialId ? (
                        <span className="text-neutral-500 font-medium">
                          Identifier Unik (ID Baris)
                        </span>
                      ) : (
                        <span className="text-neutral-400">Teks Bebas</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums text-[11px] text-neutral-400">
                      {prof.type === 'number' && prof.avg !== undefined ? (
                        <span>
                          Rerata: <strong className="text-neutral-200">{prof.avg.toLocaleString('id-ID')}</strong> · Min: {prof.min} · Max: {prof.max}
                        </span>
                      ) : prof.type === 'date' ? (
                        <span>{prof.minDate} s/d {prof.maxDate}</span>
                      ) : prof.topValues && prof.topValues.length > 0 ? (
                        <span>Top: {prof.topValues[0].value} ({prof.topValues[0].percentage}%)</span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
