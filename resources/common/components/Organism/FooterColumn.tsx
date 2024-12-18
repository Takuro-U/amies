import { FC } from "react";
import { FooterColumnType } from "../../../types/top";
import { FooterNode } from "./FooterNode";

import styles from "../../styles/Footer.module.scss";

export const FooterColumn: FC<FooterColumnType> = ({heading, node})=>{
    return (
        <section className={ styles.column }>
            <h2 className="pl-2 text-lg leading-5 text-slate-500 before:content-['&'] before:text-sm">{ heading }</h2>
            <hr className="m-1 border-slate-600"/>
            <div className="pl-3 leading-5 text-slate-900">
            { node.map((i, key)=><FooterNode { ...i } key={ key }/>) }
            </div>
        </section>
    )
}
