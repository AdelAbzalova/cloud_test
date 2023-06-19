import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Bootstrap } from 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


const app= createApp(App)
// app.axios = axios
app.use(store).use(router).mount('#app')
