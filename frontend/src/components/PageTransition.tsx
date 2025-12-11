"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { dotBackgroundCn } from "./DotBackground";
import { cn } from "@/lib/utils";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);
  return (
    <>
      <div className={pathname === path ? "visible" : "invisible"}>
        {children}
      </div>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          setPath(pathname);
        }}
      >
        <motion.div key={pathname}>
          {new Array(5).fill(0).map((_, i) => (
            <motion.div
              key={`${pathname}-${i}`}
              className={cn(
                `h-screen z-100 fixed top-0 border-2 w-1/5`,
                dotBackgroundCn
              )}
              style={{ left: `${(i / 5) * 100}%` }}
              animate={{ y: "-200vh" }}
              exit={{ y: 0 }}
              transition={{
                delay: i * 0.05,
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
