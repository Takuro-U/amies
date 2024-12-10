// Types
import { FC } from "react";
import { InformationType } from "../../../../types/top";
import { route } from "ziggy-js";

export const InformationLink: FC<InformationType> = ( information: InformationType )=>{
    return (
        <a href={ route(information.link )}>
        <article className="flex justify-between my-1 py-1 mx-3">
            <h3 className="underline underline-offset-2  text-base">
                { information.date.join("-") + " :" + information.title }
            </h3>
        </article>
        </a>
    )
}