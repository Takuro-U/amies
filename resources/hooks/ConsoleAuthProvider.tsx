import { useContext, createContext, useState } from "react";

type PROPS = {
    children: React.ReactNode;
};

const defaultAuthStatus = {
    //認証状態
};

const defaultContext = {
    authStatus: defaultAuthStatus,
};

const ConsoleAuthContext = createContext(defaultContext);

export const useConsoleAuthContext = () => {
    return useContext(ConsoleAuthContext);
};

export const ConsoleAuthProvider: React.FC<PROPS> = ({ children }) => {
    const [authStatus, setAuthStatus] = useState(defaultAuthStatus);
    return (
        <div>
            <ConsoleAuthContext.Provider value={{ authStatus }}>
                {children}
            </ConsoleAuthContext.Provider>
        </div>
    );
};

export default ConsoleAuthProvider;
