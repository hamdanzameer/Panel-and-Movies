import { createApp } from 'vue'
import router from './routes.js'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primevue/resources/primevue.min.css';          // Core CSS
import 'primeicons/primeicons.css';         
const app=createApp(App)
app.use(PrimeVue);
app.use(router);
app.mount('#app')
           



