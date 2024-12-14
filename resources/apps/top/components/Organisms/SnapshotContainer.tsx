import { FC } from "react";

// CSS
import style from "../../styles/SnapshotContainer.module.scss";
import classNames from "classnames";

type Props = {
    path: string,
};

export const SnapshotContainer: FC<Props> = ( props )=>{
    return (
        <div className={ style.container }>
            <img src={ props.path } className={classNames("h-[90%] w-full object-cover", style.img)}/>
        </div>
    )
}