// Components
import { Heading } from "../Organisms/Heading";
import { Section } from "../Organisms/Section";
import { InformationLink } from "../Organisms/InformationLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { ScrollHopping } from "../Organisms/MotionContainer";
import { InformationIcon } from "../Organisms/SvgIcons";

// CSS
import "swiper/css";
import "swiper/css/scrollbar";
import layout from "../../styles/layout.module.scss";

// SAMPLE DATA
import { informations } from "../../ts/samples";

export default function Information(){
    return (
        <ScrollHopping instantFire={true}  className={ layout.information }>
        <Section>
            <Heading label="Information" icon={<InformationIcon/>}/>
            <Swiper 
                modules={[Scrollbar]} 
                scrollbar={{
                    draggable: true,
                }}  
                slidesPerView={3}
                direction={"vertical"} 
                className="h-28"
                >
                { informations.map((i, key)=><SwiperSlide key={ key }><InformationLink {...i} /></SwiperSlide>)}
            </Swiper>
        </Section>
        </ScrollHopping>
    )
}