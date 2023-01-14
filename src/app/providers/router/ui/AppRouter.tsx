import { Route, Routes } from 'react-router-dom';
import { Suspense, useCallback } from 'react';
import AlreadyAuth from 'app/providers/router/ui/AlreadyAuth';
import { PageLoader } from 'widget/PageLoader';
import { AppRoutesProps } from '../types/index';
import { routeConfig } from '../config/routerConfig';
import RequireAuth from './RequireAuth';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        <AlreadyAuth>{element}</AlreadyAuth>
                    )
                }
            />
        );
    }, []);

    return (
        <Routes> {Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    );
};
