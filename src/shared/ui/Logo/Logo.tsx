import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logo from 'shared/assets/img/cloud-logo.png';
import styles from './Logo.module.scss';

interface LogoProps {
    className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => (
    <Link to='/files'>
        <div className={classNames(styles.Logo, {}, [className])}>
            <img
                loading='lazy'
                src={logo}
                width='30'
                height='30'
                alt='cloud Logo'
            />
            <div className={styles.name}>cloudBox.</div>
        </div>
    </Link>
);
