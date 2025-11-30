"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as motion from "motion/react-client";

const CONTAINER_SIZE = 250;
const SMALL_SQUARE_SIZE = 20;
const NUM_SQUARES = 40;

const getRandomPosition = () => ({
  x: Math.random() * (CONTAINER_SIZE - SMALL_SQUARE_SIZE),
  y: Math.random() * (CONTAINER_SIZE - SMALL_SQUARE_SIZE),
});

export default function GradientMouseLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [squares, setSquares] = useState(() =>
    Array.from({ length: NUM_SQUARES }, (_, i) => ({
      id: i,
      ...getRandomPosition(),
    }))
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isMobile) return null;
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #d3d3d3, white 25%)`,
      }}
    >
      <div
        className="absolute"
        style={{
          background: "red",
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
          left: mousePosition.x - CONTAINER_SIZE / 2,
          top: mousePosition.y - CONTAINER_SIZE / 2,
          zIndex: -1,
        }}
      >
        {squares.map((square, index) => (
          <motion.div
            key={`${square.id}-${square.x}-${square.y}`}
            className="absolute bg-gray-200"
            style={{
              width: SMALL_SQUARE_SIZE,
              left: square.x,
              top: square.y + SMALL_SQUARE_SIZE / 2,
            }}
            initial={{ height: 0 }}
            animate={{ height: [0, SMALL_SQUARE_SIZE, 0] }}
            transition={{
              duration: 2,
              delay: index * 0.2,
            }}
            onAnimationComplete={() => {
              setSquares((prev) =>
                prev.map((s) =>
                  s.id === square.id ? { ...s, ...getRandomPosition() } : s
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
