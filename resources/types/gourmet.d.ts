export interface StatusForSearch {
    area: number[] | null;
    genres: number[] | null;
    price: { max: number; min: number } | null;
    customers: number | null;
}

export interface BasicRestaurantData {
    id: number;
    name: string;
    area_id: number;
    price_max: number;
    price_min: number;
    capacity: number;
}

export interface WeeklyHours {
    day_id: number;
    date: string;
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
}

export interface DetailRestaurantData {
    id: number;
    name: string;
    public: number;
    address: string;
    area_id: number;
    tell: string;
    price_max: number | null;
    price_min: number | null;
    capacity: number | null;
    description: string;
    smoking: number;
    parking: number;
    reservation: number;
    images: number;
}

export type OpeningHour = {
    date: Date;
    day_id: number;
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
};

export type DefaultHour = {
    open: string;
    close: string;
    open2: string;
    close2: string;
    is_open: number;
};

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
