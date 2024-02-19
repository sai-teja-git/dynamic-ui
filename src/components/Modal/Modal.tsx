
import { useCallback, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

// Types
export interface ModalProps {
    children: React.ReactNode;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    containerClasses?: string;
}

export default function Modal({
    children,
    showModal,
    setShowModal,
    containerClasses,
}: ModalProps) {
    const desktopModalRef = useRef(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        },
        [setShowModal],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <AnimatePresence>
            {showModal && (
                <>
                    <FocusTrap focusTrapOptions={{ initialFocus: false }}>
                        <motion.div
                            ref={desktopModalRef}
                            key="desktop-modal"
                            className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onMouseDown={(e) => {
                                if (desktopModalRef.current === e.target) {
                                    setShowModal(false);
                                }
                            }}
                        >
                           
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Modal title</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Modal body text goes here.</p>
                                            {children}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
\
                        </motion.div>
                    </FocusTrap>
                    <motion.div
                        key="desktop-backdrop"
                        className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    />
                </>
            )}
        </AnimatePresence>
    );
}