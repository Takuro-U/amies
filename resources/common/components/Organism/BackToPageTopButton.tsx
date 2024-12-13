import classNames from "classnames";
import { FC } from "react";
import { useRef } from "react";

export const BackToPageTopButton: FC =()=>{
    const buttonRef = useRef(null);
    onscroll = ()=>{
        if(buttonRef.current){
            let button: HTMLDivElement = buttonRef.current;
            button.style.bottom = document.getElementsByTagName("html")[0].scrollTop?"1.5rem":"-3.5rem";
        }
    }

    return (
        <a href="#"><div
        ref={ buttonRef }
        style={{
            transition: "bottom 0.6s ease-out 0s",
        }}
        className={classNames(
            "fixed bottom-[-3.5rem] right-6",
            "w-12 h-12 rounded-full",
            "bg-slate-500 opacity-60",
            "z-20",
            "text-center leading-10",
            "text-white text-lg",
            "cursor-pointer",
        )}
        >▲</div></a>
    )
}