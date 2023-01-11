import { FC } from 'react';
import classNames from 'classnames';
import { Files } from 'entities/File';
import styles from './Main.module.scss';

interface MainProps {
    className?: string;
}

const Main: FC<MainProps> = ({ className }) => (
    <div className={classNames(styles.Main, {}, [className])}>
        <Files />
    </div>
);
export default Main;
