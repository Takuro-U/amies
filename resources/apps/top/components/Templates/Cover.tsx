import classNames from "classnames";

import layout from "../../styles/layout.module.scss";

export default function Cover(){
    return (
        <div className={classNames(layout.cover, "relative z-10")}>
            <div className={classNames("m-auto", "w-96")}>
                <img src="../images/logo_720p.png"/>
                <h1 
                    className={classNames(
                        "text-center text-6xl font-bold", 
                        "text-red-300",
                    )}
                    style={{
                        textShadow: "4px 4px 6px black",
                    }}
                >A<span className="text-red-400">Mie</span>'s</h1>
                <p
                    className={classNames(
                        "leading-10",
                        "text-center text-2xl font-bold",
                        "text-gray-400"
                    )}>~ Find Your Amusement ~</p>
            </div>
        </div>
    )
}