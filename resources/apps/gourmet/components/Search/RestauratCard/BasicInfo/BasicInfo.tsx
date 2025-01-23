import React from "react";

import { BasicRestaurantData } from "../../../../../../types/gourmet";

import data from "../../../../../../../storage/app/data.json";
import classNames from "classnames";

import { route } from "ziggy-js";

import { Link } from "@inertiajs/react";

type PROPS = {
    restaurant: BasicRestaurantData;
    genres: number[];
};

const BasicInfo: React.FC<PROPS> = (props) => {
    return (
        <div className=" w-[65%] pl-[2%]">
            <Link
                href={route("/gourmet/restaurant")}
                data={{ id: props.restaurant.id }}
            >
                <p
                    className={classNames(
                        "w-full",
                        "font-gourmet text-[4.7vw] underline",
                        "overflow-hidden whitespace-nowrap"
                    )}
                    style={{
                        textOverflow: "ellipsis",
                    }}
                >
                    {props.restaurant.name}
                </p>
            </Link>

            <p className="text-[3.7vw]">
                {props.genres.map((id) => data.genreList[id].name).join("/")}
            </p>
            <p className="text-[3.7vw]">
                {data.areaList[props.restaurant.area_id].name}
            </p>
            <div className="flex">
                <p className="">
                    {props.restaurant.price_min != null
                        ? props.restaurant.price_min
                        : "-"}
                </p>
                <p className="">円～</p>
                <p className="">
                    {props.restaurant.price_max != null
                        ? props.restaurant.price_max
                        : "-"}
                </p>
                <p className="">円</p>
            </div>
        </div>
    );
};

export default BasicInfo;
