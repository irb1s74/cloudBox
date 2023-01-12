import { FC, useState, MouseEvent, useCallback } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { IUser } from 'entities/User';
import { fileService, IFile } from 'entities/File';
import DiskList from './DiskList';
import DiskSetting from './DiskSetting';
import { DiskGrid } from './DiskGrid';
import styles from './Disk.module.scss';

interface DiskProps {
    user: IUser,
    files: IFile[],
    selectFileId: number | null,
    handleSelectFileId: (fileId: number) => () => void,
    handleOpenMenu: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
    sort: string;
    optionSort: boolean;
    handleSelectSort: (event: SelectChangeEvent) => void;
}

export const Disk: FC<DiskProps> = (props) => {
    const { user, files, selectFileId, handleOpenMenu, handleSelectFileId, sort, handleSelectSort, optionSort } = props;
    const [alignment, setAlignment] = useState('grid');
    const [dragEnter, setDragEnter] = useState(false);
    const [usePath] = useSearchParams();
    const [uploadFile] = fileService.useUploadFileMutation();

    const handleChangeAlignment = useCallback((
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }, []);


    return (
        <Stack
            sx={{ overflowY: 'auto', height: '100%' }}
            alignItems='flex-end'
            direction='column'
        >
            <DiskSetting
                alignment={alignment}
                sort={sort}
                optionSort={optionSort}
                handleSelectSort={handleSelectSort}
                handleChange={handleChangeAlignment}
            />
            <div className={styles.Disk__scroll}>
                {alignment === 'grid' ? (
                    <DiskGrid
                        files={files}
                        handleOpenMenu={handleOpenMenu}
                        handleSelectFileId={handleSelectFileId}
                        selectFileId={selectFileId}
                    />
                ) : (
                    <DiskList
                        files={files}
                        handleOpenMenu={handleOpenMenu}
                        handleSelectFileId={handleSelectFileId}
                        selectFileId={selectFileId}
                    />
                )}
            </div>
        </Stack>
    );
};

