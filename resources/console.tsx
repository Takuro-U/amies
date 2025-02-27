import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

// Components
import Test from "./test/pages/Test";
import ModalProvider from "./hooks/ModalProvider";
import AuthProvider from "./hooks/AuthProvider";

//types
import { Pages } from "./types/common";

const pageRouter: Pages = {
    console: { home: Test },
};

createInertiaApp({
    resolve: (key) => {
        const [app, page] = key.split("/");
        return pageRouter[app]?.[page];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ModalProvider>
                <AuthProvider authStatus={}>
                    <App {...props} />
                </AuthProvider>
            </ModalProvider>
        );
    },
});
