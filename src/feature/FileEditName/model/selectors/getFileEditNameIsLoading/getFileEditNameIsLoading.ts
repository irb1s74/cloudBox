import { StateSchema } from 'app/providers/StoreProvider';

export const getFileEditNameIsLoading = (state: StateSchema) => state.fileEditName?.isLoading;
