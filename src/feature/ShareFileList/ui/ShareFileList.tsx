import { FC, useCallback } from 'react';
import { downloadFile, File } from 'entities/File';
import { useSearchParams } from 'react-router-dom';
import { PageLoader } from 'widget/PageLoader';
import { Logo } from 'shared/ui/Logo/Logo';
import { Button, Divider } from '@mui/material';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useGetShareFileQuery } from '../api/ShareFileListService';
import styles from './ShareFileList.module.scss';

interface ShareFileListProps {

}

export const ShareFileList: FC<ShareFileListProps> = () => {
    const dispatch = useAppDispatch();
    const [usePath] = useSearchParams();
    const accessCode = usePath.get('accessLink');
    const { data: file, isLoading } = useGetShareFileQuery({ accessCode });

    const handleDownload = useCallback(() => {
        if (file?.id) {
            dispatch(downloadFile({ file }));
        }
    }, [file, dispatch]);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className={styles.ShareFileList}>
            <div className={styles.ShareFileList__header}>
                <Logo />
                <Button variant='contained' onClick={handleDownload}>
                    Скачать
                </Button>
            </div>
            <Divider sx={{ width: '100%' }} />
            <div className={styles.ShareFileList__file}>
                <File file={file} active={false} />
            </div>
        </div>
    );
};
