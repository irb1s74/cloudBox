import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from '../model/types';

const fileService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getFilesByPath: build.query<
            IFile[],
            { path: string | undefined; sort: string; option: boolean }
        >({
            query: ({ path = '', sort, option }) => ({
                url: `file/path`,
                body: { path, sort, option },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(
                            ({ id }) => ({ type: 'Files', id } as const),
                        ),
                        { type: 'Files', id: 'LIST' },
                    ]
                    : [{ type: 'Files', id: 'LIST' }],
        }),
        getFilesByName: build.query<IFile[], { fileName: string }>({
            query: ({ fileName = '' }) => ({
                url: `file/find`,
                body: { fileName },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(
                            ({ id }) =>
                                ({ type: 'SearchFiles', id } as const),
                        ),
                        { type: 'SearchFiles', id: 'LIST' },
                    ]
                    : [{ type: 'SearchFiles', id: 'LIST' }],
        }),
        getRecentFiles: build.query<IFile[], undefined>({
            query: () => ({
                url: `file/recent`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(
                            ({ id }) => ({ type: 'Recent', id } as const),
                        ),
                        { type: 'Recent', id: 'LIST' },
                    ]
                    : [{ type: 'Recent', id: 'LIST' }],
        }),
        getFavoritesFiles: build.query<IFile[], undefined>({
            query: () => ({
                url: `favorites`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
            }),
            transformResponse: (response: { file: IFile }[]) => {
                return response.map((item) => item.file);
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(
                            ({ id }) => ({ type: 'Favorites', id } as const),
                        ),
                        { type: 'Favorites', id: 'LIST' },
                    ]
                    : [{ type: 'Favorites', id: 'LIST' }],
        }),
        uploadFile: build.mutation<IFile[], { formData: FormData }>({
            query: ({ formData }) => ({
                url: `file/upload`,
                body: formData,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
            invalidatesTags: [
                { type: 'Files', id: 'LIST' },
                { type: 'Recent', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetFilesByPathQuery,
    useGetFilesByNameQuery,
    useGetFavoritesFilesQuery,
    useGetRecentFilesQuery,
    useUploadFileMutation,
} = fileService;
