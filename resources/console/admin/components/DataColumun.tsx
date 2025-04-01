import React from "react";
import classNames from "classnames";

//サブコンポーネント
const Row: React.FC<{
    element: { id: number; name: string; new: boolean };
    index: number;
    type: "areaList" | "genreList";
    updateName: (
        newName: string,
        id: number,
        type: "areaList" | "genreList"
    ) => void;
}> = ({ element, index, type, updateName }) => {
    return (
        <>
            {index !== 0 && !element.new ? (
                <div
                    key={element.id}
                    className={classNames(
                        "flex justify-center items-center",
                        "bg-gray-300 rounded-md hover:bg-gray-400 transition-colors",
                        "text-[16px] p-1",
                        { "mt-4": index !== 1 }
                    )}
                >
                    {element.name}
                </div>
            ) : (
                <input
                    key={element.id}
                    placeholder={
                        type === "areaList"
                            ? "エリア名を入力"
                            : "ジャンル名を入力"
                    }
                    className={classNames(
                        "w-full p-1 text-[16px] text-center rounded-md",
                        "border-2 border-gray-300 hover:border-gray-400 transition-colors",
                        { "mt-4": index !== 1 }
                    )}
                    value={element.name}
                    onChange={(e) =>
                        updateName(e.target.value, element.id, type)
                    }
                />
            )}
        </>
    );
};

type PROPS = {
    list: { id: number; name: string; new: boolean }[];
    type: "areaList" | "genreList";
    updateName: (
        newName: string,
        id: number,
        type: "areaList" | "genreList"
    ) => void;
    addNewElement: (type: "areaList" | "genreList") => void;
};

const DataColumn: React.FC<PROPS> = (props) => {
    return (
        <div
            className={classNames(
                "bg-white shadow-md",
                "rounded-lg w-[85%] my-3 px-8 py-5 max-w-2xl mb-6"
            )}
        >
            {props.list.map((element, index) => (
                <div key={element.id}>
                    {index !== 0 && (
                        <Row
                            element={element}
                            index={index}
                            type={props.type}
                            updateName={props.updateName}
                        />
                    )}
                </div>
            ))}
            <button
                onClick={() => props.addNewElement(props.type)}
                className={classNames(
                    "flex items-center justify-center",
                    "w-full rounded-md",
                    "text-gray-500 hover:text-gray-600",
                    "border-2 mt-4 pb-1 border-dashed border-gray-300  hover:border-gray-400",
                    "transition-colors"
                )}
            >
                <span className="text-2xl">+</span>
            </button>
        </div>
    );
};

export default DataColumn;
