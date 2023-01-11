import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { rootURL } from 'shared/const/rootURL';

export const $api = axios.create({
    baseURL: rootURL,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
