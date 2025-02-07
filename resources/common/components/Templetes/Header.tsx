// React-Hooks
import React, { useState } from "react";

// CSS-Module
import styles from "./../../styles/Header.module.scss";

// Components
import AuthInfo from "../Organism/AuthInfo";
import ResponsiveMenu from "./ResponsiveMenu";

// TS
import { menuLinks } from "../../ts/router";

// etc.
import { Link } from "@inertiajs/react";
import classNames from "classnames";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { AuthInfoHeader } = AuthInfo;

    return (
        <>
            <header
                className={classNames(
                    "font-main",
                    "w-full h-16 bg-white px-1 py-2 text-black flex justify-between sticky top-0 shadow-sm shadow-slate-700 z-40"
                )}
            >
                <Link href="/" className="flex">
                    <div className="inline-flex h-full">
                        <img
                            src="../images/common/logo_480p.png"
                            className="object-contain h-full"
                        />
                    </div>
                    <p>
                        <span className="leading-6 text-3xl font-bold text-neutral-600">
                            AMie's
                        </span>
                        <br />
                        <span className="text-lg text-slate-800">
                            ~Find your Amusement~
                        </span>
                    </p>
                </Link>
                <div className="flex">
                    <div
                        className={classNames(
                            styles.authInfo,
                            "mr-5 flex items-center"
                        )}
                    >
                        <AuthInfoHeader />
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        className={classNames(
                            styles.menuBtn,
                            "text-xl my-auto cursor-pointer border border-neutral-600 w-8 h-8 mr-2 rounded-lg"
                        )}
                    >
                        ≡
                    </button>
                </div>
            </header>
            <ResponsiveMenu
                menuLinks={menuLinks}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            />
        </>
    );
};

export default Header;
