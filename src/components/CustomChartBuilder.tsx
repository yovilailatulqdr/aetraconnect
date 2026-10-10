import React, { useState } from 'react';
import { SheetData, RecommendedChart } from '../types/excel';
import { ChartRenderer } from './InteractiveCharts';
import { BarChart3, PieChart, LineChart, Sliders, Plus, Check } from 'lucide-react';
import { cleanNumericValue } from '../utils/excelParser';

interface CustomChartBuilderProps {
  sheet: SheetData;
  onAddCustomChart?: (chart: RecommendedChart) => void;
}

export const CustomChartBuilder: React.FC<CustomChartBuilderProps> = ({ sheet, onAddCustomChart }) => {
  const { headers, rows, numericColumns, categoryColumns, dateColumns } = sheet;

  const defaultDim = categoryColumns[0] || dateColumns[0] || headers[0] || '';
  const defaultMeasure = numericColumns[0] || headers[1] || '';

  const [chartType, setChartType] = useState<'horizontal_bar' | 'donut' | 'area' | 'scatter'>('horizontal_bar');
  const [dimension, setDimension] = useState<string>(defaultDim);
  const [measure, setMeasure] = useState<string>(defaultMeasure);
  const [secondaryMeasure, setSecondaryMeasure] = useState<string>(numericColumns[1] || defaultMeasure);
  const [aggregation, setAggregation] = useState<'sum' | 'avg' | 'count'>('sum');
  const [chartTitle, setChartTitle] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  // Compute aggregated data
  const chartData = React.useMemo(() => {
    if (!dimension) return [];

    if (chartType === 'scatter') {
      return rows.slice(0, 25).map((r, i) => ({
        label: String(r[dimension] || `Item ${i + 1}`),
        value: cleanNumericValue(r[measure]) || 0,
        secondaryValue: cleanNumericValue(r[secondaryMeasure]) || 0,
      }));
    }

    const groups: Record<string, { sum: number; count: number }> = {};
    for (const r of rows) {
      const key = String(r[dimension] ?? 'Lainnya');
      const val = cleanNumericValue(r[measure]) || 0;
      if (!groups[key]) groups[key] = { sum: 0, count: 0 };
      groups[key].sum += val;
      groups[key].count += 1;
    }

    let items = Object.entries(groups).map(([label, stat]) => {
      let finalVal = stat.sum;
      if (aggregation === 'avg') finalVal = stat.count > 0 ? stat.sum / stat.count : 0;
      if (aggregation === 'count') finalVal = stat.count;
      return {
        label,
        value: Math.round(finalVal * 10) / 10,
      };
    });

    if (chartType !== 'area') {
      items.sort((a, b) => b.value - a.value);
    }
    return items.slice(0, 10);
  }, [dimension, measure, secondaryMeasure, aggregation, chartType, rows]);

  const activeTitle = chartTitle.trim() || `${aggregation.toUpperCase()} ${measure} berdasarkan ${dimension}`;

  const generatedChart: RecommendedChart = {
    id: `custom-chart-${Date.now()}`,
    title: activeTitle,
    chartType,
    dimensionField: dimension,
    measureField: measure,
    secondaryMeasureField: chartType === 'scatter' ? secondaryMeasure : undefined,
    aggregation,
    description: `Visualisasi kustom dibuat melalui Studio Kustom untuk ${dimension} vs ${measure}.`,
    data: chartData,
  };

  const handleSave = () => {
    if (onAddCustomChart) {
      onAddCustomChart(generatedChart);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration Controls */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-5 space-y-4 lg:col-span-1">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Sliders className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-neutral-100">
            Konfigurator Visualisasi
          </h3>
        </div>

        {/* Chart Type Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Tipe Grafik
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'horizontal_bar', label: 'Bar Horizontal', icon: BarChart3 },
              { id: 'donut', label: 'Donut Share', icon: PieChart },
              { id: 'area', label: 'Area Tren', icon: LineChart },
              { id: 'scatter', label: 'Scatter Korelasi', icon: BarChart3 },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setChartType(t.id as any)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-semibold transition-all ${
                    chartType === t.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension (X-Axis) */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Dimensi Pengelompokan (Kategori / Waktu)
          </label>
          <select
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
          >
            {headers.map((h) => (
              <option key={h} value={h}>
                {h} {sheet.columnsProfile[h]?.type ? `(${sheet.columnsProfile[h].type})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Measure (Y-Axis) */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Metrik Ukuran (Nilai Kuantitatif)
          </label>
          <select
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
            className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
          >
            {numericColumns.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* If Scatter: Secondary measure */}
        {chartType === 'scatter' && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-400">
              Metrik Pembanding (Sumbu Y Kedua)
            </label>
            <select
              value={secondaryMeasure}
              onChange={(e) => setSecondaryMeasure(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
            >
              {numericColumns.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Aggregation */}
        {chartType !== 'scatter' && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-400">
              Fungsi Agregasi
            </label>
            <div className="flex gap-2">
              {(['sum', 'avg', 'count'] as const).map((agg) => (
                <button
                  key={agg}
                  onClick={() => setAggregation(agg)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-mono uppercase font-semibold border transition-colors ${
                    aggregation === agg
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {agg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Judul Custom (Opsional)
          </label>
          <input
            type="text"
            value={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
            placeholder={activeTitle}
            className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {onAddCustomChart && (
          <button
            onClick={handleSave}
            className="w-full mt-2 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {isSaved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span>{isSaved ? 'Berhasil Ditambahkan!' : 'Tambahkan ke Dashboard'}</span>
          </button>
        )}
      </div>

      {/* Live Preview */}
      <div className="lg:col-span-2">
        <div className="h-full flex flex-col justify-between">
          <ChartRenderer chart={generatedChart} />
        </div>
      </div>
    </div>
  );
};
