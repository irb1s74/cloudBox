import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { rootURL } from 'shared/const/rootURL';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { IFile } from 'entities/File';

interface downloadFileProps {
    file: IFile;
}

export const downloadFile = createAsyncThunk<void, downloadFileProps, { rejectValue: string }>(
    'file/downloadFile',
    async ({ file }, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
            axios.post(`file/download/${file.id}`, {}, {
                baseURL: rootURL,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                responseType: 'blob',
            }).then(async (response) => {
                const isJsonBlob = (data: AxiosResponse) => data instanceof Blob && data.type === 'application/json';
                const responseData = isJsonBlob(response?.data) ? await (response?.data)?.text() : response?.data || {};
                const downloadUrl = window.URL.createObjectURL(responseData);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
            ;
        } catch (e) {
            return thunkAPI.rejectWithValue('Произошла ошибка');
        }
    },
);
