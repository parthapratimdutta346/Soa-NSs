import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, MapPin, Sparkles, Shield, CheckCircle2, FastForward } from 'lucide-react';

export default function PostLoginGlobeTransition({ user, onComplete }) {
  const mountRef = useRef(null);
  const [hudStatus, setHudStatus] = useState("INITIALIZING VOLUNTEER AUTHENTICATION...");
  const [hudSubtext, setHudSubtext] = useState("Connecting to SOA National Service Scheme Registry");
  const [coordinates, setCoordinates] = useState("GLOBAL_SCAN_ACTIVE");
  const [phase, setPhase] = useState(0); // 0: morph, 1: spin, 2: lock, 3: pin, 4: dissolve

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Deep Space Starfield
    const starsCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 25;
      starPos[i + 1] = (Math.random() - 0.5) * 20;
      starPos[i + 2] = (Math.random() - 0.5) * 20 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e6, 3.2);
    sunLight.position.set(6, 4, 6);
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    blueRimLight.position.set(-6, -3, -4);
    scene.add(blueRimLight);

    // 2. Procedural Photorealistic Earth Map Texture Canvas (with accurate Indian subcontinent)
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 2048;
    earthCanvas.height = 1024;
    const eCtx = earthCanvas.getContext('2d');

    // Deep Ocean Gradient
    const oceanGrad = eCtx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#0a1d3f');
    oceanGrad.addColorStop(0.5, '#0e2a5c');
    oceanGrad.addColorStop(1, '#081733');
    eCtx.fillStyle = oceanGrad;
    eCtx.fillRect(0, 0, 2048, 1024);

    // Subtle ocean bathymetry shelf
    eCtx.fillStyle = '#143878';
    eCtx.beginPath();
    eCtx.arc(1480, 520, 280, 0, Math.PI * 2);
    eCtx.fill();

    // Draw Landmasses (Detailed Continents & India)
    const drawLandmass = (pathCoords, color = '#2d6a4f') => {
      eCtx.fillStyle = color;
      eCtx.beginPath();
      pathCoords.forEach(([x, y], idx) => {
        if (idx === 0) eCtx.moveTo(x, y);
        else eCtx.lineTo(x, y);
      });
      eCtx.closePath();
      eCtx.fill();
    };

    // India Subcontinent (Latitude ~8°N to 35°N, Longitude ~68°E to 97°E)
    // Canvas coords: X = (lon + 180)/360 * 2048, Y = (90 - lat)/180 * 1024
    // 85.8°E, 20.3°N -> X = ~1512, Y = ~396 (Bhubaneswar, Odisha)
    const indiaPath = [
      [1410, 310], // Kashmir / North
      [1450, 315],
      [1490, 335], // Himalayas / Nepal border
      [1530, 345],
      [1580, 350], // Northeast
      [1560, 385],
      [1540, 395], // Bengal
      [1515, 410], // Odisha / Bhubaneswar coast
      [1495, 460], // Andhra coast
      [1475, 520], // Tamil Nadu / Kanyakumari
      [1460, 500], // Kerala
      [1440, 430], // Karnataka / Goa
      [1415, 385], // Gujarat / Kathiawar
      [1400, 350], // Rajasthan
      [1410, 310]
    ];
    drawLandmass(indiaPath, '#386641');

    // Broader Asia & Eurasia
    const eurasiaPath = [
      [1200, 260], [1350, 250], [1500, 240], [1700, 260], [1850, 280],
      [1900, 380], [1800, 420], [1680, 460], [1600, 440], [1580, 350],
      [1490, 335], [1380, 340], [1280, 380], [1200, 340], [1150, 280]
    ];
    drawLandmass(eurasiaPath, '#2b580c');

    // Africa
    const africaPath = [
      [1050, 380], [1150, 370], [1220, 430], [1260, 520], [1220, 620],
      [1160, 720], [1120, 680], [1080, 580], [1010, 490], [1050, 380]
    ];
    drawLandmass(africaPath, '#606c38');

    // Australia
    const australiaPath = [
      [1720, 620], [1820, 610], [1870, 670], [1830, 740], [1740, 730], [1700, 660]
    ];
    drawLandmass(australiaPath, '#bc6c25');

    // Americas (West side of 2048 map)
    const northAmericaPath = [
      [300, 220], [480, 240], [560, 320], [540, 420], [480, 460], [420, 430], [320, 350], [260, 280]
    ];
    drawLandmass(northAmericaPath, '#2d6a4f');

    const southAmericaPath = [
      [460, 480], [540, 510], [600, 580], [560, 720], [500, 800], [460, 680], [440, 540]
    ];
    drawLandmass(southAmericaPath, '#2d6a4f');

    // Glowing Pulse Dot on Bhubaneswar, Odisha (1515, 405)
    const glowGrad = eCtx.createRadialGradient(1515, 405, 0, 1515, 405, 40);
    glowGrad.addColorStop(0, '#ff4757');
    glowGrad.addColorStop(0.3, 'rgba(255, 107, 129, 0.9)');
    glowGrad.addColorStop(0.7, 'rgba(255, 218, 121, 0.4)');
    glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    eCtx.fillStyle = glowGrad;
    eCtx.beginPath();
    eCtx.arc(1515, 405, 40, 0, Math.PI * 2);
    eCtx.fill();

    // Cloud swirls & atmospheric layer on canvas
    eCtx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 20; i++) {
      eCtx.beginPath();
      const cx = (i * 120 + 80) % 2048;
      const cy = 200 + (i * 35) % 650;
      eCtx.ellipse(cx, cy, 140, 35, (i % 3 - 1) * 0.2, 0, Math.PI * 2);
      eCtx.fill();
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3. 3D Globe Mesh
    const globeRadius = 1.8;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.12,
      bumpScale: 0.05
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // Initial state: Start small like the NSS medallion at the flag center
    globeMesh.scale.set(0.01, 0.01, 0.01);
    globeMesh.position.set(0, 0, 0);

    // Atmospheric Outer Glow Halo
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.045, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeMesh.add(atmosphereMesh);

    // 4. Scanning Radar Orbit Ring (Cyber Search Telemetry)
    const scanRingGeo = new THREE.RingGeometry(globeRadius * 1.08, globeRadius * 1.14, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2.5;
    scene.add(scanRing);

    // 5. 3D Location Pin (Metallic Red with Glowing Head)
    const pinGroup = new THREE.Group();
    pinGroup.visible = false;

    // Pin Cone Body (Pointing downward towards the earth)
    const pinConeGeo = new THREE.ConeGeometry(0.12, 0.35, 32);
    const pinConeMat = new THREE.MeshStandardMaterial({
      color: 0xe63946,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x990012,
      emissiveIntensity: 0.5
    });
    const pinCone = new THREE.Mesh(pinConeGeo, pinConeMat);
    pinCone.rotation.x = Math.PI; // Point down
    pinCone.position.y = 0.175;
    pinGroup.add(pinCone);

    // Pin Sphere Head
    const pinSphereGeo = new THREE.SphereGeometry(0.15, 32, 32);
    const pinSphereMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffa500,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.1
    });
    const pinSphere = new THREE.Mesh(pinSphereGeo, pinSphereMat);
    pinSphere.position.y = 0.35;
    pinGroup.add(pinSphere);

    // Pin Beacon Light
    const pinLight = new THREE.PointLight(0xffd166, 3, 5);
    pinLight.position.y = 0.5;
    pinGroup.add(pinLight);

    // Pin Positioned in Orbit over the Locked Coordinate (Facing camera when locked)
    // Target coordinate position on unit sphere:
    const pinTargetPos = new THREE.Vector3(0.08, 0.35, globeRadius);
    pinGroup.position.copy(pinTargetPos);
    scene.add(pinGroup);

    // 6. Surface Contact Ripple Rings
    const rippleGeo = new THREE.RingGeometry(0.05, 0.12, 32);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
    rippleMesh.position.copy(pinTargetPos);
    rippleMesh.position.z += 0.01;
    rippleMesh.visible = false;
    scene.add(rippleMesh);

    // Target Earth Rotation to face Bhubaneswar, India directly at the camera
    // Longitude ~85.8°E -> Y rotation needs to be calibrated
    const targetRotY = -Math.PI * 0.98;
    const targetRotX = 0.22;

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();
    const startTime = Date.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (Date.now() - startTime) / 1000;

      // STAGE 1 (0.0s - 1.2s): NSS Logo Inflates into 3D Globe
      if (elapsed < 1.2) {
        setPhase(0);
        const p = elapsed / 1.2;
        // Elastic smooth swell
        const scaleVal = 0.1 + Math.sin(p * Math.PI / 2) * 0.9;
        globeMesh.scale.set(scaleVal, scaleVal, scaleVal);
        globeMesh.rotation.y = p * 2.5;

        scanRingMat.opacity = p * 0.4;
        scanRing.scale.set(scaleVal, scaleVal, scaleVal);

        setHudStatus("MORPHING NSS EMBLEM INTO GLOBAL SERVICE CADRE...");
        setHudSubtext("Establishing satellite uplink with SOA University...");
      }

      // STAGE 2 (1.2s - 2.8s): Rapid Global Search Spin & Camera Push-In
      else if (elapsed < 2.8) {
        setPhase(1);
        const p = (elapsed - 1.2) / 1.6; // 0 to 1

        globeMesh.scale.set(1.0, 1.0, 1.0);
        // Rapid spin around Y
        globeMesh.rotation.y += 0.16;
        globeMesh.rotation.x = Math.sin(elapsed * 2.5) * 0.15;

        // Camera push-in from z = 7.5 to z = 4.8
        camera.position.z = 7.5 - p * 2.7;

        // Scan ring pulse
        scanRingMat.opacity = 0.6 + Math.sin(elapsed * 12) * 0.3;
        scanRing.rotation.z += 0.05;

        setHudStatus("GLOBAL DATABASE SEARCH IN PROGRESS...");
        setCoordinates(`SCANNING GEO-GRID: ${((elapsed * 137.4) % 360).toFixed(2)}° E, ${(Math.sin(elapsed * 4) * 45).toFixed(2)}° N`);
        setHudSubtext(`Querying registry for: ${user ? user.name : 'SOA Volunteer'}...`);
      }

      // STAGE 3 (2.8s - 3.8s): Smooth Deceleration & Lock-on to Bhubaneswar, Odisha
      else if (elapsed < 3.8) {
        setPhase(2);
        const p = (elapsed - 2.8) / 1.0; // 0 to 1
        const ease = 1 - Math.pow(1 - p, 3); // Cubic ease out

        // Interpolate rotation to exact Bhubaneswar coordinate
        globeMesh.rotation.y = THREE.MathUtils.lerp(globeMesh.rotation.y, targetRotY, 0.12);
        globeMesh.rotation.x = THREE.MathUtils.lerp(globeMesh.rotation.x, targetRotX, 0.12);

        camera.position.z = 4.8;
        scanRingMat.opacity = (1 - p) * 0.5;

        setHudStatus("TARGET COORDINATES LOCKED: BHUBANESWAR, ODISHA");
        setCoordinates("LAT: 20.27° N | LON: 85.78° E | ELEV: 45M");
        setHudSubtext(`Location Confirmed: Siksha 'O' Anusandhan (Deemed to be University)`);
      }

      // STAGE 4 (3.8s - 4.4s): 3D Location Pin Drops with Ripple
      else if (elapsed < 4.4) {
        setPhase(3);
        const p = (elapsed - 3.8) / 0.6; // 0 to 1

        pinGroup.visible = true;
        // Drop down from y + 1.2 to target position with bounce
        const dropEase = 1 - Math.pow(1 - p, 4);
        const bounce = Math.sin(p * Math.PI) * 0.15;
        pinGroup.position.set(0.08, 0.35 + (1 - dropEase) * 1.2 + bounce, globeRadius);

        // Ripple emerges as pin makes contact
        if (p > 0.4) {
          rippleMesh.visible = true;
          const rProg = (p - 0.4) / 0.6;
          const rScale = 1.0 + rProg * 4.5;
          rippleMesh.scale.set(rScale, rScale, rScale);
          rippleMat.opacity = (1 - rProg) * 0.9;
        }

        setHudStatus("LOCATION VERIFIED: SOA NSS CELL HEADQUARTERS");
        setCoordinates("STATUS: 200 OK | AUTHORIZED VOLUNTEER CREDENTIALS");
        setHudSubtext(`Welcome, ${user ? user.name : 'Volunteer'}! Initializing dashboard interface...`);
      }

      // STAGE 5 (4.4s - 5.2s): Earth Expands Outward & Dissolves into Dashboard
      else if (elapsed < 5.2) {
        setPhase(4);
        const p = (elapsed - 4.4) / 0.8; // 0 to 1
        const expandScale = 1.0 + Math.pow(p, 2) * 5.0;

        globeMesh.scale.set(expandScale, expandScale, expandScale);
        globeMat.opacity = 1 - p;
        globeMat.transparent = true;

        atmosphereMesh.scale.set(expandScale, expandScale, expandScale);
        atmosphereMat.opacity = (1 - p) * 0.5;

        pinGroup.scale.set(1 - p, 1 - p, 1 - p);
        starPoints.material.opacity = (1 - p) * 0.75;

        setHudStatus("MATERIALIZING GLASSMORPHIC USER DASHBOARD...");
        setCoordinates("RENDERING 3D ISOMETRIC STATISTICS & RECORDS...");
        setHudSubtext("All systems operational.");
      }

      // STAGE 6 (5.2s+): Trigger Completion
      else {
        cancelAnimationFrame(animId);
        onComplete();
        return;
      }

      // Constant subtle particle drift
      starPoints.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [user, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#08152e] via-[#0d214a] to-[#060e20] overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Top HUD Telemetry Header */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1 backdrop-blur-md flex items-center justify-center shadow-lg">
            <img src={`${import.meta.env.BASE_URL}assets/soa-logo.png`} alt="SOA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase font-mono">
                SOA NSS SATELLITE CADRE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-[11px] text-blue-200 font-mono">
              SYSTEM TIME: {new Date().toLocaleTimeString()} • PROTOCOL: NSS-2024-AUTH
            </div>
          </div>
        </div>

        {/* Skip Button (allows skipping to dashboard immediately) */}
        <button
          onClick={onComplete}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md text-xs font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95"
        >
          <span>Skip to Dashboard</span>
          <FastForward className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>

      {/* Center Reticle & Target Crosshairs (Active during lock-on) */}
      {phase >= 2 && phase < 4 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none animate-in zoom-in-50 duration-300">
          <div className="relative w-48 h-48 rounded-full border border-dashed border-amber-400/60 animate-spin-slow flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-cyan-400/50" />
            <div className="absolute w-full h-[1px] bg-amber-400/30" />
            <div className="absolute h-full w-[1px] bg-amber-400/30" />
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          </div>
        </div>
      )}

      {/* Bottom Cinematic Telemetry HUD Banner */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl text-center pointer-events-none">
        <div className="p-4 sm:p-5 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/25 shadow-2xl space-y-1.5">
          <div className="flex items-center justify-center gap-2 text-xs font-black tracking-widest text-amber-300 font-mono">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{hudStatus}</span>
          </div>
          
          <div className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider">
            {coordinates}
          </div>

          <p className="text-xs text-blue-100 font-medium">
            {hudSubtext}
          </p>
        </div>
      </div>

    </div>
  );
}
