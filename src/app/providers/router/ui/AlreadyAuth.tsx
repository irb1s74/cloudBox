import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Navigate } from 'react-router-dom';

interface ReactAuthProps {
    children: JSX.Element;
}

const AlreadyAuth: FC<ReactAuthProps> = ({ children }) => {
    const auth = useSelector(getUserAuthData);
    if (auth) {
        return (
            <Navigate to='/' />
        );
    }

    return children;
};

export default AlreadyAuth;
