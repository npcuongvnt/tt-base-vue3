import { ref, onMounted } from 'vue';
import { useI18n, useStore, useRouter, useRoute, useConfirm, useToast, usePagingParam, ENUM, CONSTANT } from '@/composables';

export default (config) => {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const confirm = useConfirm();
    const toast = useToast();
    const { fe2be } = usePagingParam();

    const loading = ref(false);
    const listRecords = ref();
    const totalRecords = ref(0);
    const selectedRecords = ref();

    const { module, dataKey, columns } = config;

    const filters = ref({
        example_name: { value: '', matchMode: CONSTANT.PrimeConst.FilterMatchMode.CONTAINS },
        example_date: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.DATE_IS },
        example_amount: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS },
        status: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS },
        is_bool: { value: null, matchMode: CONSTANT.PrimeConst.FilterMatchMode.EQUALS }
    });

    const pagingParams = ref({
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    });

    onMounted(() => {
        console.log('Mounted');

        loadPagingData();
    });

    const loadPagingData = () => {
        loading.value = true;
        pagingParams.value = { ...pagingParams.value };

        let beParam = fe2be(pagingParams.value);

        beParam.columns = columns;

        //load danh sách
        loadData(beParam);

        //load tổng số
        loadDataSummary(beParam);
    };

    const loadData = (payload) => {
        if (payload) {
            payload['type'] = ENUM.PagingDataType.DATA;
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
            payload['type'] = ENUM.PagingDataType.SUMMARY;
        }

        store.dispatch(`${module}/paging`, payload).then((res) => {
            if (res) {
                totalRecords.value = res.total;
            }
        });
    };

    const onPage = (event) => {
        pagingParams.value = event;
        loadPagingData();
    };

    const onSort = (event) => {
        pagingParams.value = event;
        loadPagingData();
    };

    const onFilter = () => {
        pagingParams.value.filters = filters.value;
        loadPagingData();
    };

    const onSearchInputKeyDown = (event) => {
        if (event.code === 'Enter' || event.keyCode == 13) {
            loadPagingData();
        }
    };

    const add = () => {
        let id = 'id';
        router.push({
            path: `${route.path}/${id}`,
            meta: {
                id: id,
                data: {}
            }
        });
    };

    const view = (data) => {};

    const edit = (data) => {};

    const deleteOne = (data) => {
        confirmDelete([data]);
    };

    const deleteMulti = () => {
        let deleteRecords = [...selectedRecords.value];

        confirmDelete(deleteRecords);
    };

    const confirmDelete = (datas) => {
        confirm.require({
            header: t('message.HeaderDelete'),
            message: t('message.MessageDelete'),
            icon: 'pi pi-info-circle',
            rejectLabel: t('commandname.CANCEL'),
            acceptLabel: t('commandname.DELETE'),
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: () => {
                let deleteParam = {
                    Ignores: [],
                    Models: datas,
                    Ids: datas.map((i) => i[dataKey])
                };

                store.dispatch(`${module}/delete`, deleteParam).then((res) => {
                    if (res) {
                        toast.add({ severity: 'success', summary: t('message.SummaryAcceptDelete'), detail: t('message.DetailAcceptDelete'), life: 3000 });
                    }
                });
            },
            reject: () => {
                toast.add({ severity: 'info', summary: t('message.SummaryRejectDelete'), detail: t('message.DetailRejectDelete'), life: 2000 });
            }
        });
    };

    return {
        filters,
        pagingParams,
        loading,
        listRecords,
        totalRecords,
        selectedRecords,
        onPage,
        onSort,
        onFilter,
        onSearchInputKeyDown,
        add,
        view,
        edit,
        deleteOne,
        deleteMulti
    };
};
