<script setup></script>

<template>
    <div class="app">
        <router-view />

        <div class="omega-loading-class" id="omega-loading">
            <div class="loading-cover"></div>
            <div class="loading-svg">
                <div class="effect"></div>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import '@/assets/layout/omega-loading.scss';
</style>
