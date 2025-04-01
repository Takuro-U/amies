//検索条件
export interface StatusForSearch {
    area: number[] | null;
    genres: number[] | null;
    price: { max: number; min: number } | null;
    customers: number | null;
}

//飲食店_基本情報
export interface BasicRestaurantData {
    id: number;
    name: string;
    area_id: number;
    price_max: number;
    price_min: number;
    capacity: number;
}

//飲食店_詳細情報
export interface DetailRestaurantData {
    id: number;
    user_id: number;
    public: number;
    name: string;
    tell: string;
    address: string;
    area_id: number;
    latitude: number;
    longitude: number;
    price_max: number | null;
    price_min: number | null;
    capacity: number | null;
    description: string;
    reservation: string;
    charter: string;
    parking: string;
    smoking: string;
    images: number[];
}

//直近一週間の営業時間
export interface WeeklyHours {
    day_id: number;
    date: string;
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
}

//詳細営業時間
export type OpeningHour = {
    date: Date;
    day_id: number;
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
};

//基本営業時間
export type DefaultHour = {
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
};

//メニュー
export type Menu = {
    id: number;
    parent_id: number;
    category_id: number;
    index: number;
    name: string;
    price: number;
    description: string;
    extension: number;
};
