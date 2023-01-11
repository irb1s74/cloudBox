import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { rootURL } from 'shared/const/rootURL';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: rootURL,
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY)) || '';
            if ('token' in user) {
                headers.set('Authorization', `Bearer ${user.token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Files'],
    endpoints: (builder) => ({}),
});
