import axios from 'axios';
import { AUTH } from '../commons/constant';

// method
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// header
export const ApplicationJSON = 'application/json';
export const FormUrlEncoded = 'application/x-www-form-urlencoded';
export const FormMultiPart = 'multipart/form-data';

class httpClient {
    async getAsync(config) {
        return await this.requestAsync(config, GET);
    }

    async postAsync(config) {
        return await this.requestAsync(config, POST);
    }

    async putAsync(config) {
        return await this.requestAsync(config, PUT);
    }

    async deleteAsync(config) {
        return await this.requestAsync(config, DELETE);
    }

    /**
     * TODO Cấu hình để gửi cookie
     */
    async requestAsync(config, method) {
        try {
            this._processHeader(config);

            this._processDataParams(config, method);

            let result = await axios(config);

            if (result) {
                return result.data;
            }

            return {
                Success: false,
                Data: null,
                Code: 0,
                Message: 'Error',
                MessageDev: ''
            };
        } catch (ex) {
            let error = ex;

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        //TODO
                        break;
                    case 403:
                        //TODO
                        break;
                    case 500:
                        //TODO
                        break;
                }
            }
        }
    }

    _processHeader(config, contentType = ApplicationJSON) {
        if (!config) return;

        let headers = config.headers || {};

        headers['Content-Type'] = contentType;

        let user = JSON.parse(localStorage.getItem(AUTH.USERLOCALSTORAGE));
        if (user && user.accessToken && user.refreshToken) {
            // for Node.js Express back-end
            headers[AUTH.HTTP_AccessToken] = user.accessToken;
            headers[AUTH.HTTP_RefreshToken] = user.refreshToken;
        }

        config.headers = headers;
    }

    _processDataParams(config, method) {
        if (!config) return;

        config.method = method;

        switch (method) {
            case GET:
                break;
            case POST:
                break;
            case PUT:
                break;
            case DELETE:
                break;
        }
    }
}

export default new httpClient();
