"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { StatsGl } from "@react-three/drei";
import * as THREE from "three";

export const Lighting = () => (
  <>
    <ambientLight />
    <directionalLight castShadow position={[0, 3.5, 6.01]} intensity={4.46} />
  </>
);

interface SceneProps {
  children?: React.ReactNode;
}
export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      shadows
      gl={{
        toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <OrthographicCamera
        makeDefault
        near={0.1}
        far={200}
        position={[6.386965033032861, 8, 6.196140733658284]}
        rotation={[-0.7549722819690879, 0.6363225244631798, 0.5098320868052202]}
        zoom={54}
      />
      <StatsGl className="absolute top-30 left-30" />
      {children}
      <Lighting />
    </Canvas>
  );
}
