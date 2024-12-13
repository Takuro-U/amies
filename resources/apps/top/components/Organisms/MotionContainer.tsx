// Utilに移植するかも

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
    children: ReactNode,
    className?: string,
}

// スクロールしたときに下からぴょんてするやつ
type SHProps = {
    children: ReactNode,
    className?: string,
    instantFire?: boolean, // true でスクロールに依存せずに時間差で動く。現状InformationがBoardの後に出てくるようにする用
}
export const ScrollHopping: FC<SHProps> =( props )=>{
    return (
        <motion.div
        initial={{
            y: "60px",
            opacity: 0,
        }}
        // instantFire False.
        whileInView={props.instantFire ? {} :
            {
                y: "0px",
                opacity: 1,
            }
        }
        viewport={props.instantFire ? {} :
            {
                once: true,
                amount: 0.8,
            }
        }
        // instantFire True.
        animate={props.instantFire ? 
            {
                y: "0px",
                opacity: 1,
            } : {}
        }
        transition={props.instantFire ?
            {
                delay: 1.5, //wait for Board-setup.
            } : {}
        }
        className={ props.className }
        >
        { props.children }
    </motion.div>
    )
}

// ランダムな間隔で大きくなる
export const RandomZoom: FC<Props> =( props )=>{
    let random = Math.random()*10%5;

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