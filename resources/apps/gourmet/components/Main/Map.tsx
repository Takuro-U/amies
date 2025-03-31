import React, { useEffect } from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";
import "leaflet/dist/leaflet.css";

// Modules
import classNames from "classnames";
import L from "leaflet";

type PROPS = {
    restaurants: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
    }[];
};
const Map: React.FC<PROPS> = (props) => {
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

    const coordOfUniversity = {
        latitude: dmsToDecimal(34, 44, 46.78),
        longitude: dmsToDecimal(136, 31, 21.46),
    };

    const initialZoomLevel = 15;

    useEffect(() => {
        const map = L.map("map").setView(
            [coordOfUniversity.latitude, coordOfUniversity.longitude],
            initialZoomLevel
        );

        const icon = (url: string, size: number) => {
            return L.icon({
                iconUrl: url,
                iconSize: [size, size],
                iconAnchor: [size / 2, size],
                popupAnchor: [0, -size],
            });
        };

        const icons = {
            university: icon("/images/gourmet/university.png", 30),
            restaurant: icon("/images/gourmet/restaurant.png", 30),
        };

        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '<a href="https://www.openstreetmap.org/copyright" target="_blank">©OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([dmsToDecimal(34, 44, 46.78), dmsToDecimal(136, 31, 21.46)], {
            icon: icons.university,
        })
            .addTo(map)
            .bindPopup("三重大学 正門", {
                className: styles.customPopup,
            });

        props.restaurants.forEach((restaurant) => {
            L.marker([restaurant.latitude, restaurant.longitude], {
                icon: icons.restaurant,
            })
                .addTo(map)
                .bindPopup(restaurant.name, {
                    className: styles.customPopup,
                });
        });

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
