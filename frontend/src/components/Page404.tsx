"use client";

import Scene from "./game/Scene";
import { Leva } from "leva";
import POCTowerBlocks from "./game/POCTowerBlocks";
import * as THREE from "three";
export default function Page404() {
  return (
    <>
      <Leva hidden />
      <Scene>
        <POCTowerBlocks />
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
