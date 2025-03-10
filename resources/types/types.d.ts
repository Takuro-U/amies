export interface Pages {
    [app: string]: {
        [pages: string]: React.FC;
    };
}

export interface AuthStatus {
    isAuthenticated: boolean;
    id: string;
    username: string;
}

export type MenuLinkType = {
    label: string;
    route: string;
};
