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
            className={classNames("flex items-center", "mr-[10px]", {
                "ml-[10px]": props.id === 11111,
            })}
        >
            <input
                type="checkbox"
                checked={props.isChecked}
                onChange={props.toggleCheck}
            />
            <p className="whitespace-nowrap">{props.name}</p>
        </div>
    );
};

export default CheckContent;
