// React-Hooks
import React, { useEffect, useState } from "react";

// Custom-Hooks
import { useAuthContext } from "../../hooks/AuthProvider";

// Components
import ModalProvider, { useModalContext } from "../../hooks/ModalProvider";
import { BackToPageTopButton } from "../components/Organism/BackToPageTopButton";
import Header from "../components/Templetes/Header";
import Footer from "../components/Templetes/Footer";

//etc.
import { Inertia } from "@inertiajs/inertia";
import Modal from "../components/Templetes/Modal";

import "../../util/styles/_fonts.scss";

type PROPS = {
    children: React.ReactNode;
};

const AppShell: React.FC<PROPS> = ({ children }) => {
    //ヘッダー等再描画用のフラグ
    const [reload, setReload] = useState(false);

    const { modalStatus, closeModal } = useModalContext();

    useEffect(() => {
        let isMounted = true;

        //Inertiaの再描画完了時にreloadのトグルを走らせる
        //AppShellはInertiaでは再レンダリングされないので必須
        const handleFinish = () => {
            if (isMounted) {
                setReload((prev) => !prev);
                //ついでにModalを閉じる
                closeModal();
            }
        };

        Inertia.on("finish", handleFinish);

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <Header />
            <BackToPageTopButton />
            {modalStatus.isOpen && <Modal />}
            {children}
            <Footer />
        </div>
    );
};

export default AppShell;
