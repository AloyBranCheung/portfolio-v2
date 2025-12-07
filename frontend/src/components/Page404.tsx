"use client";

import Scene from "./game/Scene";
import Game from "./game/Game";
import GameUI from "./game/GameUI";

export default function Page404() {
  return (
    <div className="h-[calc(100vh-230px)] relative">
      <Scene>
        <Game />
      </Scene>
      <GameUI />
    </div>
  );
}
