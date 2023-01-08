import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'MAIN',
  NOT_FOUND = 'NOT_FOUND'
}

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};
