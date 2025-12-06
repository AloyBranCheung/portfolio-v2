"use client";

import { neobrutalist } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Matter, { Runner } from "matter-js";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Link from "next/link";

const WALL_THICKNESS = 50;

export default function Page500() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const oopsMsgRef = useRef<HTMLDivElement | null>(null);
  const homeBtnWrapperRef = useRef<HTMLDivElement | null>(null);
  const [resize, setResize] = useState(0);
  const lastSizeRef = useRef({ width: 0, height: 0 });

  const { theme } = useTheme();

  useEffect(() => {
    lastSizeRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const handleResize = () => {
      const widthDiff = Math.abs(window.innerWidth - lastSizeRef.current.width);
      const heightDiff = Math.abs(
        window.innerHeight - lastSizeRef.current.height
      );

      if (widthDiff > 200 || heightDiff > 200) {
        lastSizeRef.current = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        setResize((prev) => prev + 1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const numWidth = 237.3 * scale;
    const numHeight = 359.1 * scale;

    const createNumber = (texture: string, x: number, y: number) =>
      Bodies.rectangle(x, y, numWidth, numHeight, {
        render: {
          sprite: { texture, xScale: 10 * scale, yScale: 10 * scale },
        },
      });

    const createWall = (x: number, y: number, w: number, h: number) =>
      Bodies.rectangle(x, y, w, h, {
        isStatic: true,
        render: { visible: false },
      });

    const five = createNumber("/assets/5.svg", width * 0.25, -numHeight / 2);
    const zero1 = createNumber("/assets/0.svg", width * 0.5, -numHeight / 2);
    const zero2 = createNumber("/assets/0.svg", width * 0.75, -numHeight / 2);

    const oopsMsg = Bodies.rectangle(
      width / 2,
      -numHeight - 100,
      oopsMsgRect.width,
      oopsMsgRect.height,
      { render: { visible: false } }
    );

    const homeBtn = Bodies.rectangle(
      width / 2,
      -numHeight - 80,
      homeBtnRect.width,
      homeBtnRect.height,
      { render: { visible: false } }
    );

    const wallHeight = height + 800;
    Composite.add(engine.world, [
      five,
      zero1,
      zero2,
      oopsMsg,
      homeBtn,
      createWall(-WALL_THICKNESS + 20, 0 + 200, WALL_THICKNESS, wallHeight), // left wall
      createWall(
        width + WALL_THICKNESS - 20,
        0 + 200,
        WALL_THICKNESS,
        wallHeight
      ), // right wall
      createWall(width / 2, height + 70, 1920, WALL_THICKNESS + 100), // floor
    ]);

    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E2",
      "#F8B739",
      "#52B788",
    ];
    const spawnBall = () => {
      const ball = Bodies.circle(
        Math.random() * (width - 100) + 50,
        -30,
        Math.random() * 20 + 15,
        {
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
          },
        }
      );
      Composite.add(engine.world, ball);
    };

    const interval = setInterval(spawnBall, 300);

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

    const runner = Runner.create();

    setTimeout(() => {
      Render.run(render);
      Runner.run(runner, engine);
      if (oopsMsgRef.current) oopsMsgRef.current.style.visibility = "visible";
      if (homeBtnWrapperRef.current)
        homeBtnWrapperRef.current.style.visibility = "visible";
    }, 600);

    return () => {
      clearInterval(interval);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [theme, resize]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`${neobrutalist()} h-[calc(100vh-195px)] mt-2 relative`}
      />
      <p
        ref={oopsMsgRef}
        className="invisible absolute top-0 left-0 text-sm sm:text-2xl font-bold whitespace-nowrap dark:text-white pointer-events-none"
      >
        Oops, looks like you broke my site.
      </p>
      <div ref={homeBtnWrapperRef} className="invisible absolute top-0 left-0">
        <Button asChild className="font-bold pointer-events-auto">
          <Link href="/">Click here to go home</Link>
        </Button>
      </div>
    </div>
  );
}
