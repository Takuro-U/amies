import { FC } from "react";

// CSS
import style from "../../styles/SnapshotContainer.module.scss";

type Props = {
    path: string;
};

export const SnapshotContainer: FC<Props> = (props) => {
    return (
        <div className={style.container}>
            <img src={props.path} className={style.img} />
        </div>
    );
};
