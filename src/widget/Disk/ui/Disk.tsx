import { useState, MouseEvent, useCallback, useMemo } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { DiskToggleView } from 'feature/DiskToggleView';
import { DiskFilters } from 'feature/DiskFilters';
import { DiskDragFile } from 'feature/DiskDragFile';
import { DiskContextFile } from 'feature/DiskContextFile';
import { DiskFiles } from 'feature/DiskFiles';
import { useGetFilesByPathQuery } from 'entities/File';
import {
    USER_DISK_ALIGNMENT_KEY,
    USER_DISK_SORT_KEY,
} from 'shared/const/localstorage';
import { PageLoader } from 'widget/PageLoader';
import styles from './Disk.module.scss';

export const Disk = () => {
    const [selectedSort, selectSort] = useState<string>(
        localStorage.getItem(USER_DISK_SORT_KEY) || 'createdAt',
    );
    const [viewType, setViewType] = useState(
        localStorage.getItem(USER_DISK_ALIGNMENT_KEY),
    );
    const [selectedFileId, selectFileId] = useState<number | null>(null);
    const [selectedOptionSort, selectOptionSort] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const [usePath] = useSearchParams();
    const contextFileOpen = Boolean(anchorEl);
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

    const handleOpenContextFile = useCallback(
        (event: MouseEvent<HTMLElement>, fileId: number) => {
            event.preventDefault();
            selectFileId(fileId);
            setAnchorEl(event.currentTarget);
        },
        [],
    );

    const handleCloseContextFile = () => {
        setAnchorEl(null);
    };

    const handleSelectFileId = useCallback(
        (fileId: number) => () => {
            selectFileId(fileId);
            const condidate = files.find((file) => file.id === fileId);
            if (selectedFileId === fileId && condidate.type === 'dir') {
                navigate({
                    pathname: '',
                    search: `?${createSearchParams({
                        path: `${condidate.path}`,
                    })}`,
                });
                selectFileId(null);
            } else if (files) {
                selectFileId(fileId);
            }
        },
        [files, navigate, selectedFileId],
    );

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <section className={styles.Disk}>
            <DiskDragFile>
                <Stack
                    sx={{ pr: '10px', pl: '10px', pb: '15px', width: '100%' }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
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
                <DiskFiles
                    files={files}
                    viewType={viewType}
                    handleSelectFileId={handleSelectFileId}
                    selectedFileId={selectedFileId}
                    handleOpenContextFile={handleOpenContextFile}
                />
                <DiskContextFile
                    open={contextFileOpen}
                    file={selectedFile}
                    handleCloseContextFile={handleCloseContextFile}
                    anchorEl={anchorEl}
                />
            </DiskDragFile>
        </section>
    );
};
