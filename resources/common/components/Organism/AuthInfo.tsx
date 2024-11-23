import React from "react";

// Custom-Hooks
import { useAuthContext } from "../../../hooks/AuthProvider";

//etc.
import { Link } from "@inertiajs/react";

const AuthInfo: React.FC = () => {
    const { authStatus } = useAuthContext();

    return (
        //あんまり作り込んでません
        <div>
            {authStatus.isAuthenticated ? (
                //ユーザー表示
                <>
                    <span>{authStatus.username}</span>
                </>
            ) : (
                //ログインボタン
                <>
                    <Link href="/auth"></Link>
                </>
            )}
        </div>
    );
};

export default AuthInfo;
