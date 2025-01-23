import React, { useState, useEffect } from "react";

// styles
import styles from "./../../styles/Search.module.scss";

// mui
import { SkipNext, SkipPrevious } from "@mui/icons-material";

// types
import { BasicRestaurantData } from "../../../../types/gourmet";

// modules
import classNames from "classnames";

type PROPS = {
    result: BasicRestaurantData[][];
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Pagenations: React.FC<PROPS> = (props) => {
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
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        selectDisplayNumbers(props.result.length - 1, props.pageNumber);
    }, [props.pageNumber]);

    return (
        <div className={styles.pagenations}>
            <button
                className={styles.pageNumberBtn}
                onClick={() => props.setPageNumber(1)}
            >
                <SkipPrevious />
            </button>
            {displayNumbers?.map((number) => (
                <button
                    className={classNames(styles.pageNumberBtn, {
                        "bg-white rounded-full": number === props.pageNumber,
                    })}
                    key={number}
                    onClick={() => props.setPageNumber(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={styles.pageNumberBtn}
                onClick={() => props.setPageNumber(props.result.length - 1)}
            >
                <SkipNext />
            </button>
        </div>
    );
};

export default Pagenations;
