import { FC } from 'react';
import classNames from 'classnames';
import EmptyIcon from 'shared/assets/svg/void-svg.svg';
import { Typography } from '@mui/material';
import styles from './EmptyData.module.scss';

interface EmptyDataProps {
    className?: string;
}

export const EmptyData: FC<EmptyDataProps> = ({ className }) => {
    return (
        <div className={classNames(styles.EmptyData, {}, [className])}>
            <Typography variant="h5">Пусто</Typography>
            <EmptyIcon className={styles.EmptyData__svg} />
        </div>
    );
};
