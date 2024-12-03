import { FC } from "react";
import { motion } from "framer-motion";

import style from "../../styles/snapshotContainer.module.scss";

type Props = {
    path: string,
    delta: number,
};

export const SnapshotContainer: FC<Props> = ( props )=>{
    let random 
    do{
        random = Math.round(Math.random()*100);
    }while(!(1 <= random && random <= 40));

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: random < 23 ? "-80vw" : "180vw",
                y: Math.sin(props.delta)*100+"vh",
            }}
            animate={{
                opacity: 1,
                x: Math.min(random,40) + "vw",
                y: (30+random/10)*props.delta + "vw",
            }}
            transition={{
                duration: 3.0 / 1.4,
                delay: 2.6/4 * props.delta * 0.8,
                ease: "easeOut",
            }}>
            <div className={ style.container }>
                <img src={ props.path } className="object-cover"/>
            </div>
        </motion.div>
    )
}