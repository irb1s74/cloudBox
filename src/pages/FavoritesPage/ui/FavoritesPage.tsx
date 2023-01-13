import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { PageLoader } from 'widget/PageLoader';
import { SelectChangeEvent, Typography } from '@mui/material';
import { Disk, DiskList } from 'widget/Disk';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { FileMenu, fileService, IFile } from 'entities/File';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './FavoritesPage.module.scss';

interface FavoritesPageProps {
    className?: string;
}

const FavoritesPage: FC<FavoritesPageProps> = ({ className }) => {
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

    return (
        <section className={classNames(styles.FavoritesPage, {}, [className])}>
            <div className={styles.FavoritesPage__name}>Избранное</div>
            {isLoading && <PageLoader />}
            {error && <Typography color='error'> Произошла ошибка при загрузке</Typography>}

            <DiskList
                files={files}
                handleSelectFileId={handleSelectFileId}
                selectFileId={selectFileId}
                handleOpenMenu={handleOpenMenu}
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

export default FavoritesPage;
