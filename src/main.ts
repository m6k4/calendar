import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'font-awesome/css/font-awesome.css';
import './index.css';
import directives from "./directives/";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
directives(app);
app.use(router);
app.use(ElementPlus);
app.mount('#app');

