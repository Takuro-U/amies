import React, { useState } from "react";

// Custom-Hooks
import { useModalContext } from "../../../hooks/ModalProvider";

// Styles
import styles from "../../styles/Modal.module.scss";

// material-ui-icon
import ClearIcon from "@mui/icons-material/Clear";

// etc.
import classNamesJoin from "classnames"; // 競合を避けるためにJoinを追加

const Modal: React.FC = () => {
    const [isMouseDownOnVeil, setIsMouseDownOnVeil] = useState<boolean>(false);

    const { modalStatus, closeModal } = useModalContext();
    
    // textでモーダルのタイトル、classNamesでモーダルの個別スタイルを取得
    const { Component, componentProps, text, classNames } = modalStatus;
    
    const blockClickEvent = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // モーダル外でクリック→クリック解除したときのみモーダルを閉じるよう修正
    // // カーソルの位置がveilかどうか判定
    const isOnVeil = (target: EventTarget)=>{
        return target.className.includes(styles.veil); //なんか怒られてるけど動いているのでヨシ！ TODO: リファクタリング
    }
    onmousedown = (e)=>{
        if(e.target){
            if(isOnVeil(e.target)){//クリック位置がモーダル外
                setIsMouseDownOnVeil(true);
            }
        }
    }
    onmouseup = (e)=>{
        if(e.target){
            if(isMouseDownOnVeil && isOnVeil(e.target)){//モーダル外でクリックされている∧解除位置がモーダル外
                closeModal();
            }
            setIsMouseDownOnVeil(false);
        }
    }


    return (
        <div className={styles.veil}>
            <div
                className={classNamesJoin(styles.modalCard, "overflow-hidden", classNames?.modal)}
                onClick={blockClickEvent}
            >
                {Component ? (
                    <>
                        <div
                            className={classNamesJoin("flex items-center justify-between h-9", classNames?.header)}>
                            <h1 className={classNamesJoin("pl-2 text-xl before:content-['○']", classNames?.title)}>{ text }</h1>
                            <button
                                onClick={closeModal}
                                className={classNamesJoin("pr-2", classNames?.closeButton)}
                            >
                                <ClearIcon/>
                            </button>
                        </div>
                        <hr className={classNamesJoin("border-slate-700 w-[96%] m-auto", classNames?.hr)}/>
                        <div className={classNamesJoin("h-full", classNames?.body)}>
                            <Component {...componentProps} />
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Modal;
