import React from "react";

//styles
import styles from "./../../styles/ResponsiveMenu.module.scss";

// Component
import MenuLink from "../Organism/MenuLink";
import AuthInfo from "../Organism/AuthInfo";

// Types
import { MenuLinkType } from "../../../types/common";

// etc.
import { Drawer } from "flowbite-react";
import classNames from "classnames";

type PROPS = {
    menuLinks: MenuLinkType[];
    isOpen: boolean;
    onClose: () => void;
};

const ResponsiveMenu: React.FC<PROPS> = (props) => {
    const { AuthInfoMenu } = AuthInfo;

    return (
        <Drawer
            open={props.isOpen}
            onClose={props.onClose}
            position="right"
            className={classNames("w-1/2 top-16 bg-opacity-95", styles.drawer)}
            theme={{
                root: {
                    backdrop: "fixed inset-0 z-30 bg-white bg-opacity-50",
                },
            }}
        >
            <div className={styles.authInfo}>
                <h1 className="italic font-bold text-neutral-600 text-lg">
                    #AuthInfo
                </h1>
                <hr />
                <nav>
                    <AuthInfoMenu />
                </nav>
            </div>
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
