"use client";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GradientMouseLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isMobile) return null;
  return (
    <div
      className="-z-10 fixed inset-0"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ecebeb, white 25%)`,
      }}
    />
  );
}
