import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
//
import DataColumn from "../components/DataColumun";
//
import classNames from "classnames";
//
import publicData from "../../../../public/data.json";

const OtherManager: React.FC = () => {
    const [dataLists, setDataLists] = useState<{
        [key: string]: {
            id: number;
            name: string;
            new: boolean;
        }[];
    }>({
        areaList: publicData.areaList.map((area) => ({
            ...area,
            new: false,
        })),
        genreList: publicData.genreList.map((genre) => ({
            ...genre,
            new: false,
        })),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        status: "active",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/console/admin/other-manager", {
            onFinish: () => reset(),
        });
    };

    const addNewElement = (type: "areaList" | "genreList") => {
        const newList = [
            ...dataLists[type],
            {
                id: dataLists[type].length,
                name: "",
                new: true,
            },
        ];
        setDataLists((prev) => ({
            ...prev,
            [type]: newList,
        }));
    };

    const updateName = (
        newName: string,
        id: number,
        type: "areaList" | "genreList"
    ) => {
        setDataLists((prev) => ({
            ...prev,
            [type]: prev[type].map((element) =>
                element.id === id ? { ...element, name: newName } : element
            ),
        }));
    };

    return (
        <div className="flex flex-col items-center w-full bg-slate-100 pt-5">
            <DataColumn
                list={dataLists.areaList}
                type="areaList"
                updateName={updateName}
                addNewElement={addNewElement}
            />
            <DataColumn
                list={dataLists.genreList}
                type="genreList"
                updateName={updateName}
                addNewElement={addNewElement}
            />
        </div>
    );
};

export default OtherManager;
