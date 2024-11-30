import { FC, ReactNode } from "react";

type Props = {
    children?: ReactNode,
    className?: string,
}

export const Section: FC<Props> = ({ children, className }) =>{
    return (
        <section className={"m-auto w-11/12 mb-6 overflow-hidden bg-gray-100 bg-opacity-90 " + className}>
            { children }
        </section>
    )
}