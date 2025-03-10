import React, { useState } from "react";
import InputError from "../../../auth/Components/InputError";
import InputLabel from "../../../auth/Components/InputLabel";
import PrimaryButton from "../../../auth/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { DetailRestaurantData } from "../../../types/gourmet";
import classNames from "classnames";
import publicData from "../../../../storage/app/data.json";
import { checkNumber } from "../../../util/ts/functions";

const InputTemplate: React.FC<{
    property: keyof DetailRestaurantData;
    label: string;
    type?: string;
    errors: any;
    data: any;
    setData: (property: keyof DetailRestaurantData, value: any) => void;
}> = ({ property, label, type, errors, data, setData }) => {
    return (
        <div
            className={classNames("mb-4", {
                "w-full": type != "number",
                "w-[40%]": type == "number",
            })}
        >
            <InputLabel
                htmlFor={property}
                value={label}
                className="text-gray-700 font-medium mb-1"
            />
            <input
                id={property}
                type={type || "text"}
                value={data[property]}
                onChange={(e) => setData(property, e.target.value)}
                required
                autoComplete={property}
                className="w-full h-[40px] border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <InputError message={errors.name} />
        </div>
    );
};

const TextAreaTemplate: React.FC<{
    property: keyof DetailRestaurantData;
    label: string;
    errors: any;
    data: any;
    setData: (property: keyof DetailRestaurantData, value: any) => void;
}> = ({ property, label, errors, data, setData }) => {
    return (
        <div className="mb-4 w-full">
            <InputLabel
                htmlFor={property}
                value={label}
                className="text-gray-700 font-medium mb-1"
            />
            <textarea
                id={property}
                value={data[property]}
                onChange={(e) => setData(property, e.target.value)}
                required
                autoComplete={property}
                className="w-full h-[90px] border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <InputError message={errors.name} />
        </div>
    );
};

const EditRestaurant: React.FC<{ restaurant: DetailRestaurantData }> = ({
    restaurant,
}) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            public: restaurant.public,
            name: restaurant.name,
            location: restaurant.location,
            area_id: restaurant.area_id,
            tell: restaurant.tell,
            price_max: restaurant.price_max,
            price_min: restaurant.price_min,
            capacity: restaurant.capacity,
            description: restaurant.description,
            smoking: restaurant.smoking,
            parking: restaurant.parking,
            reservation: restaurant.reservation,
            images: restaurant.images,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className="bg-gray-200 min-h-screen py-8 px-6 sm:px-6 md:px-8 lg:px-12">
            <form onSubmit={submit} className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        店舗情報編集
                    </h2>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="mb-4 w-full">
                            <button
                                id="public"
                                type="button"
                                className={classNames(
                                    "text-white w-20 py-2 rounded-lg font-medium transition-colors duration-200",
                                    {
                                        "bg-green-500 hover:bg-green-600":
                                            data.public === 1,
                                        "bg-red-500 hover:bg-red-600":
                                            data.public === 0,
                                    }
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData(
                                        "public",
                                        data.public === 1 ? 0 : 1
                                    );
                                }}
                            >
                                {data.public === 1 ? "公開" : "非公開"}
                            </button>

                            <InputError message={errors.name} />
                        </div>

                        <InputTemplate
                            property="name"
                            label="店舗名"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <InputTemplate
                            property="location"
                            label="住所"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <InputTemplate
                            property="tell"
                            label="電話番号"
                            type="tel"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <div className="mb-4 w-full">
                            <InputLabel
                                htmlFor="area_id"
                                value="エリア"
                                className="text-gray-700 font-medium mb-1"
                            />
                            <div id="area_id" className="flex flex-wrap gap-2">
                                {publicData.areaList.map((element) => (
                                    <button
                                        key={element.id}
                                        type="button"
                                        onClick={() =>
                                            setData("area_id", element.id)
                                        }
                                        className={classNames(
                                            "px-3 py-2 text-[15px] rounded-lg font-medium transition-colors duration-200",
                                            {
                                                "bg-green-500 hover:bg-green-600 text-white":
                                                    data.area_id === element.id,
                                                "bg-gray-200 hover:bg-gray-300 text-gray-700 ":
                                                    data.area_id !== element.id,
                                            }
                                        )}
                                    >
                                        {element.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">
                            その他の情報
                        </h3>

                        <div className="mb-4 w-full">
                            <InputLabel
                                htmlFor="price"
                                value="価格帯"
                                className="text-gray-700 font-medium mb-1"
                            />
                            <div
                                id="price"
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="text"
                                    value={data.price_min}
                                    onChange={(e) =>
                                        setData(
                                            "price_min",
                                            checkNumber(
                                                e.target.value,
                                                data.price_min
                                            )
                                        )
                                    }
                                    className="w-full h-[40px] border border-gray-300 rounded-lg p-2 text-right shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                                <p className="whitespace-nowrap flex items-center text-sm font-medium text-gray-600">
                                    円～
                                </p>
                                <input
                                    type="text"
                                    value={data.price_max}
                                    onChange={(e) =>
                                        setData(
                                            "price_max",
                                            checkNumber(
                                                e.target.value,
                                                data.price_max
                                            )
                                        )
                                    }
                                    className="w-full h-[40px] border border-gray-300 rounded-lg p-2 text-right shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                                <p className="whitespace-nowrap flex items-center text-sm font-medium text-gray-600">
                                    円
                                </p>
                            </div>

                            <InputError message={errors.name} />
                        </div>

                        <div className="mb-4 w-[40%]">
                            <InputLabel
                                htmlFor="capacity"
                                value="最大団体人数"
                                className="text-gray-700 font-medium mb-1"
                            />
                            <input
                                id="capacity"
                                type="text"
                                value={data.capacity}
                                onChange={(e) =>
                                    setData(
                                        "capacity",
                                        checkNumber(
                                            e.target.value,
                                            data.capacity
                                        )
                                    )
                                }
                                required
                                autoComplete="capacity"
                                className="w-full h-[40px] border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />

                            <InputError message={errors.name} />
                        </div>

                        <TextAreaTemplate
                            property="description"
                            label="店舗詳細/お客さんへのメッセージ"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <TextAreaTemplate
                            property="reservation"
                            label="予約の可否/方法"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <TextAreaTemplate
                            property="parking"
                            label="駐車場の有無や台数"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />

                        <TextAreaTemplate
                            property="smoking"
                            label="禁煙席や喫煙スペースについて"
                            errors={errors}
                            data={data}
                            setData={setData}
                        />
                    </div>
                </div>

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

export default EditRestaurant;
