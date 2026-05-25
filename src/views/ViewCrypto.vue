<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/" color="primary"></ion-back-button>
        </ion-buttons>
        <ion-title>Coin Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="coin">
      <!-- Hero Card -->
      <div class="hero-card">
        <div class="hero-icon" :style="{ backgroundColor: getCoinColor(coin.symbol) }">
          {{ coin.symbol.charAt(0) }}
        </div>
        <div class="hero-name">{{ coin.name }}</div>
        <div class="hero-symbol-badge">{{ coin.symbol }}</div>
        <div class="hero-price">${{ formatPrice(coin.price_usd) }}</div>
        <div
          class="hero-change"
          :class="parseFloat(coin.percent_change_24h) >= 0 ? 'positive' : 'negative'"
        >
          {{ parseFloat(coin.percent_change_24h) >= 0 ? '▲' : '▼' }}
          {{ Math.abs(parseFloat(coin.percent_change_24h)).toFixed(2) }}% (24h)
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid ion-padding-horizontal">
        <div class="stat-card">
          <div class="stat-label">🏅 Rank</div>
          <div class="stat-value">#{{ coin.rank }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">💎 Symbol</div>
          <div class="stat-value green">{{ coin.symbol }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">📈 Price USD</div>
          <div class="stat-value">${{ formatPrice(coin.price_usd) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">₿ Price BTC</div>
          <div class="stat-value">{{ parseFloat(coin.price_btc).toFixed(8) }}</div>
        </div>
        <div class="stat-card full-width">
          <div class="stat-label">💰 Market Cap</div>
          <div class="stat-value green">${{ formatLargeNumber(coin.market_cap_usd) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">📊 1h Change</div>
          <div class="stat-value" :class="parseFloat(coin.percent_change_1h) >= 0 ? 'green' : 'red'">
            {{ parseFloat(coin.percent_change_1h).toFixed(2) }}%
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">📅 7d Change</div>
          <div class="stat-value" :class="parseFloat(coin.percent_change_7d) >= 0 ? 'green' : 'red'">
            {{ parseFloat(coin.percent_change_7d).toFixed(2) }}%
          </div>
        </div>
        <div class="stat-card full-width">
          <div class="stat-label">🔄 Volume 24h</div>
          <div class="stat-value">${{ formatLargeNumber(coin.volume24) }}</div>
        </div>
        <div class="stat-card full-width">
          <div class="stat-label">🪙 Circulating Supply</div>
          <div class="stat-value">{{ formatLargeNumber(coin.csupply) }} {{ coin.symbol }}</div>
        </div>
      </div>

      <div style="height: 32px;"></div>
    </ion-content>

    <!-- Loading state -->
    <ion-content v-else>
      <div class="loading-container">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
        <p class="loading-text">Loading coin data...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';

const COIN_COLORS: Record<string, string> = {
  BTC: '#f7931a',
  ETH: '#627eea',
  BNB: '#f3ba2f',
  SOL: '#9945ff',
  XRP: '#00aae4',
  ADA: '#0033ad',
  DOGE: '#c2a633',
  DOT: '#e6007a',
  MATIC: '#8247e5',
  LTC: '#bfbbbb',
};

export default defineComponent({
  name: 'ViewCrypto',
  data() {
    return {
      coin: null as any,
      getBackButtonText: () => {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;
        return mode === 'ios' ? 'Back' : '';
      },
    };
  },
  mounted() {
    const route = useRoute();
    const coinId = route.params.id as string;
    this.axios
      .get(`https://api.coinlore.net/api/ticker/?id=${coinId}`)
      .then((response: any) => {
        this.coin = response.data[0];
      });
  },
  methods: {
    getCoinColor(symbol: string): string {
      return COIN_COLORS[symbol] || '#00c896';
    },
    formatPrice(price: string): string {
      const num = parseFloat(price);
      if (num >= 1000) return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (num >= 1) return num.toFixed(4);
      return num.toFixed(6);
    },
    formatLargeNumber(value: string | number): string {
      const num = parseFloat(String(value));
      if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + 'T';
      if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
      if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K';
      return num.toFixed(2);
    },
  },
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
  },
});
</script>

<style scoped>
/* Hero Card */
.hero-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 24px 28px;
  background: linear-gradient(145deg, #161b22 0%, #0d1117 100%);
  border-bottom: 1px solid #21262d;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 200, 150, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.hero-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 900;
  color: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin-bottom: 14px;
  border: 3px solid rgba(255,255,255,0.1);
}

.hero-name {
  font-size: 26px;
  font-weight: 800;
  color: #e6edf3;
  letter-spacing: -0.5px;
}

.hero-symbol-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: #00c896;
  background: rgba(0, 200, 150, 0.1);
  border: 1px solid rgba(0, 200, 150, 0.25);
  padding: 4px 12px;
  border-radius: 100px;
  margin: 8px 0 16px;
  letter-spacing: 1px;
}

.hero-price {
  font-size: 34px;
  font-weight: 800;
  color: #e6edf3;
  font-family: 'Courier New', monospace;
  margin-bottom: 8px;
}

.hero-change {
  font-size: 15px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 100px;
}

.hero-change.positive {
  color: #00c896;
  background: rgba(0, 200, 150, 0.1);
  border: 1px solid rgba(0, 200, 150, 0.2);
}

.hero-change.negative {
  color: #eb445a;
  background: rgba(235, 68, 90, 0.1);
  border: 1px solid rgba(235, 68, 90, 0.2);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 20px;
  padding-bottom: 8px;
}

.stat-card {
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 14px;
  padding: 16px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: #00c896;
  box-shadow: 0 4px 20px rgba(0, 200, 150, 0.08);
}

.stat-card.full-width {
  grid-column: 1 / -1;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #e6edf3;
  word-break: break-all;
}

.stat-value.green {
  color: #00c896;
}

.stat-value.red {
  color: #eb445a;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 16px;
}

.loading-text {
  color: #8b949e;
  font-size: 14px;
}
</style>
