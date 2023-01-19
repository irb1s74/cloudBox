import { StateSchema } from 'app/providers/StoreProvider';

export const getFileEditNameFileName = (state: StateSchema) =>
    state.fileEditName?.fileName || '';
