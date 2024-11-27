import React from "react";
import { route, Route } from "ziggy-js";
import { useAuthContext } from "../../../hooks/AuthProvider";
import Board from "../components/Templates/Board";
import Information from "../components/Templates/Information";
import ArticleList from "../components/Templates/ArticleList";
import AppFooter from "../components/Templates/AppFooter";

const Main: React.FC = () => {
    const { authStatus, login, logout } = useAuthContext();

    return (
        <>
        <Board/>
        <Information/>
        <ArticleList label="Topics" link={ route("/") }/>
        <ArticleList label="Gourmet" link={ route("/") }/>
        <AppFooter/>
        </>        
    );
};

export default Main;
