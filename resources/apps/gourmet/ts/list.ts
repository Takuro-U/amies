// Components
import ListInModal from "../../../common/components/Organism/ListInModal";
import NumberSelectorInModal from "../../../common/components/Organism/NumberSelectorInModal";

// styles
import styles from "../styles/Gourmet.module.scss";
import scrollbarStyles from "../styles/scrollbar.module.scss";

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

// ListInModalのスクロールバースタイル設定用
const modalStyleTemplate = {
    tag: scrollbarStyles.searchLinkList,
    bar: scrollbarStyles.bar,
    drag: scrollbarStyles.drag,
};
// Gourmet内のモーダルのスタイル
const gourmetModalStyleTemplate = {
    modal: styles.modal,
    header: styles.header,
    title: styles.title,
    closeBottun: styles.closeButton,
    hr: styles.hr,
};
const propsForAreaList = {
    listData: data.areaList,
    keyName: "areas",
    style: modalStyleTemplate,
    ...propsTemplate,
};

const propsForGenreList = {
    listData: data.genreList,
    keyName: "genres",
    style: modalStyleTemplate,
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
        classNames: gourmetModalStyleTemplate,
        Component: ListInModal,
        componentProps: propsForAreaList,
    },
    {
        title: "ジャンルで探す",
        imgPath: "../images/gourmet/SearchLink/genre.png",
        classNames: gourmetModalStyleTemplate,
        Component: ListInModal,
        componentProps: propsForGenreList,
    },
    {
        title: "価格で探す",
        imgPath: "../images/gourmet/SearchLink/price.png",
        classNames: gourmetModalStyleTemplate,
        Component: NumberSelectorInModal,
        componentProps: propsForPriceRangeSelector,
    },
    {
        title: "人数で探す",
        imgPath: "../images/gourmet/SearchLink/customers.png",
        classNames: gourmetModalStyleTemplate,
        Component: NumberSelectorInModal,
        componentProps: propsForCustomersSelector,
    },
];
