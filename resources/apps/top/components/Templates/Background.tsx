import { SnapshotContainer } from "../Organisms/SnapshotContainer";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import Cover from "./Cover";

// CSS
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import animation from "../../styles/BackgroundAnimation.module.scss";
import layout from "../../styles/layout.module.scss";

import { image_assets } from "../../ts/samples";

// image_asset から dencity 個だけランダムに抽出
const snapshots: string[] = [];
const density: number = 4; // 抽出する枚数

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
    return (
        <>
        <Cover/>
        {/* Snapshots */}
            {/* { snapshots.map((i, index)=> <SnapshotContainer path={ i } delta={ index } key={ index } />)} */}
        <Swiper 
            className={layout.snapshots}
            modules={[Autoplay, EffectCoverflow]
            }
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{
                delay: 2000,
            }}
            loop={true}
        >
            { snapshots.map((i, key)=><SwiperSlide className="bg-red-500 p-4 flex" key={ key }><img src={ i } className="object-full"/></SwiperSlide>)}
        </Swiper>
 
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