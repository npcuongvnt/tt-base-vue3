<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { usePagingParam } from '@/composables/usePagingParam';
import { PagingDataType } from '@/common/enum';
import { FilterOperator, FilterMatchMode } from 'primevue/api';
import { useFormat } from '@/composables/useFormat';

const module = 'example';
const store = useStore();
const router = useRouter();
const route = useRoute();
const { fe2be } = usePagingParam();
const { formatDate, formatCurrency } = useFormat();

const dt = ref();
const loading = ref(false);
const listRecords = ref();
const totalRecords = ref(0);
const selectedRecords = ref();
const filters = ref({
    example_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    example_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    example_amount: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    is_bool: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const pagingParams = ref({
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
    filters: filters.value
});

const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';
        case 'qualified':
            return 'success';
        case 'new':
            return 'info';
        case 'negotiation':
            return 'warning';
        case 'renewal':
            return null;
    }
};

onMounted(() => {
    loadPagingData();
});

const loadPagingData = () => {
    loading.value = true;
    pagingParams.value = { ...pagingParams.value };

    let beParam = fe2be(pagingParams.value);

    beParam.columns = 'example_name,example_date,example_amount,status,is_bool';

    //load danh sách
    loadData(beParam);

    //load tổng số
    loadDataSummary(beParam);
};

const loadData = (payload) => {
    if (payload) {
        payload['type'] = PagingDataType.DATA;
    }
    store.dispatch(`${module}/paging`, payload).then((res) => {
        if (res) {
            listRecords.value = res.pageData;
        }
        loading.value = false;
    });
};

const loadDataSummary = (payload) => {
    if (payload) {
        payload['type'] = PagingDataType.SUMMARY;
    }

    store.dispatch(`${module}/paging`, payload).then((res) => {
        if (res) {
            totalRecords.value = res.total;
        }
    });
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

const add = () => {
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
                    <Button :label="$t('commandname.ADD')" icon="pi pi-plus" class="p-button-success mr-2" @click="add" />
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
                :globalFilterFields="['example_name', 'country.name', 'company', 'representative.name']"
                v-model:selection="selectedRecords"
                tableStyle="min-width: 75rem"
            >
                <template #header>
                    <div class="flex justify-content-end">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search"> </InputIcon>
                            <InputText v-model="filters['example_name'].value" :placeholder="$t('search')" />
                        </IconField>
                    </div>
                </template>

                <template #empty> {{ $t('empty') }} </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                <Column field="example_name" header="Tên" filterMatchMode="startsWith" sortable>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>

                <Column field="example_date" header="Ngày" sortable filterField="example_date" dataType="date" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatDate(data.example_date) }}
                    </template>
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                    </template>
                </Column>

                <Column field="example_amount" header="Tiền" sortable filterField="example_amount" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.example_amount) }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                    </template>
                </Column>

                <Column field="status" header="Trạng thái" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses" class="p-column-filter" style="min-width: 12rem" :showClear="true"> </Dropdown>
                    </template>
                </Column>

                <Column field="is_bool" header="Có không" dataType="boolean" style="min-width: 6rem">
                    <template #body="{ data }">
                        <i class="pi" :class="{ 'pi-check-circle text-green-500': data.is_bool, 'pi-times-circle text-red-400': !data.is_bool }"></i>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
