import React, { useState } from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";

// Components
import FilterBox from "../Organisms/FilterBox";

// Types
import { Category } from "../../../../types/common";

// Modules
import classNames from "classnames";

const SearchOptions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.searchOptions}>
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={classNames(
                    "flex items-center justify-center",
                    "w-full",
                    "bg-slate-200",
                    "border",
                    "cursor-pointer"
                )}
            >
                <p>{ isOpen ? "△" : "▼" } 詳細検索</p>
            </div>
            <FilterBox isOpen={isOpen}/>
        </div>
    );
};

export default SearchOptions;
