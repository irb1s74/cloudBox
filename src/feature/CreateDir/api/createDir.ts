import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from 'entities/File';

const createDir = rtkApi.injectEndpoints({
    endpoints: (build) => ({
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
    }),
});

export const { useCreateDirMutation } = createDir;
