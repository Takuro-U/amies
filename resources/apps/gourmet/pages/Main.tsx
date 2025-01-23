import React, { useEffect, useState } from "react";

// Styles
import styles from "./../styles/Gourmet.module.scss";

// Components
import Map from "../components/Main/Map";
import SearchLinks from "../components/Main/SearchLinks";
import SearchOptions from "../components/Main/SearchOptions/SearchOptions";
import Background from "../components/Templetes/Background";

// Types
import { Category } from "../../../types/common";

// Utilities
import { apiOfGourmet } from "../../../util/ts/api";

// Modules
import classNames from "classnames";

const Main: React.FC = () => {
    return (
        <>
            <Background />
            <div className={classNames("relative z-10", styles.page)}>
                <Map />
                <SearchOptions />
                <SearchLinks />
                <aside className={classNames(styles.aside, "h-64")}>
                    {/* 追加要素のダミーボックス 
                    実装時に直書きheightを削除し、scssで調整する*/}
                    ランキングとか追加要素
                </aside>
            </div>
        </>
    );
};

export default Main;
