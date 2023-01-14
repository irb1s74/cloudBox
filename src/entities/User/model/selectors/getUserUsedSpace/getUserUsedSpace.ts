import { StateSchema } from 'app/providers/StoreProvider';

export const getUserUsedSpace = (state: StateSchema) =>
    state.user.authData?.usedSpace || 0;
