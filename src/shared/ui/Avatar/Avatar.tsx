import { memo } from 'react';
import { IUser } from 'entities/User';
import { HiOutlineUser } from 'react-icons/hi';
import classNames from 'classnames';
import styles from './Avatar.module.scss';

interface AvatarProps {
    user?: IUser;
    className?: string;
}

export const Avatar = memo((props: AvatarProps) => {
    const { user, className } = props;

    return (
        <div className={classNames(styles.Avatar, {}, [className])}>
            <img
                loading="lazy"
                src={user?.avatar ? user.avatar : undefined}
                alt="avatar"
                className={styles.AvatarImage}
            />
            <HiOutlineUser size={25} className={styles.AvatarIcon} />
        </div>
    );
});
