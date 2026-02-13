import React, { useEffect, useRef, useState } from "react";

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const requestRef = useRef();
    const mouseRef = useRef({ x: 50, y: 50 });
    const currentPosRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            };
        };

        const animate = () => {
            // Smooth lerp animation for mouse following
            currentPosRef.current.x += (mouseRef.current.x - currentPosRef.current.x) * 0.05;
            currentPosRef.current.y += (mouseRef.current.y - currentPosRef.current.y) * 0.05;

            setMousePosition({
                x: currentPosRef.current.x,
                y: currentPosRef.current.y
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
                background: "var(--bg-color)",
                overflow: "hidden"
            }}
        >
            {/* Base gradient layer */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)
                    `,
                    animation: "breathe 8s ease-in-out infinite"
                }}
            />

            {/* Aurora wave layer */}
            <div
                style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `
                        linear-gradient(125deg, 
                            transparent 0%, 
                            rgba(20, 184, 166, 0.1) 40%, 
                            rgba(6, 182, 212, 0.15) 50%, 
                            rgba(20, 184, 166, 0.1) 60%, 
                            transparent 100%
                        )
                    `,
                    animation: "aurora 15s linear infinite",
                    opacity: 0.6
                }}
            />

            {/* Floating orbs */}
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    animation: "float 20s ease-in-out infinite"
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "15%",
                    right: "10%",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(90px)",
                    animation: "float 25s ease-in-out infinite reverse"
                }}
            />

            {/* Interactive mouse spotlight */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 184, 166, 0.15) 0%, transparent 60%)`,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none"
                }}
            />

            {/* Subtle grid overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    opacity: 0.5
                }}
            />

            <style>
                {`
                    @keyframes breathe {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.8; transform: scale(1.05); }
                    }
                    
                    @keyframes aurora {
                        0% { transform: rotate(0deg) translateY(0); }
                        100% { transform: rotate(360deg) translateY(0); }
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(30px, -30px) scale(1.05); }
                        50% { transform: translate(-20px, 20px) scale(0.95); }
                        75% { transform: translate(40px, 10px) scale(1.02); }
                    }
                `}
            </style>
        </div>
    );
};

export default InteractiveBackground;
