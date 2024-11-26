import { Heading } from "../Organisms/Heading";
import { Section } from "../Organisms/Section";
import { ArticleLink } from "../Organisms/ArticleLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { route } from "ziggy-js";

// CSS
import 'swiper/css';
import 'swiper/css/scrollbar';

type Props = {
    label: string,
    link: string,
}

// SAMPLE DATA
import { articles } from "../../ts/samples";

export default function ArticleList( props: Props ){
    return (
        <Section className="h-46">
            <Heading label={ props.label }/>
            <Swiper
                modules={[Scrollbar]}
                slidesPerView={3}
                scrollbar={{draggable: true}}
            >
            { articles.map((i,key)=><SwiperSlide key={ key } className="bg-gray-600 my-4 mx-2 w-[30vw] h-[30vw]"><ArticleLink {...i}/></SwiperSlide>) }
            </Swiper>
            <a href={ route(props.link) }><div className="border border-neutral-600 w-28 m-auto my-2 rounded-md text-center">▷記事一覧</div></a>
        </Section>
    )
}