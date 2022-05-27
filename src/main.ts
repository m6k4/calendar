import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'font-awesome/css/font-awesome.css';
import './index.css';
import directives from "./directives/";

const app = createApp(App);
directives(app);
app.use(router);
app.mount('#app');

