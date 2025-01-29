import React, { createRef, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

// Component
import CheckContent from "./CheckContent/CheckContent";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Controller } from "swiper/modules";
import SearchIcon from "@mui/icons-material/Search";

// Types
import { Category } from "../../../../../../types/common";

// JSON
import data from "../../../../../../../storage/app/data.json";

// Modules
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";

// Styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/controller";
import scrollbarStyle from "../../../../styles/scrollbar.module.scss"; //スクロールバーのスタイル
import styles from "../../../../styles/Gourmet.module.scss";

interface CheckContentProps extends Category {
    isChecked: boolean;
}

const FilterBox: React.FC = () => {
    const [maxWidth, setMaxWidth] = useState(0);
    const [checkLists, setCheckLists] = useState<{
        [key: string]: CheckContentProps[];
    }>({
        area: data.areaList.map((element) => ({
            ...element,
            isChecked: false,
        })),
        genre: data.genreList.map((element) => ({
            ...element,
            isChecked: false,
        })),
    });
    const [isAnyQueries, setIsAnyQueries] = useState<boolean>(false);
    const queryListRef = useRef<HTMLDivElement>(null);

    //指定条件を表示
    const queryListCtrl = () => {
        let temp: string[] = [];
        Object.keys(checkLists).map((key) => {
            checkLists[key].map((query) => {
                if (query.isChecked) {
                    temp.push(query.name);
                }
            });
        });
        setIsAnyQueries(Boolean(temp.length));
        if (queryListRef.current) {
            queryListRef.current.innerText = temp.join("、");
        }
    };

    useEffect(queryListCtrl, [checkLists]);

    // SwiperController参照用のref
    const swiperRefs = useRef<{[key: string]: RefObject<SwiperRef>[]}>({area: [], genre: []});
    const setSwiperRef = (type: "area" | "genre")=>{
        const ref = createRef<SwiperRef>();
        swiperRefs.current[type].push(ref);
        return ref;
    }

    // 各Swiperに同グループの自身を除いたSwiper[]をControllerとして登録
    useEffect(()=>{
        if(swiperRefs.current){
            Object.keys(swiperRefs.current).map((key)=>{
                // グループ内のrefからswiperインスタンスを取り出し配列化
                const instances = swiperRefs.current[key].map((ref)=>ref.current?.swiper).filter((ins)=> ins !== undefined);
                instances.map((ins)=>{
                    // 自身を除いたインスタンス配列をControllerに登録
                    ins.controller.control = instances.filter((i)=>i !== ins);
                })
            })
        }
    },[])

    const [priceRange, setPriceRange] = useState<{
        max: number | null;
        min: number | null;
    }>({ max: null, min: null });
    const [customers, setCustomers] = useState<number | null>(null);

    const elementsRef = useRef<HTMLDivElement[]>([]);

    const setRef = (index: number) => (element: HTMLDivElement) => {
        elementsRef.current[index] = element;
    };

    const selectMaxWidth = () => {
        const widths = elementsRef.current.map((element) =>
            element ? element.getBoundingClientRect().width : 0
        );
        setMaxWidth(Math.max(...widths));
    };

    const toggleCheck = (p: { key: string; id: number }) => {
        setCheckLists((prev) => {
            return {
                ...prev,
                [p.key]: prev[p.key].map((element) =>
                    element.id === p.id
                        ? { ...element, isChecked: !element.isChecked }
                        : element
                ),
            };
        });
    };

    useLayoutEffect(() => {
        selectMaxWidth();
    }, []);

    return (
        <div
            className={classNames(
                styles.searchOptionsDrawer,
                "w-full max-w-xl rounded-b-[4px] pl-[5px] m-auto",
                "overflow-hidden"
            )}
        >
            <div className="relative flex items-center h-[60px] my-2">
                <p
                    ref={setRef(0)}
                    className="whitespace-nowrap text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : 0,
                        flexShrink: 0,
                    }}
                >
                    エリア：
                </p>
                <div className={classNames("h-[60px]")} style={{width: "calc(100% - "+ (maxWidth != 0 ? maxWidth : 0) +"px)"}}>
                    <Swiper
                        className={classNames("h-1/2")}
                        modules={[FreeMode, Controller]}
                        slidesPerView={"auto"}
                        freeMode={true}
                        ref={setSwiperRef("area")}
                        controller={{
                            by: "container",
                        }}
                    >
                        {checkLists.area?.map((element, i) => {
                            if(!(i % 2)) return (
                            <SwiperSlide style={{width: "auto"}} key={element.id}>
                                <CheckContent
                                    id={element.id}
                                    name={element.name}
                                    isChecked={element.isChecked}
                                    toggleCheck={() =>
                                        toggleCheck({
                                            key: "area",
                                            id: element.id,
                                        })
                                    }
                                />
                            </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <Swiper
                        className={classNames("h-3/5 relative", scrollbarStyle.filterBox)}
                        modules={[Scrollbar, FreeMode, Controller]}
                        slidesPerView={"auto"}
                        scrollbar={{
                            draggable: false,
                            horizontalClass: scrollbarStyle.bar,
                            dragClass: classNames(
                                scrollbarStyle.drag,
                                "swiper-scrollbar-drag",
                            ),
                        }}
                        freeMode={true}
                        ref={setSwiperRef("area")}
                        controller={{
                        }}
                    >
                        {checkLists.area?.map((element, i) => (
                            i % 2 ?
                            <SwiperSlide style={{width: "auto"}} key={element.id}>
                                <CheckContent
                                    id={element.id}
                                    name={element.name}
                                    isChecked={element.isChecked}
                                    toggleCheck={() =>
                                        toggleCheck({
                                            key: "area",
                                            id: element.id,
                                        })
                                    }
                                />
                            </SwiperSlide>
                            : null
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="flex items-center h-[60px] my-2">
                <p
                    ref={setRef(1)}
                    className="whitespace-nowrap text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    ジャンル：
                </p>
                <div className={classNames("h-[60px]")} style={{width: "calc(100% - "+ (maxWidth != 0 ? maxWidth : 0) +"px)"}}>
                    <Swiper
                        className={classNames("h-1/2")}
                        modules={[FreeMode, Scrollbar, Controller]}
                        slidesPerView={"auto"}
                        freeMode={true}
                        ref={setSwiperRef("genre")}
                        controller={{
                            by: "container"
                        }}
                    >
                        {checkLists.genre?.map((element, i) => (
                            !(i % 2)? 
                            <SwiperSlide style={{width: "auto"}} key={element.id}>
                                <CheckContent
                                    id={element.id}
                                    name={element.name}
                                    isChecked={element.isChecked}
                                    toggleCheck={() =>
                                        toggleCheck({
                                            key: "genre",
                                            id: element.id,
                                        })
                                    }
                                />
                            </SwiperSlide>
                            : null
                        ))}
                    </Swiper>
                    <Swiper
                        className={classNames("h-3/5", scrollbarStyle.filterBox)}
                        modules={[FreeMode, Scrollbar, Controller]}
                        slidesPerView={"auto"}
                        freeMode={true}
                        scrollbar={{
                            draggable: false,
                            horizontalClass: scrollbarStyle.bar,
                            dragClass: classNames(
                                scrollbarStyle.drag,
                                "swiper-scrollbar-drag",
                            )
                        }}
                        ref={setSwiperRef("genre")}
                        controller={{
                            by: "container"
                        }}
                    >
                        {checkLists.genre?.map((element, i) => (
                            i % 2 ? 
                            <SwiperSlide style={{width: "auto"}} key={element.id}>
                                <CheckContent
                                    id={element.id}
                                    name={element.name}
                                    isChecked={element.isChecked}
                                    toggleCheck={() =>
                                        toggleCheck({
                                            key: "genre",
                                            id: element.id,
                                        })
                                    }
                                />
                            </SwiperSlide>
                            : null
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(2)}
                    className="text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    価格帯：
                </p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>円～</p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>円</p>
            </div>
            <div className="flex items-center h-[45px]">
                <p
                    ref={setRef(3)}
                    className="text-right"
                    style={{
                        width: maxWidth != 0 ? maxWidth : "auto",
                        flexShrink: 0,
                    }}
                >
                    人数：
                </p>
                <input
                    className="w-[20%] h-[50%] rounded-[3px]"
                    type="number"
                    min={0}
                />
                <p>人</p>
            </div>
            <div>
                {isAnyQueries && (
                    <p className="text-sm text-slate-600">条件は...</p>
                )}
                <p ref={queryListRef} className="text-sm"></p>
            </div>
            <div className="w-full">
                <Link
                    className={classNames(
                        "m-auto",
                        "flex items-center justify-center",
                        "w-[90px] h-[55%]",
                        "rounded-[5px] mb-[10px]",
                        "text-white",
                        styles.searchOptionsBtn,
                        styles.accessable
                    )}
                    href={route("/gourmet/search")}
                    data={{
                        areas: checkLists.area
                            .filter((element) => element.isChecked)
                            .map((element) => element.id),
                        genres: checkLists.genre
                            .filter((element) => element.isChecked)
                            .map((element) => element.id),
                        price: priceRange,
                        customers: customers,
                    }}
                >
                    <SearchIcon
                        fontSize="small"
                        className="relative top-[1px]"
                    />
                    検索
                </Link>
            </div>
        </div>
    );
};

export default FilterBox;
