'use client';

import React, { useEffect, useState, useRef } from "react";

const AnimatedBackground = () => {
	const [isLowPerformance, setIsLowPerformance] = useState(false);
	const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Detect performance capability once
	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();
		const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
		const isLowEnd = isMobile || navigator.hardwareConcurrency <= 2;
		setIsLowPerformance(isLowEnd);
	}, []);

	// Optimized scroll handler for blob movement
	useEffect(() => {
		if (isLowPerformance) return; // Skip animations on low-end devices

		// Initial CSS transform positions that match the CSS
		const initialTransforms = [
			'translate(-25%, -25%)', // Top-left blob
			'translate(25%, -25%)',  // Top-right blob
			'translate(-30%, 25%)',  // Bottom-left blob  
			'translate(0%, 25%)',    // Bottom-right blob
		];
		
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const newScroll = window.pageYOffset;

					blobRefs.current.forEach((blob, index) => {
						if (!blob) return;

						// More visible movement based on scroll (like original)
						const xOffset = Math.sin(newScroll / 300 + index * 0.5) * 150;
						const yOffset = Math.cos(newScroll / 300 + index * 0.5) * 75;

						// Combine initial transform with scroll offset
						const initialTransform = initialTransforms[index];
						blob.style.transform = `${initialTransform} translate3d(${xOffset}px, ${yOffset}px, 0)`;
					});
					
					ticking = false;
				});
				ticking = true;
			}
		};

		// Initialize positions on mount to prevent jump
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isLowPerformance]);

	return (
		<div className="fixed inset-0 bg-gradient-to-br from-black to-slate-800 -z-10 overflow-hidden">
			{/* Ultra-lightweight stars using CSS-only animation */}
			{!isLowPerformance && (
				<div className="absolute inset-0">
					{/* Static star field using CSS animations - much more efficient */}
					<div className="star-field">
						{Array.from({ length: 15 }, (_, i) => (
							<div key={i} className={`star star-${i + 1}`} />
						))}
					</div>
				</div>
			)}

			{/* Scroll-responsive blobs with subtle appearance */}
			<div className="absolute inset-0 overflow-hidden">
				<div
					ref={(ref) => { blobRefs.current[0] = ref; }}
					className={`blob blob-1 will-change-transform ${isLowPerformance ? 'animate-none' : ''}`}
				/>
				<div
					ref={(ref) => { blobRefs.current[1] = ref; }}
					className={`blob blob-2 will-change-transform ${isLowPerformance ? 'animate-none' : ''}`}
				/>
				<div
					ref={(ref) => { blobRefs.current[2] = ref; }}
					className={`blob blob-3 will-change-transform ${isLowPerformance ? 'animate-none' : ''}`}
				/>
				<div
					ref={(ref) => { blobRefs.current[3] = ref; }}
					className={`blob blob-4 will-change-transform ${isLowPerformance ? 'animate-none' : ''}`}
				/>
			</div>

			{/* Subtle professional overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

			{/* Optimized CSS Animations */}
			<style jsx>{`
				.star-field {
					position: relative;
					width: 100%;
					height: 100%;
				}

				.star {
					position: absolute;
					background: rgba(255, 255, 255, 0.8);
					border-radius: 50%;
					animation: starTwinkle 4s ease-in-out infinite;
				}

				/* Define individual star positions and sizes using CSS custom properties */
				.star-1 { left: 10%; top: 20%; width: 2px; height: 2px; animation-delay: 0s; }
				.star-2 { left: 25%; top: 15%; width: 1px; height: 1px; animation-delay: 0.5s; }
				.star-3 { left: 40%; top: 30%; width: 2px; height: 2px; animation-delay: 1s; }
				.star-4 { left: 60%; top: 10%; width: 1px; height: 1px; animation-delay: 1.5s; }
				.star-5 { left: 75%; top: 25%; width: 2px; height: 2px; animation-delay: 2s; }
				.star-6 { left: 85%; top: 40%; width: 1px; height: 1px; animation-delay: 2.5s; }
				.star-7 { left: 15%; top: 60%; width: 2px; height: 2px; animation-delay: 3s; }
				.star-8 { left: 35%; top: 70%; width: 1px; height: 1px; animation-delay: 3.5s; }
				.star-9 { left: 55%; top: 65%; width: 2px; height: 2px; animation-delay: 0.2s; }
				.star-10 { left: 70%; top: 75%; width: 1px; height: 1px; animation-delay: 0.7s; }
				.star-11 { left: 90%; top: 80%; width: 2px; height: 2px; animation-delay: 1.2s; }
				.star-12 { left: 5%; top: 85%; width: 1px; height: 1px; animation-delay: 1.7s; }
				.star-13 { left: 45%; top: 5%; width: 2px; height: 2px; animation-delay: 2.2s; }
				.star-14 { left: 80%; top: 60%; width: 1px; height: 1px; animation-delay: 2.7s; }
				.star-15 { left: 20%; top: 45%; width: 2px; height: 2px; animation-delay: 3.2s; }

				.blob {
					position: absolute;
					border-radius: 50%;
					mix-blend-mode: screen;
					filter: blur(80px);
					will-change: transform;
				}

				.blob-1 {
					top: 0;
					left: 0;
					width: 18rem;
					height: 18rem;
					background: rgba(59, 130, 246, 0.15);
				}

				.blob-2 {
					top: 0;
					right: 0;
					width: 24rem;
					height: 24rem;
					background: rgba(147, 51, 234, 0.12);
				}

				.blob-3 {
					bottom: 0;
					left: 0;
					width: 24rem;
					height: 24rem;
					background: rgba(6, 182, 212, 0.12);
				}

				.blob-4 {
					bottom: 0;
					right: 5rem;
					width: 24rem;
					height: 24rem;
					background: rgba(168, 85, 247, 0.1);
				}

				@keyframes starTwinkle {
					0%, 100% { opacity: 0.3; transform: scale(1); }
					50% { opacity: 1; transform: scale(1.5); }
				}



				@media (max-width: 768px) {
					.blob-1, .blob-3 { width: 16rem; height: 16rem; }
					.blob-2, .blob-4 { display: none; }
				}

				@media (prefers-reduced-motion: reduce) {
					.star, .blob { animation: none; }
				}
			`}</style>
		</div>
	);
};

export default AnimatedBackground;
