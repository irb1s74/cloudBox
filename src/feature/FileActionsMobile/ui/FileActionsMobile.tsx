import { createRef, memo } from 'react';
import { Fab, Stack } from '@mui/material';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { useUploadFileMutation } from 'entities/File';
import { useSearchParams } from 'react-router-dom';

interface FileActionsMobileProps {
    className?: string;
    openModal?: () => void;
}

const FileActionsMobile = memo((props: FileActionsMobileProps) => {
    const { openModal, className } = props;
    const filesInput = createRef<HTMLInputElement>();

    const [uploadFile, { isLoading }] = useUploadFileMutation();
    const [usePath] = useSearchParams();
    const handleUpdateFiles = () => {
        const path = usePath.get('path');

        if (filesInput.current.files && filesInput.current.files.length) {
            Array.from(filesInput.current.files).forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', path || '');
                await uploadFile({
                    formData,
                });
            });
        }

    };
    const handleSelectFiles = () => {
        filesInput.current.click();
    };

    return (
        <Stack spacing={1} sx={{ position: 'fixed', bottom: 96, right: 16 }}>
            <Fab onClick={handleSelectFiles} color='primary' aria-label='add'>
                <HiCloudUpload color='#FFF' size={25} />
                <input
                    ref={filesInput}
                    onChange={handleUpdateFiles}
                    type='file'
                    multiple
                    hidden
                />
            </Fab>
            <Fab onClick={openModal} color='primary' aria-label='add'>
                <HiOutlinePlus color='#FFF' size={25} />
            </Fab>
        </Stack>
    );
});

export default FileActionsMobile;
