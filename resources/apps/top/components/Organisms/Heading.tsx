import classNames from "classnames";
import { FC } from "react";

import styles from "../../styles/heading.module.scss";

type Props = {
    label: string,
}

export const Heading: FC<Props> = ( props ) =>{
    return (
        <h2 
            className={ classNames(
                "before:content-['#'] text-xl italic text-neutral-800 font-extrabold",
                "sticky top-0",
                "pl-2",
                " bg-white bg-opacity-90",
                styles[props.label],
                styles.heading,
            ) }
        >{ props.label }</h2>
    )
}