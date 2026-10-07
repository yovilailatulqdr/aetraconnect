# PANDUAN LENGKAP: DATABASE & AUTHENTICATION SUPABASE DI VERCEL
Aplikasi Sistem Pendaftaran, Tracking Sambungan Baru & Tagihan Air — PT Aetra Air Tangerang

Dokumen ini memandu Anda langkah demi langkah untuk menghubungkan aplikasi ini ke **Supabase Authentication & Database PostgreSQL** serta mendeploynya ke **Vercel** agar multi-browser login (Chrome A, Chrome B, dll.) sinkron 100% secara realtime.

---

## 📋 DAFTAR LANGKAH CEPAT
1. [Langkah 1: Buat Project di Supabase](#1-langkah-1-buat-project-di-supabase)
2. [Langkah 2: Konfigurasi Supabase Authentication](#2-langkah-2-konfigurasi-supabase-authentication)
3. [Langkah 3: Jalankan SQL Schema di SQL Editor](#3-langkah-3-jalankan-sql-schema-di-sql-editor)
4. [Langkah 4: Salin URL & Anon Key Supabase](#4-langkah-4-salin-url--anon-key-supabase)
5. [Langkah 5: Masukkan Environment Variables di Vercel & Deploy](#5-langkah-5-masukkan-environment-variables-di-vercel--deploy)

---

## 1. LANGKAH 1: BUAT PROJECT DI SUPABASE
1. Buka [https://supabase.com](https://supabase.com) dan login/daftar akun.
2. Klik tombol **"New Project"**.
3. Isi informasi project:
   - **Name**: `aetra-tangerang-app` (atau nama yang Anda inginkan)
   - **Database Password**: Buat password database yang aman.
   - **Region**: Pilih **Southeast Asia (Singapore)** untuk respon tercepat di Indonesia.
4. Klik **"Create new project"** dan tunggu hingga project siap (~1 menit).

---

## 2. LANGKAH 2: KONFIGURASI SUPABASE AUTHENTICATION
Agar pendaftaran akun pelanggan baru di browser mana pun (Chrome A) langsung bisa login seketika di browser lain (Chrome B):
1. Buka menu **Authentication** di bilah kiri Supabase Dashboard.
2. Pilih tab **Providers** -> klik **Email**.
3. Pastikan **Enable Email provider** aktif (ON).
4. *(Opsional - Sangat Dianjurkan)*: Matikan switch **"Confirm email"** (OFF) agar pengguna yang baru mendaftar bisa langsung login secara instan tanpa perlu menunggu link verifikasi email.
5. Klik **"Save"**.

---

## 3. LANGKAH 3: JALANKAN SQL SCHEMA DI SQL EDITOR
1. Di Supabase Dashboard, buka menu **SQL Editor** (ikon terminal `>_` di bilah kiri).
2. Klik **"New query"**.
3. Buka file `supabase/schema.sql` (atau `supabase_schema.sql`) dari repositori ini, salin seluruh isinya, dan tempel ke SQL Editor.
4. Klik tombol **"Run"** (`Ctrl + Enter` / `Cmd + Enter`).
5. Pastikan muncul pesan **"Success. No rows returned"**.
6. Buka menu **Table Editor**, Anda akan melihat 5 tabel resmi:
   - `user_accounts` (Profil pengguna terhubung ke `auth.users.id`)
   - `registrations` (Data lengkap permohonan pendaftaran sambungan baru)
   - `tracking_records` (Tahapan progres SPKO, pipa dinas, meteran & timeline)
   - `surveys` (Hasil survey kepuasan pelanggan)
   - `monthly_bills` (Tagihan rekening air, pemakaian m³, denda & segel)

---

## 4. LANGKAH 4: SALIN URL & ANON KEY SUPABASE
1. Di Supabase Dashboard, klik ikon **Project Settings** (ikon gerigi di bilah kiri bawah).
2. Pilih menu **API**.
3. Salin 2 nilai berikut:
   - **Project URL**: contoh `https://abcdefghijklm.supabase.co`
   - **anon / public key**: deretan karakter panjang di bagian *Project API keys* bertanda `anon` `public`.

---

## 5. LANGKAH 5: MASUKKAN ENVIRONMENT VARIABLES DI VERCEL & DEPLOY
1. Buka Dashboard Project Anda di [https://vercel.com](https://vercel.com).
2. Masuk ke menu **Settings** -> **Environment Variables**.
3. Tambahkan 2 environment variable berikut (pilih target **Production**, **Preview**, dan **Development**):
   - **Key**: `VITE_SUPABASE_URL`  
     **Value**: Masukkan Project URL dari Supabase Anda
   - **Key**: `VITE_SUPABASE_ANON_KEY`  
     **Value**: Masukkan anon public key dari Supabase Anda
4. Klik **Save**.
5. Buka menu **Deployments** di Vercel -> klik titik tiga `...` pada deployment terakhir -> pilih **Redeploy** (centang *Use existing build cache* dimatikan jika perlu).

---

## 🎯 HASIL AKHIR & UJI COBA
Setelah redeploy di Vercel:
- **Chrome A**: Buka URL Vercel -> Daftar akun baru `user@email.com` -> Pendaftaran berhasil.
- **Chrome B**: Buka URL Vercel yang sama -> Masuk dengan `user@email.com` dan password yang sama -> **Login berhasil 100% dan profil akun langsung muncul**.
- **Isolasi Data**: Akun Pelanggan A hanya dapat melihat data permohonan miliknya sendiri, sedangkan Admin memiliki akses ke seluruh data permohonan.