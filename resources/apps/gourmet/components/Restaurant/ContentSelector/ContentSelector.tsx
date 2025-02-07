import React, { useEffect, useState } from "react";

// styles
import styles from "./../../../styles/Restaurant.module.scss";

// components
import Calender from "./Calender/Calender";
import Map from "./Map/Map";
import Menues from "./Menues/Menues";
import Reviews from "./Reviews/Reviews";

// modules
import classNames from "classnames";

const ContentSelector: React.FC = () => {
    const [contentId, setContentId] = useState(0);

    const contentList: {
        label: string;
        Component: React.ComponentType<any>;
    }[] = [
        { label: "メニュー", Component: Menues },
        { label: "マップ", Component: Map },
        { label: "カレンダー", Component: Calender },
        { label: "口コミ", Component: Reviews },
    ];

    const Children = contentList[contentId].Component;

    return (
        <div className=" bg-white">
            <div className="flex ">
                {contentList.map((content, index) => (
                    <button
                        key={index}
                        className={classNames(
                            "w-1/4 h-[40px] font-gourmet font-semibold text-[14px] ",
                            {
                                "text-[#ff832b] border-t-2 border-[#ff832b]":
                                    index === contentId,
                                "bg-[#e2e1dd] border-t-2 border-transparent text-slate-800":
                                    index !== contentId,
                            }
                        )}
                        onClick={() => setContentId(index)}
                    >
                        {content.label}
                    </button>
                ))}
            </div>
            <Children />
        </div>
    );
};

export default ContentSelector;
