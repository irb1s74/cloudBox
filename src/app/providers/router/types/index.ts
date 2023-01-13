import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
    FILES = 'FILES',
    NOT_FOUND = 'NOT_FOUND',
    AUTH = 'AUTH'
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    noAuthOnly?: boolean;
};
