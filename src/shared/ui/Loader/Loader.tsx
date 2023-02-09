import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = () => (
    <Box sx={{ display: 'flex' }}>
        <CircularProgress size={50} color="primary" />
    </Box>
);
