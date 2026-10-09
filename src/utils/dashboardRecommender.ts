import { RecommendedKpi, RecommendedChart, DashboardBlueprint, SheetData } from '../types/excel';
import { cleanNumericValue } from './excelParser';

export function generateDashboardRecommendations(sheet: SheetData): {
  kpis: RecommendedKpi[];
  charts: RecommendedChart[];
  blueprints: DashboardBlueprint[];
  keyQuestions: string[];
  suggestedFormulas: Array<{ name: string; formula: string; explanation: string }>;
} {
  const { headers, rows, columnsProfile, numericColumns, dateColumns, categoryColumns } = sheet;

  // 1. Generate KPIs
  const kpis: RecommendedKpi[] = [];

  // Always offer row count KPI
  kpis.push({
    id: 'kpi-row-count',
    title: 'Total Entri Catatan',
    metricField: 'Total Baris',
    aggregation: 'count',
    value: rows.length,
    formattedValue: rows.length.toLocaleString('id-ID'),
    subtext: `Total data ${sheet.sheetName}`,
    trend: 'neutral',
  });

  // Score numeric columns to find the most meaningful financial/volume metrics
  const scoredNumerics = numericColumns.map(col => {
    const lower = col.toLowerCase();
    let score = 0;
    if (lower.includes('omset') || lower.includes('pendapatan') || lower.includes('revenue') || lower.includes('penjualan')) score += 100;
    if (lower.includes('laba') || lower.includes('profit') || lower.includes('margin')) score += 90;
    if (lower.includes('budget') || lower.includes('biaya') || lower.includes('cost') || lower.includes('spend') || lower.includes('hpp')) score += 80;
    if (lower.includes('unit') || lower.includes('qty') || lower.includes('jumlah') || lower.includes('volume') || lower.includes('stok')) score += 70;
    if (lower.includes('gaji') || lower.includes('salary') || lower.includes('lembur')) score += 60;
    if (lower.includes('skor') || lower.includes('score') || lower.includes('rating') || lower.includes('persen') || lower.includes('%') || lower.includes('ctr') || lower.includes('roas')) score += 50;
    return { col, score };
  }).sort((a, b) => b.score - a.score);

  // Add top numeric KPIs
  for (let i = 0; i < Math.min(3, scoredNumerics.length); i++) {
    const { col } = scoredNumerics[i];
    const prof = columnsProfile[col];
    if (!prof) continue;

    const lower = col.toLowerCase();
    const isRatio = lower.includes('%') || lower.includes('skor') || lower.includes('rating') || lower.includes('roas') || lower.includes('ctr');
    const agg = isRatio ? 'avg' : 'sum';
    const val = isRatio ? (prof.avg || 0) : (prof.sum || 0);

    let formatted = '';
    if (isRatio) {
      formatted = val.toFixed(2) + (lower.includes('%') || lower.includes('ctr') ? '%' : '');
    } else if (val >= 1000000) {
      formatted = (val / 1000000).toFixed(1) + ' Jt';
    } else if (val >= 1000) {
      formatted = val.toLocaleString('id-ID', { maximumFractionDigits: 1 });
    } else {
      formatted = val.toFixed(1);
    }

    kpis.push({
      id: `kpi-num-${i}`,
      title: isRatio ? `Rata-rata ${col}` : `Total ${col}`,
      metricField: col,
      aggregation: agg,
      value: val,
      formattedValue: formatted,
      subtext: isRatio ? `Min: ${prof.min} · Max: ${prof.max}` : `Rata-rata: ${prof.avg?.toLocaleString('id-ID')}`,
      trend: lower.includes('biaya') || lower.includes('cost') || lower.includes('delay') ? 'down' : 'up',
      targetDirection: lower.includes('biaya') || lower.includes('cost') ? 'lower_is_better' : 'higher_is_better',
    });
  }

  // 2. Generate Recommended Visualizations
  const charts: RecommendedChart[] = [];

  // Chart A: Time Series (if date column exists)
  if (dateColumns.length > 0 && numericColumns.length > 0) {
    const dateCol = dateColumns[0];
    const primaryMeasure = scoredNumerics[0]?.col || numericColumns[0];

    // Group by date/period
    const dateGroups: Record<string, number> = {};
    for (const row of rows) {
      const d = String(row[dateCol] || '').split('T')[0];
      if (!d) continue;
      const numVal = cleanNumericValue(row[primaryMeasure]) || 0;
      dateGroups[d] = (dateGroups[d] || 0) + numVal;
    }

    const sortedDates = Object.keys(dateGroups).sort();
    const timeData = sortedDates.map(d => ({
      label: d,
      value: Math.round(dateGroups[d] * 10) / 10,
    }));

    if (timeData.length > 1) {
      charts.push({
        id: 'chart-timeseries',
        title: `Tren Historis ${primaryMeasure} Seiring Waktu`,
        chartType: 'area',
        dimensionField: dateCol,
        measureField: primaryMeasure,
        aggregation: 'sum',
        description: `Visualisasi garis tren periodik untuk memantau fluktuasi, akselerasi, atau penurunan pada ${primaryMeasure}.`,
        data: timeData,
      });
    }
  }

  // Chart B: Categorical Breakdown (Donut or Bar)
  const bestDimension = categoryColumns[0] || headers.find(h => !numericColumns.includes(h) && !dateColumns.includes(h));
  const primaryMeasure = scoredNumerics[0]?.col || numericColumns[0] || '';

  if (bestDimension && primaryMeasure) {
    const catGroups: Record<string, number> = {};
    let totalSum = 0;

    for (const row of rows) {
      const cat = String(row[bestDimension] || 'Lainnya');
      const numVal = cleanNumericValue(row[primaryMeasure]) || 0;
      catGroups[cat] = (catGroups[cat] || 0) + numVal;
      totalSum += numVal;
    }

    const sortedCats = Object.entries(catGroups)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const donutData = sortedCats.map(([cat, val]) => ({
      label: cat,
      value: Math.round(val * 10) / 10,
      percentage: totalSum > 0 ? Math.round((val / totalSum) * 100) : 0,
    }));

    charts.push({
      id: 'chart-cat-breakdown',
      title: `Distribusi ${primaryMeasure} berdasarkan ${bestDimension}`,
      chartType: 'donut',
      dimensionField: bestDimension,
      measureField: primaryMeasure,
      aggregation: 'sum',
      description: `Menganalisa pangsa kontribusi proporsional masing-masing ${bestDimension} terhadap keseluruhan ${primaryMeasure}.`,
      data: donutData,
    });
  }

  // Chart C: Top 10 Ranking (Horizontal Bar)
  const secondaryDimension = categoryColumns[1] || (categoryColumns[0] !== bestDimension ? categoryColumns[0] : null) || headers.find(h => h !== bestDimension && !numericColumns.includes(h) && !dateColumns.includes(h));
  if (secondaryDimension && primaryMeasure) {
    const rankGroups: Record<string, number> = {};
    for (const row of rows) {
      const item = String(row[secondaryDimension] || 'Tidak diketahui');
      const numVal = cleanNumericValue(row[primaryMeasure]) || 0;
      rankGroups[item] = (rankGroups[item] || 0) + numVal;
    }

    const sortedRank = Object.entries(rankGroups)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([label, val]) => ({
        label,
        value: Math.round(val * 10) / 10,
      }));

    charts.push({
      id: 'chart-top-ranking',
      title: `Peringkat Kontribusi Teratas: ${secondaryDimension}`,
      chartType: 'horizontal_bar',
      dimensionField: secondaryDimension,
      measureField: primaryMeasure,
      aggregation: 'sum',
      description: `Identifikasi pendorong pareto 80/20 dan segmen penyumbang performa tertinggi.`,
      data: sortedRank,
    });
  }

  // Chart D: Correlation / Scatter (if 2 numeric columns exist)
  if (numericColumns.length >= 2) {
    const numA = scoredNumerics[0]?.col || numericColumns[0];
    const numB = scoredNumerics[1]?.col || numericColumns[1];
    const labelDim = bestDimension || headers[0];

    const scatterData = rows.slice(0, 15).map(row => ({
      label: String(row[labelDim] || 'Item'),
      value: cleanNumericValue(row[numA]) || 0,
      secondaryValue: cleanNumericValue(row[numB]) || 0,
    }));

    charts.push({
      id: 'chart-correlation',
      title: `Analisis Korelasi: ${numA} vs ${numB}`,
      chartType: 'scatter',
      dimensionField: labelDim,
      measureField: numA,
      secondaryMeasureField: numB,
      aggregation: 'sum',
      description: `Memeriksa hubungan kausalitas dan efisiensi antara dua metrik kunci dalam lembar kerja.`,
      data: scatterData,
    });
  }

  // 3. Recommended Blueprints (Best Dashboard Potential)
  const blueprints: DashboardBlueprint[] = [
    {
      title: 'Executive Performance Cockpit',
      targetRole: 'Direktur, Owner, C-Level, & Head of Division',
      objective: 'Memberikan gambaran helikopter dalam 5 detik mengenai kesehatan finansial, volume, dan deviasi target tanpa terjebak detail mikro.',
      recommendedLayout: 'Top KPI Banners (4 cards) + Primary Revenue Trend (Line/Area) + Regional/Category Share (Donut) + Top Performers List',
      coreMetrics: numericColumns.slice(0, 4),
      visualizationsSuggested: [
        {
          type: 'Headline Metric Cards',
          title: `Total & Rata-rata ${primaryMeasure || 'Performa'}`,
          fields: primaryMeasure,
          purpose: 'Status instan angka target kumulatif vs periode sebelumnya.',
        },
        {
          type: 'Area / Line Chart',
          title: 'Tren Kecepatan Pertumbuhan Waktu ke Waktu',
          fields: `${dateColumns[0] || 'Periode'} x ${primaryMeasure}`,
          purpose: 'Mendeteksi momentum naik atau penurunan musiman.',
        },
        {
          type: 'Donut & Bar Breakdown',
          title: `Pangsa Kontribusi ${bestDimension || 'Kategori'}`,
          fields: `${bestDimension} x ${primaryMeasure}`,
          purpose: 'Mencegah ketergantungan berlebihan pada 1 lini atau segmen tunggal.',
        },
      ],
      suggestedFormulas: [
        {
          name: 'Growth Rate (YoY / MoM)',
          formula: '=(Current_Period - Previous_Period) / Previous_Period',
          explanation: 'Menghitung laju akselerasi pertumbuhan bisnis dalam persentase.',
        },
        {
          name: 'Pangsa Kontribusi (% Share of Total)',
          formula: `=SUMIFS(${primaryMeasure}, ${bestDimension}, "[Kategori]") / SUM(${primaryMeasure})`,
          explanation: 'Mengetahui porsi kontribusi kategori terhadap total keseluruhan.',
        },
      ],
    },
    {
      title: 'Operational Drilldown & Diagnostic Studio',
      targetRole: 'Manajer Operasional, Supervisor, & Tim Analis',
      objective: 'Menyelidiki akar masalah (root-cause), anomali biaya, hambatan operasional, dan efisiensi tingkat entri.',
      recommendedLayout: 'Filter Multi-Dimensi (Wilayah, Status, Waktu) + Matriks Tabular Interaktif + Scatter Plot Korelasi Metrik + Alert Ambang Batas',
      coreMetrics: numericColumns,
      visualizationsSuggested: [
        {
          type: 'Tabel Matriks Dinamis (Pivot)',
          title: `Rincian Cross-Tab: ${bestDimension || 'Dimensi A'} vs ${secondaryDimension || 'Dimensi B'}`,
          fields: `${bestDimension} x ${secondaryDimension} x ${primaryMeasure}`,
          purpose: 'Menemukan kombinasi segmen yang berkinerja buruk atau membebani biaya.',
        },
        {
          type: 'Scatter Plot',
          title: 'Uji Korelasi & Outlier Efisiensi',
          fields: `${numericColumns[0]} vs ${numericColumns[1]}`,
          purpose: 'Menyorot anomali transaksi yang keluar jauh dari standar wajar.',
        },
      ],
      suggestedFormulas: [
        {
          name: 'Margin Keuntungan / Rasio Efisiensi',
          formula: `=(${scoredNumerics[0]?.col || 'Revenue'} - ${scoredNumerics[1]?.col || 'Cost'}) / ${scoredNumerics[0]?.col || 'Revenue'} * 100%`,
          explanation: 'Mengukur margin keuntungan bersih dari setiap baris transaksi.',
        },
        {
          name: 'Average Per Unit / Average Ticket Size',
          formula: `=AVERAGE(${primaryMeasure})`,
          explanation: 'Nilai rerata per unit untuk memantau konsistensi ukuran order.',
        },
      ],
    },
  ];

  // 4. Key Business Questions
  const keyQuestions = [
    `Segmen ${bestDimension || 'kategori'} mana yang memberikan kontribusi terbesar terhadap ${primaryMeasure || 'kinerja'}?`,
    `Apakah terdapat anomali atau penurunan signifikan pada periode tertentu?`,
    `Siapa entitas teratas (Top 20%) yang mendorong 80% hasil keseluruhan?`,
    `Berapa rasio efisiensi rata-rata dan di mana letak potensi optimasi biaya/margin?`,
  ];

  const suggestedFormulas = [
    {
      name: 'Rasio Pencapaian Target',
      formula: '=Realisasi / Target * 100%',
      explanation: 'Memantau persentase pemenuhan target KPI.',
    },
    {
      name: 'Rata-rata Bergerak (Moving Average 7 Hari / 30 Hari)',
      formula: '=AVERAGE(OFFSET(Cell, -6, 0, 7, 1))',
      explanation: 'Menghaluskan fluktuasi harian untuk melihat tren jangka menengah yang sesungguhnya.',
    },
    {
      name: 'Indeks Pareto (80/20 Running Total)',
      formula: '=SUM($B$2:B2) / SUM($B$2:$B$100)',
      explanation: 'Mengidentifikasi batas 80% kontributor utama untuk fokus alokasi sumber daya.',
    },
  ];

  return {
    kpis,
    charts,
    blueprints,
    keyQuestions,
    suggestedFormulas,
  };
}
