import { AuthPage } from 'pages/AuthPage';
import { FilesPage } from 'pages/FilesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AppRoutes, AppRoutesProps } from '../types';


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.FILES]: '/files',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.FILES]: {
        path: RoutePath.FILES,
        element: <FilesPage />,
        authOnly: true,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.AUTH,
        element: <AuthPage />,
        noAuthOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <NotFoundPage />,
        authOnly: true,
    },
};
