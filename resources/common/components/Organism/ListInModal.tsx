import React from "react";

// Styles
import styles from "./../../../common/styles/Modal.module.scss";

// etc.
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";

type PROPS = {
    listData: { id: number; name: string }[];
    route: string;
    dataTemplate: { [key: string]: number[] | null };
    keyName: string;
};

const ListInModal: React.FC<PROPS> = (props) => {
    return (
        // TODO:Swiperによるスライド化
        <div
            className={classNames(
                // styles.component,
                "flex flex-col items-center",
                "w-[90%] h-[75%] m-auto mt-2",
                "border-[2px]",
                "overflow-y-auto",                
            )}
        >
            {props.listData.map((category, index) => {
                const data = {
                    ...props.dataTemplate,
                    [props.keyName]: [category.id],
                };

                return (
                    <Link
                        key={index}
                        className={classNames(
                            "flex items-center justify-center flex-shrink-0",
                            "w-[100%] h-[40px]",
                            { "border-t": index !== 0 }
                        )}
                        href={route(props.route)}
                        data={data}
                    >
                        {category.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default ListInModal;
