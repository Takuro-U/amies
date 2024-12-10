import { FC } from "react";
import { motion, useTime, useTransform } from "framer-motion";

import style from "../../styles/snapshotContainer.module.scss";

type Props = {
    path: string,
    delta: number,
};

export const SnapshotContainer: FC<Props> = ( props )=>{
    return (
        <motion.div 
           initial={{
            x: "-20vw",
            y: "-100vh"
           }}
           animate={{
            x: props.delta%2 ? "5vw" : "45vw",
            y: 130*props.delta + "px",
           }}
           transition={{
            delay: props.delta*0.2,
            duration: 0.8,
            ease: "easeInOut",
            bounce:true,
           }}>
            <div className={ style.container }>
                <img src={ props.path } className="object-cover"/>
            </div>
        </motion.div>
    )
}