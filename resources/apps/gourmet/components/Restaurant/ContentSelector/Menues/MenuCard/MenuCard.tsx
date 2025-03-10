import React from "react";

import Description from "./Description";

import { Menu } from "../../../../../../../types/gourmet";

import { gourmetColors } from "../../../../../../../util/styles/_variables";

import classNames from "classnames";
import { useModalContext } from "../../../../../../../hooks/ModalProvider";

const MenuCard: React.FC<Menu> = (menu) => {
    const { openModal } = useModalContext();

    const extensions = ["", ".jpg", ".png"];

    return (
        <div
            className="flex items-start w-[90%] h-[140px] my-[15px] bg-white"
            style={{
                borderTop: `solid 2px ${gourmetColors.fill}`,
                borderBottom: `solid 2px ${gourmetColors.fill}`,
            }}
        >
            <img
                src={
                    menu.extension !== 0
                        ? `/upload_images/gormet/menus/${menu.parent_id}/${
                              menu.category_id
                          }/${menu.id}.${extensions[menu.extension]}`
                        : "/images/common/no_image.png"
                }
                className="h-full aspect-1"
            />
            <div
                className="flex flex-col h-full px-2"
                style={{
                    width: "calc(100% - 140px)",
                }}
            >
                <p
                    className={classNames(
                        "font-gourmet text-[18px]",
                        "w-full pt-1",
                        "overflow-hidden whitespace-nowrap"
                    )}
                    style={{
                        textOverflow: "ellipsis",
                    }}
                >
                    {menu.name}
                </p>
                <p className="text-[17px] mx-[1px] font-semibold">
                    {menu.price}円
                </p>
                <p
                    className="text-[14px] ml-[1px]"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {menu.description}
                </p>
                <button
                    className="text-[16px] m-1 w-ful border"
                    onClick={() =>
                        openModal({
                            title: "メニュー詳細",
                            coreFunction: () => {},
                            classNames: {
                                title: classNames(
                                    "font-main",
                                    "before:text-transparent",
                                    "before:bg-[url('/images/gourmet/menu_icon.svg')] before:bg-no-repeat before:bg-contain"
                                ),
                                hr: "border-0",
                            },
                            Component: Description,
                            componentProps: { ...menu },
                        })
                    }
                >
                    詳細
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
