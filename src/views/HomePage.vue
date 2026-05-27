<!-- Listing 12.5 — Home.vue (adaptasi dari panduan) -->
<template>
  <ion-page>
    <!-- Header sesuai panduan -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>₿ CryptoTracker</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="loadCoins" fill="clear" color="primary">↺</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Pull-to-refresh sesuai panduan -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content />
      </ion-refresher>

      <!-- Search -->
      <div class="pad">
        <ion-searchbar
          v-model="query"
          placeholder="Cari nama / simbol..."
          :debounce="300"
          color="dark"
        />
      </div>

      <!-- Info bar -->
      <div class="info-bar" v-if="coins.length">
        <span>{{ filtered.length }} koin</span>
        <span class="green">{{ coins[0]?.name }}</span>
        <span>{{ updatedAt }}</span>
      </div>

      <!-- Loading -->
      <div class="center" v-if="loading">
        <ion-spinner name="crescent" color="primary" />
        <p>Memuat data...</p>
      </div>

      <!-- Error -->
      <div class="center" v-else-if="error">
        <p style="color:#eb445a">Gagal memuat data ⚠️</p>
        <ion-button @click="loadCoins" fill="outline" color="primary" size="small">Coba Lagi</ion-button>
      </div>

      <!-- Daftar koin — ion-list sesuai panduan -->
      <ion-list v-else>
        <CryptoListItem
          v-for="coin in filtered"
          :key="coin.id"
          :coin="coin"
        />
        <div class="center" v-if="filtered.length === 0">
          <p style="color:#8b949e">Tidak ada hasil 🔍</p>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton, IonButtons, IonContent, IonHeader, IonList,
  IonPage, IonRefresher, IonRefresherContent,
  IonSearchbar, IonSpinner, IonTitle, IonToolbar
} from '@ionic/vue'
import CryptoListItem from '@/components/CryptoListItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonButton, IonButtons, IonContent, IonHeader, IonList,
    IonPage, IonRefresher, IonRefresherContent,
    IonSearchbar, IonSpinner, IonTitle, IonToolbar,
    CryptoListItem
  },
  data() {
    return {
      coins: [] as any[],
      query: '',
      loading: true,
      error: false,
      updatedAt: ''
    }
  },
  computed: {
    filtered(): any[] {
      if (!this.query.trim()) return this.coins
      const q = this.query.toLowerCase()
      return this.coins.filter(c =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      )
    }
  },
  mounted() {
    this.loadCoins()
  },
  methods: {
    // Listing 12.5 — axios.get sesuai panduan
    loadCoins() {
      this.loading = true
      this.error = false
      this.axios.get('https://api.coinlore.net/api/tickers/')
        .then((res: any) => {
          this.coins = res.data.data
          this.updatedAt = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          this.loading = false
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    },
    handleRefresh(ev: CustomEvent) {
      this.axios.get('https://api.coinlore.net/api/tickers/')
        .then((res: any) => { this.coins = res.data.data })
        .finally(() => (ev.detail as any).complete())
    }
  }
})
</script>

<style scoped>
ion-toolbar { --background: #161b22; }
ion-title   { font-weight: 800; color: #00c896; }
ion-list    { background: transparent !important; }
ion-content { --background: #0d1117; }

.pad { padding: 10px 12px 4px; }
ion-searchbar { --background: #161b22; --border-radius: 12px; --color: #e6edf3; --placeholder-color: #8b949e; }

.info-bar {
  display: flex; gap: 12px; align-items: center;
  padding: 6px 16px 8px; font-size: 12px; color: #8b949e;
}
.green { color: #00c896; font-weight: 600; }

.center {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 40vh; gap: 14px;
  color: #e6edf3; font-size: 14px;
}
</style>
