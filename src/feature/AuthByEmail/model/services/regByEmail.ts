import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { rootURL } from 'shared/const/rootURL';
import axios from 'axios';

interface RegProps {
    email: string;
    username: string;
    password: string;
}

export const regByEmail = createAsyncThunk<IUser, RegProps, { rejectValue: string }>(
    'regByEmail/regByEmail',
    async ({ email, username, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                'auth/reg',
                {
                    email,
                    username,
                    password,
                },
                {
                    baseURL: rootURL,
                });
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка');
        }
    },
);
