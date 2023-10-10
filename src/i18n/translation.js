import i18n from '@/i18n';

const Trans = {
    get supportedLocales() {
        return ['vi', 'en'];
    },

    set currentLocale(newLocale) {
        i18n.global.locale.value = newLocale;
    },

    async switchLanguage(newLocale) {
        Trans.currentLocale = newLocale;
        document.querySelector('html').setAttribute('lang', newLocale);
    }
};

export default Trans;
