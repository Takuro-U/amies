// Components
import ListInModal from "../../../common/components/Organism/ListInModal";
import NumberSelectorInModal from "../../../common/components/Organism/NumberSelectorInModal";

// styles
import styles from "../styles/Gourmet.module.scss";
import scrollbarStyles from "../styles/scrollbar.module.scss";

// types
import { PublicData } from "../../../types/gourmet";

class DataStore {
    private data: PublicData = {
        areaList: [],
        genreList: [],
    };
    private listeners: Array<() => void> = [];

    async fetchData() {
        try {
            const response = await fetch("/data.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            this.data = await response.json();
            this.notifyListeners();
            return this.data;
        } catch (error) {
            console.error("Error fetching JSON:", error);
            return this.data;
        }
    }

    getData(): PublicData {
        return this.data;
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener());
    }
}

export const dataStore = new DataStore();

dataStore.fetchData();

export const propsTemplate = {
    route: "/gourmet/search",
    dataTemplate: {
        areas: null,
        genres: null,
        price: null,
        customers: null,
    },
};

const modalStyleTemplate = {
    tag: scrollbarStyles.searchLinkList,
    bar: scrollbarStyles.bar,
    drag: scrollbarStyles.drag,
};

const gourmetModalStyleTemplate = {
    modal: styles.modal,
    header: styles.header,
    title: styles.title,
    closeBottun: styles.closeButton,
    hr: styles.hr,
};

function getSearchLinkList() {
    const publicData = dataStore.getData();

    const propsForAreaList = {
        listData: publicData.areaList.filter(
            (area: { id: number }) => area.id !== 0
        ),
        keyName: "areas",
        style: modalStyleTemplate,
        ...propsTemplate,
    };

    const propsForGenreList = {
        listData: publicData.genreList.filter(
            (genre: { id: number }) => genre.id !== 0
        ),
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
        keyName: "customers",
        ...propsTemplate,
    };

    return [
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
}

export const searchLinkList = new Proxy([], {
    get(target, prop) {
        const linkList = getSearchLinkList();
        return linkList[prop as keyof typeof linkList];
    },
    getOwnPropertyDescriptor(target, prop) {
        const linkList = getSearchLinkList();
        return Object.getOwnPropertyDescriptor(linkList, prop);
    },
    ownKeys() {
        const linkList = getSearchLinkList();
        return Reflect.ownKeys(linkList);
    },
});
