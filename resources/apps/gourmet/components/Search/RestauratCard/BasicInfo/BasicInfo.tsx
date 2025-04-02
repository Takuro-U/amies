import React, { useEffect, useState } from "react";

import styles from "../../../../styles/Search.module.scss";

import {
    BasicRestaurantData,
    PublicData,
} from "../../../../../../types/gourmet";

import classNames from "classnames";

import { route } from "ziggy-js";

import { Link } from "@inertiajs/react";

type PROPS = {
    restaurant: BasicRestaurantData;
    genres: number[];
};

const BasicInfo: React.FC<PROPS> = (props) => {
    const [publicData, setPublicData] = useState<PublicData>({
        areaList: [],
        genreList: [],
    });

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setPublicData(data));
    }, []);

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
                {props.genres
                    .map((id) => publicData.genreList[id].name)
                    .join("/")}
            </p>
            <p className={styles.genreOrAreaName}>
                {
                    publicData.areaList.filter(
                        (element) => element.id === props.restaurant.area_id
                    )[0]?.name
                }
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
