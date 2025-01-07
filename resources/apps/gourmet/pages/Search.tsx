import React, { useEffect, useState } from "react";

import styles from "./../styles/Gourmet.module.scss";

import { RestaurantData } from "../../../types/gourmet";

import classNames from "classnames";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import RestaurantCard from "../components/Templetes/RestaurantCard";

type PROPS = {
    result: RestaurantData[][];
};

const Search: React.FC<PROPS> = (props) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [displayNumbers, setDisplayNumbers] = useState<number[]>();

    const selectDisplayNumbers = (dataLength: number, pageNumber: number) => {
        let primalNumber;
        let size;
        if (dataLength < 4) {
            primalNumber = 1;
            size = dataLength;
        } else {
            if (pageNumber === 1) {
                primalNumber = 1;
            } else if (pageNumber === dataLength) {
                primalNumber = dataLength - 2;
            } else {
                primalNumber = pageNumber - 1;
            }
            size = 3;
        }
        const numberList = Array.from(
            { length: size },
            (_, i) => i + primalNumber
        );
        setDisplayNumbers(numberList);
    };

    useEffect(() => {
        selectDisplayNumbers(props.result.length - 1, pageNumber);
    }, [pageNumber]);

    useEffect(() => {
        console.log(props.result);
    }, []);

    return (
        <>
            <div className="flex items-center justify-center h-[50px]">
                <button
                    className={styles.pageNumberBtn}
                    onClick={() => setPageNumber(1)}
                >
                    <SkipPrevious />
                </button>
                {displayNumbers?.map((number) => (
                    <button
                        className={classNames(styles.pageNumberBtn, {
                            "bg-slate-200 rounded-full": number === pageNumber,
                        })}
                        key={number}
                        onClick={() => setPageNumber(number)}
                    >
                        {number}
                    </button>
                ))}
                <button
                    className={styles.pageNumberBtn}
                    onClick={() => setPageNumber(props.result.length - 1)}
                >
                    <SkipNext />
                </button>
            </div>
            <div className="flex flex-col items-center">
                {props.result[pageNumber].map((element) => (
                    <RestaurantCard key={element.id} restaurant={element} />
                ))}
            </div>
        </>
    );
};

export default Search;
