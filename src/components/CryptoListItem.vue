<template>
  <ion-item
    v-if="coin"
    :routerLink="'/coin/' + coin.id"
    :detail="false"
    class="crypto-item"
    lines="none"
  >
    <!-- Rank Badge -->
    <div slot="start" class="rank-badge">
      <span class="rank-number">#{{ coin.rank }}</span>
    </div>

    <!-- Coin Info -->
    <ion-label class="ion-text-wrap coin-label">
      <div class="coin-header">
        <div class="coin-icon" :style="{ backgroundColor: getCoinColor(coin.symbol) }">
          {{ coin.symbol.charAt(0) }}
        </div>
        <div class="coin-name-block">
          <h2 class="coin-name">{{ coin.name }}</h2>
          <span class="coin-symbol ion-badge">{{ coin.symbol }}</span>
        </div>
      </div>
      <div class="coin-price-row">
        <span class="price-label">Price</span>
        <span class="price-value">${{ formatPrice(coin.price_usd) }}</span>
        <span
          class="price-change"
          :class="parseFloat(coin.percent_change_24h) >= 0 ? 'positive' : 'negative'"
        >
          <span class="arrow">{{ parseFloat(coin.percent_change_24h) >= 0 ? '▲' : '▼' }}</span>
          {{ Math.abs(parseFloat(coin.percent_change_24h)).toFixed(2) }}%
        </span>
      </div>
    </ion-label>

    <!-- Chevron -->
    <div slot="end" class="chevron-icon">›</div>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel } from '@ionic/vue';
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
  name: 'CryptoListItem',
  components: {
    IonItem,
    IonLabel,
  },
  props: {
    coin: Object,
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
  },
});
</script>

<style scoped>
.crypto-item {
  --background: #161b22;
  --border-radius: 16px;
  --padding-start: 16px;
  --padding-end: 12px;
  --inner-padding-end: 0;
  --min-height: 80px;
  margin: 8px 16px;
  border-radius: 16px;
  border: 1px solid #21262d;
  box-shadow: 0 4px 24px rgba(0, 200, 150, 0.05);
  transition: all 0.25s ease;
}

.crypto-item:hover {
  --background: #1c2128;
  border-color: #00c896;
  box-shadow: 0 4px 32px rgba(0, 200, 150, 0.15);
  transform: translateY(-1px);
}

.rank-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  margin-right: 12px;
}

.rank-number {
  font-size: 12px;
  font-weight: 700;
  color: #8b949e;
  letter-spacing: 0.5px;
}

.coin-label {
  padding: 12px 0;
}

.coin-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.coin-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.coin-name-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.coin-name {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #e6edf3 !important;
  margin: 0 !important;
}

.coin-symbol {
  font-size: 11px;
  font-weight: 600;
  color: #00c896;
  background: rgba(0, 200, 150, 0.1);
  border: 1px solid rgba(0, 200, 150, 0.2);
  padding: 2px 7px;
  border-radius: 100px;
  letter-spacing: 0.5px;
}

.coin-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-label {
  font-size: 12px;
  color: #8b949e;
}

.price-value {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
  font-family: 'Courier New', monospace;
}

.price-change {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 100px;
}

.price-change.positive {
  color: #00c896;
  background: rgba(0, 200, 150, 0.1);
}

.price-change.negative {
  color: #eb445a;
  background: rgba(235, 68, 90, 0.1);
}

.arrow {
  font-size: 10px;
  margin-right: 1px;
}

.chevron-icon {
  color: #8b949e;
  font-size: 22px;
  font-weight: 300;
  padding-left: 6px;
}
</style>
