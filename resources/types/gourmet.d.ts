export interface StatusForSearch {
    area: number[] | null;
    customers: number | null;
    price: { max: number; min: number } | null;
    genres: number[] | null;
}
