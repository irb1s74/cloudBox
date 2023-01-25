import { FC, Suspense, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { AppRouter } from 'app/providers/router';
import { refByToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';

interface AppProps {
    className?: string;
}

export const App: FC<AppProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        dispatch(refByToken());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, ['light'])}>
            <Suspense fallback="">
                <AppRouter />
                <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Suspense>
        </div>
    );
};
