import React from "react";

// Styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

// etc.
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";

type PROPS = {
    listData: { id: number; name: string }[];
    route: string;
    dataTemplate: { [key: string]: number[] | null };
    keyName: string;
    style: { //swiperのスクロールバーのスタイルを個別に変更できる引数を追加
        tag?: string | "",
        bar: string,
        drag: string,
    };
};

const ListInModal: React.FC<PROPS> = (props) => {
    return (
        <Swiper
            className={classNames(
                props.style.tag,
                "flex flex-col items-center",
                "w-[90%] h-[75%] m-auto mt-2",
                "border-[2px]",
                "overflow-y-auto",                
            )}
            slidesPerView={ "auto" }
            modules={[Scrollbar, FreeMode ]}
            freeMode={ true }
            scrollbar={{
                draggable: false,
                verticalClass: props.style.bar,
                dragClass: classNames("swiper-scrollbar-drag", props.style.drag)
            }}
            direction={ "vertical" }
        >
            {props.listData.map((category, index) => {
                const data = {
                    ...props.dataTemplate,
                    [props.keyName]: [category.id],
                };

                return (
                    <SwiperSlide style={{height: "auto"}} key={index}>
                        <Link
                            className={classNames(
                                "flex items-center justify-center flex-shrink-0",
                                "w-[100%] h-[40px]",
                                { "border-t": index !== 0 }
                            )}
                            href={route(props.route)}
                            data={data}
                        >
                            {category.name}
                        </Link>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default ListInModal;
