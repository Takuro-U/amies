import classNames from "classnames";
import { FC } from "react";
import { useRef } from "react";

export const BackToPageTopButton: FC =()=>{
    const buttonRef = useRef(null);
    onscroll = ()=>{
        if(buttonRef.current){
            let button: HTMLDivElement = buttonRef.current;
            button.style.translate = document.getElementsByTagName("html")[0].scrollTop?"0 -5rem":"0 5rem";
        }
    }

    return (
        <div
        ref={ buttonRef }
        style={{
            transition: "translate 0.5s ease-out",
        }}
        onClick={()=>{
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }}
        className={classNames(
            "fixed bottom-[-3rem] right-2",
            "w-12 h-12 rounded-full",
            "bg-slate-500 opacity-60",
            "z-20",
            "text-center leading-10",
            "text-white text-lg",
            "cursor-pointer",
        )}
        >▲</div>
    )
}