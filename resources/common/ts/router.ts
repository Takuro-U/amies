//pages
import Auth from "../pages/Auth";
import UserProfile from "../pages/UserProfile";
//
import AuthRestaurantConsole from "../../apps/auth/console/Restaurant";
//
import TopMain from "../../apps/top/pages/Main";
//
import GourmetMain from "../../apps/gourmet/pages/Main";
import Search from "../../apps/gourmet/pages/Search";
import Restaurant from "../../apps/gourmet/pages/Restaurant";

//types
import { Pages } from "../../types/common";
import { MenuLinkType } from "../../types/common";

export const pageRouter: Pages = {
    common: { auth: Auth, user: UserProfile },
    auth: { console_restaurant: AuthRestaurantConsole },
    top: { main: TopMain },
    gourmet: { main: GourmetMain, search: Search, restaurant: Restaurant },
};

export const menuLinks: MenuLinkType[] = [
    {
        label: "TOP",
        route: "/",
    },
    {
        label: "GOURMET",
        route: "/gourmet",
    },
];
