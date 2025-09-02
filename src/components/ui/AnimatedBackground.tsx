'use client';

import React, { useEffect, useRef, useState } from "react";

const AnimatedBackground = () => {
	const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [stars, setStars] = useState<Array<{
		id: number;
		left: number;
		top: number;
		size: number;
		opacity: number;
		twinkleDelay: number;
		pulseDuration: number;
	}>>([]);

	// Generate random star positions
	const generateStars = (count: number) => {
		return Array.from({ length: count }, (_, index) => ({
			id: index,
			left: Math.random() * 100,
			top: Math.random() * 100,
			size: Math.random() * 2.5 + 1, // 1-3.5px
			opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
			twinkleDelay: Math.random() * 5, // 0-5s delay
			pulseDuration: Math.random() * 3 + 2, // 2-5s duration
		}));
	};

	// Generate stars only on client side to avoid hydration mismatch
	useEffect(() => {
		setStars(generateStars(50));
	}, []);

	useEffect(() => {
		const initialPositions = [
			{ x: 0, y: 0 }, // Top-left blob
			{ x: 0, y: 0 }, // Top-right blob
			{ x: 0, y: 0 }, // Bottom-left blob  
			{ x: 0, y: 0 }, // Bottom-right blob
		];
		
		let requestId: number;

		const handleScroll = () => {
			const newScroll = window.pageYOffset;

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return;
				
				const initialPos = initialPositions[index];

				// Calculating movement in both X and Y direction
				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

				const x = initialPos.x + xOffset;
				const y = initialPos.y + yOffset;

				// Apply transformation with smooth transition
				blob.style.transform = `translate(${x}px, ${y}px)`;
				blob.style.transition = "transform 1.4s ease-out";
			});

			requestId = requestAnimationFrame(handleScroll);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (requestId) {
				cancelAnimationFrame(requestId);
			}
		};
	}, []);

	return (
		<div className="fixed inset-0 bg-gradient-to-br from-black to-slate-800 -z-10 overflow-hidden">
			<div className="absolute inset-0 overflow-hidden">
				{/* Stars */}
				{stars.map((star) => (
					<div
						key={star.id}
						className="absolute rounded-full"
						style={{
							left: `${star.left}%`,
							top: `${star.top}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)',
							animation: `starPulse ${star.pulseDuration}s ease-in-out infinite`,
							animationDelay: `${star.twinkleDelay}s`,
							opacity: star.opacity,
							boxShadow: `
								0 0 ${star.size * 1.5}px rgba(255, 255, 255, 0.6),
								0 0 ${star.size * 3}px rgba(255, 255, 255, 0.3),
								0 0 ${star.size * 5}px rgba(255, 255, 255, 0.1)
							`,
						}}
					></div>
				))}

				{/* Professional animated blobs */}
				<div
					ref={(ref) => { blobRefs.current[0] = ref; }}
					className="absolute top-0 left-0 md:w-96 md:h-96 w-72 h-72 bg-blue-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-60 md:opacity-40"
					style={{ transform: 'translate(-25%, -25%)' }}
				></div>
				<div
					ref={(ref) => { blobRefs.current[1] = ref; }}
					className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-800/50 rounded-full mix-blend-screen filter blur-[100px] opacity-55 md:opacity-35 hidden sm:block"
					style={{ transform: 'translate(25%, -25%)' }}
				></div>
				<div
					ref={(ref) => { blobRefs.current[2] = ref; }}
					className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-55 md:opacity-35"
					style={{ transform: 'translate(-30%, 25%)' }}
				></div>
				<div
					ref={(ref) => { blobRefs.current[3] = ref; }}
					className="absolute bottom-0 right-20 w-96 h-96 bg-purple-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-50 md:opacity-30 hidden sm:block"
					style={{ transform: 'translate(0%, 25%)' }}
				></div>
			</div>

			{/* Subtle professional overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>

			{/* CSS Animation for Star Pulse */}
			<style jsx>{`
				@keyframes starPulse {
					0%, 100% {
						transform: scale(1);
						opacity: 0.4;
					}
					25% {
						transform: scale(1.2);
						opacity: 0.8;
					}
					50% {
						transform: scale(1.4);
						opacity: 1;
					}
					75% {
						transform: scale(1.2);
						opacity: 0.8;
					}
				}
			`}</style>
		</div>
	);
};

export default AnimatedBackground;
