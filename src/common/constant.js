import { FilterMatchMode, FilterOperator } from 'primevue/api';

const PrimeConst = {
    FilterMatchMode,
    FilterOperator
}

const AUTH = {
    USERLOCALSTORAGE: 'user',
    HTTP_AccessToken: 'x-access-token',
    HTTP_RefreshToken: 'x-refresh-token'
};

/**
 * Các nút hành động cơ bản trên chương trình
 */
const CommandName = {
    REFRESH: 'REFRESH',
    VIEW: 'VIEW',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    SAVE: 'SAVE',
    YES: 'YES',
    NO: 'NO',
    CANCEL: 'CANCEL',
    BACK: 'BACK'
};

export {
    PrimeConst,
    AUTH,
    CommandName
}
