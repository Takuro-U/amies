import React, { useState } from "react";

// styles
import {
    accentColors,
    gourmetColors,
} from "../../../../../../util/styles/_variables";

// costum-hooks
import { usePageStatesContext } from "../../../../../../hooks/PageStatesProvider";

// types
import { OpeningHour } from "../../../../../../types/gourmet";

// modules
import classNames from "classnames";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// mui-icon
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Calender: React.FC = () => {
    const [monthId, setMonthId] = useState(0);
    const [tooltipStatus, setTooltipStatus] = useState<{
        display: number;
        isOpen: number | null;
        open: string | null;
        close: string | null;
    }>({
        display: 0,
        isOpen: null,
        open: null,
        close: null,
    });

    const { pageStates, setPageStates } = usePageStatesContext();
    const quarterlyHours = pageStates.pageProps.hours.quarterlyHours;

    const pagenate = (flag: 1 | -1) => {
        const newValue = monthId + flag;
        if (newValue >= 0 && newValue < quarterlyHours.length) {
            setMonthId(newValue);
        }
    };

    const removeSeconds = (timeString: string) => {
        return timeString.replace(/:(\d{2})$/, "");
    };

    const tiptoolText = (
        open: string,
        close: string,
        is_open: number | null
    ) => {
        if (is_open == null) {
            return <p>営業情報なし</p>;
        } else if (is_open == 0) {
            return <p>休業日</p>;
        } else if (is_open == 1) {
            const text = (
                <div>
                    <p>営業日</p>
                    {(open || close) && (
                        <p>
                            {(open ? removeSeconds(open) : "") +
                                "～" +
                                (close ? removeSeconds(close) : "")}
                        </p>
                    )}
                </div>
            );
            return text;
        }
    };

    const generateCalender = (days: OpeningHour[]) => {
        let currentWeek = 0;
        const result = Array.from({ length: 6 }, () => Array(7).fill(null));
        days.map((day) => {
            result[currentWeek][day.day_id] = day;
            if (day.day_id == 6) {
                currentWeek++;
            }
        });
        console.log(result);
        return result;
    };

    return (
        <div className="flex items-center justify-center mt-3 pb-8">
            <div className="w-[70%]">
                <div className="flex justify-between py-2">
                    <ChevronLeft onClick={() => pagenate(-1)} />
                    <p className="font-gourmet font-semibold">
                        {quarterlyHours[monthId].month}月
                    </p>
                    <ChevronRight onClick={() => pagenate(1)} />
                </div>
                {generateCalender(quarterlyHours[monthId].hours).map(
                    (week, index) => (
                        <div key={index} className="flex">
                            {week.map((day, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        "flex items-center justify-center flex-1",
                                        "aspect-1 rounded-lg m-[2px]"
                                    )}
                                    style={{
                                        background: day
                                            ? day.is_open == null
                                                ? gourmetColors.calender.null
                                                : day.is_open == 1
                                                ? gourmetColors.calender.open
                                                : gourmetColors.calender.close
                                            : "#e2e1dd",
                                    }}
                                >
                                    {day && (
                                        <Tippy
                                            content={tiptoolText(
                                                day.open,
                                                day.close,
                                                day.is_open
                                            )}
                                            theme="custom"
                                        >
                                            <p className="w-full text-[13px] text-center font-pop">
                                                {day
                                                    ? new Date(
                                                          day.date
                                                      ).getDate()
                                                    : ""}
                                            </p>
                                        </Tippy>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Calender;
