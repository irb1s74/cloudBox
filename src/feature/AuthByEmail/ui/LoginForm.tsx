import {FC} from 'react';
import classNames from 'classnames'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = ({className}) => (
        <div className={classNames(styles.LoginForm, {}, [className])} />
    );
