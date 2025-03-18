import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { DetailRestaurantData } from "../../../../types/gourmet";

import data from "../../../../../storage/app/data.json";
import { DefaultHour, OpeningHour } from "../../../../types/gourmet";

type PROPS = {
    restaurant: DetailRestaurantData;
    relation: { id: number; restaurant_id: number; genre_id: number }[];
    hours: {
        defaultWeek: DefaultHour[];
        quarterlyHour: { month: number; hours: OpeningHour[] }[];
    };
};

const RowLayout: React.FC<{ title: string; children: React.ReactNode }> = (
    props
) => {
    return (
        <div className="flex w-full py-1">
            <div className="w-[33%]">
                <p className="text-[15px] px-1">{props.title}</p>
            </div>
            <div className="w-[67%] px-1">{props.children}</div>
        </div>
    );
};

const HourInfo: React.FC<{
    index: number;
    open: string;
    close: string;
    refs: { [key: string]: LegacyRef<HTMLParagraphElement>[] };
}> = (props) => {
    const removeSeconds = (timeString: string) => {
        return timeString.replace(/:(\d{2})$/, "").replace(/^0(\d)/, "$1");
    };
    return (
        <div className="flex">
            <p
                ref={props.refs.open[props.index]}
                className="text-[15px]"
                style={{
                    textAlign: props.open ? "right" : "center",
                }}
            >
                {props.open ? removeSeconds(props.open) : "--"}
            </p>
            <p className="text-[15px]"> &nbsp;～&nbsp;</p>
            <p
                ref={props.refs.close[props.index]}
                className="text-[15px]"
                style={{
                    textAlign: props.close ? "right" : "center",
                }}
            >
                {props.close ? removeSeconds(props.close) : "--"}
            </p>
        </div>
    );
};

const Details: React.FC<PROPS> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const longTextRef = useRef<HTMLDivElement>(null);
    const timeStringRef = {
        open: Array.from({ length: 14 }, () => useRef<HTMLDivElement>(null)),
        close: Array.from({ length: 14 }, () => useRef<HTMLDivElement>(null)),
    };

    const dayStrings = ["日", "月", "火", "水", "木", "金", "土"];

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

    const alignWidth = (refs: any[]) => {
        const widths = refs.map((ref) => ref.current?.offsetWidth || 0);
        const maxWidth = Math.max(...widths);
        refs.forEach((ref) => {
            if (ref.current) {
                ref.current.style.width = `${maxWidth}px`;
            }
        });
    };

    const haveUnknownHour = () => {
        const week = props.hours.defaultWeek;
        for (let i = 0; i < week.length; i++) {
            if (week[i].is_open && !week[i].open && !week[i].close) {
                console.log("exist");
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        checkOverFlowing();
        alignWidth(timeStringRef.open);
        alignWidth(timeStringRef.close);
    }, [isOpen]);

    return (
        <div
            className="py-[25px]"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
        >
            <div className="mx-[7%] border-y-2 border-[#e2e1dd] bg-white">
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
                        <RowLayout title="営業時間">
                            {props.hours.defaultWeek.map((day, index) => (
                                <div key={index} className="flex items-start">
                                    <p className="text-[15px]">
                                        {dayStrings[index]}&nbsp;&nbsp;
                                    </p>
                                    {day.is_open == null ? (
                                        <p className="text-[15px]">ー</p>
                                    ) : (
                                        <>
                                            {day.is_open == 1 ? (
                                                <>
                                                    {!day.open && !day.close ? (
                                                        <p className="text-[15px]">
                                                            営業日※
                                                        </p>
                                                    ) : (
                                                        <div>
                                                            <HourInfo
                                                                index={index}
                                                                open={day.open}
                                                                close={
                                                                    day.close
                                                                }
                                                                refs={
                                                                    timeStringRef
                                                                }
                                                            />
                                                            {(day.open2 ||
                                                                day.close2) && (
                                                                <HourInfo
                                                                    index={
                                                                        index +
                                                                        7
                                                                    }
                                                                    open={
                                                                        day.open2
                                                                    }
                                                                    close={
                                                                        day.close2
                                                                    }
                                                                    refs={
                                                                        timeStringRef
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <p className="text-[15px] text-center">
                                                    定休日
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                            {haveUnknownHour() && (
                                <p className="text-[14px] mt-1">
                                    ※営業時間は店舗HPやSNS,
                                    お電話などでご確認ください
                                </p>
                            )}
                        </RowLayout>

                        <RowLayout title="予約">
                            <p className="text-[15px]">
                                {props.restaurant.reservation}
                            </p>
                        </RowLayout>
                        <RowLayout title="駐車場">
                            <p className="text-[15px]">
                                {props.restaurant.parking}
                            </p>
                        </RowLayout>
                        <RowLayout title="禁煙/喫煙">
                            <p className="text-[15px]">
                                {props.restaurant.smoking}
                            </p>
                        </RowLayout>
                    </>
                )}
                <button
                    className="w-full py-1 text-[15px] font-gourmet text-slate-800 bg-slate-50"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? "▲閉じる" : "▼もっと見る"}
                </button>
            </div>
        </div>
    );
};

export default Details;
