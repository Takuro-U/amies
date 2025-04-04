import React from "react";

// Styles
import styles from "./../../../gourmet/styles/Gourmet.module.scss";

// Custom-Hooks
import { useModalContext } from "../../../../hooks/ModalProvider";

// Modules
import classNamesJoin from "classnames"; //競合によりJoinを追加

// Utilities.
import { searchLinkList, SearchLinkItem } from "../../ts/list";

const SearchLinks: React.FC = () => {
    const { openModal } = useModalContext();

    const handleOpenModal = async (link: SearchLinkItem) => {
        let componentProps = link.componentProps;

        if (link.getData && typeof link.getData === "function") {
            try {
                componentProps = await link.getData();
            } catch (error) {
                console.error("Error fetching data for modal:", error);
            }
        }

        openModal({
            title: link.title,
            classNames: link.classNames,
            coreFunction: () => {},
            Component: link.Component,
            componentProps: componentProps,
        });
    };

    return (
        <div className={styles.searchLinks}>
            <div
                className={classNamesJoin(
                    "flex flex-col items-center",
                    "w-full"
                )}
            >
                {(searchLinkList as SearchLinkItem[]).map((link, index) => (
                    <div
                        className={classNamesJoin(
                            "w-[70%] h-[60px]",
                            "bg-white rounded-sm",
                            "mb-[25px]",
                            { "mt-[25px]": index === 0 },
                            "flex justify-center items-center overflow-hidden",
                            "hover:scale-105 transition-transform"
                        )}
                        key={index}
                        onClick={() => handleOpenModal(link)}
                    >
                        <img
                            src={link.imgPath}
                            className={classNamesJoin(
                                "object-cover w-full",
                                "opacity-50"
                            )}
                        />
                        <label
                            className={classNamesJoin(
                                "absolute",
                                "text-slate-600 font-bold",
                                styles.searchLink
                            )}
                        >
                            {link.title}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchLinks;
