import { createI18n } from 'vue-i18n';
import vi from './vi.json';
import en from './en.json';

const i18n = createI18n({
    locale: 'vi',
    fallbackLocale: 'en',
    messages: { vi, en },
    legacy: false
});

export default i18n;
