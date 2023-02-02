import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthNickname = (state: StateSchema) =>
    state?.authForm?.nickname || '';
