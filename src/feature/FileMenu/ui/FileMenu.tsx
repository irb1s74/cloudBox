import { memo, useCallback, useEffect, useState } from 'react';
import { downloadFile, FileActions, IFile } from 'entities/File';
import { EditFileNameModal } from 'feature/EditFileName';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { toast } from 'react-toastify';
import { createSearchParams } from 'react-router-dom';
import { rootClientApi } from 'shared/const/rootURL';
import {
    useAddToFavoriteMutation,
    useDeleteFileMutation,
    useDeleteShareFileMutation,
    useLazyGetFavoriteFileQuery,
    useShareFileMutation,
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
    const [shareFile, { data }] = useShareFileMutation();
    const [deleteShareFile] = useDeleteShareFileMutation();

    useEffect(() => {
        if (file?.id && open) {
            getFavoriteFile({
                fileId: file.id,
            });
        }
    }, [open, getFavoriteFile, file]);

    const handleShareFile = useCallback(async () => {
        const res = await shareFile({ fileId: file.id });
        if ('data' in res && res.data.accessLink) {
            await navigator.clipboard.writeText(
                `${rootClientApi}share?${createSearchParams({
                    accessLink: `${res.data.accessLink}`,
                })}`,
            );
            toast.info('Ссылка скопирована', {});
        }
    }, [file, shareFile]);

    const handleDeleteShareFile = useCallback(async () => {
        deleteShareFile({ fileId: file.id });
        toast.info('Ссылка удалена', {});
    }, [file, deleteShareFile]);

    const handleCopyLink = useCallback(async () => {
        const link = `${rootClientApi}share?${createSearchParams({
            accessLink: `${file.accessLink}`,
        })}`;
        await navigator.clipboard.writeText(link);
        toast.info('Ссылка скопирована', {});
    }, [file]);

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
                isShared={!!file?.accessLink}
                isFavorite={!!favoriteFile}
                handleShareFile={handleShareFile}
                handleAddToFavorite={handleAddToFavorite}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
                handleOnCloseMenu={handleCloseContextFile}
                handleOpenRenameFileModal={handleOpenRenameFileModal}
                handleDeleteShare={handleDeleteShareFile}
                handleCopyLink={handleCopyLink}
            />
            <EditFileNameModal
                isOpen={renameFileModalOpen}
                file={file}
                onClose={handleCloseRenameFileModal}
            />
        </>
    );
});
