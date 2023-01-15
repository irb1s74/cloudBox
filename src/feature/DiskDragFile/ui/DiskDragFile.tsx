import { DragEvent, memo, ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUploadFileMutation } from 'entities/File';
import { Backdrop } from '@mui/material';
import { GiFiles } from 'react-icons/gi';

interface DiskDragFileProps {
    className?: string;
    children: ReactNode;
}

export const DiskDragFile = memo((props: DiskDragFileProps) => {
    const { className, children } = props;
    const [dragEnter, setDragEnter] = useState(false);
    const [usePath] = useSearchParams();
    const [uploadFile] = useUploadFileMutation();

    const dragEnterFunc = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dragStart = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const dragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };

    const dragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dropFile = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const { dataTransfer } = event;
        const { files } = dataTransfer;
        const path = usePath.get('path');
        if (files && files.length) {
            Array.from(files).forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', path || '');
                await uploadFile({
                    formData,
                });
            });
        }
        setDragEnter(false);
    };

    return (
        <div
            onDragEnter={dragEnterFunc}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
        >
            {children}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                onDrop={dropFile}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                open={dragEnter}
            >
                <GiFiles size={80} color="#FFF" />
            </Backdrop>
        </div>
    );
});
