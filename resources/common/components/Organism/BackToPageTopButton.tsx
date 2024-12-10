import classNames from "classnames";
import { FC } from "react";
import { useRef } from "react";

export const BackToPageTopButton: FC =()=>{
    const buttonRef = useRef(null);
    onscroll = ()=>{
        if(buttonRef.current){
            // なぜかエラーが出るけど挙動に問題はなし。なにゆえ
            buttonRef.current.style.bottom = document.getElementsByTagName("html")[0].scrollTop?"0.5rem":"-3.5rem";            
        }
    }

    return (
        <a href="#"><div
        ref={ buttonRef }
        style={{
            transition: "bottom 0.4s ease-out 0s",
        }}
        className={classNames(
            "fixed bottom-[-3.5rem] right-2",
            "w-10 h-10 rounded-full",
            "bg-gray-400 opacity-60",
            "z-10",
            "text-center leading-9",
            "text-white text-sm",
        )}
        >▲</div></a>
    )
}