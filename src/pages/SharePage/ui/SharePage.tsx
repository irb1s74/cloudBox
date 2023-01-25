import { FC } from 'react';
import classNames from 'classnames';
import styles from './SharePage.module.scss';

interface SharePageProps {
    className?: string;
}

const SharePage: FC<SharePageProps> = ({ className }) => {
    return <div className={classNames(styles.SharePage, {}, [className])} />;
};

export default SharePage;
