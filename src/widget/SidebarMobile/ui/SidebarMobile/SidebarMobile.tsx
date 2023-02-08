import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { FileActionsMobile } from 'feature/FileActionsMobile';
import { CreateDirModal } from 'feature/CreateDir';
import { SidebarMobileNavigation } from '../SidebarMobileNavigation/SidebarMobileNavigation';
import styles from './SidebarMobile.module.scss';

interface SidebarMobileProps {
    className?: string;
}

export const SidebarMobile: FC<SidebarMobileProps> = ({ className }) => {
    const [createDirModal, setCreateDirModal] = useState(false);

    const handleOpenCreateDirModal = useCallback(() => {
        setCreateDirModal(true);
    }, []);

    const handleOnCloseModal = useCallback(() => {
        setCreateDirModal(false);
    }, []);

    return (
        <div className={classNames(styles.SidebarMobile, {}, [className])}>
            <FileActionsMobile openModal={handleOpenCreateDirModal} />
            <SidebarMobileNavigation />
            <CreateDirModal
                isOpen={createDirModal}
                onClose={handleOnCloseModal}
            />
        </div>
    );
};
