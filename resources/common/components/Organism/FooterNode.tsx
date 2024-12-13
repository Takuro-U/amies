import { FC, ReactNode } from "react";
import { FooterColumnNodeType } from "../../../types/top";
import { route } from "ziggy-js";

import style from "../../styles/Footer.module.scss";
import classNames from "classnames";

export const FooterNode: FC<FooterColumnNodeType> = ({label, children})=>{
    let heading: ReactNode = label?<h2 className={ style.heading }>{ label }</h2>:null;

    return (
        <div className="pl-2">
            { heading }
            <ul className={classNames("pl-2")}>
                { children.map((i, key)=>i.link?
                    <li key={ key } className={style.child}><a href={ route(i.link) } className="underline">{ i.string }</a></li> :
                    <li key={ key } className={style.child}><p>{ i.string }</p></li>
                ) }
            </ul>
        </div>
    )
}