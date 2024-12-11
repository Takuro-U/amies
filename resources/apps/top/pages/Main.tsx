import React from "react";
import { route } from "ziggy-js";
import { useAuthContext } from "../../../hooks/AuthProvider";
import Board from "../components/Templates/Board";
import Information from "../components/Templates/Information";
import ArticleList from "../components/Templates/ArticleList";
import AppFooter from "../components/Templates/AppFooter";
import BackGround from "../components/Templates/Background";
import { BackToPageTopButton } from "../../../common/components/Organism/BackToPageTopButton";

import styles from "../styles/top.module.scss"
import classNames from "classnames";
const Main: React.FC = () => {
    const { authStatus, login, logout } = useAuthContext();

    return (
        <>
        {/* 背景より下にめり込まないようにするためにz-10を設定（背景はz-0） */}
        <div className={classNames("relative z-10", styles.wrapper)}>
            <Board/>
            <Information/>
            <ArticleList label="Topics" link={ route("/") }/>
            <ArticleList label="Gourmet" link={ route("/") }/>
        </div>
        <AppFooter/>
        <BackToPageTopButton/>
        <BackGround/>
        </>        
    );
};

export default Main;
