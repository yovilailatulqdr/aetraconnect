import { SheetData, WorkbookData } from '../types/excel';
import { profileSheet } from '../utils/excelParser';

// 1. Penjualan & Revenue E-Commerce (30+ rows)
const rawSalesData = [
  { 'ID Transaksi': 'TRX-1001', 'Tanggal': '2026-01-05', 'Wilayah': 'DKI Jakarta', 'Kategori': 'Elektronik', 'Produk': 'Laptop Ultrabook 14"', 'Sales Person': 'Budi Santoso', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 8, 'Pendapatan (Juta Rp)': 112.0, 'Biaya HPP (Juta Rp)': 88.0, 'Laba Bersih (Juta Rp)': 24.0, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1002', 'Tanggal': '2026-01-08', 'Wilayah': 'Jawa Barat', 'Kategori': 'Fashion & Pakaian', 'Produk': 'Jaket Parka Outdoor', 'Sales Person': 'Siti Rahma', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 45, 'Pendapatan (Juta Rp)': 22.5, 'Biaya HPP (Juta Rp)': 13.5, 'Laba Bersih (Juta Rp)': 9.0, 'Metode Bayar': 'Kartu Kredit' },
  { 'ID Transaksi': 'TRX-1003', 'Tanggal': '2026-01-14', 'Wilayah': 'Jawa Timur', 'Kategori': 'Elektronik', 'Produk': 'Monitor 4K 27"', 'Sales Person': 'Ahmad Fauzi', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 15, 'Pendapatan (Juta Rp)': 67.5, 'Biaya HPP (Juta Rp)': 48.0, 'Laba Bersih (Juta Rp)': 19.5, 'Metode Bayar': 'Virtual Account' },
  { 'ID Transaksi': 'TRX-1004', 'Tanggal': '2026-01-20', 'Wilayah': 'Bali & Nusra', 'Kategori': 'F&B & Kuliner', 'Produk': 'Kopi Arabika Premium 1kg', 'Sales Person': 'Dewi Lestari', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 120, 'Pendapatan (Juta Rp)': 36.0, 'Biaya HPP (Juta Rp)': 21.0, 'Laba Bersih (Juta Rp)': 15.0, 'Metode Bayar': 'QRIS' },
  { 'ID Transaksi': 'TRX-1005', 'Tanggal': '2026-01-27', 'Wilayah': 'DKI Jakarta', 'Kategori': 'Perlengkapan Kantor', 'Produk': 'Kursi Ergonomis Mesh', 'Sales Person': 'Budi Santoso', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 22, 'Pendapatan (Juta Rp)': 55.0, 'Biaya HPP (Juta Rp)': 38.5, 'Laba Bersih (Juta Rp)': 16.5, 'Metode Bayar': 'Transfer Bank' },
  
  { 'ID Transaksi': 'TRX-1006', 'Tanggal': '2026-02-03', 'Wilayah': 'Sumatera Utara', 'Kategori': 'Elektronik', 'Produk': 'Smart TV 55" UHD', 'Sales Person': 'Rian Pratama', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 12, 'Pendapatan (Juta Rp)': 84.0, 'Biaya HPP (Juta Rp)': 62.0, 'Laba Bersih (Juta Rp)': 22.0, 'Metode Bayar': 'Kartu Kredit' },
  { 'ID Transaksi': 'TRX-1007', 'Tanggal': '2026-02-09', 'Wilayah': 'Jawa Barat', 'Kategori': 'Fashion & Pakaian', 'Produk': 'Sepatu Sneakers Kulit', 'Sales Person': 'Siti Rahma', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 60, 'Pendapatan (Juta Rp)': 48.0, 'Biaya HPP (Juta Rp)': 29.0, 'Laba Bersih (Juta Rp)': 19.0, 'Metode Bayar': 'QRIS' },
  { 'ID Transaksi': 'TRX-1008', 'Tanggal': '2026-02-16', 'Wilayah': 'DKI Jakarta', 'Kategori': 'Elektronik', 'Produk': 'TWS Headphone ANC', 'Sales Person': 'Budi Santoso', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 85, 'Pendapatan (Juta Rp)': 76.5, 'Biaya HPP (Juta Rp)': 49.0, 'Laba Bersih (Juta Rp)': 27.5, 'Metode Bayar': 'Virtual Account' },
  { 'ID Transaksi': 'TRX-1009', 'Tanggal': '2026-02-22', 'Wilayah': 'Sulawesi Selatan', 'Kategori': 'Perlengkapan Kantor', 'Produk': 'Meja Kerja Standing Desk', 'Sales Person': 'Ahmad Fauzi', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 10, 'Pendapatan (Juta Rp)': 42.0, 'Biaya HPP (Juta Rp)': 29.0, 'Laba Bersih (Juta Rp)': 13.0, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1010', 'Tanggal': '2026-02-28', 'Wilayah': 'Jawa Tengah', 'Kategori': 'F&B & Kuliner', 'Produk': 'Paket Hampers Snack Artisan', 'Sales Person': 'Dewi Lestari', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 95, 'Pendapatan (Juta Rp)': 38.0, 'Biaya HPP (Juta Rp)': 22.5, 'Laba Bersih (Juta Rp)': 15.5, 'Metode Bayar': 'QRIS' },

  { 'ID Transaksi': 'TRX-1011', 'Tanggal': '2026-03-04', 'Wilayah': 'DKI Jakarta', 'Kategori': 'Elektronik', 'Produk': 'Laptop Ultrabook 14"', 'Sales Person': 'Budi Santoso', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 14, 'Pendapatan (Juta Rp)': 196.0, 'Biaya HPP (Juta Rp)': 148.0, 'Laba Bersih (Juta Rp)': 48.0, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1012', 'Tanggal': '2026-03-11', 'Wilayah': 'Jawa Timur', 'Kategori': 'Fashion & Pakaian', 'Produk': 'Jaket Parka Outdoor', 'Sales Person': 'Siti Rahma', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 55, 'Pendapatan (Juta Rp)': 27.5, 'Biaya HPP (Juta Rp)': 16.5, 'Laba Bersih (Juta Rp)': 11.0, 'Metode Bayar': 'Kartu Kredit' },
  { 'ID Transaksi': 'TRX-1013', 'Tanggal': '2026-03-18', 'Wilayah': 'Kalimantan Timur', 'Kategori': 'Perlengkapan Kantor', 'Produk': 'Kursi Ergonomis Mesh', 'Sales Person': 'Ahmad Fauzi', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 30, 'Pendapatan (Juta Rp)': 75.0, 'Biaya HPP (Juta Rp)': 51.0, 'Laba Bersih (Juta Rp)': 24.0, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1014', 'Tanggal': '2026-03-24', 'Wilayah': 'Bali & Nusra', 'Kategori': 'Elektronik', 'Produk': 'Smart TV 55" UHD', 'Sales Person': 'Rian Pratama', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 18, 'Pendapatan (Juta Rp)': 126.0, 'Biaya HPP (Juta Rp)': 93.0, 'Laba Bersih (Juta Rp)': 33.0, 'Metode Bayar': 'Virtual Account' },
  { 'ID Transaksi': 'TRX-1015', 'Tanggal': '2026-03-29', 'Wilayah': 'DKI Jakarta', 'Kategori': 'F&B & Kuliner', 'Produk': 'Kopi Arabika Premium 1kg', 'Sales Person': 'Dewi Lestari', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 180, 'Pendapatan (Juta Rp)': 54.0, 'Biaya HPP (Juta Rp)': 31.0, 'Laba Bersih (Juta Rp)': 23.0, 'Metode Bayar': 'QRIS' },

  { 'ID Transaksi': 'TRX-1016', 'Tanggal': '2026-04-02', 'Wilayah': 'Jawa Barat', 'Kategori': 'Elektronik', 'Produk': 'Monitor 4K 27"', 'Sales Person': 'Budi Santoso', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 20, 'Pendapatan (Juta Rp)': 90.0, 'Biaya HPP (Juta Rp)': 64.0, 'Laba Bersih (Juta Rp)': 26.0, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1017', 'Tanggal': '2026-04-10', 'Wilayah': 'Sumatera Utara', 'Kategori': 'Fashion & Pakaian', 'Produk': 'Sepatu Sneakers Kulit', 'Sales Person': 'Siti Rahma', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 40, 'Pendapatan (Juta Rp)': 32.0, 'Biaya HPP (Juta Rp)': 19.5, 'Laba Bersih (Juta Rp)': 12.5, 'Metode Bayar': 'QRIS' },
  { 'ID Transaksi': 'TRX-1018', 'Tanggal': '2026-04-17', 'Wilayah': 'DKI Jakarta', 'Kategori': 'Perlengkapan Kantor', 'Produk': 'Meja Kerja Standing Desk', 'Sales Person': 'Ahmad Fauzi', 'Segmen': 'B2B Corporate', 'Jumlah Unit': 16, 'Pendapatan (Juta Rp)': 67.2, 'Biaya HPP (Juta Rp)': 46.0, 'Laba Bersih (Juta Rp)': 21.2, 'Metode Bayar': 'Transfer Bank' },
  { 'ID Transaksi': 'TRX-1019', 'Tanggal': '2026-04-23', 'Wilayah': 'Jawa Timur', 'Kategori': 'Elektronik', 'Produk': 'TWS Headphone ANC', 'Sales Person': 'Rian Pratama', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 70, 'Pendapatan (Juta Rp)': 63.0, 'Biaya HPP (Juta Rp)': 40.5, 'Laba Bersih (Juta Rp)': 22.5, 'Metode Bayar': 'Virtual Account' },
  { 'ID Transaksi': 'TRX-1020', 'Tanggal': '2026-04-28', 'Wilayah': 'Sulawesi Selatan', 'Kategori': 'F&B & Kuliner', 'Produk': 'Paket Hampers Snack Artisan', 'Sales Person': 'Dewi Lestari', 'Segmen': 'Retail Konsumen', 'Jumlah Unit': 80, 'Pendapatan (Juta Rp)': 32.0, 'Biaya HPP (Juta Rp)': 19.0, 'Laba Bersih (Juta Rp)': 13.0, 'Metode Bayar': 'QRIS' },
];

// 2. Kinerja SDM & HR Analytics (20 rows)
const rawHrData = [
  { 'NIK': 'EMP-01', 'Nama Karyawan': 'Andi Wijaya', 'Departemen': 'Engineering', 'Posisi': 'Senior Backend Dev', 'Gaji Pokok (Juta)': 24.5, 'Jam Lembur': 14, 'Skor Kinerja (1-5)': 4.8, 'Masa Kerja (Thn)': 4.2, 'Pelatihan Selesai': 6, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-02', 'Nama Karyawan': 'Bella Safitri', 'Departemen': 'Marketing', 'Posisi': 'Growth Lead', 'Gaji Pokok (Juta)': 18.0, 'Jam Lembur': 28, 'Skor Kinerja (1-5)': 4.2, 'Masa Kerja (Thn)': 2.5, 'Pelatihan Selesai': 4, 'Status Retensi': 'Perlu Perhatian' },
  { 'NIK': 'EMP-03', 'Nama Karyawan': 'Candra Gunawan', 'Departemen': 'Product', 'Posisi': 'Product Manager', 'Gaji Pokok (Juta)': 22.0, 'Jam Lembur': 18, 'Skor Kinerja (1-5)': 4.6, 'Masa Kerja (Thn)': 3.1, 'Pelatihan Selesai': 5, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-04', 'Nama Karyawan': 'Dian Kusuma', 'Departemen': 'Sales', 'Posisi': 'Account Executive', 'Gaji Pokok (Juta)': 14.5, 'Jam Lembur': 34, 'Skor Kinerja (1-5)': 3.9, 'Masa Kerja (Thn)': 1.4, 'Pelatihan Selesai': 2, 'Status Retensi': 'Risiko Burnout' },
  { 'NIK': 'EMP-05', 'Nama Karyawan': 'Eko Prasetyo', 'Departemen': 'Engineering', 'Posisi': 'DevOps Engineer', 'Gaji Pokok (Juta)': 21.0, 'Jam Lembur': 8, 'Skor Kinerja (1-5)': 4.5, 'Masa Kerja (Thn)': 3.8, 'Pelatihan Selesai': 7, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-06', 'Nama Karyawan': 'Fany Ananda', 'Departemen': 'Finance & Tax', 'Posisi': 'Finance Specialist', 'Gaji Pokok (Juta)': 13.0, 'Jam Lembur': 12, 'Skor Kinerja (1-5)': 4.3, 'Masa Kerja (Thn)': 2.0, 'Pelatihan Selesai': 3, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-07', 'Nama Karyawan': 'Gilang Ramadhan', 'Departemen': 'Customer Support', 'Posisi': 'CS Team Lead', 'Gaji Pokok (Juta)': 11.5, 'Jam Lembur': 22, 'Skor Kinerja (1-5)': 3.8, 'Masa Kerja (Thn)': 1.8, 'Pelatihan Selesai': 3, 'Status Retensi': 'Perlu Perhatian' },
  { 'NIK': 'EMP-08', 'Nama Karyawan': 'Hana Maulida', 'Departemen': 'Engineering', 'Posisi': 'Frontend Dev', 'Gaji Pokok (Juta)': 16.5, 'Jam Lembur': 10, 'Skor Kinerja (1-5)': 4.7, 'Masa Kerja (Thn)': 2.2, 'Pelatihan Selesai': 5, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-09', 'Nama Karyawan': 'Indra Gunawan', 'Departemen': 'Sales', 'Posisi': 'Enterprise Sales', 'Gaji Pokok (Juta)': 19.5, 'Jam Lembur': 26, 'Skor Kinerja (1-5)': 4.4, 'Masa Kerja (Thn)': 3.5, 'Pelatihan Selesai': 4, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-10', 'Nama Karyawan': 'Joko Prabowo', 'Departemen': 'Operations', 'Posisi': 'Warehouse Manager', 'Gaji Pokok (Juta)': 15.0, 'Jam Lembur': 30, 'Skor Kinerja (1-5)': 3.6, 'Masa Kerja (Thn)': 4.9, 'Pelatihan Selesai': 2, 'Status Retensi': 'Risiko Burnout' },
  { 'NIK': 'EMP-11', 'Nama Karyawan': 'Karina Putri', 'Departemen': 'Product', 'Posisi': 'UI/UX Designer', 'Gaji Pokok (Juta)': 17.0, 'Jam Lembur': 11, 'Skor Kinerja (1-5)': 4.9, 'Masa Kerja (Thn)': 2.7, 'Pelatihan Selesai': 6, 'Status Retensi': 'Aman' },
  { 'NIK': 'EMP-12', 'Nama Karyawan': 'Lukman Hakim', 'Departemen': 'Engineering', 'Posisi': 'QA Automation Lead', 'Gaji Pokok (Juta)': 19.0, 'Jam Lembur': 16, 'Skor Kinerja (1-5)': 4.4, 'Masa Kerja (Thn)': 3.0, 'Pelatihan Selesai': 5, 'Status Retensi': 'Aman' },
];

// 3. Logistik & Rantai Pasok (Supply Chain & Inventory)
const rawSupplyChainData = [
  { 'Kode SKU': 'SKU-EL-01', 'Nama Barang': 'Motherboard Server X1', 'Kategori': 'Komponen Inti', 'Gudang': 'Cikarang Hub', 'Stok Saat Ini': 140, 'Titik Pemesanan (ROP)': 80, 'Biaya Unit (Ribu)': 1850, 'Lead Time Supplier (Hari)': 14, 'Status Stok': 'Aman', 'Tingkat Perputaran': 'Tinggi' },
  { 'Kode SKU': 'SKU-EL-02', 'Nama Barang': 'RAM DDR5 32GB', 'Kategori': 'Memory & Storage', 'Gudang': 'Cikarang Hub', 'Stok Saat Ini': 45, 'Titik Pemesanan (ROP)': 60, 'Biaya Unit (Ribu)': 720, 'Lead Time Supplier (Hari)': 21, 'Status Stok': 'Kritis (Reorder)', 'Tingkat Perputaran': 'Sangat Tinggi' },
  { 'Kode SKU': 'SKU-EL-03', 'Nama Barang': 'Power Supply 850W Gold', 'Kategori': 'Komponen Inti', 'Gudang': 'Surabaya Hub', 'Stok Saat Ini': 210, 'Titik Pemesanan (ROP)': 90, 'Biaya Unit (Ribu)': 950, 'Lead Time Supplier (Hari)': 10, 'Status Stok': 'Optimal', 'Tingkat Perputaran': 'Sedang' },
  { 'Kode SKU': 'SKU-EL-04', 'Nama Barang': 'SSD NVMe Gen4 2TB', 'Kategori': 'Memory & Storage', 'Gudang': 'Medan Hub', 'Stok Saat Ini': 32, 'Titik Pemesanan (ROP)': 50, 'Biaya Unit (Ribu)': 1200, 'Lead Time Supplier (Hari)': 25, 'Status Stok': 'Kritis (Reorder)', 'Tingkat Perputaran': 'Tinggi' },
  { 'Kode SKU': 'SKU-EL-05', 'Nama Barang': 'Case ATX Silent Tower', 'Kategori': 'Aksesoris & Casing', 'Gudang': 'Cikarang Hub', 'Stok Saat Ini': 340, 'Titik Pemesanan (ROP)': 110, 'Biaya Unit (Ribu)': 650, 'Lead Time Supplier (Hari)': 7, 'Status Stok': 'Overstock', 'Tingkat Perputaran': 'Rendah' },
  { 'Kode SKU': 'SKU-EL-06', 'Nama Barang': 'Liquid Cooler 360mm', 'Kategori': 'Cooling System', 'Gudang': 'Surabaya Hub', 'Stok Saat Ini': 88, 'Titik Pemesanan (ROP)': 75, 'Biaya Unit (Ribu)': 890, 'Lead Time Supplier (Hari)': 12, 'Status Stok': 'Optimal', 'Tingkat Perputaran': 'Sedang' },
  { 'Kode SKU': 'SKU-EL-07', 'Nama Barang': 'Kabel Sleeved Pro Modular', 'Kategori': 'Aksesoris & Casing', 'Gudang': 'Makassar Hub', 'Stok Saat Ini': 19, 'Titik Pemesanan (ROP)': 40, 'Biaya Unit (Ribu)': 240, 'Lead Time Supplier (Hari)': 18, 'Status Stok': 'Kritis (Reorder)', 'Tingkat Perputaran': 'Sedang' },
  { 'Kode SKU': 'SKU-EL-08', 'Nama Barang': 'Fan Case ARGB 120mm Pack', 'Kategori': 'Cooling System', 'Gudang': 'Cikarang Hub', 'Stok Saat Ini': 420, 'Titik Pemesanan (ROP)': 150, 'Biaya Unit (Ribu)': 310, 'Lead Time Supplier (Hari)': 8, 'Status Stok': 'Optimal', 'Tingkat Perputaran': 'Tinggi' },
];

// 4. Manajemen Proyek & Portofolio (PMO & Capex)
const rawProjectData = [
  { 'ID Proyek': 'PRJ-2601', 'Nama Proyek': 'Revamp Mobile App v3.0', 'Divisi': 'Teknologi Informasi', 'Budget Rencana (Juta)': 450, 'Biaya Realisasi (Juta)': 395, 'Kemajuan (%)': 92, 'Sisa Hari': 12, 'Status Proyek': 'On Track', 'Tingkat Risiko': 'Rendah', 'Project Manager': 'Arief Budiman' },
  { 'ID Proyek': 'PRJ-2602', 'Nama Proyek': 'Automasi Gudang Cikarang', 'Divisi': 'Operasional & Rantai Pasok', 'Budget Rencana (Juta)': 980, 'Biaya Realisasi (Juta)': 1080, 'Kemajuan (%)': 74, 'Sisa Hari': -8, 'Status Proyek': 'Over Budget & Delayed', 'Tingkat Risiko': 'Tinggi', 'Project Manager': 'Dewi Sartika' },
  { 'ID Proyek': 'PRJ-2603', 'Nama Proyek': 'Migrasi Cloud Data Lake', 'Divisi': 'Data & Analytics', 'Budget Rencana (Juta)': 320, 'Biaya Realisasi (Juta)': 285, 'Kemajuan (%)': 88, 'Sisa Hari': 24, 'Status Proyek': 'On Track', 'Tingkat Risiko': 'Sedang', 'Project Manager': 'Fauzan Hadi' },
  { 'ID Proyek': 'PRJ-2604', 'Nama Proyek': 'Implementasi ERP Keuangan', 'Divisi': 'Finance & Accounting', 'Budget Rencana (Juta)': 750, 'Biaya Realisasi (Juta)': 730, 'Kemajuan (%)': 81, 'Sisa Hari': 35, 'Status Proyek': 'On Track', 'Tingkat Risiko': 'Sedang', 'Project Manager': 'Maya Puspita' },
  { 'ID Proyek': 'PRJ-2605', 'Nama Proyek': 'Audit Kepatuhan ISO 27001', 'Divisi': 'Legal & Compliance', 'Budget Rencana (Juta)': 160, 'Biaya Realisasi (Juta)': 155, 'Kemajuan (%)': 98, 'Sisa Hari': 5, 'Status Proyek': 'Hampir Selesai', 'Tingkat Risiko': 'Rendah', 'Project Manager': 'Hendra Setiawan' },
  { 'ID Proyek': 'PRJ-2606', 'Nama Proyek': 'Omnichannel POS Integrator', 'Divisi': 'Teknologi Informasi', 'Budget Rencana (Juta)': 290, 'Biaya Realisasi (Juta)': 320, 'Kemajuan (%)': 65, 'Sisa Hari': -14, 'Status Proyek': 'Delayed', 'Tingkat Risiko': 'Tinggi', 'Project Manager': 'Arief Budiman' },
];

// 5. Pemasaran Digital & Kampanye Iklan
const rawMarketingData = [
  { 'Kampanye': 'Ramadhan Mega Deal', 'Platform': 'Meta Ads (IG/FB)', 'Biaya Iklan (Juta)': 48.0, 'Impresi (Ribu)': 1450, 'Klik': 32400, 'Konversi Penjualan': 1280, 'Pendapatan Dihasilkan (Juta)': 256.0, 'CTR (%)': 2.23, 'ROAS': 5.33, 'Status': 'Selesai' },
  { 'Kampanye': 'Google Search Brand Tech', 'Platform': 'Google Ads', 'Biaya Iklan (Juta)': 36.5, 'Impresi (Ribu)': 820, 'Klik': 29500, 'Konversi Penjualan': 1140, 'Pendapatan Dihasilkan (Juta)': 216.6, 'CTR (%)': 3.60, 'ROAS': 5.93, 'Status': 'Aktif' },
  { 'Kampanye': 'TikTok FYP Viral Challenge', 'Platform': 'TikTok Ads', 'Biaya Iklan (Juta)': 55.0, 'Impresi (Ribu)': 3200, 'Klik': 58000, 'Konversi Penjualan': 1620, 'Pendapatan Dihasilkan (Juta)': 243.0, 'CTR (%)': 1.81, 'ROAS': 4.42, 'Status': 'Aktif' },
  { 'Kampanye': 'B2B Enterprise LinkedIn Push', 'Platform': 'LinkedIn Ads', 'Biaya Iklan (Juta)': 28.0, 'Impresi (Ribu)': 180, 'Klik': 4200, 'Konversi Penjualan': 145, 'Pendapatan Dihasilkan (Juta)': 188.5, 'CTR (%)': 2.33, 'ROAS': 6.73, 'Status': 'Aktif' },
  { 'Kampanye': 'Retargeting Cart Abandonment', 'Platform': 'Meta Ads (IG/FB)', 'Biaya Iklan (Juta)': 18.5, 'Impresi (Ribu)': 410, 'Klik': 16800, 'Konversi Penjualan': 890, 'Pendapatan Dihasilkan (Juta)': 142.4, 'CTR (%)': 4.10, 'ROAS': 7.70, 'Status': 'Aktif' },
  { 'Kampanye': 'KOL Creator Endorsement', 'Platform': 'Influencer / KOL', 'Biaya Iklan (Juta)': 42.0, 'Impresi (Ribu)': 2100, 'Klik': 24000, 'Konversi Penjualan': 710, 'Pendapatan Dihasilkan (Juta)': 135.0, 'CTR (%)': 1.14, 'ROAS': 3.21, 'Status': 'Selesai' },
];

export interface SampleDatasetDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  fileName: string;
  getWorkbook: () => WorkbookData;
}

export const SAMPLE_DATASETS: SampleDatasetDefinition[] = [
  {
    id: 'sales-ecommerce',
    name: 'Penjualan & Omset E-Commerce',
    category: 'Sales & Revenue',
    description: 'Data omset multi-wilayah, produk, laba bersih, channel bayar, dan segmen konsumen.',
    fileName: 'Laporan_Penjualan_Q1_2026.xlsx',
    getWorkbook: () => {
      const headers = Object.keys(rawSalesData[0]);
      const sheet = profileSheet('Penjualan', headers, rawSalesData);
      return {
        fileName: 'Laporan_Penjualan_Q1_2026.xlsx',
        fileSize: 48200,
        sheetNames: ['Penjualan'],
        activeSheetName: 'Penjualan',
        sheets: { Penjualan: sheet },
        uploadedAt: new Date().toISOString(),
      };
    },
  },
  {
    id: 'hr-people',
    name: 'Kinerja SDM & HR Analytics',
    category: 'Human Capital',
    description: 'Analisis departemen, skor kinerja, lembur, masa kerja, gaji, dan risiko retensi.',
    fileName: 'Evaluasi_Kinerja_Karyawan.xlsx',
    getWorkbook: () => {
      const headers = Object.keys(rawHrData[0]);
      const sheet = profileSheet('Karyawan', headers, rawHrData);
      return {
        fileName: 'Evaluasi_Kinerja_Karyawan.xlsx',
        fileSize: 32400,
        sheetNames: ['Karyawan'],
        activeSheetName: 'Karyawan',
        sheets: { Karyawan: sheet },
        uploadedAt: new Date().toISOString(),
      };
    },
  },
  {
    id: 'supply-chain',
    name: 'Logistik & Rantai Pasok Gudang',
    category: 'Inventory & Operations',
    description: 'Tingkat stok SKU, titik pemesanan ulang (ROP), lead time supplier, dan nilai pergudangan.',
    fileName: 'Monitor_Stok_Gudang_MultiHub.xlsx',
    getWorkbook: () => {
      const headers = Object.keys(rawSupplyChainData[0]);
      const sheet = profileSheet('Inventaris', headers, rawSupplyChainData);
      return {
        fileName: 'Monitor_Stok_Gudang_MultiHub.xlsx',
        fileSize: 36100,
        sheetNames: ['Inventaris'],
        activeSheetName: 'Inventaris',
        sheets: { Inventaris: sheet },
        uploadedAt: new Date().toISOString(),
      };
    },
  },
  {
    id: 'pmo-projects',
    name: 'Manajemen Proyek & Anggaran PMO',
    category: 'Project Management',
    description: 'Realisasi anggaran Capex vs rencana, jadwal keterlambatan, dan matriks risiko proyek.',
    fileName: 'Portofolio_Proyek_Strategis_2026.xlsx',
    getWorkbook: () => {
      const headers = Object.keys(rawProjectData[0]);
      const sheet = profileSheet('Proyek', headers, rawProjectData);
      return {
        fileName: 'Portofolio_Proyek_Strategis_2026.xlsx',
        fileSize: 28900,
        sheetNames: ['Proyek'],
        activeSheetName: 'Proyek',
        sheets: { Proyek: sheet },
        uploadedAt: new Date().toISOString(),
      };
    },
  },
  {
    id: 'marketing-ads',
    name: 'Kinerja Pemasaran Digital & ROAS',
    category: 'Growth & Marketing',
    description: 'Efektivitas belanja iklan Meta, Google, TikTok, konversi leads, dan ROI per platform.',
    fileName: 'Kinerja_Kampanye_Iklan_Digital.xlsx',
    getWorkbook: () => {
      const headers = Object.keys(rawMarketingData[0]);
      const sheet = profileSheet('Kampanye', headers, rawMarketingData);
      return {
        fileName: 'Kinerja_Kampanye_Iklan_Digital.xlsx',
        fileSize: 31200,
        sheetNames: ['Kampanye'],
        activeSheetName: 'Kampanye',
        sheets: { Kampanye: sheet },
        uploadedAt: new Date().toISOString(),
      };
    },
  },
];
