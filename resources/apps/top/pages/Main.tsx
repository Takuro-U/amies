import React from "react";
import { route } from "ziggy-js";
import classNames from "classnames";
import { TopicsIcon, GourmetIcon } from "../components/Organisms/SvgIcons";
import { FadeIn } from "../components/Organisms/MotionContainer";
import Board from "../components/Templates/Board";
import Information from "../components/Templates/Information";
import ArticleList from "../components/Templates/ArticleList";
import BackGround from "../components/Templates/Background";

import layout from "../styles/layout.module.scss";

const Main: React.FC = () => {
    return (
        <>
            <BackGround />
            <div
                className={classNames(
                    "relative z-10 ",
                    layout.wrapper,
                    "font-main"
                )}
            >
                <Board />
                <FadeIn // Boardよりも先に表示されないように隠す
                    className={layout.aside}
                    delay={2}
                >
                    <Information />
                    <div className={layout.articleLists}>
                        <ArticleList
                            label="Topics"
                            link={route("/")}
                            icon={<TopicsIcon />}
                        />
                        <ArticleList
                            label="Gourmet"
                            link={route("/")}
                            icon={<GourmetIcon />}
                        />
                    </div>
                </FadeIn>
            </div>
        </>
    );
};

export default Main;
