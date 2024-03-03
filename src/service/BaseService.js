import httpClient from './httpClient';

export default class baseAPI {
    /* http://localhost:6969/api/controllerName */
    baseUrl;

    apiName;

    controllerName;

    constructor() {
        this.baseUrl = '';
        this.apiName = 'BUSINESS_API';
        this.controllerName = '';
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
        let req = {
            url: this.getAPIUrl() + '/paging',
            data: payload
        };

        return httpClient.postAsync(req);
    }

    getById(payload) {
        let req = {
            url: `${this.getAPIUrl()}/${payload.id}`
        };

        return httpClient.getAsync(req);
    }

    insert(payload) {
        let req = {
            url: `${this.getAPIUrl()}/insert`,
            data: payload
        };

        return httpClient.postAsync(req);
    }

    update(payload) {
        let req = {
            url: `${this.getAPIUrl()}/update`,
            data: payload
        };

        return httpClient.putAsync(req);
    }

    delete(payload) {
        let req = {
            url: `${this.getAPIUrl()}`,
            data: payload
        };

        return httpClient.deleteAsync(req);
    }
}
