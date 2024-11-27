import { FC } from "react";
import { ArticleType } from "../../../../types/top";
import { route } from "ziggy-js";
import { RandomZoom } from "./MotionContainer";

export const ArticleLink: FC<ArticleType> = ( article: ArticleType)=>{
    return (
        <RandomZoom>
        <a href={ route(article.link) }>
            <article>
                <img src={ article.image_path } className="object-cover"/>
            </article>
        </a>
        </RandomZoom>
    )
}