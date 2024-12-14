import { useEffect, useState } from "react";
import { SnapshotContainer } from "../Organisms/SnapshotContainer";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Cover } from "../Organisms/Cover";

// CSS
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import '../../styles/snapshotsAnimation.css';
import animation from "../../styles/BackgroundAnimation.module.scss";
import layout from "../../styles/layout.module.scss";


import { image_assets } from "../../ts/samples";

// image_asset から dencity 個だけランダムに抽出
const snapshots: string[] = [];
const density: number = 3; // 抽出する枚数

// 抽出処理
for(let i = 0;i < density;i++){
    let index = 0;
    while(true) {
        index = Math.round(Math.random()*Math.pow(10, density));
        if(index < image_assets.length && snapshots.indexOf(image_assets[index])===-1){
            snapshots.push(image_assets[index]);
            break;
        }
    }
}

export default function BackGround (){
    const [slidesPerView, setSlidesPerView] = useState(2);
    
    useEffect(()=>{
        setSlidesPerView((window.innerWidth > 960) ? 3 : 1.2);
    },[]);

    onresize=()=>{
        setSlidesPerView((window.innerWidth > 960) ? 3 : 1.2); 
    }

    return (
        <>
        <Cover/>
        {/* Snapshots */}
        <div className={ layout.snapshotsMobile }>
        <Swiper 
            className={layout.snapshots}
            modules={[Autoplay, EffectCoverflow]
            }
            effect="coverflow"
            slidesPerView={ slidesPerView }
            autoplay={{
                delay: 0,
            }}
            coverflowEffect={{
                rotate: 15,
                stretch: 0.6,
                depth: 30,
                modifier: 1,
                scale: 0.9,
                slideShadows: false,
            }}
            speed={20000}
            loop={true}
        >
            { snapshots.map((i, key)=><SwiperSlide key={ key }><SnapshotContainer path={ i }/></SwiperSlide>)}
        </Swiper>
        </div>
        {/* Background Circles */}
        <div className={classNames("fixed top-16 w-full h-full z-0", animation.area)}>
            <ul className={ animation.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
        </div>
        </>
    )
}