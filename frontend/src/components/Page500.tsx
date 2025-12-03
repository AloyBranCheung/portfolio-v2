"use client";

import { neobrutalist } from "@/lib/utils";
import Five from "./assets/Five";
import Zero from "./assets/Zero";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    const engine = Engine.create();
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
    });

    // bodies
    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const container = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // Add bodies to world
    Composite.add(engine.world, [container, boxA, boxB]);

    // run renderer
    Render.run(render);

    // run engine
    const runner = Runner.create();
    Runner.run(runner, engine);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2`}
    >
      <div className="flex items-center justify-center gap-2">
        <Five />
        <Zero />
        <Zero />
      </div>
    </div>
  );
}
