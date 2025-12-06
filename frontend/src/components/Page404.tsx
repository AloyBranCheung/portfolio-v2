"use client";

import Block from "./game/Block";
import Scene from "./game/Scene";
import { Leva } from "leva";
export default function Page404() {
  return (
    <>
      <Leva hidden />
      <Scene>
        <Block />
        <mesh receiveShadow>
          <boxGeometry args={[10, 0.25, 10]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </Scene>
    </>
  );
}
