import { rtkApi } from 'shared/api/rtkApi';
import { IFile } from 'entities/File';

const ShareFileListService = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getShareFile: build.query<IFile, { accessCode: string }>({
            query: ({ accessCode }) => ({
                url: `file/share/${accessCode}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
                refetchOnMountOrArgChange: true,
            }),
        }),
    }),
});

export const { useGetShareFileQuery } = ShareFileListService;
