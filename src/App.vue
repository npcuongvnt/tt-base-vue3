<script setup>
import { onMounted } from 'vue';
import { usePrimeVue } from 'primevue/config';
import vi from '@/i18n/vi';
const { config } = usePrimeVue();

onMounted(() => {
    config.locale = vi.primevue;
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
