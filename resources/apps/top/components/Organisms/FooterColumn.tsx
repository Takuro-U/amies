import { FC } from "react";
import { FooterColumnType } from "../../../../types/top";
import { FooterNode } from "./FooterNode";

import styles from "../../styles/footer.module.scss";

export const FooterColumn: FC<FooterColumnType> = ({heading, node})=>{
    return (
        <section className={ styles.column }>
            <h2 className="px-3">{ heading }</h2>
            <hr className="m-1 border-slate-600"/>
            <div className="px-3">
            { node.map((i, key)=><FooterNode { ...i } key={ key }/>) }
            </div>
        </section>
    )
}
