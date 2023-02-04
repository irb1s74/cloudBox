import { FC } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarFileActions } from '../SidebarFileActions/SidebarFileActions';
import { SidebarNavigation } from '../SidebarNavigation/SidebarNavigation';
import { SidebarUsage } from '../SidebarUsage/SidebarUsage';
import styles from '../Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const user = useSelector(getUserAuthData);

    return (
        <div className={classNames(styles.Sidebar, {}, [className])}>
            <SidebarFileActions />
            <SidebarNavigation />
            <SidebarUsage user={user} />
        </div>
    );
};
