import { useEffect, useRef, useState } from "react";

// Components
import { Section } from "../Organisms/Section";
import { motion } from "framer-motion";

import layout from "../../styles/layout.module.scss";

export default function Board() {
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(()=>{
        if(imgRef.current){
            imgRef.current.addEventListener("load", ()=>{
                setCanPlay(true);
            })
        }
    }, [])
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: "-400px",
            }}
            animate={ canPlay ? {
                opacity: 1,
                y: "0px",
            } : false}
            transition={{
                duration: 0.5,
                delay: 1.0,
                ease: "easeOut",
            }}
            className={layout.board}
        >
            <Section className="mb-0">
                <img
                    ref={ imgRef }
                    src="../images/top/boardBG.webp" 
                    className="object-fill" 
                />
            </Section>
        </motion.div>
    );
}
