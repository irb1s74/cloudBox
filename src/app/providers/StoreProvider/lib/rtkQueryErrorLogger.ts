import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {

        if (isRejectedWithValue(action) && action.payload?.data?.message) {
            toast.warn(action.payload.data.message);
        }
        return next(action);
    };
