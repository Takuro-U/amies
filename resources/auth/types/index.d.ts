export interface User {
    id: number;
    name: string;
    nickname: string;
    icon_path: string;
    email: string;
    email_verified_at?: string;
    is_restaurant: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
