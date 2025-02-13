import { useRef, useEffect } from "react";

import { FooterColumn } from "../Organism/FooterColumn";
import classNames from "classnames";
import { FooterColumnType } from "../../../types/top";

import styles from "../../styles/Footer.module.scss";

// SAMPLE DATA
const footerColumn: FooterColumnType[] = [
    {
        heading: "Links",
        node: [
            {
                label: "AMie's",
                children: [
                    { string: "TOP", link: "/" },
                    { string: "Gourmet.", link: "/gourmet" },
                ],
            },
        ],
    },
    {
        heading: "Contacts",
        node: [
            {
                label: "株式会社プロジェクトM",
                children: [{ string: "住所：三重県津市hogefuga" }],
            },
        ],
    },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    const positionSetter =()=>{
        if(footerRef.current){
            const footer = footerRef.current;
            if(document.body.clientHeight < window.innerHeight) footer.style.position = "absolute";
            else footer.style.position = "relative";
            console.log(footer.style.position);
        }
    }
    
    const heightObserver = new ResizeObserver(() => {
        positionSetter();
    });

    // useEffect(()=>{
    //     heightObserver.observe(document.body)
    // }, []);

    return (
        <footer
            ref={ footerRef }
            className={classNames(
                "font-main",
                "w-full bg-white bg-opacity-40 p-2",
                "relative z-10"
            )}
        >
            <h1 className="text-xl">AMie's</h1>
            <div className={styles.container}>
                {footerColumn.map((col, key) => (
                    <FooterColumn
                        key={key}
                        heading={col.heading}
                        node={col.node}
                    />
                ))}
            </div>
        </footer>
    );
}
