import { createContext, useContext, useEffect } from "react";

type PROPS = {
    children: React.ReactNode;
    pageStates: Record<string, any>;
    setPageStates: Record<string, React.Dispatch<React.SetStateAction<any>>>;
};

type PageStates = {
    pageStates: { [key: string]: any };
    setPageStates: { [key: string]: React.Dispatch<React.SetStateAction<any>> };
};

const defaultContext: PageStates = {
    pageStates: {},
    setPageStates: {} as Record<
        string,
        React.Dispatch<React.SetStateAction<any>>
    >,
};

const PageStatesContext = createContext(defaultContext);

export const usePageStatesContext = () => {
    return useContext(PageStatesContext);
};

export const PageStatesProvider: React.FC<PROPS> = (props) => {
    const { children, pageStates, setPageStates } = props;

    return (
        <div>
            <PageStatesContext.Provider value={{ pageStates, setPageStates }}>
                {children}
            </PageStatesContext.Provider>
        </div>
    );
};

export default PageStatesProvider;
