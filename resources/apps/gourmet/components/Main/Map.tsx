import React, { useEffect } from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";
import "leaflet/dist/leaflet.css";

// Modules
import classNames from "classnames";
import L from "leaflet";

const Map: React.FC = () => {
    const dmsToDecimal = (
        degrees: number,
        minutes: number,
        seconds: number
    ) => {
        return degrees + minutes / 60 + seconds / 3600;
    };

    const updateStyles = (
        classList: string,
        styles: { [key: string]: any }
    ) => {
        document.querySelectorAll(classList).forEach((element) => {
            const attribution = element as HTMLElement;
            Object.keys(styles).forEach((key) => {
                (attribution.style as any)[key] = styles[key];
            });
        });
    };

    useEffect(() => {
        const map = L.map("map").setView(
            [dmsToDecimal(34, 44, 46.78), dmsToDecimal(136, 31, 21.46)],
            15
        );

        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '<a href="https://www.openstreetmap.org/copyright" target="_blank">©OpenStreetMap</a> contributors',
        }).addTo(map);

        updateStyles(
            ".leaflet-control-attribution, .leaflet-control-attribution a, .leaflet-control-attribution span",
            { fontSize: "14px" }
        );

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className={styles.mapContainer}>
            {/* ↓仮のMAP↓ */}
            <div
                className={classNames(
                    "flex items-center justify-center",
                    "w-[90%] h-full overflow-hidden",
                    "border"
                )}
            >
                <div id="map" style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default Map;
