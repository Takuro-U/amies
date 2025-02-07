import React, { useEffect, useRef, useState } from "react";

import styles from "./../styles/Restaurant.module.scss";

import PageStatesProvider from "../../../hooks/PageStatesProvider";

// components
import Details from "../components/Restaurant/Details";
import ContentSelector from "../components/Restaurant/ContentSelector/ContentSelector";

// types
import { DetailRestaurantData, Menu } from "../../../types/gourmet";

// modules
import classNames from "classnames";
import { DefaultHour, OpeningHour } from "../../../types/gourmet";
import Background from "../components/Templetes/Background";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type PROPS = {
    restaurant: DetailRestaurantData;
    relation: { id: number; restaurant_id: number; genre_id: number }[];
    menus: { [key: number]: Menu[] };
    hours: {
        defaultWeek: DefaultHour[];
        quarterlyHour: { month: number; hours: OpeningHour[] }[];
    };
};

const Restaurant: React.FC<PROPS> = (props) => {
    const pageProps = props;
    console.log(props);

    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const swiperRef = useRef<SwiperRef>(null);

    const handleScroll = (flag: 1 | -1) => {
        if (flag == 1) {
            swiperRef.current?.swiper.slideNext();
        } else if (flag == -1) {
            swiperRef.current?.swiper.slidePrev();
        }
        setIsAutoScrolling(false);
    };

    useEffect(() => {
        if (isAutoScrolling) {
            const interval = setInterval(() => {
                swiperRef.current?.swiper.slideNext();
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isAutoScrolling]);

    return (
        <>
            <Background />
            <div className="relative z-10">
                <PageStatesProvider
                    pageStates={{ pageProps }}
                    setPageStates={{}}
                >
                    {/* イメージ写真 */}
                    <div className="relative w-[100vw] aspect-[16/9]">
                        {props.restaurant.images != 0 && (
                            <Swiper
                                ref={swiperRef}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                allowTouchMove={false}
                                simulateTouch={false}
                            >
                                {Array(props.restaurant.images)
                                    .fill(null)
                                    .map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                className="w-full aspect-[16/9]  object-cover"
                                                src={`/uploaded_images/gourmet/restaurants/${
                                                    props.restaurant.id
                                                }/${index + 1}.jpg`}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}

                        <div
                            className={classNames(
                                "absolute top-0 z-10",
                                "flex items-center justify-between",
                                "w-full h-full"
                            )}
                        >
                            <button
                                onClick={() => handleScroll(-1)}
                                style={{
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.85)",
                                    transform: "translate(10px, 0)",
                                }}
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={() => handleScroll(1)}
                                style={{
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.85)",
                                    transform: "translate(-10px, 0)",
                                }}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                        <p
                            className={classNames(
                                "font-gourmet text-[22px] text-slate-800",
                                "absolute bottom-[-1px] z-10",
                                "w-full px-[2%] pt-[10px]",
                                "overflow-hidden whitespace-nowrap"
                            )}
                            style={{
                                textOverflow: "ellipsis",
                                background:
                                    "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.85) 65%, rgba(255, 255, 255, 0) )",
                            }}
                        >
                            {props.restaurant.name}
                        </p>
                    </div>
                    {/* Info */}
                    <Details
                        restaurant={props.restaurant}
                        relation={props.relation}
                        hours={props.hours}
                    />
                    {/* メニュー&マップ&カレンダー$口コミ */}
                    <ContentSelector />
                </PageStatesProvider>
            </div>
        </>
    );
};

export default Restaurant;
