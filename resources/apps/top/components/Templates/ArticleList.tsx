import { ReactNode } from "react";
import { Heading } from "../Organisms/Heading";
import { Section } from "../Organisms/Section";
import { ArticleLink } from "../Organisms/ArticleLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";
import { route } from "ziggy-js";
import { ScrollHopping } from "../Organisms/MotionContainer";
import { Link } from "@inertiajs/react";

// CSS
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

type Props = {
    label: string;
    link: string;
    icon: ReactNode;
};

// SAMPLE DATA
import { articles } from "../../ts/sample";

export default function ArticleList(props: Props) {
    return (
        <ScrollHopping>
            <Section>
                <Heading label={props.label} icon={props.icon} />
                <Swiper
                    className="h-32"
                    modules={[Scrollbar, FreeMode]}
                    slidesPerView={"auto"}
                    scrollbar={{ draggable: true }}
                    freeMode={true}
                >
                    {articles.map((i, key) => (
                        <SwiperSlide
                            key={key}
                            style={{width: "auto", display: "flex", alignItems: "center", marginRight: "10px", marginLeft: "10px"}}
                        >
                            <ArticleLink {...i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href={route(props.link)}>
                    <div className="border border-neutral-600 w-28 m-auto my-2 rounded-md text-center">
                        ▷記事一覧
                    </div>
                </Link>
            </Section>
        </ScrollHopping>
    );
}
