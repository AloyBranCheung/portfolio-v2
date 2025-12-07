"use client";

import { neobrutalist } from "@/lib/utils";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";

interface GameUIProps {
  isGameOver: boolean;
  onReset: () => void;
  score: number;
}

export default function GameUI({ isGameOver, onReset, score }: GameUIProps) {
  return (
    <section className="absolute top-0 left-0 w-full h-full pointer-events-none dark:text-white">
      <div className="flex items-center justify-center flex-col gap-4 p-4 md:mt-12">
        <h2 className="text-xl md:text-5xl">Error 404: Page not found.</h2>
        <p className="md:text-xl">
          But, you found my game.&nbsp;
          <span className="md:hidden">
            Tap the blocks to get started.&nbsp;
          </span>
          <span className="hidden md:inline">
            Click the blocks or press &#8216;space&#8217; to get started.&nbsp;
          </span>
        </p>
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
              <p className="text-lg md:text-2xl font-bold">Score: {score}</p>
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
