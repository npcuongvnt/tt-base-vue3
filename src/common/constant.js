import { FilterMatchMode, FilterOperator } from 'primevue/api';

const PrimeConst = {
    FilterMatchMode,
    FilterOperator
};

const AUTH = {
    UserLocalStorage_Key: 'user',
    Authorization_Key: 'Authorization',
    AccessToken_Key: 'x-access-token',
    RefreshToken_Key: 'x-refresh-token'
};

const CONTENT_TYPE = {
    ApplicationJSON = 'application/json',
    FormUrlEncoded = 'application/x-www-form-urlencoded',
    FormMultiPart = 'multipart/form-data'
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
    DELETEMULTI: 'DELETEMULTI',
    SAVE: 'SAVE',
    YES: 'YES',
    NO: 'NO',
    CANCEL: 'CANCEL',
    BACK: 'BACK'
};

export { PrimeConst, AUTH, CommandName, CONTENT_TYPE };
