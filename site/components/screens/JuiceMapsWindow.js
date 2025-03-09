import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapWindow({ position, isDragging, isActive, handleMouseDown, handleDismiss, handleWindowClick, BASE_Z_INDEX, ACTIVE_Z_INDEX }) {
    const containerRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);

    const handleMapLoad = (map) => {
        setMapInstance(map);
    };

    return (
        <div style={{
            position: "absolute",
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            top: "50%",
            left: "50%",
            zIndex: isActive ? ACTIVE_Z_INDEX : BASE_Z_INDEX,
        }}>
            <div
                onClick={handleWindowClick('Map')}
                style={{
                    display: "flex",
                    width: 650,
                    height: 470,
                    backgroundColor: "#fff",
                    border: "1px solid #000",
                    borderRadius: 4,
                    flexDirection: "column",
                    padding: 0,
                    userSelect: "none",
                    animation: "linear .3s windowShakeAndScale"
                }}>

                <div
                    onMouseDown={handleMouseDown('Map')}
                    style={{
                        display: "flex",
                        borderBottom: "1px solid #000",
                        padding: 8,
                        justifyContent: "space-between",
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}>
                    <button onClick={(e) => { e.stopPropagation(); handleDismiss('Map'); }}>x</button>
                    <p>World Map</p>
                    <div></div>
                </div>

                <div
                    ref={containerRef}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100% - 37px)",
                        overflow: "hidden",
                    }}>
                    <div style={{ flex: 1 }}>
                        <MapContainer
                            center={[0, 0]}
                            zoom={2}
                            style={{ height: "100%", width: "100%" }}
                            whenCreated={handleMapLoad}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </div>

                    <div style={{ padding: 10, borderTop: "1px solid #ccc", textAlign: 'center' }}>
                        <button style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Add your info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}