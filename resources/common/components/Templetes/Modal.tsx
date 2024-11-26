import React from "react";

// Custom-Hooks
import { useModalContext } from "../../../hooks/ModalProvider";

// Styles
import styles from "../../styles/Header.module.scss";

const Modal: React.FC = () => {
    const { modalStatus, closeModal } = useModalContext();
    const { Component, componentProps } = modalStatus;

    return (
        <div className={styles.veil}>
            <div className={styles.modalCard}>
                <div>これはモーダル</div>
                {Component ? (
                    <>
                        <button onClick={closeModal}></button>
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
