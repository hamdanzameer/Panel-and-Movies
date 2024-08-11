import { createApp } from 'vue';
import router from './routes.js';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primevue/resources/primevue.min.css';          // Core CSS
import 'primeicons/primeicons.css';
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

// Uncomment and configure Toast
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
});

app.mount('#app');
