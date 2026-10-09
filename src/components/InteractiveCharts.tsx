import React, { useState } from 'react';
import { RecommendedChart } from '../types/excel';

const PALETTE = [
  '#10B981', // emerald-500
  '#06B6D4', // cyan-500
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#F59E0B', // amber-500
  '#EC4899', // pink-500
  '#14B8A6', // teal-500
  '#6366F1', // indigo-500
];

interface ChartProps {
  chart: RecommendedChart;
}

export const AreaLineChart: React.FC<ChartProps> = ({ chart }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = chart.data;
  if (!data || data.length === 0) return null;

  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 55 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(0, ...values);
  const maxVal = Math.max(...values, 1);

  const getX = (idx: number) => {
    if (data.length <= 1) return padding.left + innerW / 2;
    return padding.left + (idx / (data.length - 1)) * innerW;
  };

  const getY = (val: number) => {
    const range = maxVal - minVal;
    return padding.top + innerH - ((val - minVal) / range) * innerH;
  };

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPath = `${points} L ${getX(data.length - 1)},${padding.top + innerH} L ${getX(0)},${padding.top + innerH} Z`;

  const hoveredItem = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding.top + innerH * (1 - pct);
            const val = minVal + (maxVal - minVal) * pct;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#262626"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-neutral-500 font-mono"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={`M ${areaPath}`} fill={`url(#grad-${chart.id})`} />

          {/* Line stroke */}
          <path
            d={`M ${points}`}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point dots & hover hitboxes */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHov = hoveredIdx === i;

            return (
              <g key={i}>
                {isHov && (
                  <>
                    <line
                      x1={cx}
                      y1={padding.top}
                      x2={cx}
                      y2={padding.top + innerH}
                      stroke="#10B981"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r="6"
                      fill="#10B981"
                      fillOpacity="0.3"
                    />
                  </>
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHov ? '4' : '3'}
                  fill={isHov ? '#10B981' : '#0A0A0A'}
                  stroke="#10B981"
                  strokeWidth="2"
                />
                {/* Hitbox */}
                <rect
                  x={cx - 15}
                  y={padding.top}
                  width="30"
                  height={innerH}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}

          {/* X axis labels (skip every few if too many) */}
          {data.map((d, i) => {
            const step = Math.ceil(data.length / 6);
            if (i % step !== 0 && i !== data.length - 1) return null;
            const cx = getX(i);
            return (
              <text
                key={i}
                x={cx}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="text-[10px] fill-neutral-400 font-mono"
              >
                {d.label.length > 10 ? d.label.slice(5) : d.label}
              </text>
            );
          })}
        </svg>
      </div>

      {hoveredItem && (
        <div className="mt-2 py-1.5 px-3 rounded bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between text-xs">
          <span className="text-neutral-400">{hoveredItem.label}</span>
          <span className="font-mono font-bold text-emerald-400 tabular-nums">
            {hoveredItem.value.toLocaleString('id-ID')}
          </span>
        </div>
      )}
    </div>
  );
};

