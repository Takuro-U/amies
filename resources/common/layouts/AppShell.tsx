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
    const [reload, setReload] = useState(false); //ヘッダー等再描画用のフラグ
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const { modalStatus, closeModal } = useModalContext();

    useEffect(() => {
        let isMounted = true;

        const handleFinish = () => {
            if (isMounted) {
                setReload((prev) => !prev); //Inertiaの再描画完了時にreloadのトグルを走らせる(AppShellはInertiaで再レンダリングされないので必須)
                //ついでにModalとMenuを閉じる
                closeModal();
                setMenuIsOpen(false);
            }
        };

        Inertia.on("finish", handleFinish);

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
            <BackToPageTopButton />
            <div className="flex-grow">
            {modalStatus.isOpen && <Modal />}
            {children}
            </div>
            <Footer />
        </div>
    );
};

export default AppShell;
