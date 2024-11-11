import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import PrimeVue from 'primevue/config';
import { usePrimeComponent } from './composables/usePrimeComponent';
import { usePrimeService } from './composables/usePrimeService';
import { usePrimeDirective } from './composables/usePrimeDirective';
import setupInterceptors from './helpers/setupInterceptors';
import vue3GoogleLogin from 'vue3-google-login';
// import { initFacebookSdk } from './helpers';

// import 'primevue/resources/themes/aura-light-green/theme.css';
import '@/assets/styles.scss';

const app = createApp(App);

//axios interceptor
setupInterceptors(store);

app.use(router);
app.use(store);
app.use(i18n);
app.use(PrimeVue);

usePrimeComponent(app);
usePrimeService(app);
usePrimeDirective(app);

fetch(import.meta.env.BASE_URL + 'config.json')
    .then((response) => response.json())
    .then((config) => {
        // either use window.config
        window.config = config;
        // or use [Vue Global Config][1]
        app.config.globalProperties.config = config;

        return config;
    })
    .then((config) => {
        app.use(vue3GoogleLogin, {
            clientId: config.Google.client_id
        });

        // initFacebookSdk(config.Facebook);
    })
    .then(() => {
        // FINALLY, mount the app
        app.mount('#app');
    });