export const DonutChart: React.FC<ChartProps> = ({ chart }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = chart.data;
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate arc angles
  let currentAngle = 0;
  const arcs = data.map((item, idx) => {
    const sliceAngle = total > 0 ? (item.value / total) * 360 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle += sliceAngle;
    return {
      item,
      color: PALETTE[idx % PALETTE.length],
      startAngle,
      endAngle,
      pct: total > 0 ? Math.round((item.value / total) * 100) : 0,
    };
  });

  const size = 200;
  const center = size / 2;
  const radius = 78;
  const innerRadius = 52;

  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeDonutSlice = (startA: number, endA: number) => {
    // Edge case if 360 full circle
    const end = endA - startA >= 359.99 ? startA + 359.99 : endA;
    const start = polarToCartesian(center, center, radius, end);
    const endOuter = polarToCartesian(center, center, radius, startA);
    const startInner = polarToCartesian(center, center, innerRadius, startA);
    const endInner = polarToCartesian(center, center, innerRadius, end);

    const largeArcFlag = end - startA <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      'L', startInner.x, startInner.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, endInner.x, endInner.y,
      'Z',
    ].join(' ');
  };

  const hoveredArc = hoveredIdx !== null ? arcs[hoveredIdx] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
      <div className="relative shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((arc, i) => {
            const isHov = hoveredIdx === i;
            return (
              <path
                key={i}
                d={describeDonutSlice(arc.startAngle, arc.endAngle)}
                fill={arc.color}
                className="transition-all duration-150 cursor-pointer"
                opacity={hoveredIdx === null || isHov ? 1 : 0.4}
                transform={isHov ? 'scale(1.03)' : 'scale(1)'}
                transform-origin={`${center} ${center}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] text-neutral-400 uppercase font-mono">
            {hoveredArc ? hoveredArc.item.label : 'Total'}
          </span>
          <span className="text-sm font-bold font-mono text-neutral-100 tabular-nums">
            {hoveredArc
              ? `${hoveredArc.pct}%`
              : total >= 1000
              ? total.toLocaleString('id-ID', { maximumFractionDigits: 0 })
              : total.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 w-full space-y-2 max-h-48 overflow-y-auto pr-1">
        {arcs.map((arc, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between text-xs p-1.5 rounded transition-colors cursor-pointer ${
              hoveredIdx === i ? 'bg-neutral-800' : 'hover:bg-neutral-800/40'
            }`}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: arc.color }}
              />
              <span className="text-neutral-300 truncate font-medium">
                {arc.item.label}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] tabular-nums">
              <span className="text-neutral-400">
                {arc.item.value.toLocaleString('id-ID')}
              </span>
              <span className="text-neutral-500 font-semibold w-8 text-right">
                {arc.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HorizontalBarChart: React.FC<ChartProps> = ({ chart }) => {
  const data = chart.data;
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((item, idx) => {
        const pct = Math.max(2, Math.round((item.value / maxVal) * 100));
        const color = PALETTE[idx % PALETTE.length];

        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-300 font-medium truncate pr-3" title={item.label}>
                {item.label}
              </span>
              <span className="font-mono text-neutral-400 tabular-nums shrink-0">
                {item.value.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ScatterPlotChart: React.FC<ChartProps> = ({ chart }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = chart.data;
  if (!data || data.length === 0) return null;

  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const xVals = data.map((d) => d.value);
  const yVals = data.map((d) => d.secondaryValue ?? 0);

  const minX = Math.min(0, ...xVals);
  const maxX = Math.max(...xVals, 1);
  const minY = Math.min(0, ...yVals);
  const maxY = Math.max(...yVals, 1);

  const getX = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * innerW;
  const getY = (val: number) => padding.top + innerH - ((val - minY) / (maxY - minY)) * innerH;

  const hoveredItem = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className="flex flex-col justify-between">
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Grid */}
          {[0, 0.5, 1].map((pct, i) => {
            const y = padding.top + innerH * (1 - pct);
            const val = minY + (maxY - minY) * pct;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#262626"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[9px] fill-neutral-500 font-mono"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Dots */}
          {data.map((d, i) => {
            const cx = getX(d.value);
            const cy = getY(d.secondaryValue ?? 0);
            const isHov = hoveredIdx === i;

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHov ? 7 : 4.5}
                  fill={isHov ? '#10B981' : '#06B6D4'}
                  fillOpacity="0.85"
                  stroke="#0A0A0A"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}

          {/* X axis labels */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            className="text-[10px] fill-neutral-400 font-medium"
          >
            {chart.measureField} →
          </text>
          <text
            x={padding.left}
            y={padding.top - 6}
            textAnchor="start"
            className="text-[10px] fill-neutral-400 font-medium"
          >
            ↑ {chart.secondaryMeasureField}
          </text>
        </svg>
      </div>

      {hoveredItem && (
        <div className="mt-2 p-2 rounded bg-neutral-800 text-xs flex items-center justify-between border border-neutral-700">
          <span className="font-semibold text-neutral-200">{hoveredItem.label}</span>
          <span className="font-mono text-neutral-300">
            {chart.measureField}: <strong className="text-emerald-400">{hoveredItem.value}</strong> ·{' '}
            {chart.secondaryMeasureField}: <strong className="text-cyan-400">{hoveredItem.secondaryValue}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export const ChartRenderer: React.FC<ChartProps> = ({ chart }) => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-100">{chart.title}</h3>
        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{chart.description}</p>
      </div>

      <div className="min-h-[220px] flex items-center justify-center">
        {chart.chartType === 'area' || chart.chartType === 'line' ? (
          <AreaLineChart chart={chart} />
        ) : chart.chartType === 'donut' ? (
          <DonutChart chart={chart} />
        ) : chart.chartType === 'horizontal_bar' ? (
          <HorizontalBarChart chart={chart} />
        ) : chart.chartType === 'scatter' ? (
          <ScatterPlotChart chart={chart} />
        ) : (
          <HorizontalBarChart chart={chart} />
        )}
      </div>
    </div>
  );
};
