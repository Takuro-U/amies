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
            {authStatus.isAuthenticated ? (
                //ユーザー表示
                <>
                    <Link href="/user">{authStatus.username}</Link>
                </>
            ) : (
                //ログインボタン
                <>
                    <Link href="/auth">Login</Link>
                </>
            )}
        </div>
    );
};

const AuthInfoMenu: React.FC = () => {
    const { authStatus, logout } = useAuthContext();

    return (
        <div>
            {authStatus.isAuthenticated ? (
                //ユーザー表示
                <MenuLink
                    link={{
                        label: authStatus.username,
                        route: "/user",
                    }}
                />
            ) : (
                <MenuLink
                    link={{
                        label: "LOGIN",
                        route: "/auth",
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
