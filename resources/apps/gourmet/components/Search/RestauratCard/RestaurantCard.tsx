import React from "react";

import { BasicRestaurantData, WeeklyHours } from "../../../../../types/gourmet";

import WeeklyCalendar from "./WeeklyCalendar/WeeklyCalendar";
import BasicInfo from "./BasicInfo/BasicInfo";
import classNames from "classnames";

type PROPS = {
    className?: string;
    restaurant: BasicRestaurantData;
    genres: number[];
    hours: WeeklyHours[];
};

const RestaurantCard: React.FC<PROPS> = (props) => {
    return (
        <div
            className={classNames(
                props.className,
                "w-[90%] mb-[20px] p-[2%] box-border",
                "bg-white/80"
            )}
        >
            <div className="flex items-start">
                <img
                    className="w-[35%] border border-[#6B4226] bg-white "
                    src="../images/common/logo_480p.png"
                />
                <BasicInfo
                    restaurant={props.restaurant}
                    genres={props.genres}
                />
            </div>
            <WeeklyCalendar hours={props.hours} />
        </div>
    );
};

export default RestaurantCard;
