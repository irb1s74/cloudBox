import { ChangeEvent, ChangeEventHandler, FC, useCallback } from 'react';
import classNames from 'classnames';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { loginByEmail } from 'feature/AuthByEmail/model/services/loginByEmail';
import { getLoginEmail } from '../model/selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../model/selectors/getLoginPassowrd/getLoginPassword';
import { getLoginError } from '../model/selectors/getLoginError/getLoginError';
import { loginByGoogleToken } from '../model/services/loginByGoogleToken';
import { loginActions, loginReducer } from '../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = ({ className }) => {
    const dispatch = useDispatch();

    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);

    const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setEmail(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByEmail({ email, password }));
    }, [dispatch, email, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(styles.LoginForm, {}, [className])}>
                <h2 className={styles.title}>Авторизация</h2>
                <div className={styles.content}>
                    <TextField
                        value={email}
                        onChange={onChangeEmail}
                        variant='filled'
                        type='email'
                        label='Email'
                        fullWidth
                    />
                    <TextField
                        value={password}
                        onChange={onChangePassword}
                        variant='filled'
                        type='password'
                        label='Password'
                        fullWidth
                    />
                </div>
                <Button onClick={onLoginClick} variant='contained' fullWidth>войти</Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
