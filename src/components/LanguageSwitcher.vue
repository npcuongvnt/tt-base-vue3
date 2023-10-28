<script setup>
import { ref, onMounted, watch } from 'vue';
import i18n from '@/i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const supportedLocales = ref([
    { name: t('locale.vi'), code: 'vi' },
    { name: t('locale.en'), code: 'en' }
]);
const selectedLocale = ref(null);

const switchLanguage = async () => {
    const newLocale = selectedLocale.value.code;

    await setLocale(newLocale);
};

const setLocale = async (locale) => {
    //TODO change prime locale

    i18n.global.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
};

onMounted(() => {
    //Không cần check phần tử ngôn ngữ được hỗ trợ đầu tiên, lúc nào cũng có
    selectedLocale.value = supportedLocales.value[0];
});

watch(selectedLocale, async (newLocale) => {
    await setLocale(newLocale.code);
});
</script>

<template>
    <!-- TODO -->
    <Dropdown v-model="selectedLocale" :options="supportedLocales" placeholder="Chọn ngôn ngữ" option-label="name" @change="switchLanguage" />
</template>
