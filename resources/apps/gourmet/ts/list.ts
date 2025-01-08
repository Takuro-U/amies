// Components
import ListInModal from "../../../common/components/Organism/ListInModal";
import NumberSelectorInModal from "../../../common/components/Organism/NumberSelectorInModal";

// JSON
import data from "./../../../../storage/app/data.json";

export const propsTemplate = {
    route: "/gourmet/search",
    dataTemplate: {
        areas: null,
        genres: null,
        price: null,
        customers: null,
    },
};

const propsForAreaList = {
    listData: data.areaList,
    keyName: "areas",
    ...propsTemplate,
};

const propsForGenreList = {
    listData: data.genreList,
    keyName: "genres",
    ...propsTemplate,
};

const propsForPriceRangeSelector = {
    unit: "円",
    isRange: true,
    keyName: "price",
    ...propsTemplate,
};

const propsForCustomersSelector = {
    unit: "人",
    isRange: false,
    keyName: "costumers", // customersのスペルミス。要修正
    ...propsTemplate,
};

export const searchLinkList = [
    {
        title: "場所で探す",
        imgPath: "../images/gourmet/SearchLink/area.png",
        Component: ListInModal,
        componentProps: propsForAreaList,
    },
    {
        title: "ジャンルで探す",
        imgPath: "../images/gourmet/SearchLink/genre.png",
        Component: ListInModal,
        componentProps: propsForGenreList,
    },
    {
        title: "価格で探す",
        imgPath: "../images/gourmet/SearchLink/price.png",
        Component: NumberSelectorInModal,
        componentProps: propsForPriceRangeSelector,
    },
    {
        title: "人数で探す",
        imgPath: "../images/gourmet/SearchLink/customers.png",
        Component: NumberSelectorInModal,
        componentProps: propsForCustomersSelector,
    },
];
