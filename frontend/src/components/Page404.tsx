"use client";

import { Canvas } from "@react-three/fiber";
import { StatsGl, OrbitControls } from "@react-three/drei";

export default function Page404() {
  return (
    <div className="h-[calc(100vh-230px)]">
      <Canvas>
        <StatsGl />
        <OrbitControls makeDefault />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0.42, 5.26, 6.54]} />
      </Canvas>
    </div>
  );
}
