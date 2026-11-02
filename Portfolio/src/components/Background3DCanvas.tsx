import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AccentColor } from '../types';
import { Move3d, Sparkles, Layers } from 'lucide-react';

interface Background3DCanvasProps {
  accentColor: AccentColor;
}

export const Background3DCanvas: React.FC<Background3DCanvasProps> = ({ accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Map accent colors to hex values
  const accentHexMap: Record<AccentColor, { primary: number; glow: number; secondary: number }> = {
    cyan: { primary: 0x38bdf8, glow: 0x0284c7, secondary: 0x7dd3fc },
    emerald: { primary: 0x10b981, glow: 0x059669, secondary: 0x34d399 },
    violet: { primary: 0x8b5cf6, glow: 0x7c3aed, secondary: 0xa78bfa },
    gold: { primary: 0xf59e0b, glow: 0xd97706, secondary: 0xfcd34d }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.02);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Clear existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const currentAccent = accentHexMap[accentColor];

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainPointLight = new THREE.PointLight(currentAccent.primary, 12, 60);
    mainPointLight.position.set(14, 14, 14);
    scene.add(mainPointLight);

    const secondaryPointLight = new THREE.PointLight(currentAccent.glow, 10, 50);
    secondaryPointLight.position.set(-14, -12, -6);
    scene.add(secondaryPointLight);

    const topDirectionalLight = new THREE.DirectionalLight(currentAccent.secondary, 1.0);
    topDirectionalLight.position.set(0, 30, 12);
    scene.add(topDirectionalLight);

    // 5. Create 3D Floating Geometry Elements Group
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    const items: { mesh: THREE.Object3D; rotSpeed: { x: number; y: number; z: number }; initialY: number; floatOffset: number }[] = [];

    // Common Materials
    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0xa8c3b8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: wireframeMode,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: currentAccent.primary,
      transmission: 0.7,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      wireframe: wireframeMode,
    });

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc4ddd2,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: wireframeMode,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: currentAccent.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // Object 1: Large Concentric Torus Rings (AURA.DESIGN 3D Ring System)
    const torusGroup = new THREE.Group();
    torusGroup.position.set(10, 3, -4);

    const outerTorusGeo = new THREE.TorusGeometry(4.2, 0.35, 32, 100);
    const outerTorusMesh = new THREE.Mesh(outerTorusGeo, glassMat);
    torusGroup.add(outerTorusMesh);

    const innerTorusGeo = new THREE.TorusGeometry(2.8, 0.2, 24, 80);
    const innerTorusMesh = new THREE.Mesh(innerTorusGeo, ringMat);
    innerTorusMesh.rotation.x = Math.PI / 2;
    torusGroup.add(innerTorusMesh);

    floatingGroup.add(torusGroup);
    items.push({
      mesh: torusGroup,
      rotSpeed: { x: 0.002, y: 0.004, z: 0.001 },
      initialY: 3,
      floatOffset: 0
    });

    // Object 2: Left Floating Ring System
    const leftTorusGeo = new THREE.TorusGeometry(3.0, 0.25, 24, 80);
    const leftTorusMesh = new THREE.Mesh(leftTorusGeo, ringMat);
    leftTorusMesh.position.set(-11, 5, -6);
    leftTorusMesh.rotation.x = -Math.PI / 3;
    floatingGroup.add(leftTorusMesh);
    items.push({
      mesh: leftTorusMesh,
      rotSpeed: { x: -0.003, y: 0.003, z: -0.002 },
      initialY: 5,
      floatOffset: 1.2
    });

    // Object 3: Center Wireframe Neural Dodecahedron Structure
    const dodecaGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const dodecaMesh = new THREE.Mesh(dodecaGeo, wireframeMat);
    dodecaMesh.position.set(0, -2, -8);
    floatingGroup.add(dodecaMesh);
    items.push({
      mesh: dodecaMesh,
      rotSpeed: { x: 0.004, y: 0.006, z: 0.002 },
      initialY: -2,
      floatOffset: 2.0
    });

    // Object 4: Floating Geometric Crystals (Octahedrons & Icosahedrons)
    const octaGeo = new THREE.OctahedronGeometry(1.6, 0);
    const crystalMesh1 = new THREE.Mesh(octaGeo, glassMat);
    crystalMesh1.position.set(-9, -6, -2);
    floatingGroup.add(crystalMesh1);
    items.push({
      mesh: crystalMesh1,
      rotSpeed: { x: 0.005, y: -0.005, z: 0.003 },
      initialY: -6,
      floatOffset: 2.5
    });

    const icoGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const crystalMesh2 = new THREE.Mesh(icoGeo, metallicMat);
    crystalMesh2.position.set(12, -7, -5);
    floatingGroup.add(crystalMesh2);
    items.push({
      mesh: crystalMesh2,
      rotSpeed: { x: -0.004, y: 0.006, z: -0.003 },
      initialY: -7,
      floatOffset: 3.3
    });

    // Object 5: Floating Translucent Cubes
    const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    for (let i = 0; i < 3; i++) {
      const boxMesh = new THREE.Mesh(boxGeo, i % 2 === 0 ? glassMat : metallicMat);
      const posX = (i % 2 === 0 ? 8 : -8) + (i * 1.5);
      const posY = 8 - i * 5;
      const posZ = -4 - i * 3;
      boxMesh.position.set(posX, posY, posZ);
      boxMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      floatingGroup.add(boxMesh);
      items.push({
        mesh: boxMesh,
        rotSpeed: { x: (Math.random() - 0.5) * 0.006, y: (Math.random() - 0.5) * 0.006, z: 0.002 },
        initialY: posY,
        floatOffset: i * 0.9
      });
    }

    // 6. Floating Micro-Particle Galaxy Constellation
    const particleCount = 1600;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 65;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 8;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: currentAccent.primary,
      size: 0.16,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Parallax Mouse Reaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * particleSpeed;

      // Smooth camera mouse parallax lerp
      targetX += (mouseX * 3.0 - targetX) * 0.035;
      targetY += (-mouseY * 3.0 - targetY) * 0.035;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate and float 3D objects smoothly
      items.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
        item.mesh.position.y = item.initialY + Math.sin(elapsedTime * 1.1 + item.floatOffset) * 0.45;
      });

      // Rotate particle constellation
      particleSystem.rotation.y = elapsedTime * 0.025;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.012) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentColor, wireframeMode, particleSpeed]);

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        id="bg-3d-canvas"
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
      />

      {/* Interactive 3D Background Control Dock (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          id="toggle-3d-controls-btn"
          onClick={() => setShowControls(!showControls)}
          className="p-3 rounded-2xl bg-[#ffffff]/90 border border-emerald-500/30 text-emerald-600 hover:text-slate-900 hover:border-emerald-400 transition-all shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-mono"
          title="Toggle 3D Background Canvas Options"
        >
          <Move3d className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline">3D Canvas</span>
        </button>

        {showControls && (
          <div className="bg-[#ffffff]/95 border border-emerald-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase text-slate-500">Wireframe:</label>
              <button
                id="toggle-wireframe-3d"
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  wireframeMode ? 'bg-emerald-500 text-black' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {wireframeMode ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase text-slate-500">Float Speed:</label>
              <div className="flex gap-1">
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setParticleSpeed(spd)}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      particleSpeed === spd ? 'bg-emerald-500/30 text-emerald-600 border border-emerald-500/50' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
