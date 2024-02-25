<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePagingParam } from '@/composables/usePagingParam';
import CustomerService from '@/service/CustomerService';

const customerService = new CustomerService();
const router = useRouter();
const route = useRoute();
const { fe2be } = usePagingParam();

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const listRecords = ref();
const selectedRecords = ref();
const selectAll = ref(false);
const filters = ref({
    name: { value: '', matchMode: 'contains' },
    'country.name': { value: '', matchMode: 'contains' },
    company: { value: '', matchMode: 'contains' },
    'representative.name': { value: '', matchMode: 'contains' }
});
const pagingParams = ref({
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
    filters: filters.value
});

onMounted(() => {
    loading.value = true;
    loadPagingData();
});

const loadPagingData = () => {
    loading.value = true;
    pagingParams.value = { ...pagingParams.value };

    console.log(pagingParams.value);

    let beParam = fe2be(pagingParams.value);

    setTimeout(() => {
        customerService.getCustomersLarge({ lazyEvent: JSON.stringify(beParam) }).then((data) => {
            listRecords.value = data;
            totalRecords.value = data.length;
            loading.value = false;
        });
    }, Math.random() * 1000 + 250);
};
const onPage = (event) => {
    pagingParams.value = event;
    loadPagingData(event);
};
const onSort = (event) => {
    pagingParams.value = event;
    loadPagingData(event);
};
const onFilter = (event) => {
    pagingParams.value.filters = filters.value;
    loadPagingData(event);
};
const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll.value) {
        customerService.getCustomers().then((data) => {
            selectAll.value = true;
            selectedRecords.value = data.customers;
        });
    } else {
        selectAll.value = false;
        selectedRecords.value = [];
    }
};
const onRowSelect = () => {
    selectAll.value = selectedRecords.value.length === totalRecords.value;
};
const onRowUnselect = () => {
    selectAll.value = false;
};

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
            <Toast />
            <Toolbar class="">
                <template v-slot:start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                dataKey="id"
                lazy
                paginator
                :loading="loading"
                :value="listRecords"
                :totalRecords="totalRecords"
                :first="pagingParams.first"
                :rows="pagingParams.rows"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                v-model:filters="filters"
                @page="onPage($event)"
                @sort="onSort($event)"
                @filter="onFilter($event)"
                filterDisplay="row"
                :globalFilterFields="['name', 'country.name', 'company', 'representative.name']"
                v-model:selection="selectedRecords"
                :selectAll="selectAll"
                @select-all-change="onSelectAllChange"
                @row-select="onRowSelect"
                @row-unselect="onRowUnselect"
                tableStyle="min-width: 75rem"
            >
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="name" header="Name" filterMatchMode="startsWith" sortable>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Nhập để tìm kiếm" />
                    </template>
                </Column>
                <Column field="country.name" header="Country" filterField="country.name" filterMatchMode="contains" sortable>
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                            <span>{{ data.country.name }}</span>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Nhập để tìm kiếm" />
                    </template>
                </Column>
                <Column field="company" header="Company" filterMatchMode="contains" sortable>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Nhập để tìm kiếm" />
                    </template>
                </Column>
                <Column field="representative.name" header="Representative" filterField="representative.name" sortable>
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                            <span>{{ data.representative.name }}</span>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Nhập để tìm kiếm" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
