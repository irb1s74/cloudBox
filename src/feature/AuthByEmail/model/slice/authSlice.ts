import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../../api/loginByEmail';
import { sigUpByEmail } from '../../api/sigUpByEmail';
import { AuthSchema } from '../types/authTypes';

const initialState: AuthSchema = {
    nickname: undefined,
    email: undefined,
    password: undefined,
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(sigUpByEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(sigUpByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(sigUpByEmail.rejected, (state, action) => {
                state.isLoading = false;

                state.error = action.payload;
            });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
