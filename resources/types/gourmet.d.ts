export interface StatusForSearch {
    area: number[] | null;
    genres: number[] | null;
    price: { max: number; min: number } | null;
    customers: number | null;
}

export interface RestaurantData {
    id: number;
    name: string;
    location: string;
    area_id: string;
    tell: string;
    price_max: number;
    price_min: number;
    capacity: number;
    description: string;
}
