import React, { useEffect } from "react";

//styles
import styles from "./../../styles/ResponsiveMenu.module.scss";

// Component
import MenuLink from "../Organism/MenuLink";
import AuthInfo from "../Organism/AuthInfo";

// Types
import { MenuLinkType } from "../../../types/common";

// etc.
import classNames from "classnames";

type PROPS = {
    menuLinks: MenuLinkType[];
    isOpen: boolean;
    onClose: () => void;
};

const ResponsiveMenu: React.FC<PROPS> = (props) => {
    const { AuthInfoMenu } = AuthInfo;

    // 背景クリックでドロワーを閉じる
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    // ESCキーでドロワーを閉じる
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && props.isOpen) {
                props.onClose();
            }
        };

        if (props.isOpen) {
            document.addEventListener("keydown", handleEscKey);
            // ドロワー開いているときはスクロールを無効化
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "";
        };
    }, [props.isOpen, props.onClose]);

    return (
        <>
            {/* オーバーレイ背景 - アニメーション付き */}
            <div
                className={classNames(
                    "fixed inset-0 z-30 bg-white bg-opacity-50 transition-opacity duration-200",
                    props.isOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                )}
                onClick={handleBackdropClick}
            />

            {/* ドロワー本体 - スライドインアニメーション付き */}
            <div
                className={classNames(
                    "fixed top-16 right-0 h-full w-1/2 z-40 bg-white bg-opacity-95 shadow-lg transition-transform duration-200 ease-in-out",
                    props.isOpen ? "translate-x-0" : "translate-x-full",
                    styles.drawer
                )}
            >
                <div className="p-4 font-main">
                    <div className={styles.authInfo}>
                        <h1 className="italic font-bold text-neutral-600 text-lg">
                            #AuthInfo
                        </h1>
                        <hr />
                        <nav>
                            <AuthInfoMenu />
                        </nav>
                    </div>
                    <h1 className="italic font-bold text-neutral-600 text-lg">
                        #Menu
                    </h1>
                    <hr />
                    <nav>
                        {props.menuLinks.map((link, index) => (
                            <MenuLink
                                key={index}
                                link={link}
                                onClick={props.onClose}
                            /> //ドロワーのクローズ関数を渡してクリック時にドロワーをクローズ
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default ResponsiveMenu;
