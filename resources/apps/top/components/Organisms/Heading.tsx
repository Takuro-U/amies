import { FC } from "react";

type Props = {
    label: string,
}

export const Heading: FC<Props> = ( props ) =>{
    return (
        <h2 className="text-xl italic text-slate-600 pl-2 before:content-['#'] border-b border-slate-600 sticky top-0 bg-white bg-opacity-90">{ props.label }</h2>
    )
}