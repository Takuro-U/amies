import React from "react";

// Custom-Hooks
import { useAuthContext } from "../../hooks/AuthProvider";

// etc.
import { Link } from "@inertiajs/react";

const UserProfile: React.FC = () => {
    const { logout } = useAuthContext();

    return (
        <>
            <h1>ユーザーページやで</h1>
            {/* 非常に適当なログアウト処理(仮) */}
            <Link href="/" onClick={logout} className="underline">
                ログアウト
            </Link>
        </>
    );
};

export default UserProfile;
