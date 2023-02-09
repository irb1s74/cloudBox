import { memo, MouseEvent } from 'react';
import { FileGrid, FileList, IFile } from 'entities/File';

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

    if (viewType === 'grid') {
        return (
            <FileGrid
                files={files}
                selectedFileId={selectedFileId}
                handleOpenContextFile={handleOpenContextFile}
                handleSelectFileId={handleSelectFileId}
            />
        );
    }

    return (
        <FileList
            files={files}
            selectedFileId={selectedFileId}
            handleOpenContextFile={handleOpenContextFile}
            handleSelectFileId={handleSelectFileId}
        />
    );
});
