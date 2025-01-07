//pages
import Auth from "../pages/Auth";
import UserProfile from "../pages/UserProfile";
import TopMain from "../../apps/top/pages/Main";
import GourmetMain from "../../apps/gourmet/pages/Main";
import Search from "../../apps/gourmet/pages/Search";

//types
import { Pages } from "../../types/common";
import { MenuLinkType } from "../../types/common";

export const pageRouter: Pages = {
    common: { auth: Auth, user: UserProfile },
    top: { main: TopMain },
    gourmet: { main: GourmetMain, search: Search },
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
