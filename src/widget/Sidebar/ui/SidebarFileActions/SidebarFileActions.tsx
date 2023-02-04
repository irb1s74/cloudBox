import { memo, useCallback, useRef, useState } from 'react';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { CreateDirModal } from 'feature/CreateDir';
import classNames from 'classnames';
import { useUploadFileMutation } from 'entities/File';
import { useSearchParams } from 'react-router-dom';
import { Fab } from '@mui/material';
import styles from '../Sidebar.module.scss';

interface SidebarFileActionsProps {
    className?: string;
}

export const SidebarFileActions = memo(({ className }: SidebarFileActionsProps) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const filesInput = useRef(document.createElement('input'));
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

    const handleOpenCreateDirModal = () => {
        setModalOpen(true);
    };
    const handleOnCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <div
            className={classNames(styles.SidebarWrapperButtons, {}, [
                className,
            ])}
        >
            <Fab
                sx={{ width: '80%', height: '60px', color: '#FFF', boxShadow: 'none', zIndex: '0' }}
                color='primary'
                variant='extended'
                onClick={handleSelectFiles}
                disabled={isLoading}
            >
                <HiCloudUpload className={styles.UploadFileIcon} size={25} />
                Загрузить
                <input
                    ref={filesInput}
                    onChange={handleUpdateFiles}
                    type='file'
                    multiple
                    hidden
                />
            </Fab>
            <Fab
                variant='extended'
                sx={{ width: '80%', height: '60px', boxShadow: 'none', bgcolor: '#FFF', zIndex: '0' }}
                onClick={handleOpenCreateDirModal}
            >
                <HiOutlinePlus className={styles.SidebarBtnIcon} size={25} />
                Создать
            </Fab>
            <CreateDirModal isOpen={modalIsOpen} onClose={handleOnCloseModal} />
        </div>
    );
});
