import React from "react";

type PROPS = {
    index: number;
    menu: {
        id: number;
        name: string;
        price: number;
        description: string;
        imgDataTemp?: File | null;
    };
    menuType: number;
    updateData: (
        menuType: number,
        index: number,
        key: string,
        value: string | number | File | null
    ) => void;
    deleteMenu: (index: number) => void;
};

const checkNumber = (value: string, prev: number) => {
    if (value.trim() === "" || /^[0-9]+$/.test(value)) {
        return Number(value);
    }
    return prev;
};

const MenuCard: React.FC<PROPS> = (props) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-lg">
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 relative">
                        <img
                            src={
                                props.menu.imgDataTemp
                                    ? URL.createObjectURL(
                                          props.menu.imgDataTemp
                                      )
                                    : "/images/common/no_image.jpg"
                            }
                            alt="メニュー画像"
                            className="w-full aspect-1 object-cover rounded-md border border-gray-500"
                        />
                        <div className="mt-2">
                            <label
                                htmlFor={`img-${props.index}`}
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                画像を選択
                            </label>
                            <input
                                id={`img-${props.index}`}
                                type="file"
                                accept="jpg,png,jpeg"
                                className="hidden"
                                onChange={async (e) => {
                                    props.updateData(
                                        props.menuType,
                                        props.index,
                                        "imgDataTemp",
                                        e.target.files?.[0] ?? null
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-3">
                        <div>
                            <label
                                htmlFor={`name-${props.index}`}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                メニュー名
                            </label>
                            <input
                                id={`name-${props.index}`}
                                type="text"
                                value={props.menu.name}
                                onChange={(e) =>
                                    props.updateData(
                                        props.menuType,
                                        props.index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="メニュー名を入力"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor={`price-${props.index}`}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                価格
                            </label>
                            <div className="flex items-center">
                                <input
                                    id={`price-${props.index}`}
                                    type="text"
                                    value={props.menu.price}
                                    onChange={(e) =>
                                        props.updateData(
                                            props.menuType,
                                            props.index,
                                            "price",
                                            checkNumber(
                                                e.target.value,
                                                props.menu.price
                                            )
                                        )
                                    }
                                    className="w-1/3 px-3 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="0"
                                />
                                <span className="ml-2 text-gray-700">円</span>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor={`description-${props.index}`}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                メニュー詳細
                            </label>
                            <textarea
                                id={`description-${props.index}`}
                                value={props.menu.description}
                                onChange={(e) =>
                                    props.updateData(
                                        props.menuType,
                                        props.index,
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                rows={3}
                                placeholder="メニューの説明を入力"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            props.deleteMenu(props.index);
                        }}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        このメニューを削除
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
