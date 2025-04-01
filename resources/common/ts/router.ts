// top
import TopMain from "../../apps/top/pages/Main";

//profile
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

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

// console_admin
import AdminConsole from "../../console/admin/pages/ConsolePage";
import UserCreator from "../../console/admin/pages/UserCreator";
import RestaurantList from "../../console/admin/pages/RestaurantList";
import OtherManager from "../../console/admin/pages/OtherManager";

// console_restaurant
import EditRestaurant from "../../console/restaurant/pages/EditRestaurant";
import EditMenus from "../../console/restaurant/pages/EditMenus";

export const pageRouter: Pages = {
    auth: {
        login: Login,
        register: Register,
        forgot_password: ForgotPassword,
        reset_password: ResetPassword,
        confirm_password: ConfirmPassword,
        verify_email: VerifyEmail,
    },
    profile: { main: Profile, edit: EditProfile },
    top: { main: TopMain },
    gourmet: { main: GourmetMain, search: Search, restaurant: Restaurant },
};

export const consoleRouter: Pages = {
    admin: {
        main: AdminConsole,
        user_creator: UserCreator,
        restaurant_list: RestaurantList,
        etc: OtherManager,
    },
    restaurant: {
        edit: EditRestaurant,
        edit_menus: EditMenus,
    },
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
