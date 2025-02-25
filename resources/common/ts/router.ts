//common
import Auth from "../pages/Auth";
import UserProfile from "../pages/UserProfile";

// top
import TopMain from "../../apps/top/pages/Main";

// gourmet
import GourmetMain from "../../apps/gourmet/pages/Main";
import Search from "../../apps/gourmet/pages/Search";
import Restaurant from "../../apps/gourmet/pages/Restaurant";

// types
import { Pages } from "../../types/common";
import { MenuLinkType } from "../../types/common";

// breeze
import Login from "../../auth/Pages/Auth/Login";
import Register from "../../auth/Pages/Auth/Register";
import ForgotPassword from "../../auth/Pages/Auth/ForgotPassword";
import ResetPassword from "../../auth/Pages/Auth/ResetPassword";
import ConfirmPassword from "../../auth/Pages/Auth/ConfirmPassword";
import VerifyEmail from "../../auth/Pages/Auth/VerifyEmail";

export const pageRouter: Pages = {
    common: { auth: Auth, user: UserProfile },
    auth: {
        login: Login,
        register: Register,
        forgot_password: ForgotPassword,
        reset_password: ResetPassword,
        confirm_password: ConfirmPassword,
        verify_email: VerifyEmail,
    },
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
