import React from "react";

// Type
import { MenuLinkType } from "../../../types/types";

// etc.
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

type PROPS = {
    link: MenuLinkType;
};

const MenuLink: React.FC<PROPS> = (props) => {
    return (
        <Link href={route(props.link.route)}>
            <div
                className={
                    "border-b border-neutral-400 px-3 py-1 mx-1 " +
                    (route().current() === props.link.route
                        ? "bg-gray-200"
                        : "")
                }
            >
                {props.link.label}
            </div>
        </Link>
    );
};

export default MenuLink;
