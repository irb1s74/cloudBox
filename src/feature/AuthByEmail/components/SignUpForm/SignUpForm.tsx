import { ChangeEvent, FC, useCallback } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Form } from 'shared/ui/Form/Form';
import { sigUpByEmail } from '../../api/sigUpByEmail';
import { getAuthNickname } from '../../model/selectors/getAuthNickname/getAuthNickname';
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading/getAuthIsLoading';
import { getAuthEmail } from '../../model/selectors/getAuthEmail/getAuthEmail';
import { getAuthPassword } from '../../model/selectors/getAuthPassword/getAuthPassword';
import { getAuthError } from '../../model/selectors/getAuthError/getAuthError';
import { authActions, authReducer } from '../../model/slice/authSlice';

interface SignUpFormProps {
    className?: string;

    handleSetIsLogin?: (value: boolean) => () => void;
}

const initialReducers: ReducersList = {
    authForm: authReducer,
};

const SignUpForm: FC<SignUpFormProps> = (props) => {
    const { handleSetIsLogin, className } = props;
    const dispatch = useAppDispatch();
    const nickname = useSelector(getAuthNickname);
    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const error = useSelector(getAuthError);
    const isLoading = useSelector(getAuthIsLoading);

    const onChangeNickname = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(authActions.setNickname(event.target.value));
        },
        [dispatch],
    );

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

    const onSignUpClick = useCallback(() => {
        dispatch(sigUpByEmail({ nickname, email, password }));
    }, [nickname, dispatch, email, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Form
                titleForm="Регистрация"
                actions={
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Button
                            color="secondary"
                            variant="text"
                            disabled={isLoading}
                            onClick={handleSetIsLogin(true)}
                        >
                            Уже есть аккаунт?
                        </Button>
                        <Button
                            onClick={onSignUpClick}
                            variant="contained"
                            disabled={isLoading}
                            fullWidth
                        >
                            Регистрация
                        </Button>
                    </Stack>
                }
                error={error}
            >
                <TextField
                    value={nickname}
                    onChange={onChangeNickname}
                    variant="filled"
                    type="string"
                    label="Никнэйм"
                    fullWidth
                />
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

export default SignUpForm;
