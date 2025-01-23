import React from "react";

// Type
import { MenuLinkType } from "../../../types/common";

// etc.
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

type PROPS = {
    link: MenuLinkType;
    onClick: () => void; //Linkを押したときに発火する関数
};

const MenuLink: React.FC<PROPS> = (props) => {
    const currentRoute = route().current();
    const isActive =
        currentRoute &&
        (props.link.route === "/"
            ? currentRoute === "/"
            : currentRoute.startsWith(props.link.route));

    return (
        <Link href={route(props.link.route)} onClick={props.onClick}>
            <div
                className={
                    "border-b border-neutral-400 px-3 py-1 mx-1 " +
                    (isActive ? "bg-gray-200" : "")
                }
            >
                {props.link.label}
            </div>
        </Link>
    );
};

export default MenuLink;
