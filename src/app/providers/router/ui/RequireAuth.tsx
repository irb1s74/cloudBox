import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserIsLoadingAuth } from 'entities/User';
import { Navigate } from 'react-router-dom';

interface ReactAuthProps {
    children: JSX.Element;
}

const RequireAuth: FC<ReactAuthProps> = ({ children }) => {
    const auth = useSelector(getUserAuthData);
    const isAuthLoading = useSelector(getUserIsLoadingAuth);

    if (!auth && !isAuthLoading) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default RequireAuth;
