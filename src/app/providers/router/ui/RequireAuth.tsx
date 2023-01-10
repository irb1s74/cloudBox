import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Navigate } from 'react-router-dom';

interface ReactAuthProps {
    children: JSX.Element;
}

const RequireAuth: FC<ReactAuthProps> = ({ children }) => {
    const auth = useSelector(getUserAuthData);

    if (!auth) {
        return (
            <Navigate to='/auth' />
        );
    }

    return children;
};

export default RequireAuth;
