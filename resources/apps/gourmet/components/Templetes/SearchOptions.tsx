import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";

// Animation
import animation from "../../styles/animation.module.scss";

// Components
import FilterBox from "../Organisms/FilterBox";

// Types
import { Category } from "../../../../types/common";

// Modules
import classNames from "classnames";

const SearchOptions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    // 開閉ロジック
    const drawerCtrl = (mode: string)=>{
        if(boxRef.current && contentRef.current){
            const height = 35 + (mode === "open" ? contentRef.current.clientHeight : 0);
            boxRef.current.style.height = height + "px";
        }
    }
    
    // 条件列挙でサイズが変わっても枠が追従するように
    const heightObserver = new ResizeObserver(()=>{
        if(contentRef.current){
            drawerCtrl("open");
        }
    });
    
    // 開閉の制御
    const drawerLogic =()=>{
        if(boxRef.current && contentRef.current){
            if(isOpen){
                drawerCtrl("open");
                boxRef.current.addEventListener("transitionend", ()=>{
                    // トランジション終了時に追従ロジックを適用
                    if(boxRef.current && contentRef.current){
                        boxRef.current.classList.remove(animation.drawer); //アニメーションを削除
                        heightObserver.observe(contentRef.current);
                    }
                }, {once: true});
            }else{
                if(contentRef.current){
                    // 追従ロジックを解除
                    heightObserver.unobserve(contentRef.current);
                }
                boxRef.current.classList.add(animation.drawer); //アニメーションを再び適用
                drawerCtrl("close");
            }
        }
        setIsOpen((prev)=> !prev);
    }

    useEffect(()=>{
        drawerLogic();    
    },[])

    return (
        <div
            ref={ boxRef }
            className={
                classNames(
                    "rounded-lg overflow-hidden",
                    styles.searchOptions,
                    animation.drawer,
                )
            }
        >
            <div
                onClick={drawerLogic}
                className={classNames(
                    "flex items-center justify-center",
                    "w-full h-[35px]",
                    "cursor-pointer",
                    styles.searchOptionsToggleBtn,
                )}
            >
                <p className="text-white">{ isOpen ? "▼" : "△" } 詳細検索</p>
            </div>
            <div ref={ contentRef } className="h-auto">
                <FilterBox />
            </div>
        </div>
    );
};

export default SearchOptions;
