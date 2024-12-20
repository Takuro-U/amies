import React from "react";
import { route } from "ziggy-js";
import { useAuthContext } from "../../../hooks/AuthProvider";
import classNames from "classnames";
import { motion } from "framer-motion";
import { TopicsIcon, GourmetIcon } from "../components/Organisms/SvgIcons";

import Board from "../components/Templates/Board";
import Information from "../components/Templates/Information";
import ArticleList from "../components/Templates/ArticleList";
import BackGround from "../components/Templates/Background";

import layout from "../styles/layout.module.scss";

const Main: React.FC = () => {
    const { authStatus, login, logout } = useAuthContext();

    return (
        <>
        <BackGround/>
        <div className={classNames("relative z-10 ", layout.wrapper)}>
            <Board/>
            <motion.div // Boardよりも先に表示されないように隠す
                className={ layout.aside }
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 2,
                    duration: 1,
                }}>
                <Information/>
                <div className={ layout.articleLists }>
                    <ArticleList label="Topics" link={ route("/") } icon={<TopicsIcon/>}/>
                    <ArticleList label="Gourmet" link={ route("/") } icon={<GourmetIcon/>}/>
                </div>
            </motion.div>
        </div>
        </>        
    );
};

export default Main;
