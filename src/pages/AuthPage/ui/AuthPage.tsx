import { FC, Suspense, useCallback, useState } from 'react';
import classNames from 'classnames';
import { LoginForm, SignUpForm } from 'feature/AuthByEmail';
import { PageLoader } from 'widget/PageLoader';
import styles from './Auth.module.scss';

interface AuthProps {
    className?: string;
}

export const AuthPage: FC<AuthProps> = ({ className }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSetIsLogin = useCallback(
        (value: boolean) => () => {
            setIsLogin(value);
        },
        [],
    );
    return (
        <div className={classNames(styles.Auth, {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                {isLogin ? (
                    <LoginForm handleSetIsLogin={handleSetIsLogin} />
                ) : (
                    <SignUpForm handleSetIsLogin={handleSetIsLogin} />
                )}
            </Suspense>
        </div>
    );
};
