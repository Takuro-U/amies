// Components
import { Section } from "../Organisms/Section";
import { motion } from "framer-motion";

export default function Board(){
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: "-400px",
            }}
            animate={{
                opacity: 1,
                y: "0px",
            }}
            transition={{
                duration: 0.3,
                delay: 1,
                ease: "easeOut",
            }}>
            <Section>
            <img src="../images/top/boardBG.png" className="object-fill"/>    
            </Section>
        </motion.div>
    )
}