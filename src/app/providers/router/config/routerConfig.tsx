import { Main } from 'pages/Main';
import { NotFound } from 'pages/NotFound';
import { Auth } from 'pages/Auth';
import { AppRoutes, AppRoutesProps } from '../types';


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.AUTH]: '/auth',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.MAIN,
        element: <Main />,
        // authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <NotFound />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.AUTH,
        element: <Auth />,
    },
};
