import React from "react";
import { usePage } from "@inertiajs/react";
// Custom-Hooks
import { useAuthContext } from "../../hooks/AuthProvider";

// etc.
import { Link } from "@inertiajs/react";
import classNames from "classnames";

const Profile: React.FC = () => {
    const user = usePage().props.auth.user;

    return (
        <div className="bg-slate-50 py-10">
            <div className="flex flex-col items-center w-full">
                <img className="rounded-full w-[100px] h-[100px] bg-white" />
                <p className="py-1">{user.nickname}</p>
                <Link
                    href="/profile/edit"
                    className={classNames(
                        "flex justify-center items-center",
                        "w-[80%] h-[35px] my-1",
                        "rounded-md",
                        "text-white bg-slate-500"
                    )}
                >
                    プロフィール編集
                </Link>
                <Link
                    href="/"
                    className={classNames(
                        "flex justify-center items-center",
                        "w-[80%] h-[35px] my-1",
                        "rounded-md",
                        "text-white bg-slate-500"
                    )}
                >
                    ログアウト
                </Link>
            </div>
        </div>
    );
};

export default Profile;
