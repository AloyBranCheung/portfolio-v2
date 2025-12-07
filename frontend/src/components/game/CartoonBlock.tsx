"use client";

import { forwardRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody, RigidBodyTypeString } from "@react-three/rapier";

/**
 * Reference: https://www.youtube.com/watch?v=V5UllFImvoE
 */

const CartoonOutlineMaterial = shaderMaterial(
  {},
  // vertex shader
  /*glsl*/ `
    void main() {
      vec3 transformed = position + normal * 0.02;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `
);

extend({ CartoonOutlineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    cartoonOutlineMaterial: object;
  }
}

interface CartoonBlockProps {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
  type?: RigidBodyTypeString;
  disablePhysics?: boolean;
}

export const CARTOON_BLOCK_POSITION: [number, number, number] = [0, 0.59, 0];
export const CARTOON_BLOCK_SIZE: [number, number, number] = [4, 0.5, 4];

const CartoonBlock = forwardRef<THREE.Group, CartoonBlockProps>(
  (
    {
      position = [0, 0.59, 0],
      size = [4, 0.5, 4],
      color = "purple",
      type,
      disablePhysics = true,
    },
    ref
  ) => {
    const objectGroup = (
      <group ref={ref} position={position}>
        <mesh>
          <boxGeometry args={size} />
          <cartoonOutlineMaterial side={THREE.BackSide} />
        </mesh>

        <mesh castShadow>
          <boxGeometry args={size} />
          <meshToonMaterial color={color} />
        </mesh>
      </group>
    );

    return disablePhysics ? (
      objectGroup
    ) : (
      <RigidBody type={type}>{objectGroup}</RigidBody>
    );
  }
);

CartoonBlock.displayName = "CartoonBlock";

export default CartoonBlock;
