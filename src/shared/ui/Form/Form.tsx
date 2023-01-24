import { FC, ReactNode } from 'react';
import { IconButton, Typography } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames';
import styles from './Form.module.scss';

interface FormProps {
    className?: string;
    children?: ReactNode;
    titleForm?: string;
    actions?: ReactNode;
    handleClose?: () => void;
    error?: string;
}

export const Form: FC<FormProps> = (props) => {
    const { className, titleForm, children, error, actions, handleClose } =
        props;

    return (
        <div className={classNames(styles.Form, {}, [className])}>
            <div className={styles.Form__header}>
                <h2 className={styles.title}>{titleForm}</h2>
                {handleClose && (
                    <IconButton onClick={handleClose}>
                        <IoClose />
                    </IconButton>
                )}
            </div>
            {/* <Divider /> */}
            <div className={styles.Form__content}>
                {children}
                {error && <Typography color="error">{error}</Typography>}
            </div>
            <div className={styles.Form__footer}>{actions}</div>
        </div>
    );
};
