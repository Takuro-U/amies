import React from "react";

// Types
import { Category } from "../../../../types/common";

// Modules
import classNames from "classnames";

interface CheckContentProps extends Category {
    isChecked: boolean;
    toggleCheck: () => void;
}

type PROPS = CheckContentProps;

const CheckContent: React.FC<PROPS> = (props) => {
    return (
        <div
            className={classNames("flex items-center", "mr-[15px]", {
                "ml-[10px]": props.id === 11111,
            })}
        >
            <label className="whitespace-nowrap cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={props.isChecked}
                    onChange={props.toggleCheck}
                    className="relative bottom-[2px] mr-1 rounded-sm cursor-pointer"
                />
                {props.name}
            </label>
        </div>
    );
};

export default CheckContent;
