

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)



app.component('Toaster', Toaster)
app.mount('#app')
