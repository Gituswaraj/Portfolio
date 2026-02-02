'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ScrambledText = ({
    radius = 100,
    duration = 0.8,
    speed = 0.5,
    scrambleChars = '!@#$%^&*()_+{}:"<>?|[];\',./',
    className = '',
    style = {},
    children
}) => {
    const rootRef = useRef(null);
    const charsRef = useRef([]);

    // Split text into characters manually to avoid SplitText dependency
    const text = typeof children === 'string' ? children : '';
    const characters = text.split('');

    useEffect(() => {
        if (!rootRef.current) return;

        const handleMove = (e) => {
            charsRef.current.forEach((charEl, index) => {
                if (!charEl) return;

                const rect = charEl.getBoundingClientRect();
                const charCenterX = rect.left + rect.width / 2;
                const charCenterY = rect.top + rect.height / 2;

                const dx = e.clientX - charCenterX;
                const dy = e.clientY - charCenterY;
                const dist = Math.hypot(dx, dy);

                if (dist < radius) {
                    // If we are close, scramble
                    if (!charEl.isScrambling) {
                        charEl.isScrambling = true;
                        const originalVal = charEl.dataset.original;

                        // GSAP animation for the scramble effect
                        gsap.to(charEl, {
                            duration: duration * (1 - dist / radius),
                            onUpdate: function () {
                                // Randomly change text during update
                                if (Math.random() > speed) {
                                    charEl.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                                }
                            },
                            onComplete: () => {
                                // Restore original value
                                charEl.innerText = originalVal;
                                charEl.isScrambling = false;
                            },
                            ease: "power1.inOut"
                        });
                    }
                }
            });
        };

        const container = rootRef.current;
        window.addEventListener('pointermove', handleMove);

        return () => {
            window.removeEventListener('pointermove', handleMove);
            gsap.killTweensOf(charsRef.current);
        };
    }, [radius, duration, speed, scrambleChars]);

    return (
        <div
            ref={rootRef}
            className={`font-mono leading-relaxed ${className}`}
            style={style}
        >
            <p className="flex flex-wrap">
                {characters.map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => (charsRef.current[i] = el)}
                        data-original={char}
                        className="inline-block whitespace-pre will-change-transform"
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default ScrambledText;
