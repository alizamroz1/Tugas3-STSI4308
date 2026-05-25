<template>
  <ion-app class="dark-mode">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';

// Force dark mode on the document
onMounted(() => {
  document.documentElement.classList.add('ion-palette-dark');
  document.body.classList.add('dark');
});
</script>

<style>
/* Global dark background */
html, body {
  background-color: #0d1117 !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

ion-app {
  background-color: #0d1117 !important;
}
</style>
