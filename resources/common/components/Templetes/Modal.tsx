import React from "react";

// Custom-Hooks
import { useModalContext } from "../../../hooks/ModalProvider";

// Styles
import styles from "../../styles/Modal.module.scss";

// material-ui-icon
import ClearIcon from "@mui/icons-material/Clear";

// etc.
import classNames from "classnames";

const Modal: React.FC = () => {
    const { modalStatus, closeModal } = useModalContext();
    const { Component, componentProps, text } = modalStatus;

    const blockClickEvent = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.veil} onClick={closeModal}>
            <div
                className={classNames(styles.modalCard, "relative")}
                onClick={blockClickEvent}
            >
                {Component ? (
                    <>
                        <div className="flex items-center justify-between h-9">
                            <h1 className="pl-2 text-xl before:content-['○']">{ text }</h1>
                            <button
                                onClick={closeModal}
                                className="pr-2"
                            >
                                <ClearIcon/>
                            </button>
                        </div>
                        <hr className="border-slate-700 w-[96%] m-auto"/>
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
