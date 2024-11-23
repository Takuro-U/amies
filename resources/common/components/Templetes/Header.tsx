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

    return (
        <>
            <header className="w-full h-16 bg-white px-1 py-2 text-black flex justify-between sticky top-0 shadow-sm shadow-slate-700 z-40">
                <Link href="/">
                    <span className="text-2xl italic font-semibold text-neutral-600">
                        AMie's
                    </span>
                    <br />
                    <span className="text-sm text-slate-800 leading-3">
                        ~Find your Amusement~
                    </span>
                </Link>
                <div className="flex">
                    <nav className={styles.authInfo}>
                        <AuthInfo />
                    </nav>
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
