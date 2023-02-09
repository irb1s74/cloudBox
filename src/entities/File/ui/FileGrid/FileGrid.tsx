import { memo, MouseEvent } from 'react';
import { EmptyData } from 'shared/ui/EmptyData/EmptyData';
import { File } from '../File/File';
import { IFile } from '../../model/types/index';
import styles from './FileGrid.module.scss';

interface FileGridProps {
    files: IFile[];
    handleSelectFileId: (fileId: number) => () => void;
    selectedFileId: number | null;
    handleOpenContextFile: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

export const FileGrid = memo((props: FileGridProps) => {
    const {
        files,
        selectedFileId = null,
        handleSelectFileId = () => null,
        handleOpenContextFile = () => null,
    } = props;
    const checkFiles = files && files.length;

    if (!checkFiles) {
        return <EmptyData />;
    }

    return (
        <div className={styles.FileGrid}>
            {files.map((file) => (
                <div
                    className={styles.FileGrid__item}
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                >
                    <File file={file} active={selectedFileId === file.id} />
                </div>
            ))}
        </div>
    );
});
