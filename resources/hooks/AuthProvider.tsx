import { createContext, useContext, useState, useEffect } from "react";
import { AuthStatus } from "../types/common";

type PROPS = {
    children: React.ReactNode;
    authStatus: AuthStatus;
};

const defaultContext: {
    authStatus: AuthStatus;
} = {
    authStatus: {
        user: null,
        check: false,
    },
};

const AuthContext = createContext(defaultContext);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<PROPS> = ({ children, authStatus }) => {
    console.log(authStatus);

    return (
        <div>
            <AuthContext.Provider value={{ authStatus }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
