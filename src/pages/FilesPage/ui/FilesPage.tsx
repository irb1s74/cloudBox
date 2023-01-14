import { useCallback, useRef, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { FileMenu, IFile, useGetFilesByPathQuery } from 'entities/File';
import { Disk } from 'widget/Disk';
import { PageLoader } from 'widget/PageLoader';
import { SelectChangeEvent, Typography } from '@mui/material';
import { USER_DISK_SORT_KEY } from 'shared/const/localstorage';
import styles from './Files.module.scss';

const FilesPage = () => {
    const user = useSelector(getUserAuthData);
    const file = useRef<IFile>();
    const navigate = useNavigate();
    const [selectFileId, setSelectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [usePath] = useSearchParams();
    const [sort, setSort] = useState<string>(
        localStorage.getItem(USER_DISK_SORT_KEY) || 'createdAt',
    );
    const [optionSort, setOptionSort] = useState<boolean>(true);
    const path = usePath.get('path');
    const open = Boolean(anchorEl);

    const {
        data: files,
        error,
        isLoading,
    } = useGetFilesByPathQuery({
        path: path || '',
        sort,
        option: optionSort,
    });

    const handleSelectFileId = useCallback(
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

    const handleSelectSort = useCallback((event: SelectChangeEvent) => {
        if (event.target.value === 'ascending') {
            setOptionSort(true);
        } else if (event.target.value === 'descending') {
            setOptionSort(false);
        } else {
            localStorage.setItem(USER_DISK_SORT_KEY, event.target.value);
            setSort(event.target.value);
        }
    }, []);

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

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <section className={styles.Files}>
            <div className={styles.Files__name}>Файлы</div>
            {error && (
                <Typography color="error">
                    {' '}
                    Произошла ошибка при загрузке
                </Typography>
            )}
            <Disk
                handleOpenMenu={handleOpenMenu}
                handleSelectFileId={handleSelectFileId}
                handleSelectSort={handleSelectSort}
                selectFileId={selectFileId}
                sort={sort}
                optionSort={optionSort}
                files={files}
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

export default FilesPage;
