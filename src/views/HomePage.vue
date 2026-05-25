<template>
  <ion-page>
    <!-- Header -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>
          <div class="app-title">
            <span class="title-icon">₿</span>
            CryptoTracker
          </div>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refresh()" fill="clear" color="primary">
            <ion-icon :icon="refreshOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Pull to Refresh -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content
          pulling-text="Pull to refresh..."
          refreshing-spinner="crescent"
          refreshing-text="Fetching latest prices..."
        ></ion-refresher-content>
      </ion-refresher>

      <!-- Condensed header -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="large-title">Crypto Market</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Stats Bar -->
      <div class="stats-bar" v-if="coins.length > 0">
        <div class="stat-pill">
          <span class="stat-pill-label">Coins</span>
          <span class="stat-pill-value">{{ coins.length }}</span>
        </div>
        <div class="stat-pill">
          <span class="stat-pill-label">Top Coin</span>
          <span class="stat-pill-value green">{{ coins[0]?.name }}</span>
        </div>
        <div class="stat-pill">
          <span class="stat-pill-label">Updated</span>
          <span class="stat-pill-value">{{ lastUpdated }}</span>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <ion-searchbar
          v-model="searchQuery"
          placeholder="Search cryptocurrency..."
          :debounce="300"
          color="dark"
          class="crypto-search"
        ></ion-searchbar>
      </div>

      <!-- Table Header -->
      <div class="table-header" v-if="filteredCoins.length > 0">
        <span class="th-rank">#</span>
        <span class="th-name">Name / Symbol</span>
        <span class="th-price">Price (USD)</span>
      </div>

      <!-- Loading State -->
      <div class="loading-container" v-if="isLoading">
        <ion-spinner name="crescent" color="primary" class="big-spinner"></ion-spinner>
        <p class="loading-text">Fetching cryptocurrency data...</p>
        <p class="loading-sub">From coinlore.net API</p>
      </div>

      <!-- Error State -->
      <div class="error-container" v-else-if="hasError">
        <div class="error-icon">⚠️</div>
        <p class="error-text">Failed to load data</p>
        <ion-button @click="loadCoins()" fill="outline" color="primary" size="small">
          Retry
        </ion-button>
      </div>

      <!-- Coin List -->
      <ion-list v-else-if="filteredCoins.length > 0" class="coin-list">
        <CryptoListItem
          v-for="coin in filteredCoins"
          :key="coin.id"
          :coin="coin"
        />
      </ion-list>

      <!-- Empty state -->
      <div class="empty-container" v-else-if="!isLoading && searchQuery">
        <div class="empty-icon">🔍</div>
        <p class="empty-text">No results for "{{ searchQuery }}"</p>
      </div>

      <div style="height: 32px;"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { refreshOutline } from 'ionicons/icons';
import CryptoListItem from '@/components/CryptoListItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      coins: [] as any[],
      isLoading: true,
      hasError: false,
      searchQuery: '',
      lastUpdated: 'Never',
      refreshOutline,
    };
  },
  computed: {
    filteredCoins(): any[] {
      if (!this.searchQuery.trim()) return this.coins;
      const q = this.searchQuery.toLowerCase();
      return this.coins.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q)
      );
    },
  },
  mounted() {
    this.loadCoins();
  },
  methods: {
    loadCoins() {
      this.isLoading = true;
      this.hasError = false;
      this.axios
        .get('https://api.coinlore.net/api/tickers/')
        .then((response: any) => {
          this.coins = response.data.data;
          const now = new Date();
          this.lastUpdated = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          });
          this.isLoading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.isLoading = false;
        });
    },
    handleRefresh(ev: CustomEvent) {
      this.axios
        .get('https://api.coinlore.net/api/tickers/')
        .then((response: any) => {
          this.coins = response.data.data;
          const now = new Date();
          this.lastUpdated = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          });
          (ev.detail as any).complete();
        })
        .catch(() => {
          (ev.detail as any).complete();
        });
    },
    refresh() {
      this.loadCoins();
    },
  },
  components: {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSpinner,
    IonTitle,
    IonToolbar,
    CryptoListItem,
  },
});
</script>

<style scoped>
.app-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 18px;
  background: linear-gradient(90deg, #00c896, #6c63ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-icon {
  background: linear-gradient(135deg, #f7931a, #ffcc00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.large-title {
  color: #e6edf3 !important;
  font-size: 32px !important;
  font-weight: 800 !important;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  gap: 10px;
  padding: 14px 16px 6px;
  overflow-x: auto;
}

.stats-bar::-webkit-scrollbar { display: none; }

.stat-pill {
  display: flex;
  flex-direction: column;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 12px;
  padding: 10px 14px;
  min-width: 90px;
  white-space: nowrap;
}

.stat-pill-label {
  font-size: 10px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.stat-pill-value {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
}

.stat-pill-value.green {
  color: #00c896;
}

/* Search */
.search-container {
  padding: 8px 12px 4px;
}

.crypto-search {
  --background: #161b22;
  --border-radius: 12px;
  --color: #e6edf3;
  --placeholder-color: #8b949e;
  --icon-color: #8b949e;
  border: 1px solid #21262d;
  border-radius: 12px;
}

/* Table Header */
.table-header {
  display: flex;
  align-items: center;
  padding: 8px 32px 4px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #21262d;
  margin: 0 16px;
}

.th-rank {
  width: 38px;
  margin-right: 12px;
}

.th-name {
  flex: 1;
}

.th-price {
  text-align: right;
}

/* Coin List */
.coin-list {
  background: transparent !important;
  padding-top: 8px !important;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 12px;
}

.big-spinner {
  width: 48px;
  height: 48px;
}

.loading-text {
  color: #e6edf3;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.loading-sub {
  color: #8b949e;
  font-size: 12px;
  margin: 0;
}

/* Error */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  gap: 12px;
}

.error-icon {
  font-size: 48px;
}

.error-text {
  color: #eb445a;
  font-size: 16px;
  font-weight: 600;
}

/* Empty */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  gap: 12px;
}

.empty-icon {
  font-size: 40px;
}

.empty-text {
  color: #8b949e;
  font-size: 14px;
}
</style>
