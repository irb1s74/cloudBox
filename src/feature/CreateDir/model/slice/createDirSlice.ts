import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateDirSchema } from '../types/types';

const initialState: CreateDirSchema = {
    isLoading: false,
};
export const createDirSlice = createSlice({
    name: 'createDirSlice',
    initialState,
    reducers: {
        setNameDir: (state, action: PayloadAction<string>) => {
            state.nameDir = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { reducer: createDirReducer } = createDirSlice;
export const { actions: createDirActions } = createDirSlice;
