"use client";

import { neobrutalist } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";

const WALL_THICKNESS = 10;
const SVG_TEXT_HEIGHT = 359.1;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { left, width, height } =
      containerRef.current.getBoundingClientRect();

    const Engine = Matter.Engine;
    const Render = Matter.Render; // for debugging
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Events = Matter.Events;

    const engine = Engine.create({
      gravity: {
        scale: 0.008,
      },
    });
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
    const five = Bodies.rectangle(
      left + 10,
      0 - SVG_TEXT_HEIGHT / 2,
      237.3,
      SVG_TEXT_HEIGHT,
      {
        render: {
          sprite: {
            texture: "/assets/5.svg",
            xScale: 10,
            yScale: 10,
          },
        },
        // isSleeping: true,
      }
    );
    worldObjects.push(five);
    const createZero = (x: number) =>
      Bodies.rectangle(x, 0 - SVG_TEXT_HEIGHT / 2, 237.3, SVG_TEXT_HEIGHT, {
        render: {
          sprite: {
            texture: "/assets/0.svg",
            xScale: 10,
            yScale: 10,
          },
        },
        // isSleeping: true,
      });

    const zero1 = createZero(width / 2);
    worldObjects.push(zero1);

    const zero2 = createZero(width - width / 8);
    worldObjects.push(zero2);

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

    const test = Bodies.rectangle(0, 0, 100, 100, {
      render: { visible: false },
    });
    worldObjects.push(test);

    // Animate Divs
    Events.on(test, "beforeUpdate", (e) => {});

    // Add bodies to world
    Composite.add(engine.world, worldObjects);

    // run renderer
    Render.run(render);

    // run engine
    const runner = Runner.create();
    Runner.run(runner, engine);
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2 relative`}
      />
      <div className="absolute top-0 left-0">absolute</div>
    </div>
  );
}
