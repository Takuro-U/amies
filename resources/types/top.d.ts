export type StringWithLink = {
    string: string;
    link?: string;
};

export type InformationType = {
    title: string;
    link: string;
    date: number[3];
};

export type ArticleType = {
    image_path: string;
    link: string;
};

// import { ReactNode } from "react"
export type FooterColumnType = {
    heading: string;
    node: FooterColumnNodeType[];
};

type FooterColumnNodeType = {
    label?: string;
    children: StringWithLink[];
};
