import { FilterMatchMode } from 'primevue/api';

/**
 * Composable paging Param
 * @returns
 */
export function usePagingParam() {
    /**
     * Chuyển đổi từ FE paging param sang cho phù hợp với BE paging params
     * @param {*} fePagingParams
     * @param {*} type
     * @returns
     */
    const fe2be = (fePagingParams, columns, type) => {
        let bePagingParams = {
            columns:
                Object.keys(columns)
                    .map((key) => `${key}`)
                    .join(',') || '*',
            filter: fe2beFilter(fePagingParams.filters),
            type: type || 0,
            skip: fePagingParams.first,
            take: fePagingParams.rows,
            sort: fe2beSort(fePagingParams.sortField, fePagingParams.sortOrder),
            emptyFilter: '',
            selectedItem: ''
        };

        return bePagingParams;
    };

    /**
     * Chuyển đổi từ FE filter param sang cho phù hợp với BE filter params
     * @param {*} feFilters
     * @returns
     */
    const fe2beFilter = (feFilters) => {
        let filters = [];

        for (const prop in feFilters) {
            if (Object.prototype.hasOwnProperty.call(feFilters, prop)) {
                //Néu có filter thì mới truyền where lên.
                //Cần xem lại chỗ này xem như nào thì hợp lý
                if (feFilters[prop].value != null && feFilters[prop].value != '') {
                    let itemFilter = {
                        field: prop,
                        value: feFilters[prop].value,
                        operator: fe2beMatchMode(feFilters[prop].matchMode)
                    };

                    filters.push(itemFilter);
                }
            }
        }

        return JSON.stringify(filters);
    };

    /**
     * Chuyển đổi từ FE sort param sang cho phù hợp với BE sort params
     * @param {*} feSortField
     * @param {*} feSortOrder
     * @returns
     */
    const fe2beSort = (feSortField, feSortOrder) => {
        if (feSortField == null) {
            return '';
        }

        return `${feSortField} ${feSortOrder == -1 ? 'DESC' : 'ASC'}`;
    };

    const fe2beMatchMode = (feMatchMode) => {
        let operator = '';

        let matchMode = matchModes.find((f) => f.fe == feMatchMode);

        if (matchMode) {
            operator = matchMode.be;
        }

        return operator;
    };

    const matchModes = [
        { op: 'Contains', fe: FilterMatchMode.CONTAINS, be: '*' },
        { op: 'Notcontains', fe: FilterMatchMode.NOT_CONTAINS, be: '!*' },
        { op: 'StartsWith', fe: FilterMatchMode.STARTS_WITH, be: '*.' },
        { op: 'EndsWith', fe: FilterMatchMode.ENDS_WITH, be: '.*' },
        { op: 'Null', fe: 'null', be: 'NULL' },
        { op: 'NotNull', fe: 'notNull', be: 'NOT NULL' },
        { op: 'Equals', fe: FilterMatchMode.EQUALS, be: '=' },
        { op: 'NotEquals', fe: FilterMatchMode.NOT_EQUALS, be: '!=' },
        { op: 'GreaterThan', fe: FilterMatchMode.GREATER_THAN, be: '>' },
        { op: 'GreaterThanEquals', fe: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO, be: '>=' },
        { op: 'LessThan', fe: FilterMatchMode.LESS_THAN, be: '<' },
        { op: 'LessThanEquals', fe: FilterMatchMode.LESS_THAN_OR_EQUAL_TO, be: '<=' },
        { op: 'Between', fe: FilterMatchMode.BETWEEN, be: '[]' },
        { op: 'In', fe: FilterMatchMode.IN, be: 'IN' },
        { op: 'NotIn', fe: 'notIn', be: 'NOT IN' }
    ];

    return {
        fe2be
    };
}
