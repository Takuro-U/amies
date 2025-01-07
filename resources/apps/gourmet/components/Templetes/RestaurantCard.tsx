import React from "react";

import { RestaurantData } from "../../../../types/gourmet";

import data from "./../../../../../storage/app/data.json";

type PROPS = {
    restaurant: RestaurantData;
};

const RestaurantCard: React.FC<PROPS> = (props) => {
    return (
        <div className="w-[90%] mb-[20px] bg-slate-200">
            <p className="ml-[2%] mt-[2%] leading-[100%] items-end p-0 text-[4vw]">
                {props.restaurant.name}
            </p>
            <div className="flex aspect-[5/2]">
                <div className="flex items-center justify-center w-[40%]">
                    <img className="w-[90%] h-[90%]" />
                </div>
                <div className="flex items-center justify-center w-[60%]">
                    <div className="w-[90%] h-[90%]">
                        <div className="flex">
                            {" "}
                            <p className="text-[3.7vw]">
                                {props.restaurant.price_min != null
                                    ? props.restaurant.price_min
                                    : "-"}
                            </p>
                            <p className="text-[3.7vw]">円～</p>
                            <p className="text-[3.7vw]">
                                {props.restaurant.price_max != null
                                    ? props.restaurant.price_max
                                    : "-"}
                            </p>
                            <p className="text-[3.7vw]">円</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
