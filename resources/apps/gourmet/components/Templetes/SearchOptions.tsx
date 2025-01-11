import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";

// Animation
import animation from "../../styles/animation.module.scss";

// Components
import FilterBox from "../Organisms/FilterBox";

// Types
import { Category } from "../../../../types/common";

// Modules
import classNames from "classnames";

const SearchOptions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);

    useEffect(()=>{
        if(boxRef.current){
            let box:HTMLDivElement = boxRef.current;
            box.style.height = isOpen ? "260px" : "35px";
        }
    },[isOpen])

    return (
        <div
            ref={ boxRef }
            className={
                classNames(
                    "rounded-lg overflow-hidden",
                    styles.searchOptions,
                    animation.drawer,
                )
            }
        >
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={classNames(
                    "flex items-center justify-center",
                    "w-full h-[35px]",
                    "cursor-pointer",
                    styles.searchOptionsToggleBtn,
                )}
            >
                <p className="text-white">{ isOpen ? "△" : "▼" } 詳細検索</p>
            </div>
            <FilterBox />
        </div>
    );
};

export default SearchOptions;
