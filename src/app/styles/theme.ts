import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00C2FFFF',
        },
        secondary: {
            main: '#1F1F1F',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFF',
                },
            },
        },
    },
});
