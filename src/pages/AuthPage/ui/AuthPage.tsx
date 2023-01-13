import { FC, Suspense } from 'react';
import classNames from 'classnames';
import { LoginForm } from 'feature/AuthByEmail';
import { PageLoader } from 'widget/PageLoader';
import styles from './Auth.module.scss';

interface AuthProps {
    className?: string;
}

export const AuthPage: FC<AuthProps> = ({ className }) => {
    return (
        <div className={classNames(styles.Auth, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <LoginForm />
            </Suspense>
        </div>
    );
};
