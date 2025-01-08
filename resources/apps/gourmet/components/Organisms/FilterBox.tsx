import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// Component
import CheckContent from "../Molecules/CheckContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";

// Types
import { Category } from "../../../../types/common";

// JSON
import data from "../../../../../storage/app/data.json";

// Modules
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";

// Styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "../../styles/scrollbar.css"; //スクロールバーのスタイルを上書き

// Animation
import animation from "../../styles/animation.module.scss";

type Props = {
    isOpen: boolean,
}

interface CheckContentProps extends Category {
    isChecked: boolean;
}

const FilterBox: React.FC<Props> = (prop) => {
    const [height, setHeight] = useState<string>("0px");

    useEffect(()=>{
        setHeight(prop.isOpen ? "240px" : "0px");
    }, [prop.isOpen]);

    const [maxWidth, setMaxWidth] = useState(0);
    const [checkLists, setCheckLists] = useState<{
        [key: string]: CheckContentProps[];
    }>({
        area: data.areaList.map((element) => ({
            ...element,
            isChecked: false,
        })),
        genre: data.genreList.map((element) => ({
            ...element,
            isChecked: false,
        })),
    });
    const [priceRange, setPriceRange] = useState<{
        max: number | null;
        min: number | null;
    }>({ max: null, min: null });
    const [customers, setCustomers] = useState<number | null>(null);

    const elementsRef = useRef<HTMLDivElement[]>([]);

    const setRef = (index: number) => (element: HTMLDivElement) => {
        elementsRef.current[index] = element;
    };

    const selectMaxWidth = () => {
        const widths = elementsRef.current.map((element) =>
            element ? element.getBoundingClientRect().width : 0
        );
        setMaxWidth(Math.max(...widths));
    };

    const toggleCheck = (p: { key: string; id: number }) => {
        setCheckLists((prev) => {
            return {
                ...prev,
                [p.key]: prev[p.key].map((element) =>
                    element.id === p.id
                        ? { ...element, isChecked: !element.isChecked }
                        : element
                ),
            };
        });
    };

    useLayoutEffect(() => {
        selectMaxWidth();
    }, []);

    return (
        <div className={classNames(animation.drawer, "w-full border pl-[5px]", "overflow-hidden")} style={{height: height}}>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(0)}
                    className="whitespace-nowrap text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : 0,
                        flexShrink: 0,
                    }}
                >
                    エリア：
                </p>
                <Swiper
                    className="flex items-center overflow-x-auto h-8 relative top-1"
                    slidesPerView={ "auto" } 
                    modules={[ Scrollbar, FreeMode ]}
                    freeMode={ true }
                    scrollbar={{draggable: false}}
                >
                    {checkLists.area?.map((element) => (
                        <SwiperSlide key={element.id} style={{width: "auto"}}>
                            <CheckContent
                                id={element.id}
                                name={element.name}
                                isChecked={element.isChecked}
                                toggleCheck={() =>
                                    toggleCheck({
                                        key: "area",
                                        id: element.id,
                                    })
                                }
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(1)}
                    className="whitespace-nowrap text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    ジャンル：
                </p>
                <Swiper
                    className="flex items-center overflow-x-auto h-8 relative top-1"
                    slidesPerView={ "auto" }
                    modules={[ Scrollbar, FreeMode ]}
                    freeMode={ true }
                    scrollbar={{draggable: false}}
                >
                    {checkLists.genre?.map((element) => (
                        <SwiperSlide key={element.id} style={{width: "auto"}}>
                            <CheckContent
                                id={element.id}
                                name={element.name}
                                isChecked={element.isChecked}
                                toggleCheck={() =>
                                    toggleCheck({
                                        key: "genre",
                                        id: element.id,
                                    })
                                }
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(2)}
                    className="text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    価格帯：
                </p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>円～</p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>円</p>
            </div>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(3)}
                    className="text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    人数：
                </p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>人</p>
            </div>
            <div className="flex items-center justify-center h-[60px]">
                <Link
                    className={classNames(
                        "flex items-center justify-center",
                        "w-[70px] h-[55%]",
                        "rounded-[5px] mb-[10px]",
                        "bg-slate-950 text-white"
                    )}
                    href={route("/gourmet/search")}
                    data={{
                        areas: checkLists.area
                            .filter((element) => element.isChecked)
                            .map((element) => element.id),
                        genres: checkLists.genre
                            .filter((element) => element.isChecked)
                            .map((element) => element.id),
                        price: priceRange,
                        customers: customers,
                    }}
                >
                    検索
                </Link>
            </div>
        </div>
    );
};

export default FilterBox;
