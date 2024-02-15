<script setup>
import { onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import baseList from '@/views/base/baseList';

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {});
onMounted(() => {});

const openNew = () => {
    let id = 'id';
    let master = this;
    router.push({
        path: `${route.path}/${id}`,
        meta: {
            id: id,
            master: master
        }
    });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </div>
                    </template>
                </Toolbar>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
