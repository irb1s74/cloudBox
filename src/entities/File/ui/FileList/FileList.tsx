import { memo, MouseEvent } from 'react';
import dayjs from 'dayjs';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { sizeFormatter } from 'shared/lib/sizeFormatter/sizeFormatter';
import { EmptyData } from 'shared/ui/EmptyData/EmptyData';
import { getFileIcon } from 'shared/lib/getFileIcon/getFileIcon';
import { IFile } from '../../model/types/index';

interface FileListProps {
    files: IFile[];
    selectedFileId: number | null;
    handleSelectFileId: (fileId: number) => () => void;
    handleOpenContextFile: (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => void;
}

export const FileList = memo((props: FileListProps) => {
    const { files, handleSelectFileId, handleOpenContextFile, selectedFileId } =
        props;
    const checkFiles = files && files.length;

    if (!checkFiles) {
        return <EmptyData />;
    }

    return (
        <List sx={{ width: '100%', height: '100%' }}>
            {files.map((file, index) => (
                <ListItemButton
                    key={file.id}
                    onClick={handleSelectFileId(file.id)}
                    onContextMenu={(event) =>
                        handleOpenContextFile(event, file.id)
                    }
                    selected={selectedFileId === file.id}
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
});
