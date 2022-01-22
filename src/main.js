import { createApp } from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

let App = createApp(app)
App.config.globalProperties.Axios = axios
App.use(store).use(router).mount('#app')
