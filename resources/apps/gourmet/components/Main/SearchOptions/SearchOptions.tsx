import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "./../../../styles/Gourmet.module.scss";

// Components
import FilterBox from "./FilterBox/FilterBox";

// Types
import { Category } from "../../../../../types/common";

// Modules
import classNames from "classnames";

const SearchOptions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegisted, setIsRegisted] = useState(false);
    const fireBtnRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    
    // 開閉コントロール
    const drawerCtrl = (mode: string) => {
        if (boxRef.current && contentRef.current) {
            const height =
                35 + (mode === "open" ? contentRef.current.clientHeight : 0);
            boxRef.current.style.height = height + "px";
        }
    };

    // 条件列挙でサイズが変わっても枠が追従するように
    const heightObserver = new ResizeObserver(() => {
        if (contentRef.current) {
            drawerCtrl("open");
        }
    });

    // 開閉の制御
    const drawerLogic = () => {
        //トランジション終了時に、再びボタンにイベントを登録するイベントを登録
        //isRegistedは二重登録を防ぐステート変数
        if(boxRef.current && !isRegisted){
            boxRef.current.addEventListener("transitionend", ()=>{
                fireBtnEvRegister();
                setIsRegisted(false);
            }, {once: true});
            setIsRegisted(true);
        }

        if (boxRef.current && contentRef.current) {
            if (isOpen) {
                drawerCtrl("open");
                boxRef.current.addEventListener(
                    "transitionend",
                    () => {
                        // トランジション終了時に追従ロジックを適用
                        if (boxRef.current && contentRef.current) {
                            boxRef.current.classList.remove(styles.drawer); //アニメーションを削除
                            heightObserver.observe(contentRef.current);
                        }
                    },
                    { once: true }
                );
            } else {
                if (contentRef.current) {
                    // 追従ロジックを解除
                    heightObserver.unobserve(contentRef.current);
                }
                boxRef.current.classList.add(styles.drawer); //アニメーションを再び適用
                drawerCtrl("close");
            }
        }
    };

    //開閉ボタンにイベントを登録する関数
    const fireBtnEvRegister =()=>{
        if(fireBtnRef.current){
            fireBtnRef.current.addEventListener("click", ()=>{
                setIsOpen((prev)=>!prev);
            }, {once: true});
        }
    }

    useEffect(()=>{ //初期化
        fireBtnEvRegister(); // イベントを登録
    },[]);

    useEffect(()=>{ //isOpen変化時に発火
        drawerLogic();
    }, [isOpen])

    return (
        <div
            ref={boxRef}
            className={classNames(
                "rounded-sm overflow-hidden",
                "bg-white bg-opacity-30 h-[35px]",
                styles.searchOptions,
                styles.drawer
            )}
        >
            <div
                ref={ fireBtnRef }
                className={classNames(
                    "flex items-center justify-center",
                    "w-full h-[35px]",
                    "cursor-pointer",
                    styles.searchOptionsToggleBtn,
                )}
            >
                <p className="text-white">{isOpen ? "△" : "▼"} 詳細検索</p>
            </div>
            <div ref={contentRef} className="h-auto">
                <FilterBox />
            </div>
        </div>
    );
};

export default SearchOptions;
