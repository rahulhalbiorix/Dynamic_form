/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

//router
import {router} from '@/Router/router'

//pinia

import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.use(pinia)
app.mount('#app')
