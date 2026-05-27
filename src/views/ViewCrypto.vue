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
ion-toolbar { --background: #161b22; }
ion-title   { font-weight: 700; color: #e6edf3; font-size: 16px; }
ion-content { --background: #0d1117; }

.hero {
  display: flex; flex-direction: column; align-items: center;
  padding: 28px 20px 24px;
  background: linear-gradient(180deg, #161b22, #0d1117);
  border-bottom: 1px solid #21262d;
}
.hero-icon {
  width: 64px; height: 64px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 900; color: #fff;
  margin-bottom: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.4);
}
.hero-name  { font-size: 22px; font-weight: 800; margin: 0 0 6px; }
.hero-sym   { font-size: 12px; color: #00c896; background: rgba(0,200,150,.1); border: 1px solid rgba(0,200,150,.25); padding: 3px 12px; border-radius: 100px; margin-bottom: 14px; }
.hero-price { font-size: 30px; font-weight: 800; font-family: monospace; margin: 0 0 8px; }
.hero-chg   { font-size: 13px; font-weight: 700; padding: 5px 14px; border-radius: 100px; }
.up   { color: #00c896; background: rgba(0,200,150,.1); }
.down { color: #eb445a; background: rgba(235,68,90,.1); }

.detail-list { background: transparent !important; padding: 12px !important; }
ion-item {
  --background: #161b22; --border-color: #21262d;
  --color: #e6edf3; border-radius: 10px; margin-bottom: 6px;
}
ion-label b { font-size: 14px; color: #e6edf3; }
ion-note    { font-size: 13px; font-family: monospace; color: #8b949e; }

.center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; gap: 14px; }
</style>
