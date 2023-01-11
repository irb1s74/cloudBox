import { FC, useState, MouseEvent } from 'react';
import { Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { IUser } from 'entities/User';
import { IFile } from 'entities/File';
import { DiskGrid } from './DiskGrid';
import styles from './Disk.module.scss';

interface DiskProps {
    user: IUser,
    files: IFile[],
    selectFileId: number | null,
    handleSelectFile: (fileId: number) => () => void,
    handleOpenMenu: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

export const Disk: FC<DiskProps> = (props) => {
    const { user, files, selectFileId, handleOpenMenu, handleSelectFile } = props;
    const [alignment, setAlignment] = useState('grid');
    const [dragEnter, setDragEnter] = useState(false);
    const [usePath] = useSearchParams();

    return (
        <Stack
            sx={{ overflowY: 'auto', height: '100%' }}
            alignItems='flex-end'
            direction='column'
        >
            <div className={styles.Disk__scroll}>
                <DiskGrid
                    files={files}
                    handleOpenMenu={handleOpenMenu}
                    handleSelectFile={handleSelectFile}
                    selectFileId={selectFileId}
                />
            </div>
        </Stack>
    );
};
