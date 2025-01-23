import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "../../styles/Heading.module.scss";

type Props = {
    label: string;
    icon: ReactNode;
};

export const Heading: FC<Props> = (props) => {
    return (
        <h2
            className={classNames(
                "text-2xl text-neutral-800",
                "sticky top-0",
                "pl-2",
                " bg-white bg-opacity-90",
                styles[props.label],
                styles.heading
            )}
        >
            {props.icon}
            {props.label}
        </h2>
    );
};
