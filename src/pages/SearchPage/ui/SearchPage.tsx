import { FC, MouseEvent, useCallback, useMemo, useState } from 'react';
import { Page } from 'widget/Page';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Files, useGetFilesByNameQuery } from 'entities/File';
import { PageLoader } from 'widget/PageLoader';
import { Typography } from '@mui/material';
import { FileMenu } from 'feature/FileMenu';

interface SearchPageProps {
    className?: string;
}

const SearchPage: FC<SearchPageProps> = ({ className }) => {
    const [selectedFileId, selectFileId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const contextFileOpen = Boolean(anchorEl);

    const [usePath] = useSearchParams();
    const fileName = usePath.get('name');
    const { data: files, isLoading, error } = useGetFilesByNameQuery({ fileName });

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
        return <PageLoader />;
    }
    return <Page pageName={`Поиск "${fileName}"`}>
        {error && (
            <Typography color='error'>
                Произошла ошибка при загрузке
            </Typography>
        )}
        <Files
            files={files}
            viewType='list'
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
    </Page>;
};

export default SearchPage;
