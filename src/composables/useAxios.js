import { unref, ref } from 'vue';
import axios from 'axios';
import { AUTH } from '../common/constant';

export const ApplicationJSON = 'application/json';
export const FormUrlEncoded = 'application/x-www-form-urlencoded';
export const FormMultiPart = 'multipart/form-data';

const defaultConfig = {
    method: 'get',
    headers: {
        'Content-Type': ApplicationJSON
    }
};

const defaultOptions = {
    immediate: true
};

const _processHeader = (config) => {
    if (!config) return;

    let headers = config.headers || {};

    let user = JSON.parse(localStorage.getItem(AUTH.USERLOCALSTORAGE));
    if (user && user.accessToken && user.refreshToken) {
        // for Node.js Express back-end
        headers[AUTH.HTTP_AccessToken] = user.accessToken;
        headers[AUTH.HTTP_RefreshToken] = user.refreshToken;
    }

    config.headers = headers;
};

export const useAxios = (url, config = {}, options = {}) => {
    const response = ref(null);
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const { onSuccess, onError, immediate } = {
        ...defaultOptions,
        ...options
    };

    _processHeader(config);

    const execute = (body) => {
        data.value = null;
        error.value = null;
        loading.value = true;
        axios(unref(url), {
            ...defaultConfig,
            ...config,
            data: typeof body === 'object' ? body : {}
        })
            .then((res) => {
                response.value = res;
                data.value = res.data;
                if (onSuccess) {
                    onSuccess(res);
                }
            })
            .catch((err) => {
                error.value = err;
                if (onError) {
                    onError(err);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };

    if (immediate) execute();

    return {
        response,
        data,
        error,
        loading,
        execute
    };
};
