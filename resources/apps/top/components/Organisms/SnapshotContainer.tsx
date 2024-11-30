import { FC } from "react";
import { motion } from "framer-motion";

type Props = {
    path: string,
    delta: number,
};

export const SnapshotContainer: FC<Props> = ( props )=>{
    let random 
    do{
        random = Math.round(Math.random()*100);
    }while(!(5 < random && random < 45));

    console.log(random);
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: random < 25 ? "-80vw" : "180vw",
                y: Math.sin(props.delta)*100+"vh",
            }}
            animate={{
                opacity: 1,
                x: random + "vw",
                y: (30+random/10)*props.delta + "vw",
            }}
            transition={{
                duration: 3.0 / 1.4,
                delay: 3.0/4 * props.delta * 0.6,
                ease: "easeOut",
            }}>
            <div className="absolute w-[60vw] h-[80vw] flex z-0" style={{clipPath: "polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)"}}>
                <img src={ props.path } className="object-cover"/>
            </div>
        </motion.div>
    )
}