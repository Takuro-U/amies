import { createContext, useContext, useState, useEffect } from "react";
import { AuthStatus } from "../types/common";

import { Inertia } from "@inertiajs/inertia";

type PROPS = {
    children: React.ReactNode;
    authProps: any;
};

const defaultAuthStatus: AuthStatus = {
    isAuthenticated: false,
    id: "",
    username: "",
};

const defaultContext = {
    authStatus: defaultAuthStatus,
    login: (newStatus: AuthStatus) => {},
    logout: () => {},
};

const AuthContext = createContext(defaultContext);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<PROPS> = ({ children, authProps }) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>(defaultAuthStatus);

    console.log(authProps);

    //認証チェックは済んだ前提
    const login = (newStatus: AuthStatus) => {
        setAuthStatus(newStatus);
        localStorage.setItem("authStatus", JSON.stringify(newStatus));
    };

    const logout = () => {
        setAuthStatus(defaultAuthStatus);
        localStorage.removeItem("authStatus");
    };

    return (
        <div>
            <AuthContext.Provider value={{ authStatus, login, logout }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
