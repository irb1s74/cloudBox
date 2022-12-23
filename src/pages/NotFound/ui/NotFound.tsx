import {FC} from 'react';
import classNames from 'classnames'
import styles from './NotFound.module.scss'

interface NotFoundProps {
    className?: string
}

export const NotFound: FC<NotFoundProps> = ({className}) => {
    return (
        <div className={classNames(styles.NotFound, {}, [className])}>
            Страница не найдена
        </div>
    );
};
