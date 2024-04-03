import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

export const usePrimeService = (app) => {
    app.use(ToastService);
    app.use(DialogService);
    app.use(ConfirmationService);
};
