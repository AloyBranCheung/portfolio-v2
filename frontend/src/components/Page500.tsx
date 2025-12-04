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

    const { left, top, right, bottom, width, height } =
      containerRef.current.getBoundingClientRect();

    console.log({ left, top, right, bottom, width, height });

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
    const leftWall = Bodies.rectangle(left, bottom, 10, height);
    const floor = Bodies.rectangle(width / 2, height, width, WALL_THICKNESS, {
      isStatic: true,
    });

    // Add bodies to world
    Composite.add(engine.world, [floor, leftWall, boxB]);

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
