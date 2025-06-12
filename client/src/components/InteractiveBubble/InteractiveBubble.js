import React, { useEffect, useRef } from 'react';
import '../../App.css';

function InteractiveBubble() {
    const bubbleRef = useRef(null);
    const curX = useRef(0);
    const curY = useRef(0);
    const tgX = useRef(0);
    const tgY = useRef(0);
    const animationFrame = useRef();

    useEffect(() => {
        const move = () => {
            curX.current += (tgX.current - curX.current) / 20;
            curY.current += (tgY.current - curY.current) / 20;
            if (bubbleRef.current) {
                bubbleRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;
            }
            animationFrame.current = requestAnimationFrame(move);
        };

        const handleMouseMove = (event) => {
            tgX.current = event.clientX;
            tgY.current = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    return <div className="interactive" ref={bubbleRef} />;
};

export default InteractiveBubble;