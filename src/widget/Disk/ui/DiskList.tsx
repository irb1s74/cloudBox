import { FC, memo, MouseEvent } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { getFileIcon, IFile } from 'entities/File';
import { sizeFormatter } from 'shared/lib/sizeFormatter/sizeFormatter';
import dayjs from 'dayjs';

interface DiskListProps {
    files: IFile[];
    handleSelectFileId: (fileId: number) => () => void;
    selectFileId: number | null;
    handleOpenMenu: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

const DiskList: FC<DiskListProps> = (props) => {
    const {
        files,
        handleSelectFileId,
        handleOpenMenu,
        selectFileId,
    } = props;
    return (
        <List sx={{ width: '100%', height: '100%' }}>
            {files && files.map((file, index) => (
                <ListItemButton
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) => handleOpenMenu(event, file.id)}
                    selected={selectFileId === file.id}
                    divider
                >
                    <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
                    <ListItemText primary={file.name} />
                    {file.type !== 'dir' && (
                        <ListItemText
                            sx={{ textAlign: 'end' }}
                            primary={dayjs(file.createdAt).format('DD.MM.YYYY')}
                            secondary={sizeFormatter(file.size)}
                        />
                    )}
                </ListItemButton>
            ))}
        </List>
    );
};

export default memo(DiskList);
