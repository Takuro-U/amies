import { useEffect, useState } from "react";
import { SnapshotContainer } from "../Organisms/SnapshotContainer";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Cover } from "../Organisms/Cover";

// CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../../styles/snapshotsAnimation.css";
import animation from "../../styles/BackgroundAnimation.module.scss";
import style from "../../styles/Background.module.scss";
import layout from "../../styles/layout.module.scss";

import { image_assets } from "../../ts/sample";

// image_asset から dencity 個だけランダムに抽出
const density: number = 4; // 抽出する枚数 4以上推奨（3以下だと自動スクロールが機能しない）

export default function BackGround() {
    const [slidesPerView, setSlidesPerView] = useState(2);
    const [snapshots, setSnapshots] = useState<string[]>([]);

    // 抽出処理
    const selectSnapshots = () => {
        const newSnapshots: string[] = [];
        for (let i = 0; i < density; i++) {
            let index = 0;
            while (true) {
                index = Math.floor(Math.random() * image_assets.length);
                if (
                    index < image_assets.length &&
                    newSnapshots.indexOf(image_assets[index]) === -1
                ) {
                    newSnapshots.push(image_assets[index]);
                    break;
                }
            }
        }
        setSnapshots(newSnapshots);
    };

    // 初期設定。レンダリング直後に画面サイズに合わせて表示枚数を変更
    useEffect(() => {
        setSlidesPerView(window.innerWidth > 960 ? 3 : 1.2);
    }, []);

    useEffect(() => {
        selectSnapshots();
    }, []);

    // リサイズ時に表示枚数を変更するイベントを登録
    onresize = () => {
        setSlidesPerView(window.innerWidth > 960 ? 3 : 1.2);
    };

    return (
        <>
            <Cover />
            {/* Snapshots */}
            {/* ↓スナップショットが画面端でチラつくのを隠すやつ */}
            <div className={layout.snapshotsMobile}>
                <div
                    className={classNames(
                        layout.snapshots,
                        style.sideFade,
                        "z-10"
                    )}
                ></div>
                <Swiper
                    className={classNames(layout.snapshots, style.wrapper)}
                    modules={[Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    slidesPerView={slidesPerView}
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
                    {snapshots.map((i, key) => (
                        <SwiperSlide key={key}>
                            <SnapshotContainer path={i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Background Circles */}
            <div
                className={classNames(
                    "fixed top-16 w-full h-full z-0",
                    animation.area
                )}
            >
                <ul className={animation.circles}>
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
    );
}
