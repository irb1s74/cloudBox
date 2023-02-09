import { FC } from 'react';
import { Backdrop } from '@mui/material';
import { ShareFileList } from 'feature/ShareFileList';

interface SharePageProps {
}

const SharePage: FC<SharePageProps> = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <ShareFileList />
        </Backdrop>
    );
};

export default SharePage;
