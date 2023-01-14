import { FC } from 'react';
import classNames from 'classnames';
import { IFile } from '../../model/types';
import { getFileIcon } from '../../lib/getFileIcon';
import styles from './File.module.scss';

interface FileProps {
    file: IFile;
    active: boolean;
    className?: string;
}

export const File: FC<FileProps> = ({ file, active, className }) => {
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
};
