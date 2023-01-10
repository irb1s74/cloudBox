import { FC, Suspense } from 'react';
import classNames from 'classnames';
import { LoginForm } from 'feature/AuthByEmail';
import { PageLoader } from 'widget/PageLoader';
import styles from './Auth.module.scss';

interface AuthProps {
    className?: string;
}

const Auth: FC<AuthProps> = ({ className }) => {
    return (
        <div className={classNames(styles.Auth, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <LoginForm />
            </Suspense>
        </div>
    );
};
export default Auth;
