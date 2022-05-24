import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'font-awesome/css/font-awesome.css';
import './index.css';

createApp(App).use(router).mount('#app')
