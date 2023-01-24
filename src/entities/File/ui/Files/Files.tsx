import { memo, MouseEvent } from 'react';
import { FileGrid, FileList, IFile } from 'entities/File';
import styles from './Files.module.scss';

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

export const Files = memo((props: DiskFilesProps) => {
    const {
        viewType,
        files,
        handleOpenContextFile,
        selectedFileId,
        handleSelectFileId,
    } = props;

    return (
        <div className={styles.Files}>
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
