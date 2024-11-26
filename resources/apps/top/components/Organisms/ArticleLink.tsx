import { FC } from "react";
import { ArticleType } from "../../../../types/top";
import { route } from "ziggy-js";

export const ArticleLink: FC<ArticleType> = ( article: ArticleType)=>{
    return (
        <a href={ route(article.link) }>
            <article>
                <img src={ article.image_path } className="object-cover"/>
            </article>
        </a>
    )
}