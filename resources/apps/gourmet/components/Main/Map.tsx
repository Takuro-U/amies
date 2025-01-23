import React from "react";

// Styles
import styles from "./../../styles/Gourmet.module.scss";

// Modules
import classNames from "classnames";

const Map: React.FC = () => {
    return (
        <div className={styles.mapContainer}>
            {/* ↓仮のMAP↓ */}
            <div
                className={classNames(
                    "flex items-center justify-center",
                    "w-[90%] h-full",
                    "border"
                )}
            >
                <h1>まっぷ</h1>
            </div>
        </div>
    );
};

export default Map;
