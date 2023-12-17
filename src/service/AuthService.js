import httpClient from './httpClient';

class AuthService {
    baseUrl = '';

    initAPIUrl() {
        this.baseUrl = window.config['API_URL'] + '/auth';
    }

    getAPIUrl() {
        if (this.baseUrl == '') {
            this.initAPIUrl();
        }
        // todo custom query string
        return this.baseUrl;
    }

    login(payload) {
        let req = {
            url: this.getAPIUrl() + 'login',
            data: payload
        };
        return httpClient.postAsync(req);
    }

    register(payload) {
        let req = {
            url: this.getAPIUrl() + 'register',
            data: payload
        };
        return httpClient.postAsync(req);
    }

    logout(payload) {
        let req = {
            url: this.getAPIUrl() + 'logout',
            data: payload
        };
        return httpClient.postAsync(req);
    }
}

export default new AuthService();
