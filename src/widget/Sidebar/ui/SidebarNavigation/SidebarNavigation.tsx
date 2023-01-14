import { FC } from 'react';
import { HiClock, HiFolder, HiBookmark } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../Sidebar.module.scss';

interface SidebarNavigationProps {
    className?: string;
}

const listRender = [
    {
        name: 'Последние',
        path: 'recent',
        icon: (
            <HiClock size="30" className={styles.SidebarNavigation__itemIcon} />
        ),
    },
    {
        name: 'Файлы',
        path: 'files',
        icon: (
            <HiFolder
                size="30"
                className={styles.SidebarNavigation__itemIcon}
            />
        ),
    },
    {
        name: 'Избранное',
        path: 'favorites',
        icon: (
            <HiBookmark
                size="30"
                className={styles.SidebarNavigation__itemIcon}
            />
        ),
    },
];

export const SidebarNavigation: FC<SidebarNavigationProps> = ({
    className,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const toNavigate = (link: string) => () => {
        if (location.pathname.split('/')[1] !== link) {
            navigate(link);
        }
    };

    return (
        <nav
            className={classNames(styles.SidebarNavigation, {}, [className])}
            title="Sidebar Nav"
        >
            <ul
                className={classNames(styles.SidebarNavigation__list, [
                    'list-reset',
                ])}
            >
                {listRender.map((item, index) => (
                    <li
                        key={`${item.name}-${index}`}
                        onClick={toNavigate(item.path)}
                        className={classNames(styles.SidebarNavigation__item, {
                            [styles.SidebarNavigation__itemActive]:
                                location.pathname.split('/')[1] === item.path,
                        })}
                    >
                        <div className={styles.SidebarNavigation__itemWrapper}>
                            {item.icon}
                            <div className={styles.SidebarNavigation__itemName}>
                                {item.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
