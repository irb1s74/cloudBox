import { memo, useCallback, useState } from 'react';
import { UploadFileButton } from 'feature/UploadFileButton';
import { HiOutlinePlus } from 'react-icons/hi';
import { CreateDirModal } from 'feature/CreateDir';
import classNames from 'classnames';
import styles from '../Sidebar.module.scss';

interface SidebarButtonsProps {
    className?: string;
}

export const SidebarButtons = memo(({ className }: SidebarButtonsProps) => {
    const [modalIsOpen, setModalOpen] = useState(false);

    const handleOpenCreateDirModal = () => {
        setModalOpen(true);
    };
    const handleOnCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <div
            className={classNames(styles.SidebarWrapperButtons, {}, [className])}
        >
            <UploadFileButton />
            <button
                onClick={handleOpenCreateDirModal}
                className={classNames(styles.SidebarButton, ['btn-reset'])}
                type='button'
            >
                <HiOutlinePlus className={styles.SidebarBtnIcon} size={25} />
                Создать
            </button>
            <CreateDirModal isOpen={modalIsOpen} onClose={handleOnCloseModal} />
        </div>
    );
});
