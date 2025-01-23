import React, { useEffect, useRef, useState } from "react";
import { DetailRestaurantData } from "../../../../types/gourmet";

import data from "../../../../../storage/app/data.json";

type PROPS = {
    restaurant: DetailRestaurantData;
    relation: { id: number; restaurant_id: number; genre_id: number }[];
};

const RowLayout: React.FC<{ title: string; children: React.ReactNode }> = (
    props
) => {
    return (
        <div className="flex w-full border-b border-slate-500 py-1">
            <div className="w-[33%]">
                <p className="text-[15px] px-1">{props.title}</p>
            </div>
            <div className="w-[67%] px-1">{props.children}</div>
        </div>
    );
};

const Details: React.FC<PROPS> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const longTextRef = useRef<HTMLDivElement>(null);

    const selectedGenres = (restaurant_id: number) => {
        const genres = props.relation
            .filter((relation) => relation.restaurant_id === restaurant_id)
            .map((element) => element.genre_id);
        return genres;
    };

    const checkOverFlowing = () => {
        const content = longTextRef.current;
        if (content) {
            setIsOverflowing(content.scrollHeight > content.clientHeight);
        }
    };

    useEffect(() => {
        checkOverFlowing();
    }, [isOpen]);

    return (
        <div className="mx-[7%] my-[25px] border-t border-slate-500">
            <RowLayout title="ジャンル">
                <p className="text-[15px]">
                    {selectedGenres(props.restaurant.id)
                        .map((id) => data.genreList[id].name)
                        .join("/")}
                </p>
            </RowLayout>
            <RowLayout title="エリア">
                <p className="text-[15px]">
                    {data.areaList[props.restaurant.area_id].name}
                </p>
            </RowLayout>
            <RowLayout title="予算">
                <div className="flex">
                    <p className="text-[15px]">
                        {props.restaurant.price_min != null
                            ? props.restaurant.price_min
                            : "-"}
                        円～
                        {props.restaurant.price_max != null
                            ? props.restaurant.price_max
                            : "-"}
                        円
                    </p>
                </div>
            </RowLayout>
            <RowLayout title="最大団体人数">
                <p className="text-[15px]">{props.restaurant.capacity}人</p>
            </RowLayout>
            <RowLayout title="詳細">
                <div className="relative">
                    <p
                        className="text-[15px]"
                        ref={longTextRef}
                        style={
                            isOpen
                                ? {}
                                : {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                  }
                        }
                    >
                        これはテストです．
                        非常にテストですが，とてもテストでもあります．また，一部ではテストをテストとする文化があり，これは大変テストなものだと考えます．
                    </p>
                    {isOverflowing && (
                        <div
                            className="absolute top-0 w-full h-full"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 50% )",
                            }}
                        ></div>
                    )}
                </div>
            </RowLayout>
            {isOpen && (
                <>
                    <RowLayout title="駐車場">
                        <></>
                    </RowLayout>
                    <RowLayout title="禁煙/喫煙">
                        <></>
                    </RowLayout>
                    <RowLayout title="貸切">
                        <></>
                    </RowLayout>
                </>
            )}
            <button
                className="w-full py-1 text-[15px] bg-slate-50 border-b border-slate-500"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? "▲閉じる" : "▼もっと見る"}
            </button>
        </div>
    );
};

export default Details;
