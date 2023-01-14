import { FC } from 'react';
import { DropList } from 'shared/ui/DropList/DropList';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import {
    HiBookmarkAlt,
    HiCloudDownload,
    HiShare,
    HiTrash,
} from 'react-icons/hi';
import { CgRename } from 'react-icons/cg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    useAddToFavoriteMutation,
    useDeleteFileMutation,
    useGetFavoriteFileQuery,
    IFile,
} from 'entities/File';
import { downloadFile } from '../../model/services/downloadFile';

interface FileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
    file: IFile | undefined;
}

export const FileMenu: FC<FileMenuProps> = (props) => {
    const { anchorEl, open, handleClose, file } = props;

    const dispatch = useAppDispatch();
    const [deleteFile] = useDeleteFileMutation();
    const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
    const {
        data: favoriteFile,
        error,
        isFetching,
        refetch,
    } = useGetFavoriteFileQuery({ fileId: file?.id });

    const handleDelete = () => {
        if (file?.id) {
            deleteFile({ fileId: file.id });
        }
    };

    const handleAddToFavorite = async () => {
        if (file?.id) {
            await addToFavorite({ fileId: file.id });
            await refetch();
        }
    };

    const handleDownload = () => {
        if (file?.id) {
            dispatch(downloadFile({ file }));
        }
    };

    return (
        <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
            <MenuItem>
                <ListItemIcon>
                    <HiShare size={22} />
                </ListItemIcon>
                <ListItemText>Поделиться</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDownload}>
                <ListItemIcon>
                    <HiCloudDownload size={22} />
                </ListItemIcon>
                <ListItemText>Скачать</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CgRename size={22} />
                </ListItemIcon>
                <ListItemText>Переименовать</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleAddToFavorite} disabled={isFetching || isLoading}>
                <ListItemIcon>
                    <HiBookmarkAlt size={22} />
                </ListItemIcon>
                <ListItemText>
                    {favoriteFile
                        ? 'Удалить из избранного'
                        : 'Добавить в избранное'}
                </ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <HiTrash size={22} />
                </ListItemIcon>
                <ListItemText>Удалить</ListItemText>
            </MenuItem>
        </DropList>
    );
};
