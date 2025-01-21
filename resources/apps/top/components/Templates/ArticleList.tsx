import { ReactNode } from "react";
import { Heading } from "../Organisms/Heading";
import { Section } from "../Organisms/Section";
import { ArticleLink } from "../Organisms/ArticleLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";
import { route } from "ziggy-js";
import { ScrollHopping } from "../Organisms/MotionContainer";

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
                    modules={[Scrollbar, FreeMode]}
                    slidesPerView={2.3}
                    scrollbar={{ draggable: true }}
                    freeMode={true}
                >
                    {articles.map((i, key) => (
                        <SwiperSlide
                            key={key}
                            className="bg-gray-600 my-4 mx-2"
                        >
                            <ArticleLink {...i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <a href={route("/")}>
                    <div className="border border-neutral-600 w-28 m-auto my-2 rounded-md text-center">
                        ▷記事一覧
                    </div>
                </a>
            </Section>
        </ScrollHopping>
    );
}
