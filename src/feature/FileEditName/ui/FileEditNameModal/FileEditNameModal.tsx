import { memo, Suspense } from 'react';
import { PageLoader } from 'widget/PageLoader';
import { Modal } from 'shared/ui/Modal/Modal';
import { IFile } from 'entities/File';
import { FileEditNameAsync } from '../FileEditNameForm/FileEditName.async';

interface RenameFileModalProps {
    className?: string;
    isOpen?: boolean;
    file: IFile;
    onClose?: () => void;
}

export const FileEditNameModal = memo((props: RenameFileModalProps) => {
    const { file, isOpen, onClose, className } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<PageLoader />}>
                <FileEditNameAsync file={file} handleCloseModal={onClose} />
            </Suspense>
        </Modal>
    );
});
