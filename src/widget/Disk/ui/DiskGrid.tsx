import { FC, MouseEvent } from 'react';
import { IFile, File } from 'entities/File';
import styles from './Disk.module.scss';

interface DiskGridProps {
    files: IFile[];
    handleSelectFile: (fileId: number) => () => void;
    selectFileId: number | null;
    handleOpenMenu: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

export const DiskGrid: FC<DiskGridProps> = (props) => {
    const { files, selectFileId, handleOpenMenu, handleSelectFile } = props;
    return (
        <div className={styles.Disk__grid}>
            {files && files.map((file, index) => (
                <div
                    key={file.id}
                    onClick={handleSelectFile(file.id)}
                    onContextMenu={(event) => handleOpenMenu(event, file.id)}
                    className={styles.Disk__gridItem}
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
        </div>
    );
};
