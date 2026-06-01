import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import ParticleField from './ParticleField';
import AIPlanet from './AIPlanet';
import ServiceOrbs from './ServiceOrbs';
import ProjectCards3D from './ProjectCards3D';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useMobile } from '../../hooks/useMobile';

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Cinematic camera — floating drone physics
 *  - Mouse → smooth lag drift (lerp 0.05)
 *  - Scroll → Z-travel (fly through scene)
 *  - Fast horizontal mouse → Z-axis roll (banking like a drone)
 *  - Fast scroll → micro shake on Y
 *  - lookAt always targets (0,0,0)
 */
function CinematicCamera() {
  const { camera } = useThree();
  const { scrollProgress } = useScrollProgress();

  // Smooth values
  const smooth = useRef({ x: 0, y: 0, z: 8, roll: 0 });
  // Velocity for cinematic banking
  const mouseVel = useRef({ x: 0, prevX: 0 });
  const shakeY = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Mouse position (normalized -0.5 to 0.5) from R3F pointer
    const mx = state.pointer.x * 0.5;
    const my = state.pointer.y * 0.3;

    // Mouse horizontal velocity for roll
    mouseVel.current.x = mx - mouseVel.current.prevX;
    mouseVel.current.prevX = mx;

    const s = smooth.current;

    // Drift
    s.x = lerp(s.x, mx, 0.04);
    s.y = lerp(s.y, my, 0.04);

    // Z-travel on scroll — fly through the galaxy
    const targetZ = 8 - scrollProgress * 14;
    s.z = lerp(s.z, targetZ, 0.035);

    // Cinematic roll — bank slightly on fast horizontal movement
    const rollTarget = -mouseVel.current.x * 3.5;
    s.roll = lerp(s.roll, rollTarget, 0.06);

    // Subtle Y breathe (drone hover simulation)
    const breathe = Math.sin(t * 0.4) * 0.06;

    camera.position.x = s.x;
    camera.position.y = s.y + breathe;
    camera.position.z = s.z;
    camera.rotation.z = s.roll;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

export default function SpaceScene() {
  const isMobile = useMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={isMobile ? [1, 1.2] : [1, Math.min(window.devicePixelRatio, 1.5)]}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        background: 'linear-gradient(135deg, #010108 0%, #050118 50%, #010108 100%)',
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} color="#a855f7" intensity={2.5} />
      <pointLight position={[10, 5, 5]} color="#00d4ff" intensity={1.8} />
      <pointLight position={[0, -8, 0]} color="#06ffa5" intensity={0.8} />

      <CinematicCamera />

      <Suspense fallback={<LoadingFallback />}>
        <ParticleField />
        <AIPlanet />
        <ServiceOrbs />
        <ProjectCards3D />
      </Suspense>

      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={2.0}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <DepthOfField
            focusDistance={0.008}
            focalLength={0.22}
            bokehScale={3.5}
          />
          <Vignette eskil={false} offset={0.08} darkness={0.75} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
