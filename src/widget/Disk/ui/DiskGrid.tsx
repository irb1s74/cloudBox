import { FC, MouseEvent } from 'react';
import { IFile, File } from 'entities/File';
import { EmptyData } from 'shared/ui/EmptyData/EmptyData';
import styles from './Disk.module.scss';

interface DiskGridProps {
    files: IFile[];
    handleSelectFileId: (fileId: number) => () => void;
    selectFileId: number | null;
    handleOpenMenu: (event: MouseEvent<HTMLElement>, index: number) => void;
}

export const DiskGrid: FC<DiskGridProps> = (props) => {
    const { files, selectFileId, handleOpenMenu, handleSelectFileId } = props;

    const checkFiles = files && files.length;

    if (!checkFiles) {
        return <EmptyData />;
    }

    return (
        <div className={styles.Disk__grid}>
            {files.map((file, index) => (
                <div
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) => handleOpenMenu(event, file.id)}
                    className={styles.Disk__gridItem}
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
        </div>
    );
};
