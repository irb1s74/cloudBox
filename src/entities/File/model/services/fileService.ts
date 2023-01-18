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
        getFilesByPath: build.query<IFile[],
            { path: string | undefined; sort: string; option: boolean }>({
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
                    ? [...result.map(({ id }) => ({ type: 'Files', id } as const)), { type: 'Files', id: 'LIST' }]
                    : [{ type: 'Files', id: 'LIST' }],
        }),
        createDir: build.mutation<IFile[],
            { path: string | undefined; name: string }>({
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
            invalidatesTags: [{ type: 'Files', id: 'LIST' }],
        }),
        renameFile: build.mutation<IFile[], { id: number, fileName: string }>({
            query: ({ id, fileName }) => ({
                url: `file/${id}/rename`,
                body: {
                    fileName,
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Disposition': 'attachment',
                },
                method: 'POST',
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Files', id }],
        }),
        deleteFile: build.mutation<IFile[], { id: number }>({
            query: ({ id }) => ({
                url: `file/delete/${id}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Files', id }],
        }),
    }),
});

export const {
    useGetFilesByPathQuery,
    useLazyGetFavoriteFileQuery,
    useGetFavoritesFilesQuery,
    useGetRecentFilesQuery,
    useUploadFileMutation,
    useDeleteFileMutation,
    useAddToFavoriteMutation,
    useRenameFileMutation,
    useCreateDirMutation,
} = fileService;
