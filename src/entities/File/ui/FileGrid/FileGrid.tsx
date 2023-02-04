import { memo, MouseEvent } from 'react';
import { EmptyData } from 'shared/ui/EmptyData/EmptyData';
import { File } from '../File/File';
import { IFile } from '../../model/types/index';
import styles from './FileGrid.module.scss';

interface FileGridProps {
    files: IFile[];
    handleSelectFileId: (fileId: number) => () => void;
    selectFileId: number | null;
    handleOpenContextFile: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

export const FileGrid = memo((props: FileGridProps) => {
    const { files, selectFileId, handleOpenContextFile, handleSelectFileId } =
        props;
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
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
            {files.map((file) => (
                <div
                    className={styles.FileGrid__item}
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
            {files.map((file) => (
                <div
                    className={styles.FileGrid__item}
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
            {files.map((file) => (
                <div
                    className={styles.FileGrid__item}
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
            {files.map((file) => (
                <div
                    className={styles.FileGrid__item}
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                >
                    <File file={file} active={selectFileId === file.id} />
                </div>
            ))}
        </div>
    );
});
