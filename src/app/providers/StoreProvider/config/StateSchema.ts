import { UserSchema } from 'entities/User';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CreateDirSchema } from 'feature/CreateDir';
import { LoginSchema } from 'feature/AuthByEmail';
import { FileEditNameSchema } from 'feature/FileEditName';
import { rtkApi } from 'shared/api/rtkApi';
import { AxiosInstance } from 'axios';


export interface StateSchema {
    user: UserSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async
    loginForm?: LoginSchema;
    createDir?: CreateDirSchema;
    fileEditName?: FileEditNameSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
