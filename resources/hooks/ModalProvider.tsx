import React, { createContext, ReactNode, useContext, useState } from "react";

type PROPS = {
    children: React.ReactNode;
};

interface ModalStatus {
    isOpen: boolean;
    text: string;
    classNames?: {  //Modalのスタイルを個別に変更できるように引数を追加
        modal?: string, //モーダル本体
        header?: string,  //ヘッダ
        title?: string, //タイトルテキスト
        hr?: string,  //境界線 
        closeButton?: string, //閉じるボタン
        body?: string, //コンテンツエリア
    };
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
        classNames?: {  //Modalのスタイルを個別に変更できるように引数を追加
            modal?: string,
            header?: string,
            title?: string,
            hr?: string,
            closeButton?: string,
            body?: string,
        };
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
        classNames?: {  //Modalのスタイルを個別に変更できるように引数を追加
            modal?: string,
            header?: string,
            title?: string,
            hr?: string,
            closeButton?: string,
            body?: string,
        };
    }) => {
        setModalStatus({
            isOpen: true,
            text: p.text,
            classNames: p.classNames,
            coreFunction: p.coreFunction,
            Component: p.Component,
            componentProps: p.componentProps,
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
