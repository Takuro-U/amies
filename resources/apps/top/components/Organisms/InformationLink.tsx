// Types
import { FC } from "react";
import { InformationType } from "../../../../types/top";

export const InformationLink: FC<InformationType> = ( infomation: InformationType )=>{
    return (
        <article className="flex justify-between my-1 py-1 mx-3">
            <h3 className="underline underline-offset-2  text-base">{ infomation.date.join("-") + " :" + infomation.title }</h3>
        </article>
    )
}