import React, { useRef } from 'react';

export default function WutIsJuiceMapsWindow({ position, isDragging, isActive, handleMouseDown, handleDismiss, handleWindowClick, BASE_Z_INDEX, ACTIVE_Z_INDEX }) {
    const contentRef = useRef(null);

    const handleRegisterClick = (e) => {
        if (e.target.classList.contains('register-link')) {
            e.preventDefault();
            e.stopPropagation();
            const registerButton = document.querySelector('button[data-register-button="true"]');
            if (registerButton) {
                registerButton.click();
            }
        }
    };

    return (
        <div style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            top: "50%",
            left: "50%",
            position: "absolute", 
            zIndex: isActive ? ACTIVE_Z_INDEX : BASE_Z_INDEX, 
        }}>
            <div 
                onClick={handleWindowClick('wutIsJuiceMaps')}
                style={{
                    display: "flex", 
                    width: 650,
                    color: 'black',
                    height: 650,
                    backgroundColor: "#fff", 
                    border: "1px solid #000", 
                    borderRadius: 4,
                    flexDirection: "column",
                    padding: 0,
                    userSelect: "none",
                    animation: "linear .3s windowShakeAndScale"
                }}>
                <div 
                    onMouseDown={handleMouseDown('wutIsJuiceMaps')}
                    style={{
                        display: "flex", 
                        borderBottom: "1px solid #00000020", 
                        padding: 8, 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        cursor: isDragging ? 'grabbing' : 'grab',
                        backgroundColor: '#f6e7ba',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4
                    }}>
                    <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                        <button onClick={(e) => { e.stopPropagation(); handleDismiss('wutIsJuiceMaps'); }}>x</button>
                    </div>
                    <p>WutIsJuiceMaps.txt</p>
                    <div></div>
                </div>
                <div 
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRegisterClick(e);
                        
                        // Handle regular links
                        const clickedElement = e.target;
                        if (clickedElement.tagName === 'A' && !clickedElement.classList.contains('register-link')) {
                            e.preventDefault();
                            window.open(clickedElement.href, '_blank');
                        }
                    }}
                    style={{
                        flex: 1,
                        padding: 16,
                        outline: 'none',
                        overflowY: 'auto',
                        cursor: 'text',
                        userSelect: 'text'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p>Hey Hackers! <a href="https://hackclub.slack.com/team/U0798DBP8VA">Lopa</a> here with <a href="https://hackclub.slack.com/team/U07TYDHRQHM">Talen</a></p>
                        
                        <p>We're super excited about bringing hackers together from all around the world to Shanghai for Juice! But we thought, why wait until Shanghai to start the adventure?</p>
                        
                        <p>That's why we created Juice Maps - to help you find fellow hackers traveling from nearby locations so you can journey to Shanghai together!</p>
                        
                        <p>As two 17-year-olds from different parts of the world—I'm from Cairo, and Talen is from Wales—we know firsthand both the excitement and the challenges of international travel.</p>
                        
                        <p>Here's how Juice Maps works:</p>
                        <ul style={{marginLeft: 16}}>
                            <li>Drop a pin showing where you'll be traveling from</li>
                            <li>Connect with hackers departing from airports near you</li>
                            <li>Coordinate group flights and travel plans</li>
                            <li>Split costs, share adventures, make friends early!</li>
                        </ul>
                        
                        <p>Talen and I know firsthand that traveling together with other hackers makes the journey so much more fun, and there are some great benefits:</p>
                        <ul style={{marginLeft: 16}}>
                            <li>You might save money through group bookings</li>
                            <li>Navigate foreign airports together (way less stressful!)</li>
                            <li>Start hacking and sharing ideas before even arriving</li>
                            <li>Travel with a group is safer and more enjoyable</li>
                        </ul>
                        
                        <p>We want your journey to Shanghai to be as epic as the event itself! <a href="#" class="register-link">Ready to add your pin to the map?</a></p>
                        
                        <b style={{
                            animation: 'pulseHighlight 1s infinite',
                            color: '#2657ba'
                        }}>Let's turn this trip into part of the adventure! See you on the journey!</b>
                    </div>
                </div>
            </div>
        </div>
    );
}