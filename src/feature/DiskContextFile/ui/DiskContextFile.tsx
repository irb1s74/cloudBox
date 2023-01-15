import { memo } from 'react';
import {
    downloadFile,
    FileMenu,
    IFile,
    useAddToFavoriteMutation,
    useDeleteFileMutation,
    useGetFavoriteFileQuery,
} from 'entities/File';
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

    const { data: favoriteFile, refetch } = useGetFavoriteFileQuery({
        fileId: file?.id,
    });

    const handleAddToFavorite = async () => {
        if (file?.id) {
            await addToFavorite({ fileId: file.id });
            await refetch();
        }
    };

    const handleDelete = () => {
        if (file?.id) {
            deleteFile({ fileId: file.id });
        }
    };

    const handleDownload = () => {
        if (file?.id) {
            dispatch(downloadFile({ file }));
        }
    };

    return (
        <FileMenu
            anchorEl={anchorEl}
            open={open}
            isFavorite={!!favoriteFile}
            handleAddToFavorite={handleAddToFavorite}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
            handleOnCloseMenu={handleCloseContextFile}
        />
    );
});
