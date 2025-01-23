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
    is_open: number;
}

export interface DetailRestaurantData {
    id: number;
    name: string;
    area_id: number;
    price_max: number;
    price_min: number;
    capacity: number;
}
