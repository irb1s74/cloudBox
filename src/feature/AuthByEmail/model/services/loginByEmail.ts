import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { rootURL } from 'shared/const/rootURL';
import axios from 'axios';

interface LoginProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<IUser, LoginProps, { rejectValue: string }>(
    'loginByEmail/loginByEmail',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                'auth/login',
                {
                    email,
                    password,
                },
                {
                    baseURL: rootURL,
                });
            if (!response.data) {
                throw 'Ошибка';
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue('Ошибка');
        }
    },
);
