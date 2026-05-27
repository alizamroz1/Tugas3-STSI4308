# 🪙 CryptoTracker — Tugas 03 MSIM4401

Aplikasi mobile **Ionic + Vue.js** untuk menampilkan data cryptocurrency real-time.

**Live Demo →** https://alizamroz1.github.io/Tugas3-STSI4308/

---

## 📁 Struktur File (src/)

```
src/
├── main.ts                    ← Setup axios + vue-axios (Listing 12.1)
├── App.vue                    ← Root komponen
├── router/index.ts            ← Routing (Listing 12.4)
├── components/
│   └── CryptoListItem.vue     ← Komponen item koin (Listing 12.2)
├── views/
│   ├── HomePage.vue           ← Halaman daftar koin (Listing 12.5)
│   └── ViewCrypto.vue         ← Halaman detail koin (Listing 12.3)
└── theme/variables.css        ← Dark theme
```

---

## 🌐 API

```
https://api.coinlore.net/api/tickers/        ← semua koin
https://api.coinlore.net/api/ticker/?id={id} ← detail satu koin
```

**Field yang ditampilkan:** `rank` · `name` · `symbol` · `price_usd`

---

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev        # → http://localhost:8100
```

---

## 🛠️ Teknologi (sesuai Panduan Aktivitas 12)

| Teknologi | Fungsi |
|---|---|
| **Ionic Vue** | Komponen UI mobile (`ion-list`, `ion-item`, dll) |
| **Vue.js 3** | Framework JavaScript |
| **TypeScript** | Bahasa pemrograman |
| **axios + vue-axios** | HTTP client untuk REST API |
| **Vue Router** | Navigasi antar halaman |
