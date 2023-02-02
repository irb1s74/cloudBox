import { ChangeEvent, FC, useCallback } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Form } from 'shared/ui/Form/Form';
import { loginByEmail } from '../../api/loginByEmail';
import { getAuthEmail } from '../../model/selectors/getAuthEmail/getAuthEmail';
import { getAuthPassword } from '../../model/selectors/getAuthPassword/getAuthPassword';
import { getAuthError } from '../../model/selectors/getAuthError/getAuthError';
import { authActions, authReducer } from '../../model/slice/authSlice';

interface LoginFormProps {
    className?: string;

    handleSetIsLogin?: (value: boolean) => () => void;
}

const initialReducers: ReducersList = {
    authForm: authReducer,
};

const LoginForm: FC<LoginFormProps> = (props) => {
    const { handleSetIsLogin, className } = props;

    const dispatch = useAppDispatch();
    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const error = useSelector(getAuthError);

    const onChangeEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(authActions.setEmail(event.target.value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(authActions.setPassword(event.target.value));
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
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Button
                            variant="text"
                            onClick={handleSetIsLogin(false)}
                        >
                            Регистрация
                        </Button>
                        <Button
                            onClick={onLoginClick}
                            variant="contained"
                            fullWidth
                        >
                            войти
                        </Button>
                    </Stack>
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
