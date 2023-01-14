import { FC } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import styles from '../Sidebar.module.scss';
import { SidebarButtons } from '../SidebarButtons/SidebarButtons';
import { SidebarNavigation } from '../SidebarNavigation/SidebarNavigation';
import { SidebarUsage } from '../SidebarUsage/SidebarUsage';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const user = useSelector(getUserAuthData);

    return (
        <div className={classNames(styles.Sidebar, {}, [className])}>
            <SidebarButtons />
            <SidebarNavigation />
            <SidebarUsage user={user} />
        </div>
    );
};
