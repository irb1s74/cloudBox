import { FC, useState, MouseEvent, useCallback } from 'react';
import { Backdrop, SelectChangeEvent, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { IUser } from 'entities/User';
import { fileService, IFile } from 'entities/File';
import { USER_DISK_ALIGNMENT_KEY } from 'shared/const/localstorage';
import { GiFiles } from 'react-icons/gi';
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
    const {
        user,
        files,
        selectFileId,
        handleOpenMenu,
        handleSelectFileId,
        sort,
        handleSelectSort,
        optionSort,
    } = props;

    const [alignment, setAlignment] = useState(localStorage.getItem(USER_DISK_ALIGNMENT_KEY));
    const [dragEnter, setDragEnter] = useState(false);
    const [usePath] = useSearchParams();
    const [uploadFile] = fileService.useUploadFileMutation();

    const handleChangeAlignment = useCallback((
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment !== null) {
            localStorage.setItem(USER_DISK_ALIGNMENT_KEY, newAlignment);
            setAlignment(newAlignment);
        }
    }, []);

    const dragEnterFunc = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };

    const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const { dataTransfer } = event;
        const { files } = dataTransfer;
        const path = usePath.get('path');
        if (files && files.length) {
            Array.from(files).forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', path || '');
                await uploadFile({
                    token: user.token,
                    formData,
                });
            });
        }
        setDragEnter(false);
    };

    return (
        <div
            className={styles.Disk}
            onDragEnter={dragEnterFunc}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                onDrop={dropFile}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                open={dragEnter}
            >
                <GiFiles size={80} color='#FFF' />
            </Backdrop>
        </div>
    );
};

