import { FC, useCallback, useRef, useState } from 'react';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useUploadFileMutation } from 'entities/File';
import { CreateDirModal } from 'feature/CreateDir';
import styles from '../Sidebar.module.scss';

interface SidebarButtonsProps {
    className?: string;
}

export const SidebarButtons: FC<SidebarButtonsProps> = ({ className }) => {
    const filesInput = useRef(document.createElement('input'));
    const [modalIsOpen, setModalOpen] = useState(false);
    const [usePath] = useSearchParams();
    const [uploadFile] = useUploadFileMutation();

    const handleOpenCreateDirModal = () => {
        setModalOpen(true);
    };
    const handleOnCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

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
        <div
            className={classNames(styles.SidebarWrapperButtons, {}, [
                className,
            ])}
        >
            <button
                type="button"
                onClick={handleSelectFiles}
                className={classNames(styles.SidebarButton, [
                    'btn-reset',
                    styles.SidebarButton__accent,
                ])}
            >
                <HiCloudUpload className={styles.SidebarBtnIcon} size={25} />
                Загрузить
                <input
                    ref={filesInput}
                    onChange={handleUpdateFiles}
                    type="file"
                    multiple
                    hidden
                />
            </button>
            <button
                onClick={handleOpenCreateDirModal}
                className={classNames(styles.SidebarButton, ['btn-reset'])}
                type="button"
            >
                <HiOutlinePlus className={styles.SidebarBtnIcon} size={25} />
                Создать
            </button>
            <CreateDirModal isOpen={modalIsOpen} onClose={handleOnCloseModal} />
        </div>
    );
};
