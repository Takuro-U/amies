// React-Hooks
import React, { useEffect, useState } from "react";

// Custom-Hooks
import { useAuthContext } from "../../hooks/AuthProvider";

// Components
import ModalProvider, { useModalContext } from "../../hooks/ModalProvider";
import Header from "../components/Templetes/Header";
import Footer from "../components/Templetes/Footer";
import { BackToPageTopButton } from "../components/Organism/BackToPageTopButton";

//etc.
import { Inertia } from "@inertiajs/inertia";
import Modal from "../components/Templetes/Modal";

// styles
import "../../util/styles/_fonts.scss";

type PROPS = {
    children: React.ReactNode;
};

const AppShell: React.FC<PROPS> = ({ children }) => {
    //ヘッダー等再描画用のフラグ
    const [reload, setReload] = useState(false);

    const { modalStatus } = useModalContext();
    const { authStatus, login, logout } = useAuthContext();

    useEffect(() => {
        //ローカルストレージからユーザー情報を再取得してログイン
        const storedStatus = localStorage.getItem("authStatus");
        if (storedStatus) {
            const parsedData = JSON.parse(storedStatus);
            login(parsedData);
        }

        //Inertiaの再描画完了時にreloadのトグルを走らせる
        //AppShellはInertiaでは再レンダリングされないので必須
        const handleFinish = () => {
            console.log("描画完了");
            setReload((prev) => !prev);
        };

        Inertia.on("finish", handleFinish);
    }, []);

    return (
        <div>
            <Header />
            {modalStatus.isOpen && <Modal />}
            {children}
            <Footer />
            <BackToPageTopButton/>
        </div>
    );
};

export default AppShell;
