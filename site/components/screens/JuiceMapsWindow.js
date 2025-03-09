import React, { useState } from "react";
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

    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
    const [isDraggingMap, setIsDraggingMap] = useState(false);

    const handleZoomClick = () => {
        setIsZoomedIn(!isZoomedIn);
        if (isZoomedIn) {
            setMapOffset({ x: 0, y: 0 });
          }
      };
    
      const handleMapMouseDown = (e) => {
        if (isZoomedIn) {
          setIsDraggingMap(true);
          e.preventDefault();
        }
      };
    
    
      const handleMapMouseUp = () => {
        setIsDraggingMap(false);
      };

      const mapImage = new Image();
      mapImage.src = "/pixel-art-world-map.png";

      const handleMapMouseMove = (e) => {
        if (isDraggingMap && isZoomedIn) {
          const newOffsetX = mapOffset.x + e.movementX;
          const newOffsetY = mapOffset.y + e.movementY;
      
          
          const maxX = 0; 
          const maxY = 0; 

          const minX = -(mapImage.width * 2 - 700) * 0.95;
          const minY = -(mapImage.height * 2 - 530) / 1.5;
      
          
          const clampedOffsetX = Math.max(minX, Math.min(maxX, newOffsetX));
          const clampedOffsetY = Math.max(minY, Math.min(maxY, newOffsetY));
      
          setMapOffset({ x: clampedOffsetX, y: clampedOffsetY });
        }
      };

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
          <button onClick={handleZoomClick}>
            {isZoomedIn ? "Zoom Out" : "Zoom In"}
          </button>
        </div>
        <p>Juice Maps</p>
        <div></div>
      </div>

      {/* Map Container */}
      <div className={styles["map-container"]}>
        <div
          className={`${styles["pixel-map"]} ${
            isZoomedIn ? styles["zoomed-in"] : ""
          }`}
          onMouseDown={handleMapMouseDown}
          onMouseMove={handleMapMouseMove}
          onMouseUp={handleMapMouseUp}
          style={{
            transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${
              isZoomedIn ? 2 : 1
            })`,
          }}
        >
          {/* We'll add markers here later */}
        </div>
        <button className={styles["add-flight-button"]}>
          Add Your Flight Info
        </button>
      </div>
    </div> 
  );
}