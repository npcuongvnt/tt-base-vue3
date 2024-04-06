<script setup>
import { ref, onMounted } from 'vue';
import { ENUM, CONSTANT } from '@/composables';
import useBaseDetail from '@/views/base/baseDetail';

const id = ref(1);

const { model, onCommandClick } = useBaseDetail({ viewMode: ENUM.ViewMode.ADD, module: 'example', id: id.value });

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownItem = ref(null);

onMounted(() => {
    console.log('Example Mounted');
});
</script>

<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="col-12">
        <Toolbar>
            <template v-slot:start>
                <Button icon="pi pi-arrow-left" class="p-button-sm" @click="onCommandClick(CONSTANT.CommandName.BACK)" />
            </template>
            <template v-slot:end>
                <Button label="Sửa" icon="pi pi-pencil" class="mr-2" disabled @click="onCommandClick(CONSTANT.CommandName.EDIT)" />
                <Button label="Lưu" icon="pi pi-save" class="p-button-success mr-2" @click="onCommandClick(CONSTANT.CommandName.SAVE)" />
                <Button label="Xóa" icon="pi pi-trash" class="p-button-danger mr-2" @click="onCommandClick(CONSTANT.CommandName.DELETE)" />
            </template>
        </Toolbar>
    </div>
    <div class="col-12">
        <div class="card">
            <h5>Advanced</h5>
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6">
                    <label for="firstname2">Firstname</label>
                    <InputText id="firstname2" type="text" v-model="model.example_name" />
                </div>
                <div class="field col-12 md:col-6">
                    <label for="lastname2">Lastname</label>
                    <InputText id="lastname2" type="text" />
                </div>
                <div class="field col-12">
                    <label for="address">Address</label>
                    <Textarea id="address" rows="4" />
                </div>
                <div class="field col-12 md:col-6">
                    <label for="city">City</label>
                    <InputText id="city" type="text" />
                </div>
                <div class="field col-12 md:col-3">
                    <label for="state">State</label>
                    <Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                        placeholder="Select One"></Dropdown>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="zip">Zip</label>
                    <InputText id="zip" type="text" />
                </div>
            </div>
        </div>
    </div>
</template>
