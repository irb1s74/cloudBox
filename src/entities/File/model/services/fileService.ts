import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from '../types/index';

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
    useGetFavoritesFilesQuery,
    useGetRecentFilesQuery,
    useUploadFileMutation,
    useCreateDirMutation,
} = fileService;
