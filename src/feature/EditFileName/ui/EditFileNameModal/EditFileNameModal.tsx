import { memo, Suspense } from 'react';
import { PageLoader } from 'widget/PageLoader';
import { Modal } from 'shared/ui/Modal/Modal';
import { IFile } from 'entities/File';
import { EditFileNameAsync } from '../EditFileNameForm/EditFileName.async';

interface RenameFileModalProps {
    className?: string;
    isOpen?: boolean;
    file: IFile;
    onClose?: () => void;
}

export const EditFileNameModal = memo((props: RenameFileModalProps) => {
    const { file, isOpen, onClose, className } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<PageLoader />}>
                <EditFileNameAsync file={file} handleCloseModal={onClose} />
            </Suspense>
        </Modal>
    );
});
