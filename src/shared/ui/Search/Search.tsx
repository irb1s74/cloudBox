import { FC } from 'react';
import classNames from 'classnames';
import { HiSearch } from 'react-icons/hi';
import styles from './Search.module.scss';

interface SearchProps {
    className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => (
    <div className={classNames(styles.Search, {}, [className])}>
        <HiSearch className={styles.SearchIcon} size="22" />
        <input
            className={classNames(styles.SearchInput, ['input-reset'])}
            placeholder="Поиск"
        />
    </div>
);
