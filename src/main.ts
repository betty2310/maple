import './assets/vue_flow.css'
import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import timeago from 'vue-timeago3'

import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(timeago)

app.mount('#app')
