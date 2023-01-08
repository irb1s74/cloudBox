import {FC} from 'react';
import { BorderLinearProgress } from 'shared/ui/BorderLinearProgress/BorderLinearProgress'
import { sizeFormatter } from 'shared/lib/sizeFormatter/sizeFormatter'
import { UserSchema } from 'entities/User'
import classNames from 'classnames'
import styles from '../Sidebar.module.scss'

interface SidebarUsageProps {
    className?: string
    user?: UserSchema;
}

export const SidebarUsage: FC<SidebarUsageProps> = ({className,user}) =>
    // const unUsedSpace = user.diskSpace - user.usedSpace;
    // const value = (user.usedSpace / user.diskSpace) * 100;

     (
        <div className={classNames(styles.SidebarUsage, {}, [className])}>
            <BorderLinearProgress
              sx={{ width: '100%' }}
              variant='determinate'
              value={0}
            />
            <div className={styles.SidebarUsage__text}>
                Свободно {sizeFormatter(0)} из {sizeFormatter(100000)}
            </div>
        </div>
    )
;
