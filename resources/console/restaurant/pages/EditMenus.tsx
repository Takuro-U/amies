import React, { useState, useEffect } from "react";
import axios from "axios";
import PrimaryButton from "../../../auth/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import classNames from "classnames";
import { Menu } from "../../../types/gourmet";

const EditMenus: React.FC<{ menus: { [key: number]: Menu[] } }> = ({
    menus,
}) => {
    const [menuType, setMenuType] = useState(0);

    const menuTypeList = ["コース", "単品", "ドリンク"];

    const initialForm: () => {
        id: number;
        name: string;
        price: number;
        description: string;
        img_data: File | null;
    }[][] = () => {
        const result = menuTypeList.map((type, index) => {
            if (!menus[index]) {
                return [];
            }
            return menus[index].map((menu, i) => ({
                ...menu,
                img_data:
                    menu.has_image === 1
                        ? new File(
                              [],
                              "/images/gourmet/menus/" + menu.id + ".jpg"
                          )
                        : null,
            }));
        });

        return result;
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            menus: initialForm(),
        });

    const updateData = (
        menuType: number,
        index: number,
        property: string,
        value: any
    ) => {
        const newMenus = [...data.menus];
        newMenus[menuType][index] = {
            ...newMenus[menuType][index],
            [property]: value,
        };
        setData("menus", newMenus);
    };

    const addMenu = () => {
        const newMenus = [...data.menus];
        newMenus[menuType].push({
            id: data.menus[menuType].length + 1,
            name: "",
            price: 0,
            description: "",
            img_data: null,
        });
        setData("menus", newMenus);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data.menus);

        patch(route("/console/restaurant/edit-menus"));
    };

    return (
        <section className="bg-blue-50 px-[7.5%] pt-5 pb-8">
            <form onSubmit={submit}>
                <div className="w-full flex rounded-t-[10px] border-[2px] border-slate-500">
                    {menuTypeList.map((element, index) => (
                        <button
                            key={index}
                            className={classNames(
                                "w-1/3 py-1 text-[15px] font-medium",
                                {
                                    "bg-white text-slate-600":
                                        menuType === index,
                                    "bg-slate-500 text-white":
                                        menuType !== index,
                                    "rounded-tl-[7px]": index === 0,
                                    "rounded-tr-[7px]":
                                        index === menuTypeList.length - 1,
                                }
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                setMenuType(index);
                            }}
                        >
                            {element}
                        </button>
                    ))}
                </div>
                <div className="w-full">
                    {data.menus[menuType]?.map((menu, index) => (
                        <div
                            key={index}
                            className="flex flex-col border-[1px] border-slate-500 bg-gray-100 px-5 py-2 my-3"
                        >
                            <div>
                                <div className="flex">
                                    <img
                                        src={
                                            data.menus[menuType][index].img_data
                                                ? URL.createObjectURL(
                                                      data.menus[menuType][
                                                          index
                                                      ].img_data
                                                  )
                                                : "/images/common/no_image.jpg"
                                        }
                                        alt="メニュー画像"
                                        className="w-[40%] border aspect-1 object-cover"
                                    />
                                    <div className="flex items-center justify-center w-[60%]">
                                        <label
                                            htmlFor={index.toString()}
                                            className="text-[12px] font-medium bg-slate-800 text-white px-3 py-1"
                                        >
                                            メニュー画像を選択
                                        </label>
                                        <input
                                            id={index.toString()}
                                            type="file"
                                            accept="jpg,png,jpeg"
                                            className="text-[14px] font-medium mt-1 hidden"
                                            onChange={(e) => {
                                                updateData(
                                                    menuType,
                                                    index,
                                                    "img_data",
                                                    e.target.files?.[0] ?? null
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <label
                                    htmlFor="name"
                                    className="text-xs font-medium mt-1"
                                >
                                    メニュー名
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={menu.name}
                                    onChange={(e) =>
                                        updateData(
                                            menuType,
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-[14px] h-[32px] my-1 py-1 rounded-md border-b border-gray-400"
                                />
                                <label
                                    htmlFor="price"
                                    className="text-xs font-medium mt-1"
                                >
                                    価格
                                </label>
                                <div className="flex">
                                    <input
                                        id="price"
                                        type="number"
                                        value={menu.price}
                                        onChange={(e) =>
                                            updateData(
                                                menuType,
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="w-[40%] text-[14px] h-[32px] my-1 py-1 rounded-md border-b border-gray-400"
                                    />
                                    <p className="text-xs flex items-center font-medium">
                                        円
                                    </p>
                                </div>
                                <label
                                    htmlFor="description"
                                    className="text-xs font-medium mt-1"
                                >
                                    メニュー詳細
                                </label>
                                <textarea
                                    id="description"
                                    value={menu.description}
                                    onChange={(e) =>
                                        updateData(
                                            menuType,
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-[14px] my-1 py-1 h-[65px] rounded-md border-b border-gray-400"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newMenus = [...data.menus];
                                        newMenus[menuType].splice(index, 1);
                                        setData("menus", newMenus);
                                    }}
                                    className="w-full bg-red-500 text-white text-sm my-1 py-1 rounded-md"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="w-full h-[32px] my-3 text-xl flex items-center justify-center font-bold bg-gray-100 border border-slate-500"
                    onClick={(e) => {
                        e.preventDefault();
                        addMenu();
                    }}
                >
                    ＋
                </button>

                <div className="mt-5 w-full flex justify-center">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p>Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default EditMenus;
