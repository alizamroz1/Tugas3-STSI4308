# 🪙 CryptoTracker — Aplikasi Cryptocurrency

> **Tugas 03 | MSIM4401 — Praktikum RESTful API (Aktivitas 12)**

Aplikasi mobile berbasis **Ionic + Vue.js** yang menampilkan data harga cryptocurrency secara real-time menggunakan RESTful API dari [CoinLore](https://www.coinlore.com/cryptocurrency-data-api).

---

## 📱 Tampilan Aplikasi

| Halaman Utama | Halaman Detail |
|---|---|
| Daftar semua cryptocurrency dengan rank, nama, simbol, dan harga | Informasi lengkap satu koin (market cap, volume, supply, dsb.) |

---

## 🚀 Cara Menjalankan

### Prasyarat
Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) versi LTS (v18+)
- [Ionic CLI](https://ionicframework.com/docs/cli)

```bash
npm install -g @ionic/cli
```

### Install & Jalankan

```bash
# 1. Masuk ke direktori proyek
cd crypto-app

# 2. Install dependensi
npm install

# 3. Jalankan server development
npm run dev
```

Buka browser dan akses: **http://localhost:8100/**

---

## 🌐 API yang Digunakan

**Base URL:** `https://api.coinlore.net/api/`

| Endpoint | Deskripsi |
|---|---|
| `GET /api/tickers/` | Daftar semua cryptocurrency |
| `GET /api/ticker/?id={id}` | Detail satu koin berdasarkan ID |

### Contoh Response `/api/tickers/`

```json
{
  "data": [
    {
      "id": "90",
      "symbol": "BTC",
      "name": "Bitcoin",
      "rank": 1,
      "price_usd": "67432.12",
      "percent_change_1h": "0.12",
      "percent_change_24h": "2.35",
      "percent_change_7d": "-1.04",
      "price_btc": "1.00",
      "market_cap_usd": "1327000000000",
      "volume24": "29000000000",
      "csupply": "19700000"
    }
  ]
}
```

---

## 🗂️ Struktur Proyek

```
crypto-app/
├── src/
│   ├── main.ts                    ← Entry point + setup axios & vue-axios
│   ├── App.vue                    ← Root komponen (dark mode)
│   ├── router/
│   │   └── index.ts               ← Konfigurasi routing
│   ├── components/
│   │   └── CryptoListItem.vue     ← Komponen kartu item koin
│   ├── views/
│   │   ├── HomePage.vue           ← Halaman utama (daftar koin)
│   │   └── ViewCrypto.vue         ← Halaman detail satu koin
│   └── theme/
│       └── variables.css          ← Dark theme & CSS variables
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📄 Penjelasan File Utama

### `src/main.ts`
Entry point aplikasi. Mengaktifkan `axios` dan `vue-axios` agar dapat digunakan secara global di seluruh komponen Vue.

```typescript
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
  .use(IonicVue)
  .use(VueAxios, axios)  // Mendaftarkan axios secara global
  .use(router);
```

---

### `src/router/index.ts`
Mendefinisikan dua rute utama:

```typescript
const routes = [
  { path: '/',         redirect: '/home' },
  { path: '/home',     component: HomePage },
  { path: '/coin/:id', component: () => import('../views/ViewCrypto.vue') }
]
```

---

### `src/components/CryptoListItem.vue`
Komponen yang menampilkan setiap baris koin dalam daftar. Menerima satu prop `coin` dan menampilkan:

- **Rank** — nomor urut koin di pasar
- **Name** — nama lengkap cryptocurrency
- **Symbol** — kode singkat (BTC, ETH, dsb.)
- **Price USD** — harga terkini dalam dolar AS
- **24h Change** — perubahan harga 24 jam (hijau ▲ / merah ▼)

```vue
<template>
  <ion-item :routerLink="'/coin/' + coin.id">
    <div class="rank-number">#{{ coin.rank }}</div>
    <h2>{{ coin.name }}</h2>
    <span class="coin-symbol">{{ coin.symbol }}</span>
    <span class="price-value">${{ formatPrice(coin.price_usd) }}</span>
  </ion-item>
</template>
```

---

### `src/views/HomePage.vue`
Halaman utama yang mengambil data dari API saat komponen dimount:

```typescript
mounted() {
  this.axios.get('https://api.coinlore.net/api/tickers/')
    .then((response) => {
      this.coins = response.data.data;
    });
}
```

**Fitur:**
- ⏳ Loading spinner saat data diambil
- ⚠️ Pesan error jika koneksi gagal
- 🔍 Pencarian/filter nama & simbol koin
- 🔄 Pull-to-refresh untuk memperbarui data
- 📊 Stats bar (jumlah koin, top coin, waktu update)

---

### `src/views/ViewCrypto.vue`
Halaman detail yang mengambil data satu koin berdasarkan ID dari URL:

```typescript
mounted() {
  const route = useRoute();
  this.axios
    .get(`https://api.coinlore.net/api/ticker/?id=${route.params.id}`)
    .then((response) => {
      this.coin = response.data[0];
    });
}
```

**Data yang ditampilkan:**

| Field | Keterangan |
|---|---|
| `rank` | Peringkat di pasar |
| `name` | Nama koin |
| `symbol` | Simbol koin |
| `price_usd` | Harga dalam USD |
| `price_btc` | Harga dalam BTC |
| `market_cap_usd` | Kapitalisasi pasar |
| `volume24` | Volume perdagangan 24 jam |
| `percent_change_1h` | Perubahan harga 1 jam |
| `percent_change_24h` | Perubahan harga 24 jam |
| `percent_change_7d` | Perubahan harga 7 hari |
| `csupply` | Jumlah koin beredar |

---

## 🎨 Desain & Tema

Aplikasi menggunakan **dark theme** bergaya premium:

| Elemen | Warna |
|---|---|
| Background | `#0d1117` (GitHub Dark) |
| Card / Item | `#161b22` |
| Primary / Aksen | `#00c896` (Hijau crypto) |
| Secondary | `#6c63ff` (Ungu) |
| Teks utama | `#e6edf3` |
| Teks sekunder | `#8b949e` |
| Naik (positif) | `#00c896` ▲ |
| Turun (negatif) | `#eb445a` ▼ |

---

## 📦 Dependensi

```json
{
  "dependencies": {
    "@ionic/vue": "^7.x",
    "@ionic/vue-router": "^7.x",
    "axios": "latest",
    "vue": "^3.x",
    "vue-axios": "latest",
    "vue-router": "^4.x"
  },
  "devDependencies": {
    "@types/axios": "latest",
    "typescript": "^5.x",
    "vite": "^5.x"
  }
}
```

---

## 👨‍💻 Teknologi

| Teknologi | Fungsi |
|---|---|
| **Ionic Framework** | Komponen UI mobile (ion-list, ion-item, dsb.) |
| **Vue.js 3** | Framework JavaScript reaktif |
| **TypeScript** | Type-safety pada JavaScript |
| **Axios** | HTTP client untuk mengambil data dari REST API |
| **vue-axios** | Plugin integrasi axios ke Vue |
| **Vite** | Build tool & development server |

---

## 📚 Referensi

- [Panduan Aktivitas 12 — Praktikum RESTful API (MSIM4401)](./Panduan%20Aktivitas%2012.pdf)
- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [CoinLore API Documentation](https://www.coinlore.com/cryptocurrency-data-api)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [Axios Documentation](https://axios-http.com/)

---

> **Catatan:** Pastikan terhubung ke internet saat menjalankan aplikasi, karena data cryptocurrency diambil secara langsung dari API CoinLore.
