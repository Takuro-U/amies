import { useEffect, useState } from "react";
import { SnapshotContainer } from "../Organisms/SnapshotContainer";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Cover } from "../Organisms/Cover";
import { FadeIn } from "../Organisms/MotionContainer";
import { BackgroundBase } from "../../../../util/components/BackgroundBase";

// CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../../styles/snapshotsAnimation.css";
import style from "../../styles/Background.module.scss";
import layout from "../../styles/layout.module.scss";

import { image_assets } from "../../ts/sample";

// image_asset から dencity 個だけランダムに抽出
const density: number = 4; // 抽出する枚数 4以上推奨（3以下だと自動スクロールが機能しない）

export default function BackGround() {
    const [delay, setdelay] = useState(200);
    const [snapshots, setSnapshots] = useState<string[]>([]);
    const [allowLoop, setAllowLoop] = useState<boolean>(false);

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

    // 初期設定。レンダリング直後
    useEffect(() => {
        selectSnapshots();
        setAllowLoop(true);
        setdelay(0); //なんか更新してやらないとオートスクロールが機能しないので無理やり更新
    }, []);

    return (
        <>
            <Cover />
            {/* Snapshots */}
            <FadeIn delay={0.5}>
                <div className={layout.snapshotsMobile}>
                    {/* ↓スナップショットが画面端でチラつくのを隠すやつ */}
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
                        slidesPerView={1.2}
                        breakpoints={{
                            960: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: delay,
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
                        loop={ allowLoop }
                    >
                        {snapshots.map((i, key) => (
                            <SwiperSlide key={key}>
                                <SnapshotContainer path={i} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </FadeIn>
            {/* Background Circles */}
            <BackgroundBase className={style.bgBase} />
        </>
    );
}
