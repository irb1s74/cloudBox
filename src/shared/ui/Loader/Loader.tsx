import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
    <Box sx={{ display: 'flex' }}>
        <CircularProgress size={50} color='primary' />
    </Box>
);
