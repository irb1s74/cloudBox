import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { refByToken } from '../services/refByToken';
import { IUser, UserSchema } from '../types/User';

const initialState: UserSchema = {
        isAuthLoading: true,
    }
;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
        },
        initialAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refByToken.pending, (state, action) => {
                state.isAuthLoading = true;
            })
            .addCase(refByToken.fulfilled, (state, action) => {
                state.authData = action.payload;
                state.isAuthLoading = false;
            })
            .addCase(refByToken.rejected, (state, action) => {
                state.isAuthLoading = false;
            });
    },
});


export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
