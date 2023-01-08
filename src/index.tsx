import ReactDOM from 'react-dom/client';
import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvide } from 'app/providers/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvide>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvide>,
);
