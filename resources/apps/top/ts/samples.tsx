// ArticleList SAMPLE
import { ArticleType } from "../../../types/top";

export const articles: ArticleType[] = [
    {
        image_path: "../images/thumbnail_0.jpg",
        link: "/",
    },
    {
        image_path: "../images/thumbnail_1.png",
        link: "/",
    },
    {
        image_path: "../images/thumbnail_1.jpg",
        link: "/",
    },
    {
        image_path: "../images/thumbnail_2.png",
        link: "/",
    },
];

// InformationList SAMPLE
import { InformationType } from "../../../types/top";

export const informations: InformationType[] = [
    {
        title: "リニューアルしました。",
        date: [2024, 11, 4],
        link: "/",
    },
    {
        title: "研究室情報を更新しました。",
        date: [2024, 11, 5],
        link: "/",
    },
    {
        title: "グルメ情報を更新しました。",
        date: [2024, 11, 13],
        link: "/",
    },
    {
        title: "不具合を修正しました。",
        date: [2025, 2, 5],
        link: "/",
    },
];

// FooterContent SAMPLE
import { FooterColumnType } from "../../../types/top";

// MEMO: 拡張子を.tsにするとReactNodeがなんやかやでnodeパラメータがバグり散らかすのでいったん.tsxにしてる
export const footerColumn: FooterColumnType[] = [
    {
        heading: "Links",
        node: (
            <nav className="italic">
                <ul>
                    <li><u>-Articles</u></li>
                </ul>
            </nav>
        )
    },
    {
        heading: "Contacts",
        node: (
            <address>
                <p>-hoge: hoge fuga 123-456</p>
            </address>
        )
    }
]