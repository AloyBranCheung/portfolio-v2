"use client";

import { neobrutalist } from "@/lib/utils";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import GameInstructions from "./GameInstructions";

interface GameUIProps {
  isGameOver: boolean;
  onReset: () => void;
  score: number;
  message?: React.ReactNode;
}

export default function GameUI({
  isGameOver,
  onReset,
  score,
  message,
}: GameUIProps) {
  return (
    <section className="absolute top-0 left-0 w-full h-full pointer-events-none dark:text-white">
      <div className="flex items-center justify-center flex-col gap-4 p-4 md:mt-12">
        {message ? message : <GameInstructions />}
        {!isGameOver && (
          <p className="text-lg md:text-2xl font-bold">Score: {score}</p>
        )}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`${neobrutalist()} p-4 w-80 flex items-center justify-center gap-4 flex-col text-center mt-24`}
            >
              <p className="text-lg md:text-2xl font-bold">Game Over</p>
              <p className="text-lg md:text-2xl font-bold">
                Score: <span className="font-base">{score}</span>
              </p>
              <Button className="pointer-events-auto" onClick={onReset}>
                Reset Game
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
