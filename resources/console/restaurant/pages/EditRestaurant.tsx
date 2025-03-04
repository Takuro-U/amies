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
            className={classNames("mt-3", {
                "w-full": type != "number",
                "w-[40%]": type == "number",
            })}
        >
            <InputLabel htmlFor={property} value={label} />
            <input
                id={property}
                type={type || "text"}
                value={data[property]}
                onChange={(e) => setData(property, e.target.value)}
                required
                autoComplete={property}
                className="w-full h-[40px] border border-gray-300 rounded-md p-2"
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
        <div className="mt-3 w-full">
            <InputLabel htmlFor={property} value={label} />
            <textarea
                id={property}
                value={data[property]}
                onChange={(e) => setData(property, e.target.value)}
                required
                autoComplete={property}
                className="w-full h-[90px] border border-gray-300 rounded-md p-2"
            />

            <InputError message={errors.name} />
        </div>
    );
};

const EditRestaurant: React.FC<{ restaurant: DetailRestaurantData }> = ({
    restaurant,
}) => {
    const [menuType, setMenuType] = useState(0);

    const menuTypeList = ["コース", "単品", "ドリンク"];

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
        <section className="bg-blue-50 pb-8">
            <form onSubmit={submit} className="pt-3 mx-[7.5%]">
                <div className="mt-3 w-full">
                    <button
                        id="public"
                        type="button"
                        className={classNames(
                            "text-white w-16 py-1 rounded-md",
                            {
                                "bg-green-500": data.public === 1,
                                "bg-red-500": data.public === 0,
                            }
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            setData("public", data.public === 1 ? 0 : 1);
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

                <div className="mt-3 w-full">
                    <InputLabel htmlFor="area_id" value="エリア" />
                    <div id="area_id" className="flex flex-wrap gap-1">
                        {publicData.areaList.map((element) => (
                            <button
                                key={element.id}
                                type="button"
                                onClick={() => setData("area_id", element.id)}
                                className={classNames(
                                    "px-2 py-1 text-[16px] rounded-md",
                                    {
                                        "bg-green-500 text-white":
                                            data.area_id === element.id,
                                        "bg-gray-200":
                                            data.area_id !== element.id,
                                    }
                                )}
                            >
                                {element.name}
                            </button>
                        ))}
                    </div>
                </div>

                <InputTemplate
                    property="tell"
                    label="電話番号"
                    type="tel"
                    errors={errors}
                    data={data}
                    setData={setData}
                />

                <div className="mt-3 w-full">
                    <InputLabel htmlFor="price" value="価格帯" />
                    <div id="price" className="flex">
                        <input
                            type="number"
                            value={data.price_min}
                            onChange={(e) =>
                                setData("price_min", Number(e.target.value))
                            }
                            className="w-full h-[40px] border border-gray-300 rounded-md p-2 text-right"
                        />
                        <p className="whitespace-nowrap flex items-center text-sm font-medium text-gray-600">
                            円～
                        </p>
                        <input
                            type="number"
                            value={data.price_max}
                            onChange={(e) =>
                                setData("price_max", Number(e.target.value))
                            }
                            className="w-full h-[40px] border border-gray-300 rounded-md p-2 text-right"
                        />
                        <p className="whitespace-nowrap flex items-center text-sm font-medium text-gray-600">
                            円
                        </p>
                    </div>

                    <InputError message={errors.name} />
                </div>

                <div className="mt-3 w-[40%]">
                    <InputLabel htmlFor="capacity" value="最大団体人数" />
                    <input
                        id="capacity"
                        type="number"
                        value={data.capacity}
                        onChange={(e) =>
                            setData("capacity", Number(e.target.value))
                        }
                        required
                        autoComplete="capacity"
                        className="w-full h-[40px] border border-gray-300 rounded-md p-2"
                    />

                    <InputError message={errors.name} />
                </div>

                <TextAreaTemplate
                    property="description"
                    label="詳細情報/お客さんへのメッセージ"
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

                <div>
                    <p className="mt-2 w-full bg-slate-500 text-white rounded-t-md py-2 flex justify-center">
                        メニュー
                    </p>
                    <div className="w-full bg-slate-50 rounded-b-md">
                        <div className="w-full flex">
                            {menuTypeList.map((element, index) => (
                                <button
                                    key={index}
                                    className={classNames(
                                        "w-1/3 pb-1 text-[15px]",
                                        {
                                            "bg-slate-500 text-white":
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
                </div>

                <div className="mt-2 w-full flex justify-center">
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

export default EditRestaurant;
