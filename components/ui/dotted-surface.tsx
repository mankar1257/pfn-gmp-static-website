import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, children, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	// Use a ref for animationId so cleanup always cancels the latest frame
	const animationIdRef = useRef<number>(0);
	const isDisposedRef = useRef(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		isDisposedRef.current = false;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		// Scene setup — dark fog so particles fade into the dark background
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x020617, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			container.clientWidth / container.clientHeight || window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 450, 1400);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
		renderer.setClearColor(0x000000, 0);

		container.appendChild(renderer.domElement);

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
		const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);

		let idx = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions[idx] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				positions[idx + 1] = 0;
				positions[idx + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				// Light gray dots for dark theme (matches original 200/255)
				colors[idx] = 0.78;
				colors[idx + 1] = 0.78;
				colors[idx + 2] = 0.78;
				idx += 3;
			}
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;

		// Animation loop
		const animate = () => {
			if (isDisposedRef.current) return;

			const posArr = geometry.attributes.position.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					// Animate Y with compound sine waves
					posArr[i * 3 + 1] =
						Math.sin((ix + count) * 0.3) * 60 +
						Math.sin((iy + count) * 0.5) * 60;
					i++;
				}
			}

			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.08;

			animationIdRef.current = requestAnimationFrame(animate);
		};

		// Handle resize using container bounds
		const handleResize = () => {
			if (isDisposedRef.current || !container) return;
			const w = container.clientWidth || window.innerWidth;
			const h = container.clientHeight || window.innerHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener('resize', handleResize);

		// Kick off
		animationIdRef.current = requestAnimationFrame(animate);

		// Cleanup — always cancels the latest frame via ref
		return () => {
			isDisposedRef.current = true;
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationIdRef.current);

			scene.traverse((object) => {
				if (object instanceof THREE.Points) {
					object.geometry.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((mat) => mat.dispose());
					} else {
						object.material.dispose();
					}
				}
			});

			renderer.dispose();

			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0 z-0', className)}
			{...props}
		>
			{children}
		</div>
	);
}
