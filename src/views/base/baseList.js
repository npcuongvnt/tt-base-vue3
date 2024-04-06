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

    const dataKey = ref('');
    const loading = ref(false);
    const listRecords = ref([]);
    const totalRecords = ref(0);
    const selectedRecords = ref([]);

    const { module, columns } = config;
    const filters = ref({ ...columns.value });

    for (const [key, item] of Object.entries(columns.value)) {
        if (item['isKey']) {
            dataKey.value = key;
        }
    }

    const pagingParams = ref({
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    });

    onMounted(() => {
        loadPagingData();
    });

    const loadPagingData = () => {
        loading.value = true;
        pagingParams.value = { ...pagingParams.value };

        let beParam = fe2be(pagingParams.value, columns.value);

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

    const onCommandClick = (commandName, data) => {
        switch (commandName) {
            case CONSTANT.CommandName.ADD:
                add();
                break;
            case CONSTANT.CommandName.VIEW:
                view(data);
                break;
            case CONSTANT.CommandName.EDIT:
                edit(data);
                break;
            case CONSTANT.CommandName.DELETE:
                deleteOne(data);
                break;
            case CONSTANT.CommandName.DELETEMULTI:
                deletes(data);
                break;
        }
    };

    const add = () => {
        let id = 'id';
        router.push({
            path: `${route.path}/${id}`,
            meta: {
                id: id,
                viewMode: ENUM.ViewMode.ADD
            }
        });
    };

    const view = (data) => {
        console.log(data);
    };

    const edit = (data) => {
        console.log(data);
    };

    const showDetail = (mode, id) => {
        router.push({
            path: `${route.path}/${id}`,
            meta: {
                id: id,
                viewMode: mode
            }
        });
    };

    const deleteOne = (data) => {
        confirmDelete([data]);
    };

    const deletes = () => {
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
                    Ids: datas.map((i) => i[dataKey.value])
                };

                store.dispatch(`${module}/delete`, deleteParam).then((res) => {
                    if (res) {
                        toast.add({ severity: 'success', summary: t('message.SummaryAcceptDelete'), detail: t('message.DetailAcceptDelete'), life: 3000 });

                        //Load lại danh sách
                        loadPagingData();
                    }
                });
            },
            reject: () => {
                toast.add({ severity: 'info', summary: t('message.SummaryRejectDelete'), detail: t('message.DetailRejectDelete'), life: 2000 });
            }
        });
    };

    return {
        dataKey,
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
        onCommandClick,
        showDetail
    };
};
