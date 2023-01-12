import { FC, Suspense, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widget/Navbar';
import { Sidebar } from 'widget/Sidebar';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import './styles/index.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { refByToken } from 'entities/User/model/services/refByToken';


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
