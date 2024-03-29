import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Files, useGetFavoritesFilesQuery } from 'entities/File';
import { Page } from 'widget/Page';
import { PageLoader } from 'widget/PageLoader';
import { FileMenu } from 'feature/FileMenu';

const FavoritesPage = () => {
    const [selectedFileId, selectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const contextFileOpen = Boolean(anchorEl);

    const {
        data: files,
        error,
        isLoading,
    } = useGetFavoritesFilesQuery(undefined);

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
            <Page pageName="Избранное">
                <PageLoader />
            </Page>
        );
    }

    return (
        <Page pageName="Избранное">
            {error && (
                <Typography color="error">
                    Произошла ошибка при загрузке
                </Typography>
            )}
            <Files
                files={files}
                selectedFileId={selectedFileId}
                viewType="list"
                handleSelectFileId={handleSelectFileId}
                handleOpenContextFile={handleOpenContextFile}
            />
            <FileMenu
                open={contextFileOpen}
                file={selectedFile}
                anchorEl={anchorEl}
                handleCloseContextFile={handleCloseContextFile}
            />
        </Page>
    );
};

export default FavoritesPage;
