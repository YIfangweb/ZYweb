import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import ElementPuls from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import axios from './utils/http'
import BaiduMap from 'vue-baidu-map-3x'

const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)

app.config.globalProperties.$axios = axios

app
    .use(ElementPuls)
    .use(router)
    .use(pinia)
    .use(BaiduMap, {
        ak: '9kglcLyJmQEP4OO7ikWOWKuVtiN6htTX'
    })
app.mount('#app')