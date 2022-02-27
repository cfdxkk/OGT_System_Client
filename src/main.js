import { createApp } from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios"
import {Dexie} from "dexie";

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
let db = new Dexie('ogt')
db.version(1).stores({
    groupMessages: '&groupIdFrom',
    friendMessages: '&uuidFrom'
})
let App = createApp(app)
App.config.globalProperties.Axios = axios
App.config.globalProperties.Dexie = db
App.use(store)
App.use(router)
// App.use(ElementPlus)
App.mount('#app')
