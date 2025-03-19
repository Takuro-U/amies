import React, { useEffect, useRef, useState } from "react";

import styles from "./../styles/Restaurant.module.scss";

import PageStatesProvider from "../../../hooks/PageStatesProvider";

// components
import Details from "../components/Restaurant/Details";
import ContentSelector from "../components/Restaurant/ContentSelector/ContentSelector";
import ImageSwiper from "../components/Restaurant/ImageSwiper/ImageSwiper";

// types
import { DetailRestaurantData, Menu } from "../../../types/gourmet";

// modules
import { DefaultHour, OpeningHour } from "../../../types/gourmet";
import Background from "../components/Templetes/Background";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

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

    return (
        <>
            <Background />
            <div className="relative z-10">
                <PageStatesProvider
                    pageStates={{ pageProps }}
                    setPageStates={{}}
                >
                    <ImageSwiper />

                    <Details
                        restaurant={props.restaurant}
                        relation={props.relation}
                        hours={props.hours}
                    />

                    <ContentSelector />
                </PageStatesProvider>
            </div>
        </>
    );
};

export default Restaurant;
