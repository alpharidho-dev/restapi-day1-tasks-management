# Blox Fruit Card Value API

API berbasis Node.js dan TypeScript untuk mengelola data serta menganalisis nilai pasar dari buah-buah di dalam game Blox Fruits. Proyek ini diimplementasikan menggunakan Express.js dengan arsitektur MVC (Model-View-Controller) mini berbasis memori (in-memory data storage).

## Fitur Utama

- **CRUD Manajemen Buah**: Pembuatan, pembacaan, pembaruan, dan penghapusan kartu data buah Blox.
- **Validasi Data Ketat**: Validasi tipe data input, batas minimum dan maksimum angka, serta pengecekan enum nilai rarity dan status tren.
- **Ringkasan Pasar (Market Summary)**: Endpoint analitik untuk menghitung total nilai trading pasar, jumlah akumulasi buah berpermintaan tinggi (High Demand), dan jumlah buah kategori Mythical.

---

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Bahasa**: TypeScript
- **Framework**: Express.js
- **Development Tool**: ts-node / ts-node-dev (untuk hot-reloading proses pengembangan)

---

## Struktur Proyek

```text
.
├── src/
│   ├── controllers/
│   │   └── fruitController.ts  # Logika bisnis dan pengolahan data buah
│   ├── routes/
│   │   └── fruitRoutes.ts      # Definisi routing API buah
│   ├── types/
│   │   └── fruit.ts            # Definisi tipe data dan Interface TypeScript
│   └── index.ts                # Entry point utama aplikasi Express
├── package.json
├── tsconfig.json
└── README.md
```

---

## Panduan Memulai Proyek

### 1. Instalasi Dependensi
Pastikan Node.js telah terinstal pada sistem Anda, kemudian jalankan perintah berikut di terminal:
```bash
npm install
```

### 2. Menjalankan Server
Untuk menjalankan server dalam mode pengembangan:
```bash
npm run dev
```
Secara default, server akan berjalan pada alamat: `http://localhost:5000`

---

## Dokumentasi Endpoint API

Seluruh endpoint API menggunakan basis prefix URL: `/api/v1/fruits`

### 1. Endpoint Utama dan Ringkasan

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| **GET** | `/` | Pesan selamat datang untuk pengecekan status server awal. |
| **GET** | `/api/v1/fruits` | Mengambil seluruh daftar data buah Blox. |
| **GET** | `/api/v1/fruits/summary` | Mengambil data ringkasan analitik nilai pasar (market summary). |

### 2. Endpoint CRUD

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| **GET** | `/api/v1/fruits/:id` | Mengambil detail satu data buah berdasarkan ID spesifik. |
| **POST** | `/api/v1/fruits` | Menambahkan data buah baru ke dalam daftar. |
| **PUT** | `/api/v1/fruits/:id` | Memperbarui atribut data buah berdasarkan ID spesifik. |
| **DELETE** | `/api/v1/fruits/:id` | Menghapus data buah dari daftar berdasarkan ID spesifik. |

---

## Aturan Struktur Data dan Validasi

### Skema Data Buah (Interface)
```typescript
interface BloxFruit {
  id: number;
  name: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Legendary" | "Mythical";
  beliPrice: number;
  tradingValue: number;
  demandRating: number; // Skala nilai integer 1 hingga 10
  status: "High Demand" | "Stable" | "Fading";
  createdAt: string;
}
```

### Aturan Validasi Request Body (POST / PUT)

- **name**: Wajib diisi, bertipe string, dan tidak boleh kosong atau hanya berisi spasi.
- **rarity**: Hanya menerima salah satu dari nilai berikut: `Common`, `Uncommon`, `Rare`, `Legendary`, `Mythical`.
- **beliPrice & tradingValue**: Harus berupa angka (number) bernilai positif atau minimal 0.
- **demandRating**: Harus berupa angka bulat (integer) dengan rentang nilai dari 1 sampai dengan 10.
- **status**: Hanya menerima salah satu dari nilai berikut: `High Demand`, `Stable`, `Fading`.
