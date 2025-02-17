import React, { useEffect, useRef } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { usePageStatesContext } from "../../../../../../hooks/PageStatesProvider";

const Map: React.FC = () => {
    const { pageStates } = usePageStatesContext();

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

    const latitude = dmsToDecimal(34, 44, 53.78);
    const longitude = dmsToDecimal(136, 31, 27.46);

    useEffect(() => {
        const map = L.map("map").setView([latitude, longitude], 15);

        const universityIcon = L.icon({
            iconUrl: "/images/gourmet/university.png",
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -40],
        });

        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '<a href="https://www.openstreetmap.org/copyright" target="_blank">©OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(pageStates.pageProps.restaurant.name);

        L.marker([dmsToDecimal(34, 44, 46.78), dmsToDecimal(136, 31, 21.46)], {
            icon: universityIcon,
        })
            .addTo(map)
            .bindPopup("三重大学 正門");

        updateStyles(
            ".leaflet-control-attribution, .leaflet-control-attribution a, .leaflet-control-attribution span",
            { fontSize: "14px" }
        );

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="px-[5%] py-[7%] h-[300px] overflow-hidden">
            <div id="map" style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default Map;
