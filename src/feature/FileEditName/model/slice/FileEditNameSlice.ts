import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileEditNameSchema } from '../types/index';

const initialState: FileEditNameSchema = {
    isLoading: false,
};

export const FileEditNameSlice = createSlice({
    name: 'fileEditNameSlice',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload;
        },
    },
});


export const { actions: fileEditNameActions } = FileEditNameSlice;
export const { reducer: fileEditNameReducer } = FileEditNameSlice;
