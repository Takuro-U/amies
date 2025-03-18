import React from "react";

import { Menu } from "../../../../../../../types/gourmet";

const extensions = ["", ".jpg", ".png"];

const Description: React.FC<Menu> = (menu) => {
    return (
        <div
            className="px-5 overflow-y-scroll"
            style={{ height: "calc(100% - 9px)" }}
        >
            <div
                className="relative flex justify-center my-1"
                style={{
                    backgroundImage: `${
                        menu.extension !== 0
                            ? `/upload_images/gormet/menus/${menu.parent_id}/${
                                  menu.category_id
                              }/${menu.id}.${extensions[menu.extension]}`
                            : "/images/common/no_image.png"
                    }`,
                }}
            >
                <div className="absolute bg-white opacity-30 w-full h-full"></div>
                <img
                    src={
                        menu.extension !== 0
                            ? `/uploaded_images/gourmet/menus/${
                                  menu.parent_id
                              }/${menu.category_id}/${menu.index}${
                                  extensions[menu.extension]
                              }`
                            : "/images/common/no_image.png"
                    }
                    className="w-[50%] z-20"
                />
            </div>
            <p className="font-gourmet underline">
                {menu.name}+ドリンクバー付き【学生限定】
            </p>
            <p className="flex justify-end text-[20px] font-semibold">
                {menu.price}円
            </p>
            <p className="text-[16px] mt-1 mb-2 border-y py-1">
                {menu.description}
            </p>
        </div>
    );
};

export default Description;
