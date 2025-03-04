import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { SetupOptions } from "@inertiajs/react/types/createInertiaApp";
import { Inertia } from "@inertiajs/inertia";
import { PageProps } from "@inertiajs/core";
import "./app.css";

//router
import { pageRouter } from "./common/ts/router";

//components
import AuthProvider from "./hooks/AuthProvider";
import ModalProvider from "./hooks/ModalProvider";
import AppShell from "./common/layouts/AppShell";

declare global {
    interface Window {
        currentPrefix: string;
    }
}

createInertiaApp({
    resolve: (key) => {
        const [app, page] = key.split("/");
        return pageRouter[app]?.[page];
    },
    setup({ el, App, props }: SetupOptions<HTMLElement, PageProps>) {
        const root = createRoot(el);

        document.getElementById("initial-content")?.remove();

        const renderApp = (authStatus: any) => {
            root.render(
                <AuthProvider authStatus={authStatus}>
                    <ModalProvider>
                        <AppShell>
                            <App {...props} />
                        </AppShell>
                    </ModalProvider>
                </AuthProvider>
            );
        };

        renderApp(props.initialPage.props.auth);

        Inertia.on("navigate", (event) => {
            console.log("Navigated to a new page:", event.detail.page.url);
            renderApp(event.detail.page.props.auth);
        });

        Inertia.on("before", (event) => {
            const path = window.location.pathname;
            const prefix = path.split("/")[1];

            event.detail.visit.headers["X-Previous-Prefix"] = prefix;
        });
    },
});
