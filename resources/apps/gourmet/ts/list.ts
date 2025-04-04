// Components
import ListInModal from "../../../common/components/Organism/ListInModal";
import NumberSelectorInModal from "../../../common/components/Organism/NumberSelectorInModal";

// styles
import styles from "../styles/Gourmet.module.scss";
import scrollbarStyles from "../styles/scrollbar.module.scss";

// types
import { PublicData } from "../../../types/gourmet";

// 検索リンク項目の型定義
export interface SearchLinkItem {
    title: string;
    imgPath: string;
    classNames: any;
    Component: React.ComponentType<any>;
    componentProps: any;
    getData?: () => Promise<any>;
}

class DataStore {
    private data: PublicData = {
        areaList: [],
        genreList: [],
    };
    private listeners: Array<() => void> = [];
    private dataFetched: boolean = false;
    private fetchPromise: Promise<PublicData> | null = null;

    async fetchData() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }

        this.fetchPromise = new Promise(async (resolve) => {
            try {
                const response = await fetch("/data.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                this.data = await response.json();
                this.dataFetched = true;
                this.notifyListeners();
                resolve(this.data);
            } catch (error) {
                console.error("Error fetching JSON:", error);
                resolve(this.data);
            }
        });

        return this.fetchPromise;
    }

    getData(): PublicData {
        return this.data;
    }

    isDataFetched(): boolean {
        return this.dataFetched;
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

// すぐにデータを取得開始する
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

// データが取得済みか確認し、まだなら取得を待つ関数
async function ensureDataLoaded() {
    if (!dataStore.isDataFetched()) {
        await dataStore.fetchData();
    }
    return true;
}

function getSearchLinkList(): SearchLinkItem[] {
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
            getData: async () => {
                await ensureDataLoaded();
                return {
                    ...propsForAreaList,
                    listData: dataStore
                        .getData()
                        .areaList.filter((area) => area.id !== 0),
                };
            },
        },
        {
            title: "ジャンルで探す",
            imgPath: "../images/gourmet/SearchLink/genre.png",
            classNames: gourmetModalStyleTemplate,
            Component: ListInModal,
            componentProps: propsForGenreList,
            getData: async () => {
                await ensureDataLoaded();
                return {
                    ...propsForGenreList,
                    listData: dataStore
                        .getData()
                        .genreList.filter((genre) => genre.id !== 0),
                };
            },
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

export const searchLinkList = new Proxy([] as SearchLinkItem[], {
    get(target, prop) {
        const linkList = getSearchLinkList();
        return linkList[prop as any];
    },
    getOwnPropertyDescriptor(target, prop) {
        const linkList = getSearchLinkList();
        return Object.getOwnPropertyDescriptor(linkList, prop);
    },
    ownKeys() {
        const linkList = getSearchLinkList();
        return Reflect.ownKeys(linkList);
    },
    has(target, prop) {
        const linkList = getSearchLinkList();
        return prop in linkList;
    },
});
