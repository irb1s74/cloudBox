import { memo } from 'react';
import classNames from 'classnames';
import { getFileIcon } from 'shared/lib/getFileIcon/getFileIcon';
import { IFile } from '../../model/types';
import styles from './File.module.scss';

interface FileProps {
    file: IFile;
    active: boolean;
    className?: string;
}

export const File = memo((props: FileProps) => {
    const { file, active, className } = props;

    return (
        <div
            className={classNames(
                styles.File,
                { [styles.File__active]: active },
                [className],
            )}
        >
            <div className={styles.File__icon}>{getFileIcon(file.type)}</div>
            <div className={styles.File__name}>{file.name}</div>
        </div>
    );
});
