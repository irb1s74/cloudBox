import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Files, useGetRecentFilesQuery } from 'entities/File';
import { FileMenu } from 'feature/FileMenu';
import { PageLoader } from 'widget/PageLoader';
import { Page } from 'widget/Page';

const RecentPage = () => {
    const [selectedFileId, selectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const contextFileOpen = Boolean(anchorEl);

    const { data: files, error, isLoading } = useGetRecentFilesQuery(undefined);

    const selectedFile = useMemo(
        () => files?.find((file) => file.id === selectedFileId),
        [selectedFileId, files],
    );

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

    if (isLoading) {
        return (
            <Page pageName="Последние">
                <PageLoader />
            </Page>
        );
    }

    return (
        <Page pageName="Последние">
            {error && (
                <Typography color="error">
                    Произошла ошибка при загрузке
                </Typography>
            )}
            <Files
                files={files}
                viewType="list"
                handleSelectFileId={handleSelectFileId}
                selectedFileId={selectedFileId}
                handleOpenContextFile={handleOpenContextFile}
            />
            <FileMenu
                file={selectedFile}
                handleCloseContextFile={handleCloseContextFile}
                anchorEl={anchorEl}
                open={contextFileOpen}
            />
        </Page>
    );
};

export default RecentPage;
