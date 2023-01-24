import { ChangeEvent, FC, useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Form } from 'shared/ui/Form/Form';
import { loginByEmail } from '../api/loginByEmail';
import { getLoginEmail } from '../model/selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../model/selectors/getLoginPassowrd/getLoginPassword';
import { getLoginError } from '../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../model/slice/loginSlice';

interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = () => {
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);

    const onChangeEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setEmail(event.target.value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setPassword(event.target.value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByEmail({ email, password }));
    }, [dispatch, email, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Form
                titleForm="Авторизация"
                actions={
                    <Button
                        onClick={onLoginClick}
                        variant="contained"
                        fullWidth
                    >
                        войти
                    </Button>
                }
                error={error}
            >
                <TextField
                    value={email}
                    onChange={onChangeEmail}
                    variant="filled"
                    type="email"
                    label="Email"
                    fullWidth
                />
                <TextField
                    value={password}
                    onChange={onChangePassword}
                    variant="filled"
                    type="password"
                    label="Password"
                    fullWidth
                />
            </Form>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
