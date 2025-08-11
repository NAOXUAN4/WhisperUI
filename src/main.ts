import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


import App from './App.vue';
import '@/style/index.scss';

library.add(...[far, fas]);

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
