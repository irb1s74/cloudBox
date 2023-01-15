import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    pageName?: string;
    children: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { className, children, pageName } = props;

    return (
        <main className={classNames(styles.Page, {}, [className])}>
            <div className={styles.Page__name}>{pageName}</div>
            {children}
        </main>
    );
});
