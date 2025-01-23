import React from "react";

import { WeeklyHours } from "../../../../../../types/gourmet";

type PROPS = {
    hours: WeeklyHours[];
};

const WeeklyCalendar: React.FC<PROPS> = (props) => {
    const convertDateToString = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${parseInt(month, 10)}/${parseInt(day, 10)}`;
    };

    return (
        <div className="flex mt-[2%] bg-white">
            {props.hours?.map((element, index) => (
                <div key={index} className="flex flex-col flex-1">
                    <p className="text-[4vw] text-center">
                        {convertDateToString(element.date)}
                    </p>
                    {element.is_open != null ? (
                        <>
                            {element.is_open == 1 ? (
                                <p className="text-center font-medium text-blue-500">
                                    営
                                </p>
                            ) : (
                                <p className="text-center font-medium  text-red-500">
                                    休
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-center font-medium text-green-500">
                            ？
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WeeklyCalendar;
