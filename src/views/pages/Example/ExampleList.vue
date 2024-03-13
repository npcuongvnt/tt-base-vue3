<script setup>
import { ref } from 'vue';
import { useFormatUtil } from '@/composables';
import useBaseList from '@/views/base/baseList';

const { formatDate, formatCurrency } = useFormatUtil();


const dt = ref();
const module = 'example';
const dataKey = 'example_id';
const columns = 'example_id,example_name,example_date,example_amount,status,is_bool';

const columns = ref({
        example_id: { isKey: true },
        example_name: { value: '', matchMode: CONSTANT.PrimeConst.FilterMatchMode.CONTAINS },
        example_date: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.DATE_IS },
        example_amount: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS },
        status: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS },
        is_bool: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS }
    });

const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

const getSeverity = (status) => {
    switch (status) {
        case 1:
            return 'danger';
        case 2:
            return 'success';
        case 3:
            return 'info';
        case 4:
            return 'warning';
        case 5:
            return null;
    }
};

const { 
    filters, 
    pagingParams, 
    loading, 
    listRecords, 
    totalRecords, 
    selectedRecords, 
    onPage, onSort, onFilter, onSearchInputKeyDown, 
    add, 
    view, 
    edit, 
    deleteOne, 
    deleteMulti 
} = useBaseList({ module, dataKey, columns });

</script>

<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="grid">
        <div class="col-12">
            <DataTable
                ref="dt"
                :dataKey="dataKey"
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
                    <Toolbar>
                        <template #start>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search"> </InputIcon>
                                <InputText v-model="filters['example_name'].value" :placeholder="$t('search')" @keydown="onSearchInputKeyDown" />
                            </IconField>
                        </template>

                        <template #end>
                            <Button :label="$t('commandname.ADD')" icon="pi pi-plus" class="p-button-success mr-2" @click="add" />
                            <Button :label="$t('commandname.DELETE')" icon="pi pi-trash" severity="danger" @click="deleteMulti" :disabled="!selectedRecords || !selectedRecords.length" />
                        </template>
                    </Toolbar>
                </template>

                <template #empty> {{ $t('empty') }} </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                <Column field="example_name" header="Tên" sortable>
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

                <Column style="width: 12rem" bodyStyle="text-align:center" frozen alignFrozen="right">
                    <template #body="slotProps">
                        <Button icon="pi pi-search" outlined rounded severity="info" class="mr-2" @click="view(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded severity="warning" class="mr-2" @click="edit(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteOne(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
