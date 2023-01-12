import { useCallback, useRef, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FileMenu } from 'entities/File/ui/FileMenu/FileMenu';
import { Disk } from 'widget/Disk';
import { fileService } from 'entities/File';
import { Typography } from '@mui/material';
import { PageLoader } from 'widget/PageLoader';
import { IFile } from '../../model/types/index';
import styles from './Files.module.scss';


export const Files = () => {
    const user = useSelector(getUserAuthData);
    const file = useRef<IFile>();
    const navigate = useNavigate();
    const [selectFileId, setSelectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [usePath] = useSearchParams();
    const [sort, setSort] = useState<string>('time');
    const [optionSort, setOptionSort] = useState<boolean>(true);
    const path = usePath.get('path');
    const open = Boolean(anchorEl);

    const {
        data: files,
        error,
        isLoading,
    } = fileService.useGetFilesByPathQuery({
        path: path || '',
        sort,
        option: optionSort,
        token: user.token,
    });

    const handleSelectFile = useCallback(
        (fileId: number) => () => {
            const condidate = files.find((file) => file.id === fileId);
            if (selectFileId === fileId && condidate.type === 'dir') {
                navigate({
                    pathname: '',
                    search: `?${createSearchParams({
                        path: `${condidate.path}`,
                    })}`,
                });
                setSelectFileId(null);
            } else if (files) {
                setSelectFileId(fileId);
                file.current = condidate;
            }
        },
        [files, navigate, selectFileId],
    );

    const handleOpenMenu = useCallback(
        (event: MouseEvent<HTMLElement>, fileId: number) => {
            event.preventDefault();
            setSelectFileId(fileId);
            file.current = files && files.find((file) => file.id === fileId);
            setAnchorEl(event.currentTarget);
        },
        [files],
    );

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <section className={styles.Files}>
            <div className={styles.Files__name}>Файлы</div>
            {isLoading && <PageLoader />}
            {error && <Typography color='error'> Произошла ошибка при загрузке</Typography>}
            <Disk
                handleOpenMenu={handleOpenMenu}
                handleSelectFile={handleSelectFile}
                files={files}
                selectFileId={selectFileId}
                user={user}
            />
            <FileMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                user={user}
                file={file.current}
            />
        </section>
    );
};
