import { FC } from 'react';
import {
    createSearchParams,
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import classNames from 'classnames';
import styles from '../Navbar.module.scss';

interface NavigationProps {
    className?: string;
}

export const NavbarNavigation: FC<NavigationProps> = ({ className }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [usePath] = useSearchParams();
    const path = usePath.get('path');
    const splitPath = path && path.split('\\');

    const handleClick = (index: number) => () => {
        if (splitPath) {
            navigate({
                pathname: '/files',
                search: `?${createSearchParams({
                    path: `${splitPath.slice(0, index + 1).join('\\')}`,
                })}`,
            });
        }
    };

    const parent = location.pathname.split('/')[1];
    return (
        <div className={classNames(styles.NavbarNavigation, {}, [className])}>
            <Breadcrumbs maxItems={4} aria-label="breadcrumb">
                <Link
                    to={`${location.pathname
                        .split('/')
                        .splice(0, 2)
                        .join('/')}`}
                    className={styles.NavbarBreadcrumb}
                >
                    {parent}
                </Link>
                {splitPath &&
                    splitPath.map((item, index) => (
                        <div
                            className={classNames(styles.NavbarBreadcrumb, {
                                [styles.NavbarBreadcrumb__active]:
                                    index + 1 === splitPath.length,
                            })}
                            key={index}
                            onClick={handleClick(index)}
                        >
                            {item}
                        </div>
                    ))}
            </Breadcrumbs>
        </div>
    );
};
