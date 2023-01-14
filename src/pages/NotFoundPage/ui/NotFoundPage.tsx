import { FC } from 'react';
import classNames from 'classnames';
import styles from './NotFound.module.scss';

interface NotFoundProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundProps> = ({ className }) => (
    <div className={classNames(styles.NotFound, {}, [className])}>
        Страница не найдена
    </div>
);
