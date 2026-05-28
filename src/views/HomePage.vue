<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cryptocurrency</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Tombol Refresh di tengah atas -->
      <div class="refresh-wrap">
        <ion-button @click="loadCoins" shape="round">Refresh</ion-button>
      </div>

      <!-- ion-refresher sesuai panduan Listing 12.5 -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content />
      </ion-refresher>

      <!-- Loading -->
      <div class="center" v-if="loading">
        <ion-spinner name="crescent" />
        <p>Memuat data...</p>
      </div>

      <!-- ion-list sesuai panduan Listing 12.5 -->
      <ion-list v-else>
        <CryptoListItem
          v-for="coin in coins"
          :key="coin.id"
          :coin="coin"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton, IonContent, IonHeader, IonList,
  IonPage, IonRefresher, IonRefresherContent,
  IonSpinner, IonTitle, IonToolbar
} from '@ionic/vue'
import CryptoListItem from '@/components/CryptoListItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonButton, IonContent, IonHeader, IonList,
    IonPage, IonRefresher, IonRefresherContent,
    IonSpinner, IonTitle, IonToolbar,
    CryptoListItem
  },
  data() {
    return {
      coins: [] as any[],
      loading: true
    }
  },
  mounted() {
    this.loadCoins()
  },
  methods: {
    // Listing 12.5 — axios.get sesuai panduan
    loadCoins() {
      this.loading = true
      this.axios.get('https://api.coinlore.net/api/tickers/')
        .then((res: any) => {
          this.coins = res.data.data
          this.loading = false
        })
        .catch(() => { this.loading = false })
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
ion-content { --background: #fdf6e3; }

.refresh-wrap {
  display: flex;
  justify-content: center;
  padding: 16px 0 8px;
}

ion-list { background: transparent; margin: 0 8px; }

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 12px;
}
</style>
