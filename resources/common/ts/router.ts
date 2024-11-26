//pages
import Auth from "../pages/Auth";
import TopMain from "../../apps/top/pages/Main";
import GourmetMain from "../../apps/gourmet/pages/Main";

//types
import { Pages } from "../../types/common";
import { MenuLinkType } from "../../types/common";
import UserProfile from "../pages/UserProfile";

export const pageRouter: Pages = {
    common: { auth: Auth, user: UserProfile },
    top: { main: TopMain },
    gourmet: { main: GourmetMain },
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
