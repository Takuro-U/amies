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
        <div className="border-b border-slate-500">
            <div className="flex ">
                {contentList.map((content, index) => (
                    <button
                        key={index}
                        className={classNames("w-1/4", {
                            "": index === contentId,
                            "border-l border-slate-500":
                                index === contentId && index !== 0,
                            "border-r border-slate-500":
                                index === contentId &&
                                index !== contentList.length - 1,
                            "bg-slate-200 border-b border-slate-500":
                                index !== contentId,
                        })}
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
