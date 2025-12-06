"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
          {new Array(3).fill(0).map((_, i) => (
            <motion.div
              key={`${pathname}-${i}`}
              className={`h-screen w-1/3 z-100 fixed top-0 border-2 ${i === 0 ? "left-0" : i === 1 ? "left-1/3" : "left-2/3"} border-black dark:border-white bg-white bg-[radial-gradient(#c4c4c4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-black dark:bg-[radial-gradient(#3b3b3b_1px,transparent_1px)]`}
              animate={{ y: "-200vh" }}
              exit={{ y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
