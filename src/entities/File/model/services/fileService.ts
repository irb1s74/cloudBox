import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from '../types/index';

const fileService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRecentFiles: build.query<IFile[], undefined>({
            query: () => ({
                url: `file/recent`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }),
            providesTags: (result) => ['Files'],
        }),
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
            providesTags: (result) => ['Files'],
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
            providesTags: (result) => ['Favorites'],
        }),
        getFavoriteFile: build.query<IFile, { fileId: number }>({
            query: ({ fileId }) => ({
                url: `favorites/${fileId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
                refetchOnMountOrArgChange: true,
            }),
        }),
        createDir: build.mutation<
            IFile[],
            { path: string | undefined; name: string }
        >({
            query: ({ path = '', name }) => ({
                url: `file/create`,
                body: { name, path },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
            invalidatesTags: ['Files'],
        }),
        addToFavorite: build.mutation<IFile[], { fileId: number }>({
            query: ({ fileId }) => ({
                url: 'favorites',
                body: { fileId },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
            transformResponse: (response: { file: IFile }[]) => {
                return response.map((item) => item.file);
            },
            invalidatesTags: ['Favorites'],
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
            invalidatesTags: ['Files'],
        }),
        deleteFile: build.mutation<IFile[], { fileId: number }>({
            query: ({ fileId }) => ({
                url: `file/delete/${fileId}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment',
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Files', 'Favorites'],
        }),
    }),
});

export const {
    useGetFilesByPathQuery,
    useGetFavoriteFileQuery,
    useGetFavoritesFilesQuery,
    useGetRecentFilesQuery,
    useUploadFileMutation,
    useDeleteFileMutation,
    useAddToFavoriteMutation,
    useCreateDirMutation,
} = fileService;
