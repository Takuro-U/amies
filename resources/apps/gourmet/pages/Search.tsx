import React, { useEffect, useState } from "react";

import styles from "./../styles/Search.module.scss";

import { BasicRestaurantData, WeeklyHours } from "../../../types/gourmet";

import RestaurantCard from "../components/Search/RestauratCard/RestaurantCard";
import Pagenations from "../components/Search/Pagenations";

type PROPS = {
    restaurants: BasicRestaurantData[][];
    relation: { id: number; restaurant_id: number; genre_id: number }[];
    hours: {
        [key: number]: WeeklyHours[];
    };
};

const Search: React.FC<PROPS> = (props) => {
    const [pageNumber, setPageNumber] = useState<number>(1);

    const selectedGenres = (restaurant_id: number) => {
        const genres = props.relation
            .filter((relation) => relation.restaurant_id === restaurant_id)
            .map((element) => element.genre_id);
        return genres;
    };

    useEffect(() => {
        console.log(props.restaurants);
        console.log(props.hours);
    }, []);

    return (
        <div className={styles.page}>
            <Pagenations
                result={props.restaurants}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
            <div
                className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center pt-[50px]"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 50px)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, black 50px)",
                }}
            >
                {props.restaurants[pageNumber]?.map((element) => (
                    <RestaurantCard
                        key={element.id}
                        restaurant={element}
                        genres={selectedGenres(element.id)}
                        hours={props.hours[element.id]}
                        className="md:w-1/2 lg:w-[calc(50%-20px)] md:mx-2.5"
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
