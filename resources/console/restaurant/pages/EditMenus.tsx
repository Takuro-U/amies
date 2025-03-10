import React, { useState, useEffect, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
//
import PrimaryButton from "../../../auth/Components/PrimaryButton";
import MenuCard from "../components/MenuCard";
//
import { Menu } from "../../../types/gourmet";
//
import { Transition } from "@headlessui/react";
import classNames from "classnames";
//
import {
    initialForm,
    menuTypeList,
    encordToBase64,
    extensionList,
} from "../ts/_EditMenu";

import { updateElement } from "../../../util/ts/functions";

const EditMenus: React.FC<{ menus: { [key: number]: Menu[] } }> = ({
    menus,
}) => {
    const [menuType, setMenuType] = useState(0);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            props: { menus: initialForm(menus), flag: false },
        });

    const updateData = (
        menuType: number,
        index: number,
        updates: { [key: string]: any }
    ) => {
        const newMenus = updateElement(
            data.props.menus,
            menuType,
            updateElement(data.props.menus[menuType], index, {
                ...data.props.menus[menuType][index],
                ...updates,
            })
        );
        setData("props", { ...data.props, menus: newMenus });
    };

    const addMenu = () => {
        const newMenus = [...data.props.menus];
        newMenus[menuType].push({
            id: data.props.menus[menuType].length + 1,
            name: "",
            price: 0,
            description: "",
            extension: 0,
            imgPath: null,
        });
        setData("props", { ...data.props, menus: newMenus });
    };

    const deleteMenu = (index: number) => {
        const newMenus = [...data.props.menus];
        newMenus[menuType].splice(index, 1);
        setData("props", { ...data.props, menus: newMenus });
    };

    const finalizedForm = async () => {
        const result = await Promise.all(
            menuTypeList.map(async (type, typeId) => {
                return await Promise.all(
                    data.props.menus[typeId].map(async (menu, index) => {
                        const { imgPath, ...menuWithoutImg } = menu;
                        let imgData = null;
                        if (imgPath) {
                            try {
                                let response = await fetch(
                                    imgPath + extensionList[menu.extension]
                                );
                                console.log(response);
                                const blob = await response.blob();
                                imgData = new File([blob], "image.jpg", {
                                    type: blob.type,
                                });
                            } catch (error) {
                                console.error(
                                    "画像データの取得に失敗しました:",
                                    error
                                );
                            }
                        }
                        return {
                            ...menuWithoutImg,
                            imgDataBase64: imgData
                                ? ((await encordToBase64(imgData)) as string)
                                : null,
                        };
                    })
                );
            })
        );
        return result;
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const formattedData = await finalizedForm();

        setData("props", {
            menus: formattedData,
            flag: true,
        });
    };

    useEffect(() => {
        if (data.props.flag) {
            patch(route("/console/restaurant/edit-menus"));
        }
    }, [data.props.flag]);

    return (
        <section className="bg-gray-200 min-h-screen py-8 px-6 sm:px-6 md:px-8 lg:px-12">
            <form onSubmit={submit} className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        メニュー編集
                    </h2>
                    <div className="w-full flex rounded-lg overflow-hidden shadow-sm">
                        {menuTypeList.map((element, index) => (
                            <button
                                key={index}
                                className={classNames(
                                    "w-1/3 py-3 text-[15px] font-medium transition-all duration-200",
                                    {
                                        "bg-white text-gray-800 border-t-2 border-orange-500":
                                            menuType === index,
                                        "bg-gray-300 text-gray-800 border-t-2 border-transparent hover:bg-gray-400":
                                            menuType !== index,
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
                </div>

                <div className="space-y-4">
                    {data.props.menus[menuType]?.map((menu, index) => (
                        <MenuCard
                            key={index}
                            index={index}
                            menu={menu}
                            menuType={menuType}
                            updateData={updateData}
                            deleteMenu={deleteMenu}
                        />
                    ))}
                </div>

                <button
                    className="w-full py-3 my-4 text-gray-600 flex items-center justify-center bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        addMenu();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    新しいメニューを追加
                </button>

                <div className="mt-8 flex items-center justify-center space-x-4">
                    <PrimaryButton
                        disabled={processing}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    >
                        保存する
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform translate-y-2"
                        enterTo="opacity-100 transform translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            保存しました
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default EditMenus;
