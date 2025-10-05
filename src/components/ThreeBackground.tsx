"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 50;
      pos[i + 1] = (Math.random() - 0.5) * 50;
      pos[i + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#14b8a6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function WaveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry;
      const position = geometry.attributes.position;

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const wave = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
        position.setZ(i, wave);
      }
      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#0d9488" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <WaveGeometry />
      </Canvas>
    </div>
  );
}