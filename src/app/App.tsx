import { FC, Suspense, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { AppRouter } from 'app/providers/router';
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
            <Suspense fallback="">
                <AppRouter />
            </Suspense>
        </div>
    );
};
