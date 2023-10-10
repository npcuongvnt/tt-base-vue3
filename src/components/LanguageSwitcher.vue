<script setup>
import Tr from '@/i18n/translation';

const supportedLocales = Tr.supportedLocales;

const switchLanguage = async (event) => {
    const newLocale = event.value;

    //TODO

    await Tr.switchLanguage(newLocale);
};
</script>

<template>
    <!-- TODO -->
    <Dropdown :options="supportedLocales" placeholder="Chọn ngôn ngữ" @change="switchLanguage" />
</template>
