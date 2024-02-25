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
    const fe2be = (fePagingParams, type) => {
        let bePagingParams = {
            ...fePagingParams,
            columns: fePagingParams.columns || '*',
            filter: fe2beFilter(fePagingParams.filters),
            type: type || 0,
            skip: fePagingParams.first,
            take: fePagingParams.rows,
            sort: fe2beSort(fePagingParams.sortField, fePagingParams.sortOrder)
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
                let itemFilter = {
                    field: prop,
                    value: feFilters[prop].value,
                    operator: fe2beMatchMode(feFilters[prop].matchMode)
                };

                filters.push(itemFilter);
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
            return null;
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
        { op: 'Contains', fe: '', be: '*' },
        { op: 'Notcontains', fe: '', be: '!*' },
        { op: 'StartsWith', fe: '', be: '*.' },
        { op: 'EndsWith', fe: '', be: '.*' },
        { op: 'Null', fe: '', be: 'NULL' },
        { op: 'NotNull', fe: '', be: 'NOT NULL' },
        { op: 'Equals', fe: '', be: '=' },
        { op: 'NotEquals', fe: '', be: '!=' },
        { op: 'GreaterThan', fe: '', be: '>' },
        { op: 'GreaterThanEquals', fe: '', be: '>=' },
        { op: 'LessThan', fe: '', be: '<' },
        { op: 'LessThanEquals', fe: '', be: '<=' },
        { op: 'Between', fe: '', be: '[]' },
        { op: 'In', fe: '', be: 'IN' },
        { op: 'NotIn', fe: '', be: 'NOT IN' }
    ];

    return {
        fe2be
    };
}
