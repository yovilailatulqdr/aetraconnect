import React, { useState, useEffect } from 'react';
import { RegistrationFormData } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  CreditCard, 
  Copy, 
  Check, 
  Building2, 
  User, 
  MapPin, 
  Calendar, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Eye,
  CheckCheck,
  ReceiptText,
  Sparkles,
  X,
  FileCheck2,
  Lock
} from 'lucide-react';
import { DocumentImageViewerModal } from './DocumentImageViewerModal';

interface AdminApprovalModalProps {
  isOpen: boolean;
  record: RegistrationFormData | null;
  onClose: () => void;
  onApprove: (noForm: string, nomorPembayaran: string, biayaSambungan: number, adminNotes?: string, idPelanggan?: string) => void;
  onReject: (noForm: string, reason: string) => void;
}

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
  isOpen,
  record,
  onClose,
  onApprove,
  onReject,
}) => {
  // Determine if this is payment verification stage (when payment proof exists or status is PAYMENT_CONFIRMED or waiting payment)
  const isPaymentVerificationStage = Boolean(
    record?.paymentProof?.dataUrl ||
    record?.paymentProof?.fileUrl ||
    record?.status_pendaftaran === 'PAYMENT_CONFIRMED' ||
    record?.statusPendaftaran === 'PAYMENT_CONFIRMED' ||
    Boolean(record?.nomorPembayaran && (record?.trackingStep === 2 || (record as any)?.currentStep === 2))
  );

  // Generate suggested 12-digit Virtual Account / Nomor Pembayaran
  const defaultNoBayar = record?.nomorPembayaran || record?.nomor_pembayaran || (
    '88290' + (record?.noSr ? record.noSr.replace(/\D/g, '').padStart(6, '0') : Math.floor(1000000 + Math.random() * 9000000))
  );

  const defaultIdPelanggan = record?.idPelanggan || (
    (record as any)?.trackingRecord?.idPelanggan || ('10' + (record?.noForm || '123456').replace(/\D/g, '').padEnd(6, '0'))
  );

  const [idPelanggan, setIdPelanggan] = useState<string>(defaultIdPelanggan);
  const [nomorPembayaran, setNomorPembayaran] = useState<string>(defaultNoBayar);
  const [biayaSambungan, setBiayaSambungan] = useState<number>(record?.biayaSambungan || 1371545);
  const [adminNotes, setAdminNotes] = useState<string>(
    isPaymentVerificationStage 
      ? 'Pembayaran biaya sambungan baru telah diverifikasi Lunas. ID Pelanggan resmi diterbitkan dan diteruskan ke SPKO.'
      : 'Berkas identitas pemohon dan persyaratan administrasi telah diverifikasi dan disetujui. Nomor Pembayaran diterbitkan.'
  );
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('Kelengkapan berkas KTP / PBB tidak sesuai dengan alamat persil pemasangan.');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  useEffect(() => {
    if (record) {
      setNomorPembayaran(record.nomorPembayaran || record.nomor_pembayaran || defaultNoBayar);
      setIdPelanggan(record.idPelanggan || defaultIdPelanggan);
      setBiayaSambungan(record.biayaSambungan || 1371545);
      setAdminNotes(
        isPaymentVerificationStage
          ? 'Pembayaran biaya sambungan baru telah diverifikasi Lunas. ID Pelanggan resmi diterbitkan dan diteruskan ke SPKO.'
          : 'Berkas identitas pemohon dan persyaratan administrasi telah diverifikasi dan disetujui. Nomor Pembayaran diterbitkan.'
      );
    }
  }, [record, isPaymentVerificationStage]);

  // Lightbox preview modal state
  const [activeViewer, setActiveViewer] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  if (!isOpen || !record) return null;

  const handleGenerateNewNo = () => {
    const newNo = '88290' + Math.floor(1000000 + Math.random() * 9000000);
    setNomorPembayaran(newNo);
  };

  const handleGenerateNewIdPelanggan = () => {
    const newId = '10' + Math.floor(100000 + Math.random() * 900000);
    setIdPelanggan(newId);
  };

  const handleCopyNo = () => {
    navigator.clipboard.writeText(nomorPembayaran);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(idPelanggan);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleConfirmApprove = () => {
    if (!isPaymentVerificationStage) {
      // Tahap 1: Verifikasi Berkas -> Terbitkan Nomor Pembayaran (ID Pelanggan belum diinput)
      if (!nomorPembayaran.trim()) {
        alert('Nomor pembayaran wajib diisi.');
        return;
      }
      onApprove(record.noForm, nomorPembayaran.trim(), Number(biayaSambungan), adminNotes, '');
    } else {
      // Tahap 2: Verifikasi Pembayaran -> Terbitkan ID Pelanggan
      if (!idPelanggan.trim()) {
        alert('Mohon masukkan atau generate ID Pelanggan untuk aktivasi sambungan baru.');
        return;
      }
      onApprove(record.noForm, nomorPembayaran.trim(), Number(biayaSambungan), adminNotes, idPelanggan.trim());
    }
    onClose();
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Mohon masukkan alasan penolakan.');
      return;
    }
    onReject(record.noForm, rejectReason.trim());
    onClose();
  };

  // Collect all uploaded documents & photos
  const uploadedDocs = [
    { key: 'ktp', label: 'Foto e-KTP Pemohon', doc: record.persyaratanFiles?.ktp },
    { key: 'kk', label: 'Foto Kartu Keluarga (KK)', doc: record.persyaratanFiles?.kk },
    { key: 'pbb', label: 'Pajak Bumi dan Bangunan (PBB)', doc: record.persyaratanFiles?.pbb },
    { key: 'suratDomisili', label: 'Surat Keterangan Domisili', doc: record.persyaratanFiles?.suratDomisili },
    { key: 'suratKuasaSewa', label: 'Surat Kuasa / Perjanjian Sewa', doc: record.persyaratanFiles?.suratKuasaSewa },
    { key: 'lainnya', label: 'Dokumen Pendukung Lainnya', doc: record.persyaratanFiles?.lainnya },
  ].filter((d) => Boolean(d.doc?.dataUrl));

  const paymentProofDoc = record.paymentProof?.dataUrl || record.paymentProof?.fileUrl ? record.paymentProof : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0e172e] border border-slate-700 text-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className={`p-6 border-b border-slate-800 flex items-center justify-between gap-4 ${
          isPaymentVerificationStage
            ? 'bg-linear-to-r from-[#0d2a4a] to-[#0a382b]'
            : 'bg-linear-to-r from-slate-900 to-[#102446]'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                isPaymentVerificationStage
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}>
                {isPaymentVerificationStage ? 'Tahap 2: Verifikasi Pembayaran & ID Pelanggan' : 'Tahap 1: Verifikasi Berkas Administrasi'}
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-400/30">
                SR: {record.noSr}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              {isPaymentVerificationStage ? (
                <>
                  <CheckCheck className="w-5 h-5 text-emerald-400" />
                  <span>Verifikasi Pembayaran &amp; Terbitkan ID Pelanggan</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>Verifikasi Berkas &amp; Terbitkan Nomor Pembayaran</span>
                </>
              )}
            </h3>
            <p className="text-xs text-slate-300">
              {isPaymentVerificationStage
                ? 'Periksa struk pembayaran dan terbitkan ID Pelanggan resmi untuk memproses SPKO pipa dinas.'
                : 'Pemeriksaan berkas pemohon sambungan baru dan penerbitan nomor pembayaran resmi.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Info Customer Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nama Pemohon:</span>
              <strong className="text-white text-sm block mt-0.5">{record.namaKtp}</strong>
              <span className="text-slate-400 font-mono text-[11px] block mt-0.5">NIK: {record.noKtp}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Golongan Tarif:</span>
              <span className="text-amber-300 font-bold block mt-0.5">{record.golonganTarif || 'Rumah Tangga'}</span>
              <span className="text-slate-400 text-[11px] block mt-0.5">HP/WA: {record.telpHp}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Alamat Pemasangan:</span>
              <p className="text-slate-200 text-xs mt-0.5 leading-snug line-clamp-2">
                {record.alamatPasang}, Kec. {record.kecamatanPasang || 'Tangerang'}
              </p>
            </div>
          </div>

          {/* DOKUMEN PERSYARATAN ADMINISTRASI (KTP, KK, PBB) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Dokumen Persyaratan Administrasi ({uploadedDocs.length} Terlampir)</span>
              </h4>
              <span className="text-[11px] text-slate-400">Klik gambar untuk melihat resolusi penuh</span>
            </div>

            {uploadedDocs.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {uploadedDocs.map((item) => (
                  <div
                    key={item.key}
                    onClick={() =>
                      setActiveViewer({
                        isOpen: true,
                        imageUrl: item.doc!.dataUrl,
                        title: item.label,
                        description: `Berkas Pemohon: ${record.namaKtp} (SR: ${record.noSr})`,
                      })
                    }
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-800/80 transition cursor-pointer group flex flex-col items-center gap-2 text-center"
                  >
                    <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                      <img
                        src={item.doc!.dataUrl}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 group-hover:text-white truncate w-full">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center text-slate-400 text-xs">
                Tidak ada dokumen digital terlampir pada formulir ini.
              </div>
            )}
          </div>

          {/* BUKTI PEMBAYARAN KASIR (JIKA ADA / TAHAP 2) */}
          {paymentProofDoc && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <ReceiptText className="w-4 h-4" />
                  <span>Struk / Bukti Pembayaran Pelanggan Terlampir</span>
                </span>
                <span className="text-[11px] text-emerald-300/80 font-mono">
                  {paymentProofDoc.bank} • {paymentProofDoc.tanggalBayar}
                </span>
              </div>

              <div
                onClick={() =>
                  setActiveViewer({
                    isOpen: true,
                    imageUrl: paymentProofDoc.dataUrl || paymentProofDoc.fileUrl || '',
                    title: 'Bukti Pembayaran Biaya Sambungan Baru',
                    description: `Kanal: ${paymentProofDoc.bank || paymentProofDoc.bankPengirim || 'Mitra Resmi'} | Tgl: ${paymentProofDoc.tanggalBayar || 'Hari Ini'}`,
                  })
                }
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:bg-slate-900 cursor-pointer group"
              >
                <img
                  src={paymentProofDoc.dataUrl || paymentProofDoc.fileUrl}
                  alt="Struk Bayar"
                  className="w-16 h-16 object-cover rounded-xl border border-emerald-500/40"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-white block">
                    Struk Validasi Bank / Kasir Minimarket
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Klik untuk memeriksa nomor referensi &amp; nominal transfer secara jelas.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-xs font-bold transition"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* INPUT FORM SECTION */}
          {!isRejecting ? (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* JIKA TAHAP 1 (VERIFIKASI BERKAS): INPUT NOMOR PEMBAYARAN & BIAYA */}
              {!isPaymentVerificationStage ? (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-blue-400" />
                        <span>Nomor Pembayaran (Virtual Account 12-Digit) <strong className="text-amber-400">*</strong></span>
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateNewNo}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                      >
                        + Buat Nomor Baru
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nomorPembayaran}
                        onChange={(e) => setNomorPembayaran(e.target.value.replace(/\D/g, ''))}
                        placeholder="88290XXXXXXXXX"
                        className="flex-1 font-mono text-base font-bold bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-amber-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleCopyNo}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">
                      Total Biaya Sambungan Baru (Rp) <strong className="text-amber-400">*</strong>
                    </label>
                    <input
                      type="number"
                      value={biayaSambungan}
                      onChange={(e) => setBiayaSambungan(Number(e.target.value))}
                      className="w-full font-mono text-base font-bold bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>ID Pelanggan resmi akan diinput oleh Admin setelah pelanggan melakukan pembayaran dan diverifikasi lunas.</span>
                  </div>
                </>
              ) : (
                /* JIKA TAHAP 2 (VERIFIKASI PEMBAYARAN): INPUT ID PELANGGAN RESMI */
                <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Terbitkan ID Pelanggan Resmi (Nomor Pelanggan Aetra) *</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateNewIdPelanggan}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                    >
                      + Generate ID Baru
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={idPelanggan}
                      onChange={(e) => setIdPelanggan(e.target.value.replace(/\D/g, ''))}
                      placeholder="Contoh: 10842918"
                      className="flex-1 font-mono text-lg font-black bg-slate-900 border-2 border-emerald-500 rounded-xl px-4 py-2.5 text-emerald-300 tracking-wider focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedId ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedId ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                    ID Pelanggan ini akan otomatis mengubah status pembayaran menjadi <strong>Lunas / Berhasil</strong> dan digunakan pelanggan untuk pembayaran tagihan air bulanan.
                  </p>
                </div>
              )}

              {/* Catatan Admin */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Catatan Resmi untuk Pelanggan (Tampil di Tracking)
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          ) : (
            /* Reject Form */
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 space-y-3">
              <label className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                Alasan Penolakan Permohonan:
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-slate-900 border border-red-700 rounded-xl p-3 text-xs text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
          {!isRejecting ? (
            <>
              <button
                type="button"
                onClick={() => setIsRejecting(true)}
                className="px-4 py-2.5 rounded-xl border border-red-600/60 text-red-400 hover:bg-red-600/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Tolak Permohonan</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={handleConfirmApprove}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 shadow-lg cursor-pointer ${
                    isPaymentVerificationStage
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                      : 'bg-[#143833] hover:bg-[#1C4A42] text-white shadow-blue-600/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isPaymentVerificationStage
                      ? 'Verifikasi Pembayaran & Terbitkan ID Pelanggan'
                      : 'Setujui Berkas & Terbitkan No. Bayar'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsRejecting(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Konfirmasi Tolak Permohonan</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Document Full View */}
      <DocumentImageViewerModal
        isOpen={activeViewer.isOpen}
        imageUrl={activeViewer.imageUrl}
        title={activeViewer.title}
        description={activeViewer.description}
        onClose={() => setActiveViewer({ ...activeViewer, isOpen: false })}
      />
    </div>
  );
};
