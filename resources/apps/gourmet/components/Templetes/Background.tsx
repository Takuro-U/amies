import { FC } from "react";
import { BackgroundBase } from "../../../../util/components/BackgroundBase";

import styles from "../../styles/Gourmet.module.scss";

const Background: FC =()=>{
    return (
        <>
            <BackgroundBase className={styles.bgBase}/>
        </>
    )
}

export default Background;