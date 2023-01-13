import { StateSchema } from 'app/providers/StoreProvider';

export const getUserIsLoadingAuth = (state: StateSchema) => state.user.isAuthLoading;
