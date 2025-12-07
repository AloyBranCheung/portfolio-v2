"use client";

import { forwardRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

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
}

const CartoonBlock = forwardRef<THREE.Group, CartoonBlockProps>(
  ({ position = [0, 0.59, 0], size = [4, 0.5, 4], color = "purple" }, ref) => {
    return (
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
  }
);

CartoonBlock.displayName = "CartoonBlock";

export default CartoonBlock;
