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
import { IUser } from 'entities/User';
import { fileService, IFile } from 'entities/File';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { downloadFile } from 'entities/File/model/services/downloadFile';

interface FileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
    user: IUser;
    file: IFile | undefined;
}

export const FileMenu: FC<FileMenuProps> = (props) => {
    const {
        anchorEl,
        open,
        handleClose,
        user,
        file,
    } = props;

    const dispatch = useAppDispatch();
    const [deleteFile] = fileService.useDeleteFileMutation();

    const handleDelete = async () => {
        if (file?.id) {
            deleteFile({ token: user.token, fileId: file.id });
        }
    };

    const handleDownload = async () => {
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
            <MenuItem>
                <ListItemIcon>
                    <HiBookmarkAlt size={22} />
                </ListItemIcon>
                <ListItemText>Добавить в избранное</ListItemText>
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
