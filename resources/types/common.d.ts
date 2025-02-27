export interface Pages {
    [app: string]: {
        [pages: string]: React.FC<any>;
    };
}

export interface AuthStatus {
    user: {
        id: number;
        name: string;
    } | null;
    check: boolean;
}

export interface Category {
    id: number;
    name: string;
}

export type MenuLinkType = {
    label: string;
    route: string;
};
