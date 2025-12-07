"use client";

import Scene from "./game/Scene";
import Game from "./game/Game";
import GameUI from "./game/GameUI";
import { useState, useRef } from "react";

export default function Page404() {
  const [isGameOver, setIsGameOver] = useState(false);
  const gameResetRef = useRef<(() => void) | null>(null);

  const setIsGameOverTrue = () => {
    setIsGameOver(true);
  };

  const handleReset = () => {
    setIsGameOver(false);
    gameResetRef.current?.();
  };

  return (
    <div className="h-[calc(100vh-230px)] relative">
      <Scene>
        <Game
          isGameOver={isGameOver}
          setIsGameOverTrue={setIsGameOverTrue}
          resetRef={gameResetRef}
        />
      </Scene>
      <GameUI isGameOver={isGameOver} onReset={handleReset} />
    </div>
  );
}
