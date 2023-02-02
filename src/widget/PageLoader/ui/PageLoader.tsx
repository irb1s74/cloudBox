import { FC } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import classNames from 'classnames';
import styles from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
    return (
        <div className={classNames(styles.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};
