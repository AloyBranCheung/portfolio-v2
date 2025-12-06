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
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setPath(pathname)}
      >
        <motion.div key={pathname}>
          {new Array(4).fill(0).map((_, i) => (
            <motion.div
              key={`${pathname}-${i}`}
              className={`h-screen w-1/4 z-100 bg-red-500 fixed top-0 ${i === 0 ? "left-0" : `left-${i}/4`}`}
              animate={{ y: "-100%" }}
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
      <div className={pathname === path ? "visible" : "invisible"}>
        {children}
      </div>
    </>
  );
}
