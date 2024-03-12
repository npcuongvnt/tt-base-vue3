import { ref, onMounted } from 'vue';

export default (config) => {

  const loading = ref(false);
  const listRecords = ref();
  const totalRecords = ref(0);

  const { module, dataKey, columns} = config;

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
  })

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

  return {
    loading,
    listRecords,
    totalRecords,
    onPage,
    onSort,
    onFilter,
    onSearchInputKeyDown
  }
}