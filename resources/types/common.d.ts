export interface Pages {
    [app: string]: {
        [pages: string]: React.FC<any>;
    };
}

export interface AuthStatus {
    isAuthenticated: boolean;
    id: string;
    username: string;
}

export interface Category {
    id: number;
    name: string;
}

export type MenuLinkType = {
    label: string;
    route: string;
};
