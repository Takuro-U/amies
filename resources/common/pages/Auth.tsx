import React from "react";

// Custom-Hooks
import { useAuthContext } from "../../hooks/AuthProvider";

// etc.
import { Link } from "@inertiajs/react";

const Auth: React.FC = () => {
    const { login } = useAuthContext();

    return (
        <div>
            <h1>認証ページやで</h1>
            {/* 非常に適当なログイン処理(仮) */}
            <Link
                href="/user"
                onClick={() =>
                    login({
                        isAuthenticated: true,
                        id: "hogehoge",
                        username: "test-user",
                    })
                }
                className="underline"
            >
                ログイン
            </Link>
        </div>
    );
};

export default Auth;
