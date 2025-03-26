import React, { useState, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";

import { FirstPage, LastPage } from "@mui/icons-material";
import publicData from "../../../../storage/app/data.json";
import classNames from "classnames";

type keys = "id" | "name" | "email" | "coordinates" | "area_id" | "public";

type PROPS = {
    restaurants: (
        | {
              [key in keys]: string | number;
              //必要な項目以外も受取るとバリデーションが面倒
          }
        | null
    )[];
};

const RestaurantList: React.FC<PROPS> = (props) => {
    const [pageNumber, setPageNumber] = useState(1);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            restaurants: props.restaurants,
        });

    const chunkedList = (array: PROPS["restaurants"]) => {
        const chunkSize = 10;
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            // while (chunk.length < chunkSize) {
            //     chunk.push(null);
            // }
            result.push(chunk);
        }
        return result;
    };

    const pageNumbers = () => {
        const lastNumber = chunkedList(data.restaurants).length;
        if (lastNumber < 3) {
            return Array.from({ length: lastNumber }, (_, i) => i + 1);
        }
        if (pageNumber === 1) {
            return [1, 2, 3];
        }
        if (pageNumber === lastNumber) {
            return [lastNumber - 2, lastNumber - 1, lastNumber];
        }
        return [pageNumber - 1, pageNumber, pageNumber + 1];
    };

    const updateData = (id: number, key: keys, newValue: any) => {
        const newData = data.restaurants.map((element) => {
            if (element?.id === id) {
                return { ...element, [key]: newValue };
            }
            return element;
        });
        setData("restaurants", newData);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("/console/admin/restaurant-list"));
    };

    return (
        <div className="flex flex-col items-center min-h-[65vh]">
            <div className="flex my-3">
                <button onClick={() => setPageNumber(1)}>
                    <FirstPage />
                </button>
                {pageNumbers().map((element) => (
                    <button
                        key={element}
                        onClick={() => setPageNumber(element)}
                        className={classNames(
                            "flex justify-center items-center w-7 h-7 mx-[3px] rounded-md",
                            {
                                "bg-slate-700 text-white":
                                    element === pageNumber,
                                "bg-slate-300": element !== pageNumber,
                            }
                        )}
                    >
                        {element}
                    </button>
                ))}
                <button
                    onClick={() =>
                        setPageNumber(chunkedList(data.restaurants).length)
                    }
                >
                    <LastPage />
                </button>
            </div>

            <div className="flex flex-col items-center border w-[70vw]">
                {chunkedList(data.restaurants)[pageNumber - 1].map(
                    (restaurant, index) => (
                        <div
                            key={restaurant?.id}
                            className={classNames("w-full", {
                                "border-t": index !== 0,
                            })}
                        >
                            {restaurant ? (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center w-[50%]">
                                        <p className="w-[60%] pl-2 text-[14px] font-semibold truncate">
                                            {restaurant.name}
                                        </p>
                                        <p className="w-[40%] px-1 text-[12px] text-gray-500 truncate">
                                            {restaurant.email}
                                        </p>
                                    </div>
                                    <div className="flex items-center w-[50%] mr-2">
                                        <input
                                            type="text"
                                            placeholder="座標"
                                            className="border border-gray-300 text-[14px] rounded-md w-full h-[30px] mx-1"
                                            value={restaurant.coordinates}
                                            onChange={(e) =>
                                                updateData(
                                                    restaurant.id as number,
                                                    "coordinates",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <select
                                            className="border-none text-[14px] w-[270px] rounded-sm mx-1 my-2 p-0"
                                            value={restaurant.area_id}
                                            onChange={(e) =>
                                                updateData(
                                                    restaurant.id as number,
                                                    "area_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {publicData.areaList.map((area) => (
                                                <option
                                                    key={area.id}
                                                    value={area.id}
                                                    className="text-[14px]"
                                                >
                                                    {area.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className={`w-[140px] my-1 ml-1 px-2 py-1 rounded-md text-[16px] ${
                                                restaurant.public === 1
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}
                                            onClick={() => {
                                                const newValue =
                                                    restaurant.public === 0
                                                        ? 1
                                                        : 0;
                                                updateData(
                                                    restaurant.id as number,
                                                    "public",
                                                    newValue
                                                );
                                            }}
                                        >
                                            {restaurant.public === 1
                                                ? "公開"
                                                : "非公開"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
