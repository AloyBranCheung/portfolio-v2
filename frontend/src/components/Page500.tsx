"use client";

import { neobrutalist } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";

const WALL_THICKNESS = 10;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const oopsMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !oopsMsgRef.current) return;

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.4 : 1;
    const SVG_TEXT_WIDTH = 237.3 * scale;
    const SVG_TEXT_HEIGHT = 359.1 * scale;

    // container dimensions
    const { left, width, height } =
      containerRef.current.getBoundingClientRect();

    // oopsMsg dimensions
    const oopsMsgRect = oopsMsgRef.current.getBoundingClientRect();

    const Engine = Matter.Engine;
    const Render = Matter.Render; // for debugging
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Events = Matter.Events;

    const engine = Engine.create({
      gravity: {
        scale: isMobile ? 0.005 : 0.008,
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
      isMobile ? width * 0.2 : left + 10,
      0 - SVG_TEXT_HEIGHT / 2,
      SVG_TEXT_WIDTH,
      SVG_TEXT_HEIGHT,
      {
        render: {
          sprite: {
            texture: "/assets/5.svg",
            xScale: 10 * scale,
            yScale: 10 * scale,
          },
        },
      }
    );
    worldObjects.push(five);
    const createZero = (x: number) =>
      Bodies.rectangle(
        x,
        0 - SVG_TEXT_HEIGHT / 2,
        SVG_TEXT_WIDTH,
        SVG_TEXT_HEIGHT,
        {
          render: {
            sprite: {
              texture: "/assets/0.svg",
              xScale: 10 * scale,
              yScale: 10 * scale,
            },
          },
        }
      );

    const zero1 = createZero(width / 2);
    worldObjects.push(zero1);

    const zero2 = createZero(width - width / 8);
    worldObjects.push(zero2);

    const oopsMsg = Bodies.rectangle(
      isMobile ? width / 2 : 450,
      -400,
      oopsMsgRect.width,
      oopsMsgRect.height,
      {
        render: {
          visible: false,
        },
      }
    );
    worldObjects.push(oopsMsg);

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
      height + 50,
      width,
      WALL_THICKNESS + 100,
      {
        isStatic: true,
      }
    );
    worldObjects.push(floor);

    // Animate Divs
    Events.on(engine, "afterUpdate", () => {
      if (oopsMsgRef.current) {
        oopsMsgRef.current.style.transform = `translate(${oopsMsg.position.x - oopsMsgRect.width / 2}px, ${oopsMsg.position.y - oopsMsgRect.height / 2}px) rotate(${oopsMsg.angle}rad)`;
      }
    });

    // Add bodies to world
    Composite.add(engine.world, worldObjects);

    // run renderer
    Render.run(render);

    // run engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2 relative`}
      />
      <p ref={oopsMsgRef} className="absolute top-0 left-0 text-sm sm:text-2xl font-bold whitespace-nowrap">
        Oops, looks like you broke my site.
      </p>
    </div>
  );
}
