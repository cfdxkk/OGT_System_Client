import { createApp } from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

let App = createApp(app)
App.config.globalProperties.Axios = axios
App.use(store)
App.use(router)
// App.use(ElementPlus)
App.mount('#app')
