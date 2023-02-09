import { FC, Suspense, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { LoginForm, SignUpForm } from 'feature/AuthByEmail';
import { PageLoader } from 'widget/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';

interface AuthProps {
    className?: string;
}

const AuthPage: FC<AuthProps> = ({ className }) => {
    const user = useSelector(getUserAuthData);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.token) {
            navigate('/files');
        }
    }, [navigate, user]);

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

export default AuthPage;
