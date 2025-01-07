import React, { useState } from "react";

// Styles
import styles from "./../../styles/Modal.module.scss";

// ect.
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";

type PROPS = {
    unit: string;
    isRange: boolean;
    route: string;
    dataTemplate: {
        [key: string]: number | { max: number; min: number } | null;
    };
    keyName: string;
};

//入力フォームのテンプレ(このファイル内のみ)
const InputComponent: React.FC<{
    className: string;
    function: (e: React.ChangeEvent<HTMLInputElement>, status: string) => void;
    status: string;
    unit: string;
}> = (props) => {
    return (
        <div className={classNames(props.className, "flex items-center")}>
            <input
                className={classNames("w-full h-full", "rounded-[5px]")}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    props.function(e, props.status)
                }
            />
            <p className="w-0">{props.unit}</p>
        </div>
    );
};

//メインのコンポーネント
const NumberSelectorInModal: React.FC<PROPS> = (props) => {
    const [number, setNumber] = useState<number | null>(null);
    const [range, setRange] = useState<{
        max: number | null;
        min: number | null;
    }>({ max: null, min: null });

    //stateの更新を効率的に呼び出すイベントハンドラ
    const handleUpdateState = (
        e: React.ChangeEvent<HTMLInputElement>,
        status: string
    ) => {
        if (status == "number") {
            setNumber(Number(e.target.value));
        } else if (status == "max") {
            setRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
            }));
        } else if (status == "min") {
            setRange((prev) => ({
                ...prev,
                min: Number(e.target.value),
            }));
        }
    };

    return (
        <div
            className={classNames(
                styles.component,
                "flex items-center justify-center",
                "w-[90%] h-[70%]"
            )}
        >
            {!props.isRange ? (
                <InputComponent
                    className="w-[40%] h-[40px]"
                    function={handleUpdateState}
                    status="number"
                    unit={props.unit}
                />
            ) : (
                <>
                    <InputComponent
                        className={classNames("w-[30%]")}
                        function={handleUpdateState}
                        status="max"
                        unit={props.unit}
                    />
                    <p className="w-[35px] flex justify-end mr-1">～</p>
                    <InputComponent
                        className={classNames("w-[30%]")}
                        function={handleUpdateState}
                        status="min"
                        unit={props.unit}
                    />
                </>
            )}
            <Link
                className={classNames(
                    "absolute top-[95%] left-[50%]",
                    "-translate-x-[50%] -translate-y-[50%]",
                    "flex items-center justify-center",
                    "bg-black text-white",
                    "w-[90px] h-[40px]",
                    "rounded-[5px]"
                )}
                href={route(props.route)}
                data={{ [props.keyName]: props.isRange ? range : number }}
            >
                検索
            </Link>
        </div>
    );
};

export default NumberSelectorInModal;
