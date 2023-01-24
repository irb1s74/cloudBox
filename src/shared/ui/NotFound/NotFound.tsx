import { FC } from 'react';
import { Typography } from '@mui/material';
import NotFoundIcon from 'shared/assets/svg/not_found.svg';
import classNames from 'classnames';
import styles from './NotFound.module.scss';

interface EmptyDataProps {
    className?: string;
}

export const NotFound: FC<EmptyDataProps> = ({ className }) => {
    return (
        <div className={classNames(styles.NotFound, {}, [className])}>
            <Typography variant="h5">Страница не найдена</Typography>
            <NotFoundIcon className={styles.NotFound__svg} />
        </div>
    );
};
