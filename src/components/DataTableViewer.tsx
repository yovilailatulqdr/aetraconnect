import React, { useState, useMemo } from 'react';
import { SheetData } from '../types/excel';
import { Search, Download, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DataTableViewerProps {
  sheet: SheetData;
}

export const DataTableViewer: React.FC<DataTableViewerProps> = ({ sheet }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const { headers, rows } = sheet;

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter((r) =>
      headers.some((h) => {
        const val = r[h];
        return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
      })
    );
  }, [rows, headers, searchTerm]);

  // Sorted rows
  const sortedRows = useMemo(() => {
    if (!sortCol) return filteredRows;
    const sorted = [...filteredRows].sort((a, b) => {
      const valA = a[sortCol];
      const valB = b[sortCol];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return sorted;
  }, [filteredRows, sortCol, sortAsc]);

  const totalPages = Math.ceil(sortedRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, currentPage, pageSize]);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const handleExportCsv = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    XLSX.writeFile(wb, `${sheet.sheetName}_Export.xlsx`);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 overflow-hidden space-y-4">
      {/* Controls header */}
      <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950/40">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari dalam semua kolom..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-neutral-400 font-mono">
            {sortedRows.length} dari {rows.length} baris
          </div>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors border border-neutral-700"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Ekspor Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-neutral-950 text-neutral-300 font-mono border-b border-neutral-800">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center text-neutral-600 font-normal">#</th>
              {headers.map((h) => {
                const isSorted = sortCol === h;
                const isNumeric = sheet.numericColumns.includes(h);

                return (
                  <th
                    key={h}
                    onClick={() => handleSort(h)}
                    className={`py-2.5 px-3 cursor-pointer select-none hover:bg-neutral-800/80 transition-colors whitespace-nowrap ${
                      isNumeric ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className={`flex items-center gap-1.5 ${isNumeric ? 'justify-end' : 'justify-start'}`}>
                      <span className="font-semibold text-neutral-200">{h}</span>
                      <ArrowUpDown
                        className={`h-3 w-3 ${isSorted ? 'text-emerald-400' : 'text-neutral-600'}`}
                      />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/50 text-neutral-300 font-sans">
            {paginatedRows.map((row, rIdx) => {
              const rowIndex = (currentPage - 1) * pageSize + rIdx + 1;
              return (
                <tr key={rIdx} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-center text-neutral-600 font-mono text-[11px]">
                    {rowIndex}
                  </td>
                  {headers.map((h) => {
                    const val = row[h];
                    const isNumeric = sheet.numericColumns.includes(h);
                    return (
                      <td
                        key={h}
                        className={`py-2.5 px-3 whitespace-nowrap ${
                          isNumeric ? 'text-right font-mono tabular-nums text-neutral-200' : 'text-neutral-300'
                        }`}
                      >
                        {val !== null && val !== undefined ? String(val) : <span className="text-neutral-600 italic">null</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/40">
        <div>
          Halaman <strong className="text-neutral-200">{currentPage}</strong> dari{' '}
          <strong className="text-neutral-200">{totalPages}</strong>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
