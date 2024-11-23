import React, { createContext, useContext, useState } from "react";

type PROPS = {
    children: React.ReactNode;
};

interface ModalStatus {
    isOpen: boolean;
    text: string;
    coreFunction: (...args: any[]) => void;
}

const defaultModalStatus: ModalStatus = {
    isOpen: false,
    text: "",
    coreFunction: () => {},
};

const defaultContext = {
    modalStatus: defaultModalStatus,
    openModal: (text: string, coreFunction: (...args: any[]) => any) => {},
    closeModal: () => {},
};

const ModalContext = createContext(defaultContext);

export const useModalContext = () => {
    return useContext(ModalContext);
};

const ModalProvider: React.FC<PROPS> = ({ children }) => {
    const [modalStatus, setModalStatus] = useState(defaultModalStatus);

    const openModal = (text: string, coreFunction: (...args: any[]) => any) => {
        setModalStatus({
            isOpen: true,
            text: text,
            coreFunction: coreFunction,
        });
    };

    const closeModal = () => {
        setModalStatus(defaultModalStatus);
    };

    return (
        <ModalContext.Provider value={{ modalStatus, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
