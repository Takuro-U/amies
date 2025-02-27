import React from "react";

// Custom-Hooks
import { useAuthContext } from "../../../hooks/AuthProvider";

// Components
import MenuLink from "./MenuLink";

//etc.
import { Link } from "@inertiajs/react";

const AuthInfoHeader: React.FC = () => {
    const { authStatus } = useAuthContext();

    return (
        <div>
            {authStatus.user && authStatus.check ? (
                //ユーザー表示
                <>
                    <Link href="/user">{authStatus.user.name}</Link>
                </>
            ) : (
                //ログインボタン
                <>
                    <Link href="/auth">ログイン</Link>
                </>
            )}
        </div>
    );
};

const AuthInfoMenu: React.FC = () => {
    const { authStatus } = useAuthContext();

    return (
        <div>
            {authStatus.user && authStatus.check ? (
                //ユーザー表示
                <MenuLink
                    link={{
                        label: authStatus.user.name,
                        route: "/",
                    }}
                />
            ) : (
                <MenuLink
                    link={{
                        label: "LOGIN",
                        route: "login",
                    }}
                />
            )}
        </div>
    );
};

const AuthInfo = {
    AuthInfoHeader,
    AuthInfoMenu,
};

export default AuthInfo;
