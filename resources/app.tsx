import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "./app.css";

//router
import { pageRouter } from "./common/ts/router";

//components
import AuthProvider from "./hooks/AuthProvider";
import AppShell from "./common/layouts/AppShell";

createInertiaApp({
    resolve: (key) => {
        const [app, page] = key.split("/");
        return pageRouter[app]?.[page];
    },
    setup({ el, App, props }) {
        Inertia.on("navigate", (event) => {
            console.log("Navigated to a new page:", event.detail.page.url);
        });
        const root = createRoot(el);

        document.getElementById("initial-content")?.remove();

        root.render(
            <AuthProvider>
                <AppShell>
                    <App {...props} />
                </AppShell>
            </AuthProvider>
        );
    },
});
