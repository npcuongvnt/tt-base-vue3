import api from './api';

export default class BaseService {
    /* http://localhost:8888/api/controllerName */
    baseUrl;
    apiName;
    controllerName;

    constructor() {
        this.baseUrl = '';
        this.apiName = 'BUSINESS_API';
        this.controllerName = '';

        //Set mặc định base URL
        api.defaults.baseURL = this.getAPIUrl();
    }

    initAPIUrl() {
        if (this.apiName) {
            this.baseUrl = window.config[this.apiName] + '/' + this.controllerName;
        }
    }

    getAPIUrl() {
        if (this.baseUrl == '') {
            this.initAPIUrl();
        }
        // todo custom query string
        return this.baseUrl;
    }

    paging(payload) {
        return api.post({url: '/paging', data: payload});
    }

    new(payload) {
        return api.post({url: '/new', data: payload});
    }

    getById(payload) {
        return api.get({url: `/${payload.id}`});
    }

    insert(payload) {
        return api.post({url: '/insert', data: payload});
    }

    update(payload) {
        return api.put({url: '/update', data: payload});
    }

    delete(payload) {
        return api.delete({url: '', data: payload});
    }
}


