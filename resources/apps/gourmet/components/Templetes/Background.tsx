import { FC } from "react";
import classNames from "classnames";

import animation from "../../styles/animation.module.scss";

const Background: FC =()=>{
    return (
    <div
        className={classNames(
            "fixed top-16 w-full h-full z-0",
            animation.area
        )}
    >
        <ul className={animation.circles}>
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
    )
}

export default Background;