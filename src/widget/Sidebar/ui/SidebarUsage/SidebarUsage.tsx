import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BorderLinearProgress } from 'shared/ui/BorderLinearProgress/BorderLinearProgress';
import { sizeFormatter } from 'shared/lib/sizeFormatter/sizeFormatter';
import { IUser, getUserUsedSpace, getUserDiskSpace } from 'entities/User';
import classNames from 'classnames';
import styles from '../Sidebar.module.scss';

interface SidebarUsageProps {
    className?: string;
    user?: IUser;
}

export const SidebarUsage: FC<SidebarUsageProps> = ({ className, user }) => {
    const userUsedSpace = useSelector(getUserUsedSpace);
    const userDiskSpace = useSelector(getUserDiskSpace);

    const unUsedSpace = userDiskSpace - userUsedSpace;
    const value = (userUsedSpace / userDiskSpace) * 100;

    return (
        <div className={classNames(styles.SidebarUsage, {}, [className])}>
            <BorderLinearProgress
                sx={{ width: '100%' }}
                variant="determinate"
                value={value}
            />
            <div className={styles.SidebarUsage__text}>
                Свободно {sizeFormatter(unUsedSpace)} из{' '}
                {sizeFormatter(userDiskSpace)}
            </div>
        </div>
    );
};
