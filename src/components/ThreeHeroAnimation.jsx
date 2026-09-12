import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeHeroAnimation({ onEnterPortal }) {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe63946, 5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2e5bff, 4, 20);
    pointLight2.position.set(-5, -5, 4);
    scene.add(pointLight2);

    const goldRimLight = new THREE.DirectionalLight(0xf4a261, 2.5);
    goldRimLight.position.set(0, 10, 8);
    scene.add(goldRimLight);

    // Particle field (Golden & Sapphire cosmic particles)
    const particleCount = 750;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xe63946);
    const c2 = new THREE.Color(0xf35b04);
    const c3 = new THREE.Color(0x2e5bff);
    const c4 = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 22;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 18 - 2;

      const chosenColor = [c1, c2, c3, c4][Math.floor(Math.random() * 4)];
      particleColors[i3] = chosenColor.r;
      particleColors[i3 + 1] = chosenColor.g;
      particleColors[i3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Group for the 3D NSS Emblem & its celestial rings
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Initial scale for dramatic entrance animation
    emblemGroup.scale.set(0.01, 0.01, 0.01);
    emblemGroup.position.set(0, 0, -4);
    emblemGroup.rotation.set(0.8, -1.2, 0.4);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `${import.meta.env.BASE_URL}assets/nss-logo.png`,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;

        // Front Face with NSS Logo
        const frontGeo = new THREE.CircleGeometry(1.6, 64);
        const frontMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.15,
          side: THREE.FrontSide
        });
        const frontMesh = new THREE.Mesh(frontGeo, frontMat);
        frontMesh.position.z = 0.09;
        emblemGroup.add(frontMesh);

        // Back Face with NSS Logo
        const backGeo = new THREE.CircleGeometry(1.6, 64);
        const backMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.15,
          side: THREE.BackSide
        });
        const backMesh = new THREE.Mesh(backGeo, backMat);
        backMesh.position.z = -0.09;
        emblemGroup.add(backMesh);

        // Medallion Cylinder Body (Golden / Bronze Metallic Rim)
        const rimGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.18, 64, 1, true);
        const rimMat = new THREE.MeshStandardMaterial({
          color: 0xd49b38,
          roughness: 0.2,
          metalness: 0.85,
          emissive: 0x5a3407,
          emissiveIntensity: 0.3
        });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.rotation.x = Math.PI / 2;
        emblemGroup.add(rimMesh);

        // Outer Stylized Orbit Rings (Representing Sun Temple Konark Wheel Energy)
        const ringGeo1 = new THREE.TorusGeometry(1.95, 0.025, 16, 100);
        const ringMat1 = new THREE.MeshStandardMaterial({
          color: 0xe63946,
          emissive: 0xe63946,
          emissiveIntensity: 0.7,
          roughness: 0.3,
          metalness: 0.8
        });
        const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
        emblemGroup.add(orbitRing1);

        const ringGeo2 = new THREE.TorusGeometry(2.18, 0.015, 16, 100);
        const ringMat2 = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x2563eb,
          emissiveIntensity: 0.5,
          roughness: 0.4,
          metalness: 0.7
        });
        const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
        orbitRing2.rotation.x = Math.PI / 6;
        emblemGroup.add(orbitRing2);

        // Radial Energy Spokes Ring
        const spokesCount = 8;
        const spokesGroup = new THREE.Group();
        for (let i = 0; i < spokesCount; i++) {
          const angle = (i / spokesCount) * Math.PI * 2;
          const spokeGeo = new THREE.BoxGeometry(0.04, 0.4, 0.04);
          const spokeMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            emissive: 0xf59e0b,
            emissiveIntensity: 0.6
          });
          const spoke = new THREE.Mesh(spokeGeo, spokeMat);
          spoke.position.x = Math.cos(angle) * 1.82;
          spoke.position.y = Math.sin(angle) * 1.82;
          spoke.rotation.z = angle + Math.PI / 2;
          spokesGroup.add(spoke);
        }
        emblemGroup.add(spokesGroup);

        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading NSS logo texture", err);
        setIsLoaded(true);
      }
    );

    // Mouse movement reactivity
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let entranceProgress = 0; // 0 to 1

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dramatic Entrance Animation (Scales up and rotates continuously into center)
      if (entranceProgress < 1) {
        entranceProgress = Math.min(1, entranceProgress + delta * 0.85);
        // Elastic ease out
        const p = entranceProgress;
        const easeOutElastic = Math.sin(-13 * (p + 1) * Math.PI / 2) * Math.pow(2, -10 * p) + 1;
        
        const scaleVal = 0.01 + easeOutElastic * 0.99;
        emblemGroup.scale.set(scaleVal, scaleVal, scaleVal);
        emblemGroup.position.z = -4 + easeOutElastic * 4;
        emblemGroup.position.y = Math.sin(elapsedTime * 2) * 0.08;
      } else {
        // Natural gentle floating bob in center
        emblemGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.12;
      }

      // Continuous 3D rotation
      const baseSpeed = hovered ? 1.4 : 0.6;
      emblemGroup.rotation.y += delta * baseSpeed;
      emblemGroup.rotation.x = mouseY * 0.35 + Math.sin(elapsedTime * 1.2) * 0.05;
      emblemGroup.rotation.z = -mouseX * 0.25;

      // Particle subtle flow
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hovered]);

  return (
    <div 
      className="relative w-full h-[520px] md:h-[620px] flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Decorative Aura Glow Behind 3D Object */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-brand-nssRed/20 via-brand-accentBlue/20 to-brand-nssOrange/25 blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* Interaction Hint Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md text-xs text-slate-300 pointer-events-none transition-opacity duration-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Interactive 3D NSS Emblem • Move mouse to tilt & view depth</span>
      </div>
    </div>
  );
}
