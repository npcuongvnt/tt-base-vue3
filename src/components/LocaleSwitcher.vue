<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import vi from '@/i18n/vi';
import en from '@/i18n/en';
import tr from '@/i18n/tr';

const { config } = usePrimeVue();

const localeFiles = {
    vi,
    en,
    tr
};

const locales = ref(['vi', 'en', 'tr']);

const onLocaleChange = ({ value }) => {
    config.locale = localeFiles[value].primevue;
};
</script>

<template>
    <Dropdown v-model="$i18n.locale" :options="locales" @change="onLocaleChange" placeholder="Chọn" />
</template>
