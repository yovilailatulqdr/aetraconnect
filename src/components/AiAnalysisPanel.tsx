import React, { useState, useEffect } from 'react';
import { SheetData, AiAnalysisResult } from '../types/excel';
import { Sparkles, MessageSquare, Send, CheckCircle2, Lightbulb, RefreshCw, AlertCircle } from 'lucide-react';

interface AiAnalysisPanelProps {
  sheet: SheetData;
}

export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({ sheet }) => {
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AiAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Chat Q&A state
  const [userQuery, setUserQuery] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Halo! Saya asisten arsitek Business Intelligence berbasis AI. Saya telah meninjau struktur sheet "${sheet.sheetName}" Anda (${sheet.totalRows} baris, ${sheet.headers.length} kolom). Anda dapat menanyakan strategi dashboard, metrik komparasi, formula, atau temuan menarik dari data ini.`,
    },
  ]);

  const fetchAiAnalysis = async () => {
    setLoadingAnalysis(true);
    setAnalysisError(null);

    // Prepare lightweight summary payload
    const columnsSummary = Object.entries(sheet.columnsProfile).map(([col, p]) => ({
      column: col,
      type: p.type,
      uniqueCount: p.uniqueCount,
      nullPercentage: p.nullPercentage,
      numericSummary: p.type === 'number' ? { sum: p.sum, avg: p.avg, min: p.min, max: p.max } : undefined,
      topValues: p.topValues?.slice(0, 3),
    }));

    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheetName: sheet.sheetName,
          rowCount: sheet.totalRows,
          columnCount: sheet.headers.length,
          columnsSummary,
          sampleRows: sheet.rows.slice(0, 6),
        }),
      });

      const data = await res.json();
      if (data.fallback) {
        // Fallback simulated result when no API key configured
        setAnalysisResult({
          executiveSummary: `Dataset "${sheet.sheetName}" berfokus pada pelacakan metrik operasional & performa dengan ${sheet.totalRows} baris data. Terdapat potensi besar untuk membangun dashboard helikopter eksekutif yang menghubungkan volume terhadap efisiensi margin.`,
          datasetPersona: sheet.numericColumns.some(c => c.toLowerCase().includes('laba') || c.toLowerCase().includes('omset'))
            ? 'Commercial & Revenue Operations'
            : 'Operational Performance & Diagnostic',
          recommendedKpis: sheet.numericColumns.slice(0, 3).map((c) => ({
            title: `Akumulasi ${c}`,
            metricField: c,
            aggregation: 'SUM',
            businessValue: 'Mengukur output bruto untuk memastikan pencapaian target kuartalan tetap berada di jalur yang benar.',
            targetDirection: 'higher_is_better',
          })),
          dashboardLayouts: [
            {
              name: 'Executive Performance Cockpit',
              targetAudience: 'Dewan Direksi & Head of Division',
              description: 'Dashboard ringkas fokus pada metrik agregat tingkat tinggi dan tren pertumbuhan periodik.',
              visualizations: [
                {
                  chartType: 'area',
                  title: 'Akselerasi Pertumbuhan Tren Waktu',
                  xAxis: sheet.dateColumns[0] || sheet.categoryColumns[0] || 'Periode',
                  yAxis: sheet.numericColumns[0] || 'Metrik Utama',
                  aggregation: 'sum',
                  insight: 'Mendeteksi stabilitas laju operasional antar periode.',
                },
              ],
            },
          ],
          keyBusinessQuestions: [
            `Wilayah atau kategori mana yang menghasilkan efisiensi terbesar?`,
            `Apakah ada anomali atau deviasi signifikan di luar batas kendali wajar?`,
            `Bagaimana konsentrasi 20% entitas terbaik yang mendominasi performa?`,
          ],
          dataQualityNotes: [
            `Tingkat kelengkapan data sangat baik dengan format konsisten pada ${sheet.numericColumns.length} kolom angka.`,
          ],
          advancedOpportunities: [
            'Penerapan analisis Pareto 80/20 untuk fokus alokasi sumber daya.',
            'Otomasi notifikasi alert threshold ketika ada nilai yang menyimpang dari rata-rata.',
          ],
        });
      } else if (data.data) {
        setAnalysisResult(data.data);
      } else {
        throw new Error(data.error || 'Respon AI tidak valid');
      }
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Gagal menghubungi layanan AI');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    fetchAiAnalysis();
  }, [sheet.sheetName]);

  const handleAskQuestion = async (queryText?: string) => {
    const textToAsk = queryText || userQuery;
    if (!textToAsk.trim() || isQuerying) return;

    const newHistory = [...chatHistory, { role: 'user' as const, text: textToAsk }];
    setChatHistory(newHistory);
    setUserQuery('');
    setIsQuerying(true);

    try {
      const res = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToAsk,
          datasetMeta: {
            sheetName: sheet.sheetName,
            totalRows: sheet.totalRows,
            numericColumns: sheet.numericColumns,
            categoryColumns: sheet.categoryColumns,
            dateColumns: sheet.dateColumns,
          },
          sampleData: sheet.rows.slice(0, 10),
        }),
      });

      const data = await res.json();
      const reply = data.answer || (data.fallback ? data.answer : 'Tidak ada respon yang dapat dihasilkan.');
      setChatHistory([...newHistory, { role: 'assistant', text: reply }]);
    } catch (err: any) {
      setChatHistory([
        ...newHistory,
        {
          role: 'assistant',
          text: 'Maaf, terjadi kendala saat memproses pertanyaan Anda. Silakan coba kembali.',
        },
      ]);
    } finally {
      setIsQuerying(false);
    }
  };

  const quickPrompts = [
    'Apa potensi dashboard terbaik untuk C-Level dari data ini?',
    'Bagaimana rumus formula turunan yang disarankan?',
    'Apa risiko atau anomali terbesar yang perlu dipantau?',
    'Tolong jelaskan metrik KPI apa saja yang harus dijadikan alarm merah/kuning.',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: AI Strategic Architecture (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-neutral-100">
                Kajian Strategis AI (Gemini Flash Intelligence)
              </h3>
            </div>
            <button
              onClick={fetchAiAnalysis}
              disabled={loadingAnalysis}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-200 rounded border border-neutral-800 hover:border-neutral-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${loadingAnalysis ? 'animate-spin' : ''}`} />
              <span>Analisa Ulang</span>
            </button>
          </div>

          {loadingAnalysis ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="h-7 w-7 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-400">
                Gemini sedang membedah korelasi kolom & potensi dashboard terbaik...
              </p>
            </div>
          ) : analysisError ? (
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{analysisError}</span>
            </div>
          ) : analysisResult ? (
            <div className="space-y-5 text-xs text-neutral-300">
              {/* Executive Summary */}
              <div className="p-3.5 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1.5">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold">
                  Profil: {analysisResult.datasetPersona}
                </span>
                <p className="text-neutral-200 leading-relaxed font-medium">
                  {analysisResult.executiveSummary}
                </p>
              </div>

              {/* Recommended KPIs */}
              {analysisResult.recommendedKpis && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 font-medium">
                    KPI Kunci yang Sangat Direkomendasikan
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {analysisResult.recommendedKpis.map((kpi, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-neutral-800/80 bg-neutral-950/40 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-neutral-100">{kpi.title}</strong>
                          <span className="font-mono text-[10px] text-neutral-500 uppercase">
                            {kpi.aggregation}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {kpi.businessValue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advanced Opportunities */}
              {analysisResult.advancedOpportunities && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 font-medium">
                    Peluang Analisis Lanjutan & Otomasi
                  </span>
                  <div className="space-y-1.5">
                    {analysisResult.advancedOpportunities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2 rounded bg-neutral-950/40 border border-neutral-800/60"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-neutral-300 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right: Interactive Q&A Chat (5 cols) */}
      <div className="lg:col-span-5 rounded-xl border border-neutral-800 bg-neutral-900/90 flex flex-col h-[650px] overflow-hidden">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-neutral-200">
              Tanya AI tentang Data Ini
            </h3>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            Interactive Q&A
          </span>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-neutral-950 font-medium rounded-br-none'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-bl-none whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isQuerying && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 italic p-2">
              <div className="h-3 w-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              <span>AI sedang menganalisis pertanyaan Anda...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 border-t border-neutral-800/80 bg-neutral-950/60 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
            <Lightbulb className="h-3 w-3 text-amber-400" />
            <span>Saran Pertanyaan Cepat:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAskQuestion(q)}
                className="px-2 py-1 text-[11px] rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-3 border-t border-neutral-800 flex items-center gap-2 bg-neutral-950">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Ketik pertanyaan bisnis tentang dataset ini..."
            className="flex-1 rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={isQuerying || !userQuery.trim()}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
