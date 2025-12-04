"use client";

import { neobrutalist } from "@/lib/utils";
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
    const worldObjects = [];
    const five = Bodies.rectangle(325, 0, 237.3, 359.1, {
      render: {
        sprite: {
          texture: "/assets/5.svg",
          xScale: 10,
          yScale: 10,
        },
      },
    });
    worldObjects.push(five);
    const createZero = (x: number) =>
      Bodies.rectangle(x, 0, 237.3, 359.1, {
        render: {
          sprite: {
            texture: "/assets/0.svg",
            xScale: 10,
            yScale: 10,
          },
        },
      });

    worldObjects.push(createZero(425));
    worldObjects.push(createZero(525));

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
    worldObjects.push(leftWall);
    const rightWall = Bodies.rectangle(
      width + WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height,
      {
        isStatic: true,
      }
    );
    worldObjects.push(rightWall);
    const floor = Bodies.rectangle(
      width / 2,
      height,
      width,
      WALL_THICKNESS / 2,
      {
        isStatic: true,
      }
    );
    worldObjects.push(floor);

    // Add bodies to world
    Composite.add(engine.world, worldObjects);

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
