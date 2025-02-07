import React from "react";

import { Menu } from "../../../../../../../types/gourmet";

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
                        menu.img_path
                            ? menu.img_path
                            : "url(/images/gourmet/oniku.jpg)"
                    }`,
                }}
            >
                <div className="absolute bg-white opacity-30 w-full h-full"></div>
                <img
                    src={
                        menu.img_path
                            ? menu.img_path
                            : "/images/gourmet/oniku.jpg"
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
