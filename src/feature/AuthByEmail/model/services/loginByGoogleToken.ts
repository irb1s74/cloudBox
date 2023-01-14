import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { rootURL } from 'shared/const/rootURL';
import axios from 'axios';

interface LoginProps {
    token: string;
}

export const loginByGoogleToken = createAsyncThunk<
    IUser,
    LoginProps,
    { rejectValue: string }
>('loginByGoogleToken/loginByGoogleToken', async ({ token }, thunkAPI) => {
    try {
        const response = await axios.post(
            'auth/login',
            {
                token,
            },
            {
                baseURL: rootURL,
            },
        );
        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        thunkAPI.dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка');
    }
});
