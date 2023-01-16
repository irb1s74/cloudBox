import { Fragment, memo, useCallback, useState } from 'react';
import {
    downloadFile,
    FileMenu,
    IFile,
    useAddToFavoriteMutation,
    useDeleteFileMutation,
    useGetFavoriteFileQuery,
} from 'entities/File';
import { FileEditNameModal } from 'feature/FileEditName';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface DiskContextFileProps {
    file: IFile;
    handleCloseContextFile: () => void;
    anchorEl: null | HTMLElement;
    open: boolean;
}

export const DiskContextFile = memo((props: DiskContextFileProps) => {
    const { file, handleCloseContextFile, anchorEl, open } = props;

    const dispatch = useAppDispatch();
    const [deleteFile] = useDeleteFileMutation();
    const [addToFavorite] = useAddToFavoriteMutation();
    const [renameFileModalOpen, setRenameFileOpen] = useState(false);

    const { data: favoriteFile, refetch } = useGetFavoriteFileQuery({
        fileId: file?.id,
    });

    const handleAddToFavorite = useCallback(async () => {
        if (file?.id) {
            await addToFavorite({ fileId: file.id });
            await refetch();
        }
    }, [addToFavorite, file, refetch]);

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
            <FileMenu
                anchorEl={anchorEl}
                open={open}
                isFavorite={!!favoriteFile}
                handleAddToFavorite={handleAddToFavorite}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
                handleOnCloseMenu={handleCloseContextFile}
                handleOpenRenameFileModal={handleOpenRenameFileModal}
            />
            <FileEditNameModal
                isOpen={renameFileModalOpen}
                file={file}
                onClose={handleCloseRenameFileModal}
            />
        </>
    );
});
