import { StateSchema } from 'app/providers/StoreProvider';

export const getNameDir = (state: StateSchema) => state.createDir?.nameDir || '';
