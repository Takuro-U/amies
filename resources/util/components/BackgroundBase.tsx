import React from "react";
import classNames from "classnames";
import styles from "../styles/utilComponents.module.scss";

type Props = {
    className?: string;
    upperColor?: string;
    lowerColor?: string;
};

export const BackgroundBase: React.FC<Props> = (props) => {
    const uc = props.upperColor ? props.upperColor : "#fff";
    const lc = props.lowerColor ? props.lowerColor : "#000";

    return (
        <div
            className={classNames(
                "fixed top-16 w-full h-full z-0",
                "bg-red-300",
                props.className
            )}
        >
            <ul className={styles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};
