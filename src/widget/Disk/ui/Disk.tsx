import { useState, MouseEvent, useCallback, useMemo } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { FileMenu } from 'feature/FileMenu';
import { Files, useGetFilesByPathQuery } from 'entities/File';
import {
    USER_DISK_ALIGNMENT_KEY,
    USER_DISK_SORT_KEY,
} from 'shared/const/localstorage';
import { PageLoader } from 'widget/PageLoader';
import { DiskToggleView } from './DiskToggleView';
import { DiskFilters } from './DiskFilters';
import styles from './Disk.module.scss';

export const Disk = () => {
    const [selectedSort, selectSort] = useState<string>(
        localStorage.getItem(USER_DISK_SORT_KEY) || 'createdAt',
    );
    const [selectedOptionSort, selectOptionSort] = useState<boolean>(true);
    const [viewType, setViewType] = useState(
        localStorage.getItem(USER_DISK_ALIGNMENT_KEY),
    );
    const [selectedFileId, selectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const contextFileOpen = Boolean(anchorEl);
    const [usePath] = useSearchParams();
    const navigate = useNavigate();
    const path = usePath.get('path');

    const { data: files, isLoading } = useGetFilesByPathQuery({
        path: path || '',
        sort: selectedSort,
        option: selectedOptionSort,
    });

    const selectedFile = useMemo(
        () => files?.find((file) => file.id === selectedFileId),
        [selectedFileId, files],
    );

    const handleSelectSort = useCallback((event: SelectChangeEvent) => {
        if (event.target.value === 'ascending') {
            selectOptionSort(true);
        } else if (event.target.value === 'descending') {
            selectOptionSort(false);
        } else {
            localStorage.setItem(USER_DISK_SORT_KEY, event.target.value);
            selectSort(event.target.value);
        }
    }, []);

    const handleToggleView = useCallback(
        (event: MouseEvent<HTMLElement>, selectedViewType: string) => {
            localStorage.setItem(USER_DISK_ALIGNMENT_KEY, selectedViewType);
            setViewType(selectedViewType);
        },
        [],
    );

    const handleSelectFileId = useCallback(
        (fileId: number) => () => {
            selectFileId(fileId);
            const candidate = files.find((file) => file.id === fileId);
            if (selectedFileId === fileId && candidate.type === 'dir') {
                navigate({
                    pathname: '',
                    search: `?${createSearchParams({
                        path: `${candidate.path}`,
                    })}`,
                });
                selectFileId(null);
            } else if (files) {
                selectFileId(fileId);
            }
        },
        [files, navigate, selectedFileId],
    );

    const handleOpenContextFile = useCallback(
        (event: MouseEvent<HTMLElement>, fileId: number) => {
            event.preventDefault();
            selectFileId(fileId);
            setAnchorEl(event.currentTarget);
        },
        [],
    );

    const onContextClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (anchorEl) {
            setAnchorEl(null);
        }
    };

    const handleCloseContextFile = () => {
        setAnchorEl(null);
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <section onContextMenu={onContextClick} className={styles.Disk}>
            <Stack
                sx={{ width: '100%' }}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <DiskFilters
                    selectedSort={selectedSort}
                    selectedOptionSort={selectedOptionSort}
                    handleSelectSort={handleSelectSort}
                />
                <DiskToggleView
                    viewType={viewType}
                    handleToggleView={handleToggleView}
                />
            </Stack>
            <Files
                files={files}
                viewType={viewType}
                handleSelectFileId={handleSelectFileId}
                selectedFileId={selectedFileId}
                handleOpenContextFile={handleOpenContextFile}
            />
            <FileMenu
                open={contextFileOpen}
                file={selectedFile}
                handleCloseContextFile={handleCloseContextFile}
                anchorEl={anchorEl}
            />
        </section>
    );
};
