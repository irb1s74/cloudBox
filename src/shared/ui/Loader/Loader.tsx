import { FC } from 'react';
import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
    <Box sx={{ position: 'relative' }}>
        <CircularProgress
            variant="determinate"
            sx={{
                color: (theme) =>
                    theme.palette.grey[
                        theme.palette.mode === 'light' ? 200 : 800
                    ],
            }}
            size={60}
            thickness={4}
            value={100}
        />
        <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
                color: '#00C2FFFF',
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
            }}
            size={60}
            thickness={4}
        />
    </Box>
);
