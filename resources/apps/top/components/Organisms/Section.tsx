import classNames from "classnames";
import { FC, ReactNode } from "react";

type Props = {
    children?: ReactNode,
    className?: string,
}

export const Section: FC<Props> = ({ children, className }) =>{
    return (
        <section
            className={classNames(
                "m-auto w-11/12 mb-6 overflow-hidden bg-white bg-opacity-80 ",
                "rounded-lg",
                "h-full",
                className
            )}
        >
            { children }
        </section>
    )
}