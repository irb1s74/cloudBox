import { memo, MouseEvent } from 'react';
import { FileGrid, FileList, IFile } from 'entities/File';
import styles from './DiskFiles.module.scss';

interface DiskFilesProps {
    selectedFileId: number;
    handleOpenContextFile: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
    handleSelectFileId: (fileId: number) => () => void;
    viewType: string;
    files: IFile[];
}

export const DiskFiles = memo((props: DiskFilesProps) => {
    const {
        viewType,
        files,
        handleOpenContextFile,
        selectedFileId,
        handleSelectFileId,
    } = props;

    return (
        <div className={styles.DiskFiles}>
            {viewType === 'grid' ? (
                <FileGrid
                    files={files}
                    selectFileId={selectedFileId}
                    handleOpenContextFile={handleOpenContextFile}
                    handleSelectFileId={handleSelectFileId}
                />
            ) : (
                <FileList
                    files={files}
                    selectedFileId={selectedFileId}
                    handleOpenContextFile={handleOpenContextFile}
                    handleSelectFileId={handleSelectFileId}
                />
            )}
        </div>
    );
});
