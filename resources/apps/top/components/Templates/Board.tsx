// Components
import { Section } from "../Organisms/Section";
import { motion } from "framer-motion";

import layout from "../../styles/layout.module.scss";

export default function Board() {
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
                duration: 0.5,
                delay: 1.0,
                ease: "easeOut",
            }}
            className={layout.board}
        >
            <Section className="mb-0">
                <img src="../images/top/boardBG.png" className="object-fill" />
            </Section>
        </motion.div>
    );
}
