import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';
import { rootURL } from 'shared/const/rootURL';

export const refByToken = createAsyncThunk<
    IUser,
    undefined,
    { rejectValue: string }
>('user/refByToken', async (props, thunkAPI) => {
    try {
        const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
        const response = await axios.get('auth/ref', {
            baseURL: rootURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Пользователь не авторизован');
    }
});
