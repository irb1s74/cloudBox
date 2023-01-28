import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from 'entities/File';

const diskContextFileService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
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
            invalidatesTags: ['Files', 'Recent', 'Favorites'],
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
        shareFile: build.mutation<IFile, { fileId: number }>({
            query: ({ fileId }) => ({
                url: `file/share/${fileId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
            }),
            invalidatesTags: (result, error, { fileId }) => [{ type: 'Files', id: fileId }],
        }),
    }),
});

export const {
    useLazyGetFavoriteFileQuery,
    useDeleteFileMutation,
    useAddToFavoriteMutation,
    useShareFileMutation,
} = diskContextFileService;
