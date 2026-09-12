import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import { loginUser } from '../services/nssService';

export default function CinematicIntro({ onAuthSuccess, onOpenFullAuth, onScrollToContent }) {
  const mountRef = useRef(null);
  const [introStage, setIntroStage] = useState(0); // 0: Logo in virtual space, 1: Flag reveal, 2: Converged & Popup shown
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sceneStateRef = useRef({
    startTime: Date.now(),
    replaying: false
  });

  const handleReplay = () => {
    sceneStateRef.current.startTime = Date.now();
    sceneStateRef.current.replaying = true;
    setIntroStage(0);
  };

  const handleInlineLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginUser({
        userId: username || (role === 'admin' ? 'admin' : 'SOA2022NSS101'),
        password: password || 'password',
        role
      });
      setIsSubmitting(false);

      if (res.success) {
        onAuthSuccess(res.user);
      } else {
        setAuthError(res.message || "Invalid credentials");
      }
    }, 450);
  };

  const handleQuickFill = (type) => {
    if (type === 'student') {
      setRole('student');
      setUsername('SOA2022NSS101');
      setPassword('nss2024');
    } else {
      setRole('admin');
      setUsername('ADMIN-SOA-001');
      setPassword('soaAdmin2024');
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Realistic Blue Sky Canvas with Soft, Natural Cloud Formations
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 1024;
    skyCanvas.height = 1024;
    const skyCtx = skyCanvas.getContext('2d');

    // Smooth Atmospheric Sky Gradient: Deep Azure Top to Soft Horizon Blue
    const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 1024);
    skyGrad.addColorStop(0.0, '#10254c'); // Seamless match with navbar
    skyGrad.addColorStop(0.3, '#1a3c75');
    skyGrad.addColorStop(0.65, '#26549c');
    skyGrad.addColorStop(0.95, '#3b6ea8');
    skyGrad.addColorStop(1.0, '#1a3768'); // Blends smoothly into bottom content
    skyCtx.fillStyle = skyGrad;
    skyCtx.fillRect(0, 0, 1024, 1024);

    // Soft, Fluffy Organic Cirrus Clouds (Layered feathered radial puffs)
    const drawCloudCluster = (cx, cy, scale) => {
      const puffs = [
        { x: 0, y: 0, r: 80, o: 0.14 },
        { x: -50, y: 10, r: 60, o: 0.11 },
        { x: 50, y: 5, r: 65, o: 0.12 },
        { x: -90, y: 20, r: 45, o: 0.08 },
        { x: 90, y: 15, r: 50, o: 0.09 },
        { x: 25, y: -20, r: 55, o: 0.13 },
        { x: -30, y: -15, r: 50, o: 0.11 }
      ];

      puffs.forEach(p => {
        const radGrad = skyCtx.createRadialGradient(
          cx + p.x * scale, cy + p.y * scale, 0,
          cx + p.x * scale, cy + p.y * scale, p.r * scale
        );
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${p.o * 1.5})`);
        radGrad.addColorStop(0.5, `rgba(255, 255, 255, ${p.o})`);
        radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        skyCtx.fillStyle = radGrad;
        skyCtx.beginPath();
        skyCtx.arc(cx + p.x * scale, cy + p.y * scale, p.r * scale, 0, Math.PI * 2);
        skyCtx.fill();
      });
    };

    // Place subtle natural clouds across the sky
    drawCloudCluster(220, 240, 1.4);
    drawCloudCluster(750, 180, 1.6);
    drawCloudCluster(480, 360, 1.2);
    drawCloudCluster(880, 420, 1.1);
    drawCloudCluster(150, 520, 1.3);

    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    scene.background = skyTexture;

    // Natural Balanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    sunLight.position.set(5, 7, 6);
    scene.add(sunLight);

    const skyFillLight = new THREE.DirectionalLight(0x89b6e8, 0.8);
    skyFillLight.position.set(-5, -3, 3);
    scene.add(skyFillLight);

    // Silver Flagpole with Golden Finial
    const poleGroup = new THREE.Group();
    poleGroup.position.set(-3.25, -0.4, 0);

    const poleGeo = new THREE.CylinderGeometry(0.045, 0.045, 6.2, 32);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.92,
      roughness: 0.15
    });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    poleGroup.add(poleMesh);

    const finialGeo = new THREE.SphereGeometry(0.1, 32, 32);
    const finialMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15
    });
    const finialMesh = new THREE.Mesh(finialGeo, finialMat);
    finialMesh.position.y = 3.1;
    poleGroup.add(finialMesh);

    scene.add(poleGroup);

    // Authentic Indian Tricolor Flag Texture (Rich Saffron, Crisp White, Emerald Green)
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 1024;
    flagCanvas.height = 640;
    const fCtx = flagCanvas.getContext('2d');

    // Rich India Saffron (Kesari)
    fCtx.fillStyle = '#FF671F';
    fCtx.fillRect(0, 0, 1024, 213.33);

    // Pure Silk White
    fCtx.fillStyle = '#FFFFFF';
    fCtx.fillRect(0, 213.33, 1024, 213.33);

    // Deep India Green
    fCtx.fillStyle = '#046A38';
    fCtx.fillRect(0, 426.66, 1024, 213.34);

    // Realistic Micro-fabric Weave Texture
    fCtx.fillStyle = 'rgba(0, 0, 0, 0.025)';
    for (let x = 0; x < 1024; x += 3) {
      fCtx.fillRect(x, 0, 1, 640);
    }
    for (let y = 0; y < 640; y += 3) {
      fCtx.fillRect(0, y, 1024, 1);
    }

    const flagTexture = new THREE.CanvasTexture(flagCanvas);
    flagTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Indian Flag 3D Cloth Mesh
    const flagWidth = 4.3;
    const flagHeight = 2.65;
    const segX = 52;
    const segY = 32;
    const flagGeo = new THREE.PlaneGeometry(flagWidth, flagHeight, segX, segY);

    const flagMat = new THREE.MeshStandardMaterial({
      map: flagTexture,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(-3.25 + flagWidth / 2, 1.45 - flagHeight / 2, 0);
    scene.add(flagMesh);

    const posAttr = flagGeo.attributes.position;
    const origPositions = posAttr.array.slice();

    // NSS Medallion Group
    const nssMedallionGroup = new THREE.Group();
    scene.add(nssMedallionGroup);

    // Ghosted Motion Blur Trail Layer (from reference mockup)
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(`${import.meta.env.BASE_URL}assets/nss-logo.png`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;

      const radius = 0.44;
      const circleGeo = new THREE.CircleGeometry(radius, 64);
      const circleMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true
      });
      const frontMesh = new THREE.Mesh(circleGeo, circleMat);
      nssMedallionGroup.add(frontMesh);

      // Gold Rim
      const rimGeo = new THREE.TorusGeometry(radius + 0.015, 0.02, 16, 64);
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xd49b38,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x4a2a00,
        emissiveIntensity: 0.2
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      nssMedallionGroup.add(rimMesh);

      // Ghosted Motion Blur Trail Layer
      const ghostMat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        opacity: 0.38,
        roughness: 0.4
      });
      const ghostMesh = new THREE.Mesh(new THREE.CircleGeometry(radius * 1.05, 64), ghostMat);
      ghostGroup.add(ghostMesh);
    });

    // Golden Sparkle Motifs for Intro Phase 1
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = (Math.random() - 0.5) * 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffe082,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const elapsedSinceStart = (Date.now() - sceneStateRef.current.startTime) / 1000;

      // 1. Dynamic Cloth Waving Physics
      const positions = posAttr.array;
      const count = posAttr.count;

      const windSpeed = 3.5;
      const waveFreq = 1.9;
      const waveAmp = 0.22;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const origX = origPositions[i3];
        const origY = origPositions[i3 + 1];

        // Cloth anchored at flagpole edge
        const distFromPole = (origX + flagWidth / 2) / flagWidth;

        // Smooth traveling sine harmonics
        const wave1 = Math.sin(origX * waveFreq - elapsedTime * windSpeed) * waveAmp * distFromPole;
        const wave2 = Math.sin(origY * 2.5 + origX * 1.4 - elapsedTime * (windSpeed * 1.2)) * 0.1 * distFromPole;
        const wave3 = Math.cos(origX * 3.2 - elapsedTime * 4.5) * 0.04 * distFromPole;

        positions[i3 + 2] = wave1 + wave2 + wave3;
        positions[i3] = origX + Math.sin(elapsedTime * 2.2 + origY) * 0.015 * distFromPole;
      }
      posAttr.needsUpdate = true;
      flagGeo.computeVertexNormals();

      const flagCenterX = flagMesh.position.x;
      const flagCenterY = flagMesh.position.y;
      const flagCenterZ = 0.06;

      // 2. Timeline Sequence Management
      if (elapsedSinceStart < 2.0) {
        // PHASE 1: NSS Logo entrance in 3D virtual space
        if (introStage !== 0) setIntroStage(0);

        const progress = Math.min(1, elapsedSinceStart / 1.8);
        const scaleVal = 0.2 + progress * 1.35;
        nssMedallionGroup.scale.set(scaleVal, scaleVal, scaleVal);
        nssMedallionGroup.position.set(0, 0, 3 - progress * 1.2);
        nssMedallionGroup.rotation.z -= 0.07;
        nssMedallionGroup.rotation.y = Math.sin(elapsedTime * 3) * 0.35;
        nssMedallionGroup.rotation.x = Math.cos(elapsedTime * 2) * 0.2;

        flagMesh.position.z = -1.5;
        poleGroup.position.z = -1.5;
        particles.material.opacity = 0.9;
        ghostGroup.visible = false;
      } 
      else if (elapsedSinceStart < 3.8) {
        // PHASE 2: Flag reveal & NSS Logo convergence towards center
        if (introStage !== 1) setIntroStage(1);

        const convProgress = (elapsedSinceStart - 2.0) / 1.8;
        const ease = 1 - Math.pow(1 - convProgress, 3);

        flagMesh.position.z = -1.5 + ease * 1.5;
        poleGroup.position.z = -1.5 + ease * 1.5;

        const curX = 0 + ease * (flagCenterX - 0);
        const curY = 0 + ease * (flagCenterY - 0);
        const curZ = 1.8 + ease * (flagCenterZ - 1.8);
        const curScale = 1.55 - ease * 0.6;

        nssMedallionGroup.position.set(curX, curY, curZ);
        nssMedallionGroup.scale.set(curScale, curScale, curScale);
        nssMedallionGroup.rotation.z -= (1 - ease) * 0.05 + 0.015;
        nssMedallionGroup.rotation.x *= 0.88;
        nssMedallionGroup.rotation.y *= 0.88;

        ghostGroup.visible = true;
        ghostGroup.position.set(curX - 0.25 * (1 - ease), curY - 0.1 * (1 - ease), curZ - 0.04);
        ghostGroup.scale.set(curScale * 1.05, curScale * 1.05, curScale * 1.05);
        ghostGroup.rotation.z = nssMedallionGroup.rotation.z + 0.5;

        particles.material.opacity = (1 - ease) * 0.8;
      } 
      else {
        // PHASE 3: Fixed in center of flag, replacing Ashoka Chakra
        if (introStage !== 2) setIntroStage(2);

        flagMesh.position.z = 0;
        poleGroup.position.z = 0;

        const centerWaveZ = Math.sin(0 * waveFreq - elapsedTime * windSpeed) * waveAmp * 0.5;

        nssMedallionGroup.position.set(flagCenterX, flagCenterY, 0.08 + centerWaveZ);
        nssMedallionGroup.scale.set(0.95, 0.95, 0.95);
        nssMedallionGroup.rotation.z -= 0.01;
        nssMedallionGroup.rotation.x = 0;
        nssMedallionGroup.rotation.y = 0;

        ghostGroup.visible = true;
        ghostGroup.position.set(flagCenterX - 0.32, flagCenterY - 0.1, 0.04 + centerWaveZ);
        ghostGroup.scale.set(1.0, 1.0, 1.0);
        ghostGroup.rotation.z = nssMedallionGroup.rotation.z - 0.4;

        particles.material.opacity = 0;
      }

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
  }, []);

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] lg:h-[760px] overflow-hidden select-none">
      
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Top Replay & Camera Controls */}
      <div className="absolute top-4 left-4 sm:left-6 z-20 flex items-center gap-2">
        <button
          onClick={handleReplay}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-xs text-white transition-all shadow-md hover:scale-105"
          title="Replay 3D Intro Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-semibold">Replay 3D Intro</span>
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NSS National Flag Sequence</span>
        </span>
      </div>

      {/* GLASSMORPHIC LOGIN POPUP MODAL (Emerges on the Right Side exactly matching the reference mockup) */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 lg:right-16 z-30 w-[90%] sm:w-[380px] transition-all duration-700 transform ${
          introStage >= 2 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative rounded-3xl p-6 sm:p-7 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-slate-100 overflow-visible">
          
          {/* ROTATING SIKSHA 'O' ANUSANDHAN (SOA) LOGO AT TOP RIGHT (From reference mockup) */}
          <div className="absolute -top-7 -right-5 z-40 group cursor-pointer" title="Siksha 'O' Anusandhan Deemed to be University">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-400/80 animate-spin-slow" />
              <div className="w-full h-full rounded-full p-1 bg-white shadow-xl border-2 border-rose-500 flex items-center justify-center transition-transform hover:scale-110">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/soa-logo.png`} 
                  alt="SOA University Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Modal Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-black tracking-tight text-white drop-shadow">
              SIGN IN
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-0.5">
              SOA University NSS Portal
            </p>
          </div>

          {/* Role Pill Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 mb-4 rounded-xl bg-black/20 border border-white/15 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setRole('student'); setAuthError(''); }}
              className={`py-1.5 rounded-lg transition-all ${
                role === 'student' ? 'bg-white text-slate-900 shadow-md font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => { setRole('admin'); setAuthError(''); }}
              className={`py-1.5 rounded-lg transition-all ${
                role === 'admin' ? 'bg-amber-400 text-slate-950 shadow-md font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              NSS Admin
            </button>
          </div>

          {/* Quick Demo Fill Pill */}
          <div className="flex items-center justify-between mb-3 text-[11px] text-white/90 px-1 font-medium">
            <span>Demo:</span>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => handleQuickFill('student')}
                className="hover:underline text-cyan-200 font-bold"
              >
                Student Demo
              </button>
              <span>•</span>
              <button 
                type="button" 
                onClick={() => handleQuickFill('admin')}
                className="hover:underline text-amber-300 font-bold"
              >
                Admin Demo
              </button>
            </div>
          </div>

          {authError && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-600/60 border border-rose-300 text-white text-xs font-medium">
              {authError}
            </div>
          )}

          {/* Form Fields: Username & Password matching mockup */}
          <form onSubmit={handleInlineLogin} className="space-y-3.5">
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username / Reg ID"
                className="w-full px-4 py-3 rounded-2xl bg-white/30 hover:bg-white/35 focus:bg-white/40 border border-white/40 text-sm text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/60 backdrop-blur-md transition-all shadow-inner"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-2xl bg-white/30 hover:bg-white/35 focus:bg-white/40 border border-white/40 text-sm text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/60 backdrop-blur-md transition-all shadow-inner"
              />
            </div>

            {/* BUTTON 1: SOLID WHITE PILL "SIGN IN" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-full font-extrabold text-sm text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>SIGNING IN...</span>
              ) : (
                <span>SIGN IN</span>
              )}
            </button>

            {/* BUTTON 2: FROSTED GLASS OUTLINE PILL "SIGN UP" */}
            <button
              type="button"
              onClick={() => onOpenFullAuth('register')}
              className="w-full py-3 px-4 rounded-full font-extrabold text-sm text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/50 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>SIGN UP</span>
            </button>
          </form>

        </div>
      </div>

      {/* Atmospheric Soft Gradient at Bottom to Blend Seamlessly into Website Content */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#162f5e] to-transparent pointer-events-none z-10" />

      {/* Bottom Subtle Scroll Indicator */}
      <div 
        onClick={onScrollToContent}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group select-none transition-transform hover:translate-y-0.5"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow">
          Explore Website & 9 College Units
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/60 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>

    </div>
  );
}
