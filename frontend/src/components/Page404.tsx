"use client";

import Scene from "./game/Scene";
import { Leva } from "leva";
import Blocks from "./game/Blocks";
import * as THREE from "three";
export default function Page404() {
  return (
    <>
      <Leva hidden />
      <Scene>
        <Blocks />
        <group>
          <mesh receiveShadow>
            <boxGeometry args={[10, 0.25, 10]} />
            <meshToonMaterial color="greenyellow" />
          </mesh>
          <mesh>
            <boxGeometry args={[10, 0.25, 10]} />
            <cartoonOutlineMaterial side={THREE.BackSide} />
          </mesh>
        </group>
      </Scene>
    </>
  );
}
