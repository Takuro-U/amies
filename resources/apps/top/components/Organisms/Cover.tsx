import classNames from "classnames";
import { FC } from "react";

import styles from "../../styles/Cover.module.scss";
import layout from "../../styles/layout.module.scss";

export const Cover: FC = ()=>{
    return (
        <div className={classNames(layout.cover, "relative z-10")}>
            <div className={classNames(styles.card)}>
                <img src="../images/logo_720p.png"/>
                <h1 
                    className={classNames(
                        "text-center text-5xl font-bold", 
                        "text-red-300",
                    )}
                    style={{
                        textShadow: "4px 4px 6px black",
                    }}
                >A<span className="text-red-400">Mie</span>'s</h1>
                <p
                    className={classNames(
                        "leading-10",
                        "text-center text-2xl font-bold",
                        "text-gray-400"
                    )}>~ Find Your Amusement ~</p>
            </div>
        </div>
    )
}