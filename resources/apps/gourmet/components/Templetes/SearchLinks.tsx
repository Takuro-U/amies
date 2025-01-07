import React from "react";

// Styles
import styles from "./../../../gourmet/styles/Gourmet.module.scss";

// Custom-Hooks
import { useModalContext } from "../../../../hooks/ModalProvider";

// Modules
import classNames from "classnames";

// Utilities.
import { searchLinkList } from "../../ts/list";

const SearchLinks: React.FC = () => {
    const { openModal } = useModalContext();
    return (
        <div className={styles.searchLinks}>
            <div
                className={classNames(
                    "flex flex-col items-center",
                    "w-[90%]",
                    "bg-slate-100"
                )}
            >
                {searchLinkList.map((link, index) => (
                    // 簡易検索子要素 TODO:背景にイメージを挿入
                    <button
                        className={classNames(
                            "w-[60%] h-[50px]",
                            "border bg-slate-300",
                            "mb-[25px]",
                            { "mt-[25px]": index === 0 }
                        )}
                        key={index}
                        onClick={() =>
                            openModal({
                                text: "",
                                coreFunction: () => {},
                                Component: link.Component,
                                componentProps: link.componentProps,
                            })
                        }
                        style={{ backgroundImage: link.imgPath }}
                    >
                        {link.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchLinks;
