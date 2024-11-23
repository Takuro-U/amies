import React from "react";

// Component
import MenuLink from "../Organism/MenuLink";

// Types
import { MenuLinkType } from "../../../types/types";

// etc.
import { Drawer } from "flowbite-react";

type PROPS = {
    menuLinks: MenuLinkType[];
    isOpen: boolean;
    onClose: () => void;
};

const ResponsiveMenu: React.FC<PROPS> = (props) => {
    return (
        <Drawer
            open={props.isOpen}
            onClose={props.onClose}
            position="right"
            className="w-1/2 top-16 bg-opacity-95"
            theme={{
                root: {
                    backdrop: "fixed inset-0 z-30 bg-white bg-opacity-50",
                },
            }}
        >
            <h1 className="italic font-bold text-neutral-600 text-lg">#Menu</h1>
            <hr />
            <nav>
                {props.menuLinks.map((link, index) => (
                    <MenuLink key={index} link={link} />
                ))}
            </nav>
        </Drawer>
    );
};

export default ResponsiveMenu;
