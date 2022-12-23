import { RouteProps } from 'react-router-dom';
import { Main } from 'pages/Main';
import { NotFound } from 'pages/NotFound'


export enum AppRoutes {
  MAIN = 'MAIN',
  NOT_FOUND = 'NOT_FOUND'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <Main />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFound />,
  },
};
