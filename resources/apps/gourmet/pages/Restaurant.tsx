import React, { useEffect } from "react";

import styles from "./../styles/Restaurant.module.scss";

import { DetailRestaurantData } from "../../../types/gourmet";

import classNames from "classnames";
import Details from "../components/Restaurant/Details";
import ContentSelector from "../components/Restaurant/ContentSelector/ContentSelector";

type PROPS = {
    restaurant: DetailRestaurantData;
    relation: { id: number; restaurant_id: number; genre_id: number }[];
};

const Restaurant: React.FC<PROPS> = (props) => {
    useEffect(() => {
        console.log(props.restaurant);
    });
    return (
        <div>
            {/* イメージ写真 */}
            <div className="relative">
                <img
                    className="w-full aspect-[16/9] object-cover"
                    src="/images/gourmet/background.jpg"
                />
                <p
                    className={classNames(
                        "font-gourmet text-[22px]",
                        "absolute bottom-[-1px]",
                        "w-full px-[2%] pt-[10px]",
                        "border-b border-slate-600",
                        "overflow-hidden whitespace-nowrap"
                    )}
                    style={{
                        textOverflow: "ellipsis",
                        background:
                            "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.85) 65%, rgba(255, 255, 255, 0) )",
                    }}
                >
                    {props.restaurant.name}
                </p>
            </div>
            {/* Info */}
            <Details restaurant={props.restaurant} relation={props.relation} />
            {/* メニュー&マップ&カレンダー$口コミ */}
            <ContentSelector />
        </div>
    );
};

export default Restaurant;
