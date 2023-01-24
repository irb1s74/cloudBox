import { memo, ReactNode } from 'react';
import { Navbar } from 'widget/Navbar';
import { Sidebar } from 'widget/Sidebar';
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
            <Navbar />
            <div className={styles.Page__container}>
                <Sidebar />
                <div className={styles.Page__content}>
                    <div className={styles.Page__name}>{pageName}</div>
                    {children}
                </div>
            </div>
        </main>
    );
});
