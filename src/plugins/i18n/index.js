import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        hello: 'hello world'
    },
    ja: {
        hello: 'こんにちは、世界'
    },
    de: {
        hello: 'hi!'
    }
};

const i18n = createI18n({
    locale: 'ja',
    fallbackLocale: 'en',
    messages
});

export default i18n;
