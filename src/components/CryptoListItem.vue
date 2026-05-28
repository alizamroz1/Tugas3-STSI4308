<!-- Listing 12.2 — Komponen item koin (CryptoListItem) -->
<template>
  <ion-item
    v-if="coin"
    :routerLink="'/coin/' + coin.id"
    :detail="false"
    class="coin-row"
  >
    <!-- Kolom RANK (kiri) -->
    <div class="col-rank">
      <span class="label">Rank</span>
      <span class="value">{{ coin.rank }}</span>
    </div>

    <!-- Kolom NAMA & SIMBOL (tengah) — ion-label sesuai panduan -->
    <ion-label class="col-name">
      <span class="label">{{ coin.name }}</span>
      <span class="value">{{ coin.symbol }}</span>
    </ion-label>

    <!-- Kolom USD & HARGA (kanan) -->
    <div slot="end" class="col-price">
      <span class="label">USD</span>
      <span class="value">{{ formatPrice(coin.price_usd) }}</span>
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
    formatPrice(p: string): string {
      const n = parseFloat(p)
      if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      if (n >= 1)    return n.toFixed(2)
      return n.toFixed(6)
    }
  }
})
</script>

<style scoped>
/* Row item mirip gambar panduan */
ion-item.coin-row {
  --background: #fdf6e3;
  --border-color: #c8b97a;
  --border-width: 0 0 1px 0;
  --border-style: solid;
  --padding-start: 0;
  --inner-padding-end: 0;
  --min-height: 64px;
}

/* Kolom kiri: Rank */
.col-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  padding: 8px 12px;
  border-right: 1px solid #c8b97a;
}

/* Kolom tengah: Nama & Simbol */
.col-name {
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
}

/* Kolom kanan: USD & Harga */
.col-price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 14px;
  border-left: 1px solid #c8b97a;
  min-width: 110px;
}

/* Label kecil (teks "Rank", "USD", nama koin) */
.label {
  font-size: 12px;
  color: #555;
  margin-bottom: 2px;
}

/* Value besar (nomor rank, simbol, harga) */
.value {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
</style>
