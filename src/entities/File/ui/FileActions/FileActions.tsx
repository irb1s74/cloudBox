import { memo } from 'react';
import { DropList } from 'shared/ui/DropList/DropList';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { HiBookmarkAlt, HiCloudDownload, HiTrash } from 'react-icons/hi';
import { IoUnlink, IoLink } from 'react-icons/io5';
import { CgRename } from 'react-icons/cg';

interface FileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    isShared?: boolean;
    isFavorite: boolean;
    handleShareFile?: () => void;
    handleAddToFavorite?: () => void;
    handleDownload?: () => void;
    handleCopyLink?: () => void;
    handleDeleteShare?: () => void;
    handleDelete?: () => void;
    handleOnCloseMenu: () => void;
    handleOpenRenameFileModal: () => void;
}

export const FileActions = memo((props: FileMenuProps) => {
    const {
        anchorEl,
        open,
        isShared,
        isFavorite,
        handleShareFile,
        handleAddToFavorite,
        handleOnCloseMenu,
        handleDownload,
        handleDelete,
        handleOpenRenameFileModal,
        handleCopyLink,
        handleDeleteShare,
    } = props;

    return (
        <DropList
            anchorEl={anchorEl}
            open={open}
            handleClose={handleOnCloseMenu}
        >
            {isShared && (
                <MenuItem onClick={handleDeleteShare}>
                    <ListItemIcon>
                        <IoUnlink size={22} />
                    </ListItemIcon>
                    <ListItemText>Удалить ссылку</ListItemText>
                </MenuItem>
            )}
            <MenuItem onClick={isShared ? handleCopyLink : handleShareFile}>
                <ListItemIcon>
                    <IoLink size={22} />
                </ListItemIcon>
                <ListItemText>
                    {isShared ? 'Скопировать ссылку' : 'Поделиться'}
                </ListItemText>
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
