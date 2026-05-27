import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { IonicVue } from '@ionic/vue'

/* Core Ionic CSS */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme */
import './theme/variables.css'

// Listing 12.1 — Aktifkan axios secara global
const app = createApp(App)
  .use(IonicVue)
  .use(VueAxios, axios)
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})
