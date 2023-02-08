import { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { HiBookmark, HiClock, HiFolder } from 'react-icons/hi';
import classNames from 'classnames';
import styles from './SidebarMobileNavigation.module.scss';

interface SidebarMobileNavigatorProps {
    className?: string;
}

const listRender: {
    name: string;
    path: string;
    icon: ReactNode;
}[] = [
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
export const SidebarMobileNavigation: FC<SidebarMobileNavigatorProps> = ({
    className,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const toNavigate = (link: string) => () => {
        if (location.pathname.split('/')[1] !== link) {
            navigate(`/${link}`);
        }
    };

    return (
        <div className={classNames(styles.SidebarMobileNavigation)}>
            {listRender.map((item, index) => (
                <div
                    key={index}
                    className={classNames(styles.SidebarMobileNavigation__item)}
                >
                    <IconButton
                        size="large"
                        onClick={toNavigate(item.path)}
                        color={
                            location.pathname.split('/')[1] === item.path
                                ? 'primary'
                                : undefined
                        }
                    >
                        {item.icon}
                    </IconButton>
                    {item.name}
                </div>
            ))}
        </div>
    );
};
