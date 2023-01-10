import { FC, Suspense } from 'react';
import classNames from 'classnames';
import { LoginForm } from 'feature/AuthByEmail';
import { Loader } from 'widget/Loader';
import styles from './Auth.module.scss';

interface AuthProps {
    className?: string;
}

const Auth: FC<AuthProps> = ({ className }) => {
    return (
        <div className={classNames(styles.Auth, {}, [className])}>
            <Suspense fallback={<Loader />}>
                <LoginForm />
            </Suspense>
        </div>
    );
};
export default Auth;
