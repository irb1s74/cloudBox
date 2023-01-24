import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from 'entities/File';

const renameFileRequest = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        renameFile: build.mutation<IFile[], { id: number; fileName: string }>({
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
    }),
});

export const { useRenameFileMutation } = renameFileRequest;
