import { memo, ReactNode, useEffect, useState } from 'react';
import { Navbar } from 'widget/Navbar';
import { Sidebar } from 'widget/Sidebar';
import classNames from 'classnames';
import { SidebarMobile } from 'widget/SidebarMobile';
import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    pageName?: string;
    children: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { className, children, pageName } = props;
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    if (!isMobile) {
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
    }

    return (
        <main className={classNames(styles.Page, {}, [className])}>
            <Navbar />
            <div className={styles.Page__container}>
                <SidebarMobile />
                <div className={styles.Page__content}>
                    <div className={styles.Page__name}>{pageName}</div>
                    {children}
                </div>
            </div>
        </main>
    );
});
