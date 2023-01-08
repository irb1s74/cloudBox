import {FC} from 'react';
import { IUser } from 'entities/User'
import { HiOutlineUser } from 'react-icons/hi';
import classNames from 'classnames'
import styles from './Avatar.module.scss'

interface AvatarProps {
    user?: IUser;
    className?:string
}

export const Avatar: FC<AvatarProps> = ({user = {},className}) => (
        <div className={classNames(styles.Avatar, {}, [className])}>
            <img
              loading='lazy'
              src={'avatar' in user ? user.avatar : undefined}
              alt={'nickname' in user ? user.nickname : ''}
              className={styles.AvatarImage}
            />
            <HiOutlineUser size={25} className={styles.AvatarIcon} />
        </div>
    );
