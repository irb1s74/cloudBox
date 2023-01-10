import { FC, Suspense, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widget/Navbar';
import { Sidebar } from 'widget/Sidebar';
import './styles/index.scss';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';

interface AppProps {
    className?: string;
}

export const App: FC<AppProps> = ({ className }) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(userActions.initialAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, ['light'])}>
            <Suspense fallback=''>
                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
