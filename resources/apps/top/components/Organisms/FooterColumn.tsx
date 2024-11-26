import { FC } from "react";
import { FooterColumnType } from "../../../../types/top";

export const FooterColumn: FC<FooterColumnType> = ({heading, node})=>{
    return (
        <section className="footerCol">
            <h2 className="colHeading px-3">{ heading }</h2>
            <hr className="colLine m-1 border-slate-600"/>
            <div className="colBody px-3">
            { node }
            </div>
        </section>
    )
}
