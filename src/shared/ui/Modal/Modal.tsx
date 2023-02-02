import { FC, ReactNode, MouseEvent } from 'react';
import { Portal } from '@mui/material';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, children, isOpen, onClose } = props;

    const onContentClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Portal>
            <Transition in={isOpen} timeout={200} unmountOnExit mountOnEnter>
                {(state) => (
                    <div
                        className={classNames(styles.Modal, [state, className])}
                    >
                        <div className={styles.overlay} onMouseUp={onClose}>
                            <div onMouseUp={onContentClick}>{children}</div>
                        </div>
                    </div>
                )}
            </Transition>
        </Portal>
    );
};
