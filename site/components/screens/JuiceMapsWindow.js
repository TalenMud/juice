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
    userData,
}) {
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
    const [isDraggingMap, setIsDraggingMap] = useState(false);
    const [isFlightInfoExpanded, setIsFlightInfoExpanded] = useState(false);
    const [departingCity, setDepartingCity] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleAddFlightInfoClick = () => {
        setIsFlightInfoExpanded(!isFlightInfoExpanded);
    };

    const handleCityChange = (e) => {
        setDepartingCity(e.target.value);
    };

    const handleSubmitFlightInfo = async (e) => {
        e.preventDefault();
        if (!departingCity) {
            setSubmitMessage("Please select a departing city");
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            const response = await fetch('/api/update-departing-city', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: userData.token,
                    departingCity: departingCity
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitMessage("Departing city updated successfully!");
                // Optionally close the flight info panel after successful submission
                // setIsFlightInfoExpanded(false);
            } else {
                setSubmitMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setSubmitMessage("Failed to update departing city. Please try again.");
            console.error("Error submitting flight info:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
        className={`${styles["window-container"]} ${
          isFlightInfoExpanded ? styles["expanded"] : ""
        }`}
        onClick={handleWindowClick("juiceMaps")}
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
                    {/* Map content */}
                </div>
                
                <button
                    className={styles["add-flight-button"]}
                    onClick={handleAddFlightInfoClick} 
                >
                    Add Your Flight Info
                </button>
            </div>

            {/* Flight Info Section - MOVED OUTSIDE the map container */}
            {isFlightInfoExpanded && (
                    <div 
                        style={{
                            padding: "10px",
                            borderTop: "1px solid #ccc",
                            backgroundColor: "#fff",
                            width: "100%"
                        }}
                    >
                        <form onSubmit={handleSubmitFlightInfo}>
                            <div style={{ marginBottom: "10px" }}>
                                <label htmlFor="departure-city" style={{ display: "block", marginBottom: "5px" }}>
                                    Flight Departing City:
                                </label>
                                <select 
                                    id="departure-city"
                                    value={departingCity}
                                    onChange={handleCityChange}
                                    style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                                >
                                    <option value="">Select a city</option>
                                    <option value="frankfurt">Frankfurt</option>
                                    <option value="brisbane">Brisbane</option>
                                    <option value="tokyo">Tokyo</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="kochi">Kochi</option>
                                    <option value="hyderabad">Hyderabad</option>
                                    <option value="baltimore">Baltimore</option>
                                    <option value="boston">Boston</option>
                                    <option value="san_francisco">San Francisco</option>
                                    <option value="burlington">Burlington</option>
                                    <option value="atlanta">Atlanta</option>
                                    <option value="new_york_city">New York City</option> 
                                    <option value="newark">Newark</option>
                                    <option value="rome">Rome</option>
                                    <option value="budapest">Budapest</option>
                                    <option value="vienna">Vienna</option>
                                    <option value="bratislava">Bratislava</option>
                                    <option value="manila">Manila</option>
                                    <option value="dubai">Dubai</option>
                                    <option value="sharjah">Sharjah</option>
                                    <option value="malta">Malta</option>
                                    <option value="ottawa">Ottawa</option>
                                    <option value="toronto">Toronto</option>
                                    <option value="victoria">Victoria</option>
                                    <option value="warsaw">Warsaw</option>
                                    <option value="singapore">Singapore</option>
                                    <option value="yaounde">Yaounde</option>
                                    <option value="cairo">Cairo</option>
                                    <option value="geneve">Geneve</option>
                                    <option value="lyon">Lyon</option>
                                    <option value="paris">Paris</option>
                                    <option value="buenos_aires">Buenos Aires</option>
                                    <option value="london">London</option>
                                    {/* Add more cities as needed */}
                                </select>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "#4caf50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                {isSubmitting ? "Submitting..." : "Put your departure city on the map!"}
                            </button>
                            
                            {submitMessage && (
                                <div style={{ 
                                    marginTop: "10px", 
                                    color: submitMessage.includes("Error") ? "red" : "green",
                                    fontWeight: "bold"
                                }}>
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}