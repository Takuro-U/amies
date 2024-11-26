export type InformationType = {
    title: string,
    link: string,
    date: number[3],
}

export type ArticleType = {
    image_path: string,
    link: string,
}

import { ReactNode } from "react"
export type FooterColumnType = {
    heading: string,
    node?: ReactNode,
}
