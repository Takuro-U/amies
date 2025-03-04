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
            {authStatus.user ? (
                //ユーザー表示
                <>
                    <Link href="/profile">プロフィール</Link>
                </>
            ) : (
                //ログインボタン
                <>
                    <Link href="/auth/login">ログイン</Link>
                </>
            )}
        </div>
    );
};

const AuthInfoMenu: React.FC = () => {
    const { authStatus } = useAuthContext();

    return (
        <div>
            {authStatus.user ? (
                //ユーザー表示
                <MenuLink
                    link={{
                        label: "プロフィール",
                        route: "/profile",
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
