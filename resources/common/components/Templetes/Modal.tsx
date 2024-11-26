import React from "react";

// Custom-Hooks
import { useModalContext } from "../../../hooks/ModalProvider";

// Styles
import styles from "../../styles/Modal.module.scss";

const Modal: React.FC = () => {
    const { modalStatus, closeModal } = useModalContext();
    const { Component, componentProps } = modalStatus;

    return (
        <div className={styles.veil}>
            <div className={styles.modalCard}>
                {Component ? (
                    <>
                        <button onClick={closeModal}>close</button>
                        <Component {...componentProps} />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Modal;
