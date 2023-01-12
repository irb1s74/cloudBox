import { StateSchema } from 'app/providers/StoreProvider';

export const getUserDiskSpace = (state: StateSchema) => state.user.authData?.diskSpace || 0;
