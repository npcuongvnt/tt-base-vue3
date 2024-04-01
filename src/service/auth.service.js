import api from './api';

class AuthService {
    /* http://localhost:9999/api/auth */
    baseUrl = '';

    constructor() {
        this.baseUrl = '';
        this.apiName = 'AUTH_API';
        this.controllerName = 'auth'

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

    login(payload) {
        return api.post({url: '/login', data: payload});
    }

    register(payload) {
        return api.post({url: '/register', data: payload});
    }

    logout(payload) {
        return api.post({url: '/logout', data: payload});
    }

    refreshtoken(payload) {
        return api.post({url: '/refreshtoken', data: payload});
    }
}

export default new AuthService();
