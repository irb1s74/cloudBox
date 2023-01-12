import { FC, ReactNode, MouseEvent } from 'react';
import { Portal } from '@mui/material';
import classNames from 'classnames';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean,
    onClose?: () => void
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, children, isOpen, onClose } = props;

    const mods: Record<string, boolean> = {
        [styles.opened]: isOpen,
    };

    const onContentClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    if (!isOpen) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className])}>
                <div className={styles.overlay} onMouseUp={onClose}>
                    <div onMouseUp={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
