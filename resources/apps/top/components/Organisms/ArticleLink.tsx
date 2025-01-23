import { FC } from "react";
import { Link } from "@inertiajs/react";
import { ArticleType } from "../../../../types/top";
import { route } from "ziggy-js";
import { RandomZoom } from "./MotionContainer";

export const ArticleLink: FC<ArticleType> = (article: ArticleType) => {
    return (
        <RandomZoom>
            <Link href={route(article.link)}>
                <article>
                    <img
                        src={article.image_path}
                        className="object-cover w-full"
                    />
                </article>
            </Link>
        </RandomZoom>
    );
};
