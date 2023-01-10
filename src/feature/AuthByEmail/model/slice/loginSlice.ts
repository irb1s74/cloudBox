import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from 'feature/AuthByEmail/model/types/loginTypes';
import { loginByGoogleToken } from 'feature/AuthByEmail/model/services/loginByGoogleToken';

const initialState: LoginSchema = {
    email: undefined,
    password: undefined,
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByGoogleToken.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginByGoogleToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(loginByGoogleToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
