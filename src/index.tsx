import ReactDOM from 'react-dom/client';
import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvide } from 'app/providers/StoreProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from 'app/styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <StoreProvide>
                <App />
            </StoreProvide>
        </ThemeProvider>
    </BrowserRouter>,
);
