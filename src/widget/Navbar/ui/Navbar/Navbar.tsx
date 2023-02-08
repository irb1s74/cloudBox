import { FC } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import classNames from 'classnames';
import { NavbarNavigation } from '../NavbarNavigation/NavbarNavigation';
import { NavbarActions } from '../NavbarActions/NavbarActions';
import styles from '../Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => (
    <div className={classNames(styles.Navbar, {}, [className])}>
        <Logo />
        <NavbarNavigation />
        <NavbarActions />
    </div>
);
