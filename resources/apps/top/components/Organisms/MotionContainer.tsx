// Utilに移植するかも

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
    children: ReactNode,
    className?: string,
}

// スクロールしたときに下からぴょんてするやつ
export const ScrollHopping: FC<Props> =( props )=>{
    return (
        <motion.div
        initial={{
            y: "60px",
            opacity: 0,
        }}
        whileInView={{
            y: "0px",
            opacity: 1,
        }}
        viewport={{
            once: true,
            amount: 0.8,
        }}
        className={ props.className }
        >
        { props.children }
    </motion.div>
    )
}

// ランダムな間隔で大きくなる
export const RandomZoom: FC<Props> =( props )=>{
    let random = Math.round(Math.random());

    return (
        <motion.div
        animate={{
            scale: [1,1.02,1],
        }}  
        transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3+random,
        }}
        className={ props.className }
        >
        { props.children }
        </motion.div>
    )
}