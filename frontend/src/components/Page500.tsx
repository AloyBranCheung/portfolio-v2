"use client";

import { neobrutalist } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";
import { useTheme } from "next-themes";

const WALL_THICKNESS = 10;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const oopsMsgRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !oopsMsgRef.current) return;

    const { Engine, Render, Bodies, Composite, Events } = Matter;

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.4 : 1;

    const { left, width, height } =
      containerRef.current.getBoundingClientRect();
    const oopsMsgRect = oopsMsgRef.current.getBoundingClientRect();

    const engine = Engine.create({
      gravity: { scale: isMobile ? 0.005 : 0.008 },
    });
    const render = Render.create({
      element: containerRef.current,
      engine,
      options: { width, height, wireframes: false, background: "transparent" },
    });

    if (theme === "dark") render.canvas.style.filter = "invert(1)";

    const createNumber = (texture: string, x: number) =>
      Bodies.rectangle(x, -179.55 * scale, 237.3 * scale, 359.1 * scale, {
        render: { sprite: { texture, xScale: 10 * scale, yScale: 10 * scale } },
      });

    const createWall = (x: number, y: number, w: number, h: number) =>
      Bodies.rectangle(x, y, w, h, { isStatic: true });

    const oopsMsg = Bodies.rectangle(
      isMobile ? width / 2 : 450,
      -400,
      oopsMsgRect.width,
      oopsMsgRect.height,
      { render: { visible: false } }
    );

    Composite.add(engine.world, [
      createNumber("/assets/5.svg", isMobile ? width * 0.2 : left + 10),
      createNumber("/assets/0.svg", width / 2),
      createNumber("/assets/0.svg", width - width / 8),
      oopsMsg,
      // left wall
      createWall(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height),
      // right wall
      createWall(
        width + WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height
      ),
      // floor
      createWall(width / 2, height + 50, width, WALL_THICKNESS + 100),
    ]);

    Events.on(engine, "afterUpdate", () => {
      if (oopsMsgRef.current) {
        const { x, y } = oopsMsg.position;
        oopsMsgRef.current.style.transform = `translate(${x - oopsMsgRect.width / 2}px, ${y - oopsMsgRect.height / 2}px) rotate(${oopsMsg.angle}rad)`;
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [theme]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2 relative`}
      />
      <p
        ref={oopsMsgRef}
        className="absolute top-0 left-0 text-sm sm:text-2xl font-bold whitespace-nowrap dark:text-white"
      >
        Oops, looks like you broke my site.
      </p>
    </div>
  );
}
