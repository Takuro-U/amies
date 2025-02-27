// top
import TopMain from "../../apps/top/pages/Main";

//profile
import Profile from "../pages/Profile";
import Edit from "../../auth/Pages/Profile/Edit";

// gourmet
import GourmetMain from "../../apps/gourmet/pages/Main";
import Search from "../../apps/gourmet/pages/Search";
import Restaurant from "../../apps/gourmet/pages/Restaurant";

// types
import { Pages } from "../../types/common";
import { MenuLinkType } from "../../types/common";

// auth
import Login from "../../auth/Pages/Auth/Login";
import Register from "../../auth/Pages/Auth/Register";
import VerifyEmail from "../../auth/Pages/Auth/VerifyEmail";
import ForgotPassword from "../../auth/Pages/Auth/ForgotPassword";
import ResetPassword from "../../auth/Pages/Auth/ResetPassword";
import ConfirmPassword from "../../auth/Pages/Auth/ConfirmPassword";

// test
import Dashboard from "../../auth/Pages/Dashboard";

export const pageRouter: Pages = {
    test: { dash_board: Dashboard },
    profile: { main: Profile, edit: Edit },
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
