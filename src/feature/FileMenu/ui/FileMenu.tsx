import { memo, useCallback, useEffect, useState } from 'react';
import { downloadFile, FileActions, IFile } from 'entities/File';
import { EditFileNameModal } from 'feature/EditFileName';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    useAddToFavoriteMutation,
    useDeleteFileMutation,
    useLazyGetFavoriteFileQuery,
} from '../api/diskContextFileService';

interface DiskContextFileProps {
    file: IFile;
    handleCloseContextFile: () => void;
    anchorEl: null | HTMLElement;
    open: boolean;
}

export const FileMenu = memo((props: DiskContextFileProps) => {
    const { file, handleCloseContextFile, anchorEl, open } = props;
    const dispatch = useAppDispatch();

    const [deleteFile] = useDeleteFileMutation();
    const [addToFavorite] = useAddToFavoriteMutation();
    const [renameFileModalOpen, setRenameFileOpen] = useState(false);
    const [getFavoriteFile, { data: favoriteFile }] =
        useLazyGetFavoriteFileQuery();

    useEffect(() => {
        if (file?.id && open) {
            getFavoriteFile({
                fileId: file.id,
            });
        }
    }, [open, getFavoriteFile, file]);

    const handleAddToFavorite = useCallback(async () => {
        if (file?.id) {
            await addToFavorite({ fileId: file.id });
            await getFavoriteFile({
                fileId: file?.id,
            });
        }
    }, [addToFavorite, file, getFavoriteFile]);

    const handleDelete = useCallback(() => {
        if (file?.id) {
            deleteFile({ id: file.id });
        }
    }, [file, deleteFile]);

    const handleDownload = useCallback(() => {
        if (file?.id) {
            dispatch(downloadFile({ file }));
        }
    }, [file, dispatch]);

    const handleCloseRenameFileModal = useCallback(() => {
        setRenameFileOpen(false);
    }, []);

    const handleOpenRenameFileModal = useCallback(() => {
        setRenameFileOpen(true);
    }, []);

    return (
        <>
            <FileActions
                anchorEl={anchorEl}
                open={open}
                isFavorite={!!favoriteFile}
                handleAddToFavorite={handleAddToFavorite}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
                handleOnCloseMenu={handleCloseContextFile}
                handleOpenRenameFileModal={handleOpenRenameFileModal}
            />
            <EditFileNameModal
                isOpen={renameFileModalOpen}
                file={file}
                onClose={handleCloseRenameFileModal}
            />
        </>
    );
});
