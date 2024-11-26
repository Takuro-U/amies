import React, { useEffect, useState } from "react";

import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { navigateToSearchResult } from "../../ts/functions";

type Genre = {
    id: number;
    name: string;
};

const GenreList: React.FC = () => {
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const getGenreList = async () => {
        const result: Genre[] = [];
        setGenreList(result);
    };

    useEffect(() => {
        getGenreList();
    });

    return (
        <div>
            {genreList.map((genre) => (
                <Link
                    href={route("/gourmet/search")}
                    data={{
                        area: null,
                        customers: null,
                        price: null,
                        genres: [genre.id],
                    }}
                >
                    {genre.name}
                </Link>
            ))}
        </div>
    );
};

export default GenreList;
