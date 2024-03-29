import { AuthPage } from 'pages/AuthPage';
import { FilesPage } from 'pages/FilesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { RecentPage } from 'pages/RecentPage';
import { SearchPage } from 'pages/SearchPage';
import { SharePage } from 'pages/SharePage';
import { AppRoutes, AppRoutesProps } from '../types';

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.FILES]: '/files',
    [AppRoutes.FAVORITES]: '/favorites',
    [AppRoutes.RECENT]: '/recent',
    [AppRoutes.SHARE]: '/share',
    [AppRoutes.SEARCH]: '/search',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.FILES]: {
        path: RoutePath.FILES,
        element: <FilesPage />,
        authOnly: true,
    },
    [AppRoutes.FAVORITES]: {
        path: RoutePath.FAVORITES,
        element: <FavoritesPage />,
        authOnly: true,
    },
    [AppRoutes.RECENT]: {
        path: RoutePath.RECENT,
        element: <RecentPage />,
        authOnly: true,
    },
    [AppRoutes.SHARE]: {
        path: RoutePath.SHARE,
        element: <SharePage />,
    },
    [AppRoutes.SEARCH]: {
        path: RoutePath.SEARCH,
        element: <SearchPage />,
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
