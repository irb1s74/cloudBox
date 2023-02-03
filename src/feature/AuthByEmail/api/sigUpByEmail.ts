import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { rootURL } from 'shared/const/rootURL';
import axios from 'axios';

interface RegProps {
    email: string;
    nickname: string;
    password: string;
}

export const sigUpByEmail = createAsyncThunk<
    IUser,
    RegProps,
    { rejectValue: string }
>(
    'sigUpByEmail/sigUpByEmail',
    async ({ email, nickname, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                'auth/reg',
                {
                    email,
                    nickname,
                    password,
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
        } catch (error) {
            if (error?.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue('Ошибка');
        }
    },
);
