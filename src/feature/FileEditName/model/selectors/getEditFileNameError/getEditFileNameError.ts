import { StateSchema } from 'app/providers/StoreProvider';

export const getEditFileNameError = (state: StateSchema) => state.fileEditName?.error || '';
