import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFile } from 'entities/File';
import axios from 'axios';
import { rootURL } from 'shared/const/rootURL';

export const renameFile = createAsyncThunk<IFile, { fileId: number, fileName: string }, { rejectValue: string }>(
    'renameSlice/renameSlice',
    async ({ fileId, fileName }, thunkAPI) => {
        try {
            const response = await axios.post(
                `file/${fileId}/rename`,
                {
                    fileName,
                },
                {
                    baseURL: rootURL,
                },
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка');
        }
    },
);
