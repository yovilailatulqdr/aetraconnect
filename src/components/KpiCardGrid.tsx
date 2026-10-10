import React from 'react';
import { RecommendedKpi } from '../types/excel';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardGridProps {
  kpis: RecommendedKpi[];
}

export const KpiCardGrid: React.FC<KpiCardGridProps> = ({ kpis }) => {
  if (kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const isUp = kpi.trend === 'up';
        const isDown = kpi.trend === 'down';
        const isHigherBetter = kpi.targetDirection !== 'lower_is_better';
        const isPositive = (isUp && isHigherBetter) || (isDown && !isHigherBetter);

        return (
          <div
            key={kpi.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 transition-all hover:border-neutral-700 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="font-medium truncate pr-2" title={kpi.title}>
                  {kpi.title}
                </span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase">
                  {kpi.aggregation}
                </span>
              </div>

              <div className="text-2xl font-bold tracking-tight text-neutral-100 font-mono tabular-nums">
                {kpi.formattedValue}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-400 truncate text-[11px]" title={kpi.subtext}>
                {kpi.subtext}
              </span>

              {kpi.trend && kpi.trend !== 'neutral' ? (
                <div
                  className={`flex items-center gap-1 font-mono text-[11px] ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isUp ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  <span>{isUp ? '+Target' : 'Optimal'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-neutral-500 font-mono text-[11px]">
                  <Minus className="h-3 w-3" />
                  <span>Stabil</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
