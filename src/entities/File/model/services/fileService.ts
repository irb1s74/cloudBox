import { IFile } from 'entities/File';
import { rtkApi } from 'shared/api/rtkApi';

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
            providesTags: (result) => ['Files'],
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
        uploadFile: build.mutation<
            IFile[],
            { token: string; formData: FormData }
        >({
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
export const {
    useGetFilesByPathQuery,
    useUploadFileMutation,
    useGetFavoritesFilesQuery,
    useDeleteFileMutation,
    useCreateDirMutation,
    useGetRecentFilesQuery,
} = fileService;