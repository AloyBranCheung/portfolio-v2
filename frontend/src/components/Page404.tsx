"use client";

import { Canvas } from "@react-three/fiber";
import { StatsGl, OrbitControls } from "@react-three/drei";

export default function Page404() {
  return (
    <Canvas>
      <StatsGl />
      <OrbitControls makeDefault />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
    </Canvas>
  );
}
