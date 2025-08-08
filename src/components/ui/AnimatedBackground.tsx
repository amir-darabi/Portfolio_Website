'use client';

import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
	const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const initialPositions = [
			{ x: -4, y: 0 },
			{ x: -4, y: 0 },
			{ x: 20, y: -8 },
			{ x: 20, y: -8 },
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
		<div className="fixed inset-0 bg-gradient-to-br from-black to-slate-800 -z-10">
			<div className="absolute inset-0">
				{/* Professional animated blobs */}
				<div
					ref={(ref) => { blobRefs.current[0] = ref; }}
					className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-blue-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-60 md:opacity-40"
				></div>
				<div
					ref={(ref) => { blobRefs.current[1] = ref; }}
					className="absolute top-0 -right-4 w-96 h-96 bg-fuchsia-800/50 rounded-full mix-blend-screen filter blur-[100px] opacity-55 md:opacity-35 hidden sm:block"
				></div>
				<div
					ref={(ref) => { blobRefs.current[2] = ref; }}
					className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-cyan-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-55 md:opacity-35"
				></div>
				<div
					ref={(ref) => { blobRefs.current[3] = ref; }}
					className="absolute -bottom-10 right-20 w-96 h-96 bg-purple-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-50 md:opacity-30 hidden sm:block"
				></div>
			</div>
			{/* Professional grid pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
			{/* Subtle professional overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
		</div>
	);
};

export default AnimatedBackground;
