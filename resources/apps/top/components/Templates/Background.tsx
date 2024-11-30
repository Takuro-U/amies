import { SnapshotContainer } from "../Organisms/SnapshotContainer";

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
        <div className="fixed top-[6rem] z-0">
            {/* Snapshots */}
            { snapshots.map((i, index)=> <SnapshotContainer path={ i } delta={ index } key={ index } />)}
        </div>
    )
}