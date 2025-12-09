"use client";

import Scene from "./Scene";
import Game from "./Game";
import React, { useState, useRef } from "react";
import GameUI from "./GameUI";
import { cn } from "@/lib/utils";

interface TowerBlocksGameProps {
  className?: string;
  message?: React.ReactNode;
}

export default function TowerBlocksGame({
  className,
  message,
}: TowerBlocksGameProps) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameResetRef = useRef<(() => void) | null>(null);

  const setIsGameOverTrue = () => {
    setIsGameOver(true);
  };

  const updateScore = (newScore: number) => {
    setScore(newScore);
  };

  const handleReset = () => {
    setIsGameOver(false);
    setScore(0);
    gameResetRef.current?.();
  };

  return (
    <div className={cn("h-full", className)}>
      <Scene>
        <Game
          isGameOver={isGameOver}
          setIsGameOverTrue={setIsGameOverTrue}
          resetRef={gameResetRef}
          updateScore={updateScore}
        />
      </Scene>
      <GameUI
        isGameOver={isGameOver}
        onReset={handleReset}
        score={score}
        message={message}
      />
    </div>
  );
}
