import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00C2ff',
        },
        secondary: {
            main: '#1F1F1F',
        },
    },
    typography: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFF',
                },
            },
            variants: [
                {
                    props: { variant: 'text' },
                    style: {
                        color: '#00C2ff',
                    },
                },
            ],
        },
    },
});
