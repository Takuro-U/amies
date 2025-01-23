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
                    { string: "Gourmet.", link: "/" },
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
    return (
        <footer
            className={classNames(
                "font-main",
                "w-full bg-white bg-opacity-40 p-2",
                "relative bottom-0 z-10"
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
