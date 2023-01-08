import { Route, Routes } from 'react-router-dom';
import { Suspense, useCallback } from 'react';
import { Loader } from 'widget/Loader';
import { AppRoutesProps } from '../types/index';
import { routeConfig } from '../config/routerConfig';
import RequireAuth from './RequireAuth';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<Loader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? (
                    <RequireAuth>{element}</RequireAuth>
                ) : (
                    element
                )}
            />
        );
    }, []);


    return <Routes> {Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

