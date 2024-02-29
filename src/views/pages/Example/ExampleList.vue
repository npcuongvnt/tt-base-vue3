<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { usePagingParam } from '@/composables/usePagingParam';
import { PagingDataType } from '@/common/enum';
import { FilterMatchMode } from 'primevue/api';

const module = 'example';
const store = useStore();
const router = useRouter();
const route = useRoute();
const { fe2be } = usePagingParam();

const dt = ref();
const loading = ref(false);
const listRecords = ref();
const totalRecords = ref(0);
const selectedRecords = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    example_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    is_bool: { value: null, matchMode: FilterMatchMode.EQUALS },
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
}

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

onMounted(() => {
    loadPagingData();
});

const loadPagingData = () => {
    loading.value = true;
    pagingParams.value = { ...pagingParams.value };

    let beParam = fe2be(pagingParams.value);

    //load danh sách
    loadData(beParam);

    //load tổng số
    loadDataSummary(beParam);
};

const loadData = (payload) => {
    if (payload) {
        payload['type'] = PagingDataType.Data
    }
    store.dispatch(`${module}/paging`, payload).then(
        (res) => {
            listRecords.value = res.PageData;
            loading.value = false;
        },
        (error) => {
        }
    );
};

const loadDataSummary = (payload) => {
    if (payload) {
        payload['type'] = PagingDataType.Summary
    }

    store.dispatch(`${module}/paging`, payload).then(
        (res) => {
            totalRecords.value = res.Total;
        },
        (error) => {
        }
    );

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
                :globalFilterFields="['example_name', 'country.name', 'company', 'representative.name']"
                v-model:selection="selectedRecords"
                tableStyle="min-width: 75rem"
            >
                <template #header>
                    <div class="flex justify-content-end">
                        <IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Tìm kiếm" />
                        </IconField>
                    </div>
                </template>

                <template #empty> Không có dữ liệu. </template>

                <template #loading> Đang lấy dữ liệu. Vui lòng chờ. </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                <Column 
                    field="example_name" 
                    header="Tên" 
                    filterMatchMode="startsWith" 
                    sortable>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText 
                            type="text" 
                            v-model="filterModel.value" 
                            @keydown.enter="filterCallback()" 
                            class="p-column-filter" 
                            placeholder="Nhập để tìm kiếm" />
                    </template>
                </Column>

                <Column field="date" header="Ngày" sortable filterField="date" dataType="date" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatDate(data.date) }}
                    </template>
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                    </template>
                </Column>

                <Column field="balance" header="Tiền" sortable filterField="balance" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.balance) }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                    </template>
                </Column>
                
                <Column 
                    field="status" 
                    header="Trạng thái" 
                    :showFilterMenu="false" 
                    :filterMenuStyle="{ width: '14rem' }" 
                    style="min-width: 12rem"
                >
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown 
                            v-model="filterModel.value" 
                            @change="filterCallback()" 
                            :options="statuses" 
                            placeholder="Chọn một" 
                            class="p-column-filter" 
                            style="min-width: 12rem" 
                            :showClear="true">
                        </Dropdown>
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
