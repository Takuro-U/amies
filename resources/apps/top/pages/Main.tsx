import React from "react";
import { useAuthContext } from "../../../hooks/AuthProvider";
import { Link } from "@inertiajs/react";

const Main: React.FC = () => {
    const { authStatus, login, logout } = useAuthContext();

    return (
        <div>
            <h1>トップページやで</h1>
        </div>
    );
};

export default Main;
