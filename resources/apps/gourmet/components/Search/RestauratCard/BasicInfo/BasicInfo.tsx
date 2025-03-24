import React from "react";

import styles from "../../../../styles/Search.module.scss";

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
                        styles.restaurantName,
                        "w-full",
                        "font-gourmet underline",
                        "overflow-hidden whitespace-nowrap"
                    )}
                    style={{
                        textOverflow: "ellipsis",
                    }}
                >
                    {props.restaurant.name}
                </p>
            </Link>

            <p className={styles.genreOrAreaName}>
                {props.genres.map((id) => data.genreList[id].name).join("/")}
            </p>
            <p className={styles.genreOrAreaName}>
                {props.restaurant.area_id
                    ? data.areaList[props.restaurant.area_id].name
                    : "エリア未設定"}
            </p>
            <div className="flex">
                <p className={styles.price}>
                    {props.restaurant.price_min != null
                        ? props.restaurant.price_min
                        : "-"}
                </p>
                <p className={styles.price}>円～</p>
                <p className={styles.price}>
                    {props.restaurant.price_max != null
                        ? props.restaurant.price_max
                        : "-"}
                </p>
                <p className={styles.price}>円</p>
            </div>
        </div>
    );
};

export default BasicInfo;
