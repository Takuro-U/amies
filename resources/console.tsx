import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

// Components
import Test from "./test/pages/Test";
import ModalProvider from "./hooks/ModalProvider";
import ConsoleAuthProvider from "./hooks/ConsoleAuthProvider";

//types
import { Pages } from "./types/types";

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
                <ConsoleAuthProvider>
                    <App {...props} />
                </ConsoleAuthProvider>
            </ModalProvider>
        );
    },
});
