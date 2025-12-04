"use client";

import { neobrutalist } from "@/lib/utils";
import Five from "./assets/Five";
import Zero from "./assets/Zero";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";

const WALL_THICKNESS = 10;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    const Engine = Matter.Engine;
    const Render = Matter.Render; // for debugging
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    const engine = Engine.create();
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // bodies
    const boxB = Bodies.rectangle(425, 0, 80, 80);

    // container
    const leftWall = Bodies.rectangle(
      0 - WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height,
      {
        isStatic: true,
      }
    );
    const rightWall = Bodies.rectangle(
      width + WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height,
      {
        isStatic: true,
      }
    );
    const floor = Bodies.rectangle(
      width / 2,
      height,
      width,
      WALL_THICKNESS / 2,
      {
        isStatic: true,
      }
    );

    // Add bodies to world
    Composite.add(engine.world, [floor, leftWall, rightWall, boxB]);

    // run renderer
    Render.run(render);

    // run engine
    const runner = Runner.create();
    Runner.run(runner, engine);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2 relative`}
    >
      {/* <div className="flex items-center justify-center gap-2 absolute">
        <Five />
        <Zero />
        <Zero />
      </div> */}
    </div>
  );
}
