# Aktualisasi (Frontend)

**Sistem Informasi Manajemen Jaringan & Inventaris**

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=white)

Repositori Frontend untuk aktualisasi dari aplikasi manajemen aset perangkat jaringan, dirancang sebagai antarmuka pengguna untuk mengelola aset perangkat jaringan dan log pemeliharaan di lingkungan instansi. Dibangun menggunakan **React** dengan **TypeScript** dan di-bundle menggunakan **Vite** untuk pengalaman pengembangan yang cepat.

---

## 🚀 Fitur Utama

- **Manajemen Aset**: Antarmuka lengkap untuk melihat, menambah, mengubah, dan menghapus data aset perangkat jaringan.
- **Audit Trail Visual**:
  - **Journey Logs**: Menampilkan riwayat mutasi/perpindahan aset antar ruangan.
  - **Maintenance Logs**: Menampilkan riwayat teknis (Update OS, Perbaikan).
- **Upload Gambar Aset**: Mendukung upload dan pengelolaan gambar aset.
- **Dashboard**: Tampilan dashboard dengan statistik dan ringkasan data aset.

---

## 🛠️ Teknologi yang Digunakan

- **Library UI**: React 19
- **Bahasa**: TypeScript 5.9
- **Build Tool**: Vite 7
- **HTTP Client**: Axios / SWR
- **Styling**: Tailwind CSS

---

## ⚙️ Panduan Instalasi & Setup

### Prasyarat

- Bun >= 1.0

### 1. Clone Repositori

```bash
git clone https://github.com/caclm10/aktualisasi-frontend.git
cd aktualisasi-frontend
```

### 2. Install Dependensi

```bash
bun install
```

### 3. Konfigurasi Environment

Buat file `.env` di root project dan sesuaikan konfigurasi berikut:

```text
VITE_API_URL=http://localhost:8000/api
```

> **Note:** Pastikan backend sudah berjalan di `http://localhost:8000` sebelum menjalankan frontend.

### 4. Jalankan Development Server

```bash
bun run dev
```

Aplikasi frontend akan berjalan di `http://localhost:5173`

### 5. Build untuk Production

```bash
bun run build
```

Hasil build akan tersedia di folder `dist/`.

---

## 🔗 Koneksi dengan Backend

Frontend ini dirancang untuk bekerja dengan [Aktualisasi Backend](https://github.com/caclm10/aktualisasi-backend). Pastikan:

1. Backend sudah berjalan dan dapat diakses
2. CORS sudah dikonfigurasi dengan benar di backend (lihat `FRONTEND_URL` di `.env` backend)
3. `VITE_API_URL` di frontend mengarah ke URL backend yang benar

---

## 📜 Scripts yang Tersedia

| Script            | Deskripsi                                   |
| ----------------- | ------------------------------------------- |
| `bun run dev`     | Menjalankan development server dengan HMR   |
| `bun run build`   | Build aplikasi untuk production             |
| `bun run lint`    | Menjalankan ESLint untuk code quality check |
| `bun run preview` | Preview hasil build production secara lokal |
