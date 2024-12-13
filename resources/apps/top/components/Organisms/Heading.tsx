import classNames from "classnames";
import { FC } from "react";

import styles from "../../styles/Heading.module.scss";

type Props = {
    label: string,
}

export const Heading: FC<Props> = ( props ) =>{
    return (
        <h2 
            className={ classNames(
                "text-xl italic text-neutral-800 font-bold",
                "sticky top-0",
                "pl-2",
                " bg-white bg-opacity-90",
                styles[props.label],
                styles.heading,
            ) }
        >{ props.label }</h2>
    )
}