import { FC, ReactNode } from 'react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';

interface StoreProvideProps {
    children?: ReactNode;
    initialStore?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvide: FC<StoreProvideProps> = ({ children, initialStore, asyncReducers }) => {

    const store = createReduxStore(initialStore as StateSchema, asyncReducers as ReducersMapObject<StateSchema>);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
