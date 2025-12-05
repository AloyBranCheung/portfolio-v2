"use client";

import { neobrutalist } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Matter, { Runner } from "matter-js";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Link from "next/link";

const WALL_THICKNESS = 50;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const oopsMsgRef = useRef<HTMLDivElement | null>(null);
  const homeBtnWrapperRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (
      !containerRef.current ||
      !oopsMsgRef.current ||
      !homeBtnWrapperRef.current
    )
      return;

    const { Engine, Render, Bodies, Composite, Events } = Matter;

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.4 : 1;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const oopsMsgRect = oopsMsgRef.current.getBoundingClientRect();
    const homeBtnRect = homeBtnWrapperRef.current.getBoundingClientRect();

    const engine = Engine.create({
      gravity: { scale: isMobile ? 0.005 : 0.008 },
    });
    const render = Render.create({
      element: containerRef.current,
      engine,
      options: { width, height, wireframes: false, background: "transparent" },
    });

    if (theme === "dark") render.canvas.style.filter = "invert(1)";

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const numWidth = 237.3 * scale;

    const createNumber = (texture: string) =>
      Bodies.rectangle(
        random(numWidth / 2, width - numWidth / 2),
        random(-400, -200),
        numWidth,
        359.1 * scale,
        {
          render: {
            sprite: { texture, xScale: 10 * scale, yScale: 10 * scale },
          },
        }
      );

    const createWall = (x: number, y: number, w: number, h: number) =>
      Bodies.rectangle(x, y, w, h, { isStatic: true });

    const oopsMsg = Bodies.rectangle(
      random(oopsMsgRect.width / 2, width - oopsMsgRect.width / 2),
      random(-400, -200),
      oopsMsgRect.width,
      oopsMsgRect.height,
      { render: { visible: false } }
    );

    const homeBtn = Bodies.rectangle(
      random(homeBtnRect.width / 2, width - homeBtnRect.width / 2),
      random(-400, -200),
      homeBtnRect.width,
      homeBtnRect.height,
      { render: { visible: false } }
    );

    const wallHeight = height + 800;
    Composite.add(engine.world, [
      createNumber("/assets/5.svg"),
      createNumber("/assets/0.svg"),
      createNumber("/assets/0.svg"),
      oopsMsg,
      homeBtn,
      createWall(-WALL_THICKNESS, 0, WALL_THICKNESS, wallHeight), // left wall
      createWall(width + WALL_THICKNESS, 0, WALL_THICKNESS, wallHeight), // right wall
      createWall(width / 2, height + 90, width, WALL_THICKNESS + 100), // floor
    ]);

    Events.on(engine, "afterUpdate", () => {
      if (oopsMsgRef.current) {
        const { x, y } = oopsMsg.position;
        oopsMsgRef.current.style.transform = `translate(${x - oopsMsgRect.width / 2}px, ${y - oopsMsgRect.height / 2}px) rotate(${oopsMsg.angle}rad)`;
      }
      if (homeBtnWrapperRef.current) {
        const { x, y } = homeBtn.position;
        homeBtnWrapperRef.current.style.transform = `translate(${x - homeBtnRect.width / 2}px, ${y - homeBtnRect.height / 2}px) rotate(${homeBtn.angle}rad)`;
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
        className="absolute top-0 left-0 text-sm sm:text-2xl font-bold whitespace-nowrap dark:text-white pointer-events-none"
      >
        Oops, looks like you broke my site.
      </p>
      <div ref={homeBtnWrapperRef} className="absolute top-0 left-0">
        <Button asChild className="font-bold pointer-events-auto">
          <Link href="/">Click here to home</Link>
        </Button>
      </div>
    </div>
  );
}
