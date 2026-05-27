<!-- Listing 12.2 — Komponen item koin (adaptasi dari UserListItem) -->
<template>
  <ion-item
    v-if="coin"
    :routerLink="'/coin/' + coin.id"
    :detail="false"
    class="coin-item"
    lines="none"
  >
    <!-- Rank -->
    <div slot="start" class="rank">#{{ coin.rank }}</div>

    <!-- Nama & Simbol (ion-label sesuai panduan) -->
    <ion-label class="ion-text-wrap">
      <div class="coin-row">
        <div class="coin-icon" :style="{ background: getColor(coin.symbol) }">
          {{ coin.symbol.charAt(0) }}
        </div>
        <div>
          <h2>{{ coin.name }}</h2>
          <span class="badge">{{ coin.symbol }}</span>
        </div>
      </div>
    </ion-label>

    <!-- Harga USD -->
    <div slot="end" class="price-col">
      <div class="price">${{ formatPrice(coin.price_usd) }}</div>
      <div :class="['change', parseFloat(coin.percent_change_24h) >= 0 ? 'up' : 'down']">
        {{ parseFloat(coin.percent_change_24h) >= 0 ? '▲' : '▼' }}
        {{ Math.abs(parseFloat(coin.percent_change_24h)).toFixed(2) }}%
      </div>
    </div>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CryptoListItem',
  components: { IonItem, IonLabel },
  props: { coin: Object },
  methods: {
    getColor(symbol: string): string {
      const colors: Record<string, string> = {
        BTC: '#f7931a', ETH: '#627eea', USDT: '#26a17b',
        BNB: '#f3ba2f', XRP: '#00aae4', SOL: '#9945ff',
        ADA: '#0033ad', DOGE: '#c2a633', LTC: '#bfbbbb',
      }
      return colors[symbol] ?? '#00c896'
    },
    formatPrice(p: string): string {
      const n = parseFloat(p)
      if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      if (n >= 1)    return n.toFixed(4)
      return n.toFixed(6)
    }
  }
})
</script>

<style scoped>
.coin-item {
  --background: #161b22;
  --border-radius: 14px;
  --min-height: 72px;
  --padding-start: 14px;
  --inner-padding-end: 12px;
  margin: 6px 12px;
  border-radius: 14px;
  border: 1px solid #21262d;
}
.coin-item:hover { border-color: #00c896; }

.rank { font-size: 11px; font-weight: 700; color: #8b949e; min-width: 28px; }

.coin-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; }
.coin-icon {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0;
}

h2 { font-size: 15px !important; font-weight: 700 !important; color: #e6edf3 !important; margin: 0 !important; }

.badge {
  font-size: 11px; font-weight: 600; color: #00c896;
  background: rgba(0,200,150,.1); border: 1px solid rgba(0,200,150,.2);
  padding: 1px 7px; border-radius: 100px; display: inline-block; margin-top: 3px;
}

.price-col { text-align: right; }
.price { font-size: 13px; font-weight: 700; color: #e6edf3; font-family: monospace; }
.change { font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 100px; margin-top: 3px; display: inline-block; }
.up   { color: #00c896; background: rgba(0,200,150,.1); }
.down { color: #eb445a; background: rgba(235,68,90,.1); }
</style>
