import { FC, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { PageLoader } from 'widget/PageLoader';
import { CreateDirFormAsync } from '../CreateDirForm/CreateDirForm.async';

interface CreateDirModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const CreateDirModal: FC<CreateDirModalProps> = ({
    className,
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<PageLoader />}>
                <CreateDirFormAsync handleCloseModal={onClose} />
            </Suspense>
        </Modal>
    );
};
