export type ColumnType = 'number' | 'date' | 'category' | 'text' | 'boolean';

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  nullCount: number;
  nullPercentage: number;
  uniqueCount: number;
  isPotentialId: boolean;
  isPotentialDimension: boolean;
  isPotentialMeasure: boolean;
  isDateDimension: boolean;
  // Numeric stats
  min?: number;
  max?: number;
  sum?: number;
  avg?: number;
  median?: number;
  // Date stats
  minDate?: string;
  maxDate?: string;
  // Categorical stats
  topValues?: Array<{ value: string; count: number; percentage: number }>;
}

export interface SheetData {
  sheetName: string;
  headers: string[];
  rows: Record<string, any>[];
  totalRows: number;
  columnsProfile: Record<string, ColumnProfile>;
  numericColumns: string[];
  dateColumns: string[];
  categoryColumns: string[];
}

export interface WorkbookData {
  fileName: string;
  fileSize: number;
  sheetNames: string[];
  activeSheetName: string;
  sheets: Record<string, SheetData>;
  uploadedAt: string;
}

export interface RecommendedKpi {
  id: string;
  title: string;
  metricField: string;
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
  value: number;
  formattedValue: string;
  subtext: string;
  changePercent?: number;
  trend?: 'up' | 'down' | 'neutral';
  targetDirection?: 'higher_is_better' | 'lower_is_better';
}

export interface RecommendedChart {
  id: string;
  title: string;
  chartType: 'bar' | 'horizontal_bar' | 'line' | 'area' | 'donut' | 'scatter';
  dimensionField: string;
  measureField: string;
  secondaryMeasureField?: string;
  aggregation: 'sum' | 'avg' | 'count';
  description: string;
  data: Array<{ label: string; value: number; secondaryValue?: number; percentage?: number }>;
}

export interface DashboardBlueprint {
  title: string;
  targetRole: string;
  objective: string;
  recommendedLayout: string;
  coreMetrics: string[];
  visualizationsSuggested: Array<{
    type: string;
    title: string;
    fields: string;
    purpose: string;
  }>;
  suggestedFormulas: Array<{
    name: string;
    formula: string;
    explanation: string;
  }>;
}

export interface AiAnalysisResult {
  executiveSummary: string;
  datasetPersona: string;
  recommendedKpis: Array<{
    title: string;
    metricField: string;
    aggregation: string;
    businessValue: string;
    targetDirection: string;
  }>;
  dashboardLayouts: Array<{
    name: string;
    targetAudience: string;
    description: string;
    visualizations: Array<{
      chartType: string;
      title: string;
      xAxis: string;
      yAxis: string;
      aggregation: string;
      insight: string;
    }>;
  }>;
  keyBusinessQuestions: string[];
  dataQualityNotes: string[];
  advancedOpportunities: string[];
}
