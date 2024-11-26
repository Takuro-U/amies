// Components
import { Heading } from "../Organisms/Heading";
import { Section } from "../Organisms/Section";
import { InformationLink } from "../Organisms/InformationLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

// CSS
import "swiper/css";
import "swiper/css/scrollbar";


// SAMPLE DATA
import { informations } from "../../ts/samples";

export default function Information(){
    return (
        <Section className="h-40">
            <Heading label="Information"/>
            <Swiper 
                modules={[Scrollbar]} 
                scrollbar={{
                    draggable: true,
                }}  
                slidesPerView={3}
                direction={"vertical"} 
                className="h-32"
                >
                { informations.map((i, key)=><SwiperSlide key={ key }><InformationLink {...i} /></SwiperSlide>)}
            </Swiper>
        </Section>
    )
}