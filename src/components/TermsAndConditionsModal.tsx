import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  X, 
  ScrollText, 
  ChevronDown, 
  Scale, 
  AlertTriangle, 
  Check, 
  Printer, 
  Download,
  Building2
} from 'lucide-react';
import { AetraLogo } from './AetraLogo';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  isAccepted?: boolean;
}

export const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  isAccepted = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(isAccepted);
  const [agreeChecked, setAgreeChecked] = useState(isAccepted);
  const [readProgress, setReadProgress] = useState(isAccepted ? 100 : 0);

  useEffect(() => {
    if (isAccepted) {
      setAgreeChecked(true);
      setHasScrolledToBottom(true);
      setReadProgress(100);
    }
  }, [isAccepted]);

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const progress = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100));
    setReadProgress(progress);
    if (progress >= 90) {
      setHasScrolledToBottom(true);
    }
  };

  const handleScrollToBottomClick = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header ala Perbankan / Corporate */}
        <div className="bg-gradient-to-r from-[#005DAA] via-[#004B8A] to-[#003868] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b-4 border-[#F37021] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0 shadow-md">
              <Scale className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15">
                  Dokumen Hukum Resmi
                </span>
                <span className="text-xs text-blue-200 font-semibold">
                  PT Aetra Air Tangerang
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                Syarat dan Ketentuan Berlangganan Sambungan Air Bersih
              </h2>
              <p className="text-xs text-blue-100/90">
                Persetujuan Perjanjian Pelayanan Sambungan Baru &amp; Standar Operasional AAT
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar membaca dokumen */}
        <div className="w-full bg-slate-100 h-1.5 shrink-0">
          <div 
            className="bg-gradient-to-r from-[#005DAA] to-emerald-500 h-1.5 transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* Scrollable Terms Content */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed bg-slate-50/50 flex-1 font-sans select-text"
        >
          {/* Header Surat Perjanjian */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <AetraLogo size="sm" variant="horizontal" />
              <div className="text-right text-[11px] text-slate-500">
                <div className="font-bold text-slate-800">PERJANJIAN PELAYANAN SAMBUNGAN BARU</div>
                <div>No. Dokumen: AAT-SKB/REG-2026</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 italic">
              Harap membaca dengan seksama Syarat dan Ketentuan Berlangganan Air Bersih ini. Dengan mencentang kotak persetujuan dan mengirimkan formulir permohonan, Pemohon menyatakan tunduk dan terikat secara hukum pada seluruh ketentuan di bawah ini.
            </p>
          </div>

          {/* PASAL 1 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">1</span>
              <span>PASAL 1 — HAK DAN KEWAJIBAN PT AETRA AIR TANGERANG (&ldquo;AAT&rdquo;)</span>
            </h3>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">1. Kewajiban AAT</h4>
              <ul className="space-y-1.5 list-none pl-1 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(1)</span>
                  <span>Menyediakan air sesuai standar <strong>Peraturan Menteri Kesehatan No. 2 Tahun 2023</strong> tentang Peraturan Pelaksanaan Pemerintah Nomor 66 Tahun 2014 tentang Kesehatan Lingkungan (&ldquo;Air&rdquo;) kepada Pelanggan sampai ke titik lokasi meter Air yang dipasang AAT pada bangunan di lokasi Pelanggan (&ldquo;Properti Pelanggan&rdquo;), secara terus-menerus selama 24 jam sehari, 7 hari seminggu, kecuali dalam Keadaan Kahar atau selama masa perbaikan dan pemeliharaan instalasi sambungan pipa dan meter Air serta kelengkapan terkait pengolahan Air.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(2)</span>
                  <span>Menyediakan dan memasang Sambungan Pipa dan Meter dengan kualitas baik sesuai standar AAT. Sambungan Pipa dan Meter adalah milik AAT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(3)</span>
                  <span>Melakukan dan menanggung biaya pemeliharaan Sambungan Pipa dan Meter, baik perbaikan maupun penggantian sesuai standar AAT, kecuali jika terjadi perusakan, pencurian, atau penyalahgunaan oleh Pelanggan.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs">2. Hak AAT</h4>
              <ul className="space-y-1.5 list-none pl-1 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(1)</span>
                  <span>Mendapatkan pembayaran dari Pelanggan atas pemakaian Air dan biaya-biaya lain (abonemen, biaya pemakaian minimum, denda, dsb.) sesuai tagihan yang disampaikan AAT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(2)</span>
                  <span>Mendapat akses untuk melaksanakan pemeriksaan Properti Pelanggan guna keperluan penyambungan, pemeliharaan, dan pemeriksaan Sambungan Pipa dan Meter serta perubahan kondisi Properti Pelanggan terkait penggolongan Pelanggan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(3)</span>
                  <span>Dapat memutuskan sementara aliran Air jika Pelanggan tidak melakukan pembayaran dalam jangka waktu yang ditentukan dalam tagihan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(4)</span>
                  <span>Dapat memutuskan aliran Air secara permanen jika Pelanggan tidak melunasi tagihan dalam 60 hari kerja sejak tanggal tagihan dicetak. Jika ingin layanan kembali, Pelanggan wajib mendaftar sambungan baru setelah melunasi seluruh tagihan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#005DAA] shrink-0">(5)</span>
                  <span>Mengenakan denda dan sanksi atas keterlambatan pembayaran serta pelanggaran lain oleh Pelanggan.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* PASAL 2 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">2</span>
              <span>PASAL 2 — HAK DAN KEWAJIBAN PELANGGAN</span>
            </h3>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">1. Kewajiban Pelanggan</h4>
              <ul className="space-y-1.5 list-none pl-1 text-slate-600">
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Mengisi formulir permohonan sambungan baru dengan data yang benar dan melengkapi seluruh persyaratan administrasi serta keuangan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Membayar biaya sambungan baru (material, pengerjaan, pemasangan, administrasi, dan pajak terkait).</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Membayar biaya tambahan jika panjang sambungan melebihi standar yang ditetapkan AAT.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(4)</span><span>Membayar tagihan setiap bulan sebelum tanggal jatuh tempo; keterlambatan dikenakan denda dan sanksi sesuai ketentuan yang berlaku.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(5)</span><span>Membayar pajak-pajak terkait sesuai ketentuan hukum yang berlaku.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(6)</span><span>Bertanggung jawab menjaga keutuhan Sambungan Pipa dan Meter yang terpasang di Properti Pelanggan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(7)</span><span>Melaporkan kerusakan Sambungan Pipa dan Meter atau masalah kualitas Air (air mati, keruh, aliran kecil, berbau, kotor, dsb.) agar segera ditindaklanjuti.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(8)</span><span>Memastikan meter Air selalu terjangkau oleh petugas AAT dan dapat dibaca dengan jelas; jika tidak dapat dijangkau, AAT berhak memperkirakan pemakaian berdasarkan rata-rata pemakaian bulan sebelumnya.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(9)</span><span>Memberikan izin kepada petugas AAT untuk memasuki halaman/bangunan guna pemeliharaan, perbaikan, dan pemeriksaan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(10)</span><span>Melaporkan perubahan status kepemilikan, kondisi fisik, dan peruntukan Properti Pelanggan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(11)</span><span>Menyediakan wadah penampungan air dengan kapasitas minimal kebutuhan 1 hari guna mengantisipasi gangguan suplai.</span></li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs">2. Hak Pelanggan</h4>
              <ul className="space-y-1.5 list-none pl-1 text-slate-600">
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Mendapatkan layanan pemasangan Sambungan Pipa dan Meter pada Properti Pelanggan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Mendapatkan aliran Air selama 24 jam sehari, 7 hari seminggu, kecuali dalam Keadaan Kahar atau masa perbaikan/pemeliharaan.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Mendapatkan layanan pemeliharaan Sambungan Pipa dan Meter sesuai kewajiban AAT pada Pasal 1.</span></li>
                <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(4)</span><span>Mendapatkan informasi tagihan bulanan yang memuat rincian volume pemakaian Air dan biaya lain yang terkait.</span></li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
              <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>3. Larangan Bagi Pelanggan</span>
              </h4>
              <p className="text-[11px] text-rose-800">Pelanggan dilarang keras melakukan tindakan sebagai berikut:</p>
              <ul className="space-y-1 list-none pl-1 text-rose-900 text-[11px]">
                <li>(1) Melepas, merusak, atau menghilangkan segel meter Air.</li>
                <li>(2) Membalik arah, menimbun, atau menghilangkan meter Air.</li>
                <li>(3) Mengubah ukuran/letak pipa Air atau memindahkan meter Air tanpa izin tertulis AAT.</li>
                <li>(4) Menyadap Air langsung dari pipa tanpa melalui meter Air (pencurian air).</li>
                <li>(5) Menggunakan pompa air listrik untuk menyedot Air langsung dari pipa sebelum meteran.</li>
                <li>(6) Menjual Air kepada pihak lain tanpa izin resmi.</li>
                <li>(7) Memecahkan atau merusak kaca penutup meter Air.</li>
                <li>(8) Mengikir, memotong baling-baling, memasang magnet, memasukkan kawat/benda asing yang merusak atau memperlambat kerja meter.</li>
                <li>(9) Menguruk, menimbun, atau membiarkan meter Air tertutup puing atau kotoran.</li>
                <li>(10) Memasukkan zat kimia atau benda apapun ke dalam pipa sebelum meter yang dapat mencemari air.</li>
              </ul>
            </div>
          </section>

          {/* PASAL 3 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">3</span>
              <span>PASAL 3 — TAGIHAN BULANAN</span>
            </h3>
            <ul className="space-y-1.5 list-none pl-1 text-slate-600">
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Setiap bulan, Pelanggan dikenakan tagihan yang terdiri dari biaya abonemen dan biaya pemakaian Air.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Pelanggan wajib membayar tagihan paling lambat pada tanggal jatuh tempo yang ditetapkan AAT.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Besaran abonemen ditentukan berdasarkan kelompok Pelanggan, golongan tarif, dan ukuran meter Air yang terpasang.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(4)</span><span>Biaya pemakaian Air dihitung berdasarkan volume (kubikasi) pemakaian selama satu bulan penagihan sesuai tarif yang berlaku.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(5)</span><span>Biaya pemakaian minimum dikenakan jika volume pemakaian di bawah batas minimum yang ditetapkan AAT.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(6)</span><span>Pajak yang timbul dari tagihan bulanan, termasuk bea meterai, dibebankan kepada Pelanggan.</span></li>
            </ul>
          </section>

          {/* PASAL 4 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">4</span>
              <span>PASAL 4 — TARIF AIR</span>
            </h3>
            <ul className="space-y-1.5 list-none pl-1 text-slate-600">
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Tarif Air dibedakan berdasarkan kelompok Pelanggan dan ditagihkan berdasarkan volume pemakaian dalam blok konsumsi berikut: <strong>Blok B1 (0 &ndash; 10 m&sup3;)</strong>, <strong>Blok B2 (11 &ndash; 20 m&sup3;)</strong>, dan <strong>Blok B3 (lebih dari 20 m&sup3;)</strong>.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Kelompok Pelanggan ditentukan berdasarkan peruntukan, luas, dan kondisi Properti Pelanggan serta tanah tempat properti berada.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Besaran tarif Air, abonemen, dan perubahannya ditetapkan berdasarkan Peraturan Bupati Tangerang.</span></li>
            </ul>
          </section>

          {/* PASAL 5 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">5</span>
              <span>PASAL 5 — BIAYA LAIN</span>
            </h3>
            <p className="text-slate-600">Selain tagihan bulanan, Pelanggan dapat dikenakan biaya lain terkait:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>(1) Sambungan baru</div>
              <div>(2) Penggantian meter karena kelalaian</div>
              <div>(3) Pengujian kualitas Air atas permintaan</div>
              <div>(4) Pengujian kalibrasi meter Air</div>
              <div>(5) Balik nama Properti Pelanggan</div>
              <div>(6) Denda pemakaian Air ilegal</div>
              <div>(7) Denda pemasangan pipa ilegal</div>
              <div>(8) Biaya penyambungan kembali</div>
              <div>(9) Denda keterlambatan bayar</div>
              <div>(10) Penggantian segel meter putus</div>
              <div>(11) Pemindahan letak meter</div>
              <div>(12) Penggantian pipa persil</div>
              <div>(13) Pemeriksaan instalasi mandiri</div>
              <div>(14) Sewa instalasi / Biaya lainnya</div>
            </div>
            <p className="text-[11px] text-slate-500">Jenis dan besaran biaya di atas ditetapkan oleh AAT dan dapat berubah sewaktu-waktu sesuai ketentuan yang berlaku.</p>
          </section>

          {/* PASAL 6 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">6</span>
              <span>PASAL 6 — PROSEDUR KELUHAN PELANGGAN</span>
            </h3>
            <p className="text-slate-600">Pelanggan berhak mendapatkan layanan tanggapan atas keluhan, termasuk keadaan darurat terkait kuantitas/kualitas Air serta Sambungan Pipa dan Meter, melalui:</p>
            <ul className="space-y-1 list-none pl-1 text-slate-600">
              <li className="flex items-center gap-2"><span className="font-bold text-[#005DAA]">(1)</span><span>Datang langsung ke Kantor Pelayanan Pelanggan (KPP) AAT pada jam kerja.</span></li>
              <li className="flex items-center gap-2"><span className="font-bold text-[#005DAA]">(2)</span><span>Mengirimkan surat resmi ke alamat KPP AAT yang bersangkutan.</span></li>
              <li className="flex items-center gap-2"><span className="font-bold text-[#005DAA]">(3)</span><span>Menelepon Contact Centre / Call Center AAT di 021-5968-9999 atau WhatsApp Customer Care.</span></li>
            </ul>
          </section>

          {/* PASAL 7 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">7</span>
              <span>PASAL 7 — JANGKA WAKTU DAN PENGAKHIRAN PERJANJIAN</span>
            </h3>
            <ul className="space-y-1.5 list-none pl-1 text-slate-600">
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Syarat dan Ketentuan ini berlaku untuk jangka waktu tidak tertentu sampai diakhiri oleh salah satu Pihak dengan pemberitahuan tertulis 1 (satu) bulan sebelumnya.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Sesuai Pasal 1 ayat 2 angka (4), Syarat dan Ketentuan ini berakhir secara otomatis pada saat pemutusan sambungan permanen; pemberitahuan pemutusan sambungan dianggap sebagai pemberitahuan tertulis pengakhiran perjanjian.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Kewajiban Pelanggan yang masih terutang tetap wajib dipenuhi dan dilunasi meskipun Syarat dan Ketentuan ini telah diakhiri.</span></li>
            </ul>
          </section>

          {/* PASAL 8 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">8</span>
              <span>PASAL 8 — KERAHASIAAN DATA</span>
            </h3>
            <ul className="space-y-1.5 list-none pl-1 text-slate-600">
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Data dan informasi masing-masing Pihak wajib dijaga kerahasiaannya selama berlakunya Syarat dan Ketentuan ini, kecuali jika dibuka sesuai ketentuan peraturan perundang-undangan Republik Indonesia.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>AAT dapat menggunakan data dan informasi Pelanggan secara aman semata-mata untuk keperluan pelayanan kepada Pelanggan serta operasional kelancaran suplai air AAT.</span></li>
            </ul>
          </section>

          {/* PASAL 9 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">9</span>
              <span>PASAL 9 — KEADAAN KAHAR (FORCE MAJEURE)</span>
            </h3>
            <p className="text-slate-600">Keadaan Kahar adalah keadaan di luar kehendak Para Pihak yang menyebabkan kewajiban tidak dapat dipenuhi, meliputi:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>(1) Peperangan yang melibatkan RI</div>
              <div>(2) Kerusuhan atau huru-hara</div>
              <div>(3) Revolusi / sabotase</div>
              <div>(4) Pemogokan massal</div>
              <div>(5) Kebakaran besar</div>
              <div>(6) Bencana alam (gempa, banjir, longsor)</div>
              <div>(7) Pencemaran air baku oleh pihak ketiga</div>
              <div>(8) Keputusan Pemerintah yang menghalangi</div>
              <div>(9) Gangguan suplai listrik / industri memaksa</div>
            </div>
          </section>

          {/* PASAL 10 & 11 */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-black text-[#005DAA] border-b border-blue-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#005DAA] flex items-center justify-center font-mono text-xs">10</span>
              <span>PASAL 10 — HUKUM DAN PENYELESAIAN PERSELISIHAN</span>
            </h3>
            <ul className="space-y-1.5 list-none pl-1 text-slate-600">
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(1)</span><span>Syarat dan Ketentuan ini tunduk pada dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(2)</span><span>Segala perselisihan yang timbul akan diselesaikan terlebih dahulu secara musyawarah untuk mufakat.</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#005DAA] shrink-0">(3)</span><span>Jika musyawarah tidak mencapai mufakat dalam waktu 30 (tiga puluh) hari kalender, perselisihan akan diselesaikan melalui yurisdiksi <strong>Pengadilan Negeri Tangerang</strong>.</span></li>
            </ul>

            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs">PASAL 11 — KETENTUAN PENUTUP</h4>
              <ul className="space-y-1 list-none pl-1 text-slate-600 text-[11px]">
                <li>(1) Hal-hal yang belum diatur atau perubahan atas Syarat dan Ketentuan ini akan ditetapkan kemudian oleh AAT dan merupakan satu kesatuan yang tidak terpisahkan dari Syarat dan Ketentuan Berlangganan ini.</li>
                <li>(2) AAT berhak menetapkan ketentuan dan prosedur teknis lebih lanjut untuk pengaturan dan pelayanan optimal kepada Pelanggan.</li>
              </ul>
            </div>
          </section>

          {/* Floating indicator if not scrolled to bottom */}
          {!hasScrolledToBottom && (
            <div className="sticky bottom-2 flex justify-center">
              <button
                type="button"
                onClick={handleScrollToBottomClick}
                className="px-4 py-2 bg-[#005DAA] hover:bg-[#004B8A] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 transition animate-bounce cursor-pointer"
              >
                <span>Gulir ke Bawah untuk Menyetujui</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Persetujuan ala Bank */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-200 shrink-0 space-y-4 shadow-lg">
          <label className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition cursor-pointer ${
            agreeChecked
              ? 'bg-emerald-50/80 border-emerald-500 text-slate-900'
              : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-blue-50/50'
          }`}>
            <input
              type="checkbox"
              checked={agreeChecked}
              onChange={(e) => setAgreeChecked(e.target.checked)}
              className="w-5 h-5 rounded-md text-[#005DAA] focus:ring-[#005DAA] border-slate-300 mt-0.5 shrink-0 cursor-pointer"
            />
            <div className="text-xs space-y-1 select-none">
              <span className="font-black text-slate-900 block">
                Pernyataan Persetujuan Berlangganan (Pasal 1 s/d Pasal 11):
              </span>
              <span className="text-[11px] text-slate-600 leading-relaxed block">
                "Dengan menandatangani/mengirim formulir ini, Pelanggan menyatakan <strong>telah membaca, memahami, dan setuju tunduk</strong> kepada seluruh Syarat dan Ketentuan Berlangganan (Pasal 1 sampai dengan Pasal 11) yang berlaku dan merupakan hubungan kepelangganan yang sah menurut hukum dengan <strong>PT Aetra Air Tangerang</strong>."
              </span>
            </div>
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dokumen Persetujuan Resmi Standar Perjanjian Baku Hukum Indonesia</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={!agreeChecked}
                onClick={() => {
                  if (agreeChecked) {
                    onAccept();
                    onClose();
                  }
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004A88] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Setujui &amp; Daftarkan Sambungan Baru</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
