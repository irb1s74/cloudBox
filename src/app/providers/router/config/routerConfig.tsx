import { Main } from 'pages/Main';
import { NotFound } from 'pages/NotFound';
import { Auth } from 'pages/Auth';
import { AppRoutes, AppRoutesProps } from '../types';


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.MAIN,
        element: <Main />,
        authOnly: true,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.AUTH,
        element: <Auth />,
        noAuthOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <NotFound />,
        authOnly: true,
    },
};
