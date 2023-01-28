import { memo, useRef } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { Loader } from 'shared/ui/Loader/Loader';
import { useUploadFileMutation } from 'entities/File';
import { useSearchParams } from 'react-router-dom';
import styles from './UploadFileButton.module.scss';

export const UploadFileButton = memo(() => {
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

    return (
        <button
            type="button"
            onClick={handleSelectFiles}
            className={styles.UploadFileButton}
            disabled={isLoading}
        >
            <HiCloudUpload className={styles.UploadFileIcon} size={25} />
            Загрузить
            <input
                ref={filesInput}
                onChange={handleUpdateFiles}
                type="file"
                multiple
                hidden
            />
            {isLoading && (
                <div className={styles.UploadFileButton__loading}>
                    <Loader />
                </div>
            )}
        </button>
    );
});
