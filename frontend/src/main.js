import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faInfoCircle);

//createApp(App).mount('#app')

const app = createApp(App);
app.mount('#app');

app.component('font-awesome-icon', FontAwesomeIcon);
