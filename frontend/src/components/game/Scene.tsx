"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { StatsGl, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { useEffect } from "react";

const CameraControls = () => {
  const { x, y, z } = useControls("camera", {
    x: { value: 9, step: 0.5 },
    y: { value: 7.5, step: 0.5 },
    z: { value: 12, step: 0.5 },
  });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(x, y, z);
  }, [camera.position, x, y, z]);
  return null;
};

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
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [10, 6, 15],
      }}
      gl={{
        toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <CameraControls />
      <StatsGl className="absolute top-30 left-30" />
      <OrbitControls makeDefault enableDamping={true} />
      {children}
      <Lighting />
    </Canvas>
  );
}
