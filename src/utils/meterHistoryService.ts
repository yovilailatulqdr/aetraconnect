export interface MonthlyMeterRecord {
  bulan: string; // e.g., 'April 2025', 'Mei 2025' ... 'Maret 2026'
  standLalu: number;
  standKini: number;
  pemakaianM3: number;
  biayaPemakaianAir: number;
  status: 'LUNAS' | 'BELUM LUNAS' | 'MENUNGGU VERIFIKASI';
}

/**
 * Returns 12 months historical stand meter & usage data for a given customer ID
 */
export function get12MonthsMeterHistory(idPelanggan: string): MonthlyMeterRecord[] {
  const seed = idPelanggan.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) || 120;
  
  const months = [
    'April 2025',
    'Mei 2025',
    'Juni 2025',
    'Juli 2025',
    'Agustus 2025',
    'September 2025',
    'Oktober 2025',
    'November 2025',
    'Desember 2025',
    'Januari 2026',
    'Februari 2026',
    'Maret 2026',
  ];

  let currentStand = 1420 + (seed % 300);
  const history: MonthlyMeterRecord[] = [];

  for (let i = 0; i < months.length; i++) {
    // Usage varies slightly between 16 to 28 m3 per month
    const variance = ((seed * (i + 1) * 7) % 11) - 4; // -4 to +6
    const pemakaian = Math.max(12, 20 + variance);
    const standLalu = currentStand;
    const standKini = standLalu + pemakaian;
    currentStand = standKini;

    const tarifPerM3 = 6500;
    const biaya = pemakaian * tarifPerM3;

    history.push({
      bulan: months[i],
      standLalu,
      standKini,
      pemakaianM3: pemakaian,
      biayaPemakaianAir: biaya,
      status: i === months.length - 1 ? 'BELUM LUNAS' : 'LUNAS',
    });
  }

  return history;
}
