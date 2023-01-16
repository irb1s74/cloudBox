import { memo } from 'react';
import { DropList } from 'shared/ui/DropList/DropList';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import {
    HiBookmarkAlt,
    HiCloudDownload,
    HiShare,
    HiTrash,
} from 'react-icons/hi';
import { CgRename } from 'react-icons/cg';

interface FileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    isFavorite: boolean;
    handleAddToFavorite: () => void;
    handleDownload: () => void;
    handleDelete: () => void;
    handleOnCloseMenu: () => void;
    handleOpenRenameFileModal: () => void;
}

export const FileMenu = memo((props: FileMenuProps) => {
    const {
        anchorEl,
        open,
        isFavorite,
        handleAddToFavorite,
        handleOnCloseMenu,
        handleDownload,
        handleDelete,
        handleOpenRenameFileModal,
    } = props;

    return (
        <DropList
            anchorEl={anchorEl}
            open={open}
            handleClose={handleOnCloseMenu}
        >
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
            <MenuItem onClick={handleOpenRenameFileModal}>
                <ListItemIcon>
                    <CgRename size={22} />
                </ListItemIcon>
                <ListItemText>Переименовать</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleAddToFavorite}>
                <ListItemIcon>
                    <HiBookmarkAlt size={22} />
                </ListItemIcon>
                <ListItemText>
                    {isFavorite
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
});
