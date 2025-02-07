import React, { useEffect, useState, useRef } from "react";

// styles
import styles from "./../../../../styles/Restaurant.module.scss";
import { gourmetColors } from "../../../../../../util/styles/_variables";

// components
import { Menu } from "../../../../../../types/gourmet";

// custom-hooks
import { usePageStatesContext } from "../../../../../../hooks/PageStatesProvider";
import { useModalContext } from "../../../../../../hooks/ModalProvider";

// modules
import classNames from "classnames";
import MenuCard from "./MenuCard/MenuCard";

const Menues: React.FC = () => {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [scrollBar, setScrollBar] = useState({
        size: 0,
        top: 0,
    });

    const { pageStates } = usePageStatesContext();
    const { openModal } = useModalContext();

    const scrollRef = useRef<HTMLDivElement>(null);

    const categories = ["コース", "料理", "ドリンク"];

    const changeCategory = (newCategory: number) => {
        if (currentCategory != newCategory) {
            updateRendering(newCategory);
            setCurrentCategory(newCategory);
        }
    };

    const updateRendering = (category: number) => {
        if (scrollRef.current) {
            const { clientHeight } = scrollRef.current;
            setScrollBar({
                size:
                    (clientHeight /
                        pageStates.pageProps.menus[category]?.length) |
                    0,
                top: 0,
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setScrollBar((prev) => ({
                ...prev,
                top: (scrollTop / scrollHeight) * clientHeight,
            }));
        }
    };

    useEffect(() => {
        for (let i = 0; i < categories.length; i++) {
            if (pageStates.pageProps.menus[i]) {
                setCurrentCategory(i);
                updateRendering(i);
                return;
            }
        }
    }, []);

    return (
        <div>
            <div className="flex items-center justify-center py-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => changeCategory(index)}
                        className={classNames(
                            "text-[16px] font-semibold text-slate-800",
                            "px-2 mx-3",
                            `border-b-2 border-${
                                index == currentCategory
                                    ? "[" + gourmetColors.orange + "]"
                                    : "transparent"
                            }`
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="relative">
                <div
                    className="absolute right-0 h-full w-[6px] bg-black opacity-55"
                    style={{
                        top: scrollBar.top,
                        height: scrollBar.size,
                    }}
                ></div>
                <div
                    key={currentCategory}
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className={classNames(
                        styles.menusScroll,
                        "flex flex-col items-center",
                        "h-[170px] bg-slate-100"
                    )}
                >
                    {pageStates.pageProps.menus[currentCategory] ? (
                        <>
                            {pageStates.pageProps.menus[currentCategory].map(
                                (menu: Menu, index: number) => (
                                    <MenuCard key={index} {...menu} />
                                )
                            )}
                        </>
                    ) : (
                        <p>該当するメニューはありません</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menues;
