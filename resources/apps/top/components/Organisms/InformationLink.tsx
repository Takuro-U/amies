// Types
import { FC } from "react";
import { InformationType } from "../../../../types/top";

export const InformationLink: FC<InformationType> = ( infomation: InformationType )=>{
    return (
        <article className="flex justify-between my-1 p-1 mx-5">
            <h3 className="font-bold underline underline-offset-2">{ infomation.date + " :" + infomation.title }</h3>
        </article>
    )
}