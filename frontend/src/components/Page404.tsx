"use client";

import Scene from "./game/Scene";
import { Leva } from "leva";
// TODO: delete this file
// import POCTowerBlocks from "./game/POCTowerBlocks";
import Floor from "./game/Floor";
import Game from "./game/Game";

export default function Page404() {
  return (
    <>
      <Leva hidden />
      <Scene>
        <Game />
        {/* <POCTowerBlocks /> */}
        <Floor />
      </Scene>
    </>
  );
}
