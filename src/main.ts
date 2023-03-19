import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Router from '../src/router/Router';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(Router);
app.use(createPinia());
app.mount('#app');
