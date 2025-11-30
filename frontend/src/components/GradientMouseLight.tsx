"use client";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as motion from "motion/react-client";

const CONTAINER_SIZE = 600;
const SMALL_SQUARE_SIZE = 20;

const getRandomPosition = () => ({
  x: Math.random() * (CONTAINER_SIZE - SMALL_SQUARE_SIZE),
  y: Math.random() * (CONTAINER_SIZE - SMALL_SQUARE_SIZE),
});

export default function GradientMouseLight() {
  const squareId = useRef(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [squares, setSquares] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      centerX: number;
      centerY: number;
    }>
  >([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;
      setMousePosition({ x, y });
    };

    const interval = setInterval(() => {
      setSquares((prev) => [
        ...prev,
        {
          id: squareId.current++,
          ...getRandomPosition(),
          centerX: mousePosition.x,
          centerY: mousePosition.y,
        },
      ]);
    }, 200);

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePosition]);

  if (isMobile) return null;

  console.log("test");
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #e7e7e7, white 25%)`,
      }}
    >
      {squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute bg-gray-400"
          style={{
            width: SMALL_SQUARE_SIZE,
            left: square.centerX - CONTAINER_SIZE / 2 + square.x,
            top:
              square.centerY -
              CONTAINER_SIZE / 2 +
              square.y +
              SMALL_SQUARE_SIZE / 2,
          }}
          initial={{ height: 0 }}
          animate={{ height: [0, SMALL_SQUARE_SIZE, 0] }}
          transition={{
            duration: 1,
          }}
          onAnimationComplete={() => {
            setSquares((prev) => prev.filter((s) => s.id !== square.id));
          }}
        />
      ))}
    </div>
  );
}
