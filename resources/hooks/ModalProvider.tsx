import React, { createContext, ReactNode, useContext, useState } from "react";

type PROPS = {
    children: React.ReactNode;
};

interface ModalStatus {
    isOpen: boolean;
    text: string;
    coreFunction: (...args: any[]) => void;
    Component: React.ComponentType<any> | null;
    componentProps: any;
}

const defaultModalStatus: ModalStatus = {
    isOpen: false,
    text: "",
    coreFunction: () => {},
    Component: null,
    componentProps: null,
};

const defaultContext = {
    modalStatus: defaultModalStatus,
    openModal: (p: {
        text: string;
        coreFunction: (...args: any[]) => any;
        Component: React.ComponentType<any> | null;
        componentProps: any;
    }) => {},
    closeModal: () => {},
};

const ModalContext = createContext(defaultContext);

export const useModalContext = () => {
    return useContext(ModalContext);
};

const ModalProvider: React.FC<PROPS> = ({ children }) => {
    const [modalStatus, setModalStatus] = useState(defaultModalStatus);

    const openModal = (p: {
        text: string;
        coreFunction: (...args: any[]) => any;
        Component: React.ComponentType<any> | null;
        componentProps: any;
    }) => {
        setModalStatus({
            isOpen: true,
            text: p.text,
            coreFunction: p.coreFunction,
            Component: p.Component,
            componentProps: p.componentProps,
        });

        console.log("open modal");
    };

    const closeModal = () => {
        setModalStatus(defaultModalStatus);

        console.log("close modal");
    };

    return (
        <ModalContext.Provider value={{ modalStatus, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
