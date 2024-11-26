import { FC, ReactNode } from "react";

type Props = {
    children?: ReactNode,
    className?: string,
}

export const Section: FC<Props> = ({ children, className }) =>{
    return (
        <section className={"m-auto w-11/12 mb-8 overflow-hidden bg-neutral-200 " + className}>
            { children }
        </section>
    )
}