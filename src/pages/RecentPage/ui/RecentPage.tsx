import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { PageLoader } from 'widget/PageLoader';
import { SelectChangeEvent, Typography } from '@mui/material';
import { DiskList } from 'widget/Disk';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { FileMenu, IFile, useGetRecentFilesQuery } from 'entities/File';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import styles from './RecentPage.module.scss';

interface FavoritesPageProps {
    className?: string;
}

const RecentPage: FC<FavoritesPageProps> = ({ className }) => {
    const user = useSelector(getUserAuthData);
    const file = useRef<IFile>();
    const navigate = useNavigate();
    const [selectFileId, setSelectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [usePath] = useSearchParams();
    const [sort, setSort] = useState<string>('createdAt');
    const [optionSort, setOptionSort] = useState<boolean>(true);
    const path = usePath.get('path');
    const open = Boolean(anchorEl);

    const { data: files, error, isLoading } = useGetRecentFilesQuery(undefined);

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

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <section className={classNames(styles.RecentPage, {}, [className])}>
            <div className={styles.RecentPage__name}>Последние</div>
            {error && (
                <Typography color="error">
                    Произошла ошибка при загрузке
                </Typography>
            )}
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

export default RecentPage;
