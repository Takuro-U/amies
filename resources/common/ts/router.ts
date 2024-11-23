//pages
import Auth from "../pages/Auth";
import TopMain from "../../apps/top/pages/Main";
import GourmetMain from "../../apps/gourmet/pages/Main";

//types
import { Pages } from "../../types/types";
import { MenuLinkType } from "../../types/types";

export const pageRouter: Pages = {
    common: { auth: Auth },
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
