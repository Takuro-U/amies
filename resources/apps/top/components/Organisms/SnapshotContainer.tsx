import { FC, useEffect, useRef } from "react";

// CSS
import style from "../../styles/SnapshotContainer.module.scss";

type Props = {
    path: string;
};

export const SnapshotContainer: FC<Props> = (props) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(()=>{
        if(imgRef.current){
            imgRef.current.addEventListener("load", (e)=>{
                if(e.target instanceof HTMLImageElement){
                    e.target.style.opacity = "1"
                }
            })
        }
    }, [])
    return (
        <div className={style.container}>
            <img 
                ref={ imgRef }
                src={props.path} 
                className={style.img} 
            />
        </div>
    );
};
