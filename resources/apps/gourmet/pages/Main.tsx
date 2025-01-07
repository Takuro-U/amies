import React, { useEffect, useState } from "react";

// Styles
import styles from "./../styles/Gourmet.module.scss";

// Components
import Map from "../components/Templetes/Map";
import SearchLinks from "../components/Templetes/SearchLinks";
import SearchOptions from "../components/Templetes/SearchOptions";

// Types
import { Category } from "../../../types/common";

// Utilities
import { apiOfGourmet } from "../../../util/ts/api";

// Modules
import classNames from "classnames";

const Main: React.FC = () => {
    return (
        <div className={styles.page}>
            <Map />
            <SearchOptions />
            <SearchLinks />
            <aside className={classNames(styles.aside, "h-64")} >
                {/* 追加要素のダミーボックス 
                    実装時に直書きheightを削除し、scssで調整する*/}
                ランキングとか追加要素
            </aside>
        </div>
    );
};

export default Main;
