<!-- Listing 12.3 — ViewUser.vue (adaptasi untuk ViewCrypto) -->
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" color="primary" />
        </ion-buttons>
        <ion-title>Detail Koin</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Loading -->
      <div class="center" v-if="!coin">
        <ion-spinner name="crescent" color="primary" />
      </div>

      <template v-else>
        <!-- Hero -->
        <div class="hero">
          <div class="hero-icon" :style="{ background: getColor(coin.symbol) }">
            {{ coin.symbol.charAt(0) }}
          </div>
          <h1 class="hero-name">{{ coin.name }}</h1>
          <span class="hero-sym">{{ coin.symbol }}</span>
          <p class="hero-price">${{ formatPrice(coin.price_usd) }}</p>
          <span :class="['hero-chg', parseFloat(coin.percent_change_24h) >= 0 ? 'up' : 'down']">
            {{ parseFloat(coin.percent_change_24h) >= 0 ? '▲' : '▼' }}
            {{ Math.abs(parseFloat(coin.percent_change_24h)).toFixed(2) }}% (24h)
          </span>
        </div>

        <!-- ion-item sesuai panduan Listing 12.3 -->
        <ion-list class="detail-list">
          <ion-item>
            <ion-label><b>Rank</b></ion-label>
            <ion-note slot="end">#{{ coin.rank }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Nama</b></ion-label>
            <ion-note slot="end">{{ coin.name }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Simbol</b></ion-label>
            <ion-note slot="end" style="color:#00c896">{{ coin.symbol }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Harga USD</b></ion-label>
            <ion-note slot="end">${{ formatPrice(coin.price_usd) }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Harga BTC</b></ion-label>
            <ion-note slot="end">{{ parseFloat(coin.price_btc).toFixed(8) }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Market Cap</b></ion-label>
            <ion-note slot="end" style="color:#00c896">${{ formatBig(coin.market_cap_usd) }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Volume 24j</b></ion-label>
            <ion-note slot="end">${{ formatBig(coin.volume24) }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Perubahan 1j</b></ion-label>
            <ion-note slot="end" :style="{ color: parseFloat(coin.percent_change_1h) >= 0 ? '#00c896' : '#eb445a' }">
              {{ parseFloat(coin.percent_change_1h).toFixed(2) }}%
            </ion-note>
          </ion-item>
          <ion-item>
            <ion-label><b>Perubahan 7h</b></ion-label>
            <ion-note slot="end" :style="{ color: parseFloat(coin.percent_change_7d) >= 0 ? '#00c896' : '#eb445a' }">
              {{ parseFloat(coin.percent_change_7d).toFixed(2) }}%
            </ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label><b>Suplai Beredar</b></ion-label>
            <ion-note slot="end">{{ formatBig(coin.csupply) }} {{ coin.symbol }}</ion-note>
          </ion-item>
        </ion-list>
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import {
  IonBackButton, IonButtons, IonContent, IonHeader,
  IonItem, IonLabel, IonList, IonNote,
  IonPage, IonSpinner, IonTitle, IonToolbar
} from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewCrypto',
  components: {
    IonBackButton, IonButtons, IonContent, IonHeader,
    IonItem, IonLabel, IonList, IonNote,
    IonPage, IonSpinner, IonTitle, IonToolbar
  },
  data() {
    return { coin: null as any }
  },
  mounted() {
    // Listing 12.3 — axios.get berdasarkan id dari route
    const route = useRoute()
    this.axios
      .get('https://api.coinlore.net/api/ticker/?id=' + route.params.id)
      .then((res: any) => { this.coin = res.data[0] })
  },
  methods: {
    getColor(symbol: string): string {
      const c: Record<string, string> = {
        BTC: '#f7931a', ETH: '#627eea', USDT: '#26a17b',
        BNB: '#f3ba2f', XRP: '#00aae4', SOL: '#9945ff',
        ADA: '#0033ad', DOGE: '#c2a633', LTC: '#bfbbbb',
      }
      return c[symbol] ?? '#00c896'
    },
    formatPrice(p: string): string {
      const n = parseFloat(p)
      if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      if (n >= 1)    return n.toFixed(4)
      return n.toFixed(6)
    },
    formatBig(v: string | number): string {
      const n = parseFloat(String(v))
      if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T'
      if (n >= 1e9)  return (n / 1e9).toFixed(2) + 'B'
      if (n >= 1e6)  return (n / 1e6).toFixed(2) + 'M'
      return n.toFixed(0)
    }
  }
})
</script>

<style scoped>
ion-content { --background: #fdf6e3; }
ion-toolbar { --background: #ffffff; }

.hero {
  display: flex; flex-direction: column; align-items: center;
  padding: 24px 16px 20px;
  background: #fff;
  border-bottom: 1px solid #c8b97a;
}
.hero-icon  { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.hero-name  { font-size: 20px; font-weight: 800; color: #000; margin-bottom: 4px; }
.hero-sym   { font-size: 12px; color: #3880ff; background: rgba(56,128,255,.1); border: 1px solid rgba(56,128,255,.3); padding: 2px 10px; border-radius: 100px; margin-bottom: 10px; }
.hero-price { font-size: 28px; font-weight: 800; font-family: monospace; color: #000; margin-bottom: 6px; }
.hero-chg   { font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 100px; }
.up   { color: #2dd36f; background: rgba(45,211,111,.1); }
.down { color: #eb445a; background: rgba(235,68,90,.1); }

ion-list { background: transparent !important; margin: 12px 8px; }
ion-item.detail-item { --background: #fff; --border-color: #c8b97a; border: 1px solid #c8b97a; margin-bottom: 6px; border-radius: 8px; }
ion-label b { font-size: 14px; color: #000; }
ion-note.val { font-family: monospace; font-size: 13px; color: #333; }
ion-note.green { color: #2dd36f; }
ion-note.red   { color: #eb445a; }

.center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; gap: 14px; }
</style>

