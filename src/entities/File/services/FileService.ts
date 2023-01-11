import { IFile } from 'entities/File';
import { rtkApi } from 'shared/api/rtkApi';

export const fileService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getFilesByPath: build.query<IFile[],
            { path: string | undefined; token: string; sort: string; option: boolean }>({
            query: ({ path = '', token, sort, option }) => ({
                url: `file/path`,
                body: { path, sort, option },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            }),
            providesTags: (result) => ['Files'],
        }),
        createDir: build.mutation<IFile[],
            { path: string | undefined; token: string; name: string }>({
            query: ({ path = '', token, name }) => ({
                url: `file/create`,
                body: { name, path },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            }),
            invalidatesTags: ['Files'],
        }),
        uploadFile: build.mutation<IFile[], { token: string; formData: FormData }>({
            query: ({ token, formData }) => ({
                url: `file/upload`,
                body: formData,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            }),
            invalidatesTags: ['Files'],
        }),
        deleteFile: build.mutation<IFile[], { token: string; fileId: number }>({
            query: ({ token, fileId }) => ({
                url: `file/delete/${fileId}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment',
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Files'],
        }),
    }),
});
