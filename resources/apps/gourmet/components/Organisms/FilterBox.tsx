import React, { useLayoutEffect, useRef, useState } from "react";

// Component
import CheckContent from "../Molecules/CheckContent";

// Types
import { Category } from "../../../../types/common";

// JSON
import data from "../../../../../storage/app/data.json";

// Modules
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";

interface CheckContentProps extends Category {
    isChecked: boolean;
}

const FilterBox: React.FC = () => {
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
        <div className="w-[90%] border pl-[5px]">
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
                <div className="flex items-center overflow-x-auto scrollbar-hide">
                    {checkLists.area?.map((element) => (
                        <CheckContent
                            key={element.id}
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
                    ))}
                </div>
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
                <div className="flex items-center overflow-x-auto scrollbar-hide">
                    {checkLists.genre?.map((element) => (
                        <CheckContent
                            key={element.id}
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
                    ))}
                </div>
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
                />
                <p>円～</p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
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
