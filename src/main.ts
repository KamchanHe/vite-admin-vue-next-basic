import { createApp } from 'vue';
import App from './App.vue';

import router from '@/router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import '@/permission';

import 'default-passive-events';

import '@/styles/index.scss';

// 引入svg注册脚本
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
