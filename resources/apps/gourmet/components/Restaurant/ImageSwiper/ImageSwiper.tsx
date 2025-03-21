import React, { useEffect, useRef, useState } from "react";

// custom hooks
import { usePageStatesContext } from "../../../../../hooks/PageStatesProvider";

// modules
import classNames from "classnames";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// mui-icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ImageSwiper: React.FC = () => {
    const { pageStates } = usePageStatesContext();

    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

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

    useEffect(() => {
        if (activeIndex !== displayIndex && !isFading) {
            setIsFading(true);

            setTimeout(() => {
                setDisplayIndex(activeIndex);

                setTimeout(() => {
                    setIsFading(false);
                }, 50);
            }, 500);
        }
    }, [activeIndex, displayIndex, isFading]);

    return (
        <div className="relative w-[100vw] flex justify-center">
            <div
                className="absolute top-0 left-0 w-full h-full z-[-10]"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            />
            <div
                className="absolute top-0 left-0 w-full h-full z-[-20]"
                style={{
                    backgroundImage: `url(/uploaded_images/gourmet/restaurants/${
                        pageStates.pageProps.restaurant.id
                    }/${displayIndex + 1}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: isFading ? 0 : 1,
                    transition: isFading ? "opacity 500ms ease" : "none",
                }}
            />
            <div
                className="absolute top-0 left-0 w-full h-full z-[-21]"
                style={{
                    backgroundImage: `url(/uploaded_images/gourmet/restaurants/${
                        pageStates.pageProps.restaurant.id
                    }/${activeIndex + 1}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: isFading ? 1 : 0,
                    transition: isFading ? "opacity 500ms ease" : "none",
                }}
            />
            {pageStates.pageProps.restaurant.images != 0 && (
                <Swiper
                    className="w-[100%] max-w-[600px] aspect-[16/9]"
                    ref={swiperRef}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    allowTouchMove={false}
                    simulateTouch={false}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {Array(pageStates.pageProps.restaurant.images)
                        .fill(null)
                        .map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className="w-full aspect-[16/9]  object-cover"
                                    src={`/uploaded_images/gourmet/restaurants/${
                                        pageStates.pageProps.restaurant.id
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
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        transform: "translate(10px, 0)",
                    }}
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => handleScroll(1)}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
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
                    "w-full px-[min(2%, 100px)] pt-[10px]",
                    "overflow-hidden whitespace-nowrap"
                )}
                style={{
                    textOverflow: "ellipsis",
                    background:
                        "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.85) 65%, rgba(255, 255, 255, 0) )",
                }}
            >
                {pageStates.pageProps.restaurant.name}
            </p>
        </div>
    );
};

export default ImageSwiper;
