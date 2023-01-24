import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from 'entities/File';

const searchFileByNameService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        searchFile: build.query<IFile[], { fileName: string }>({
            query: ({ fileName }) => ({
                url: 'file/find',
                body: { fileName },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
            }),
        }),
    }),
});

export const { useLazySearchFileQuery } = searchFileByNameService;
