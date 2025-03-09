import React from "react";
import styles from "./MapWindow.module.css";

export default function JuiceMapsWindow({
  position,
  isDragging,
  isActive,
  handleMouseDown,
  handleDismiss,
  handleWindowClick,
  BASE_Z_INDEX,
  ACTIVE_Z_INDEX,
}) {
  return (
    <div 
      style={{
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        top: "50%",
        left: "50%",
        position: "absolute",
        zIndex: isActive ? ACTIVE_Z_INDEX : BASE_Z_INDEX,
      }}
    >
      <div
        onMouseDown={handleMouseDown("juiceMaps")}
        className={styles["window-header"]}
      >
        <div className={styles["header-buttons"]}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss("juiceMaps");
            }}
          >
            x
          </button>
          <button
            className={styles["whats-this-button"]}
            onClick={(e) => {
              e.stopPropagation();
              
              alert("This is a map of Juice Maps!");
            }}
          >
            What's this?
          </button>
        </div>
        <p>Juice Maps</p>
        <div></div>
      </div>

      {/* Map Container */}
      <div className={styles["map-container"]}>
        <div className={styles["pixel-map"]}>
          {/* We'll add markers here later */}
        </div>
        <button className={styles["add-flight-button"]}>
          Add Your Flight Info
        </button>
      </div>
    </div> 
  );
}